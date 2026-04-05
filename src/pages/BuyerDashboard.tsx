import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
    Search, Filter, MapPin, TrendingUp, Phone,
    MessageSquare, Star, Truck, Calendar, ShoppingBag,
    Leaf, Info, ArrowUpRight, ArrowDownRight, Globe, Clock, CheckCircle2, AlertTriangle, ArrowRight
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import { BuyerVoiceAssistant } from '@/components/BuyerVoiceAssistant';
import { translateAnalysisResults } from '@/lib/ai-translation';

interface Listing {
    id: string;
    farmerName: string;
    cropName: string;
    quantity: number;
    price: number;
    location: string;
    harvestDate?: string;
    quality?: string;
    timestamp: string;
}

interface MarketInsight {
    analysis_brief: string;
    demand_indicator: string;
    price_forecast: string;
    msp_comparison: string;
    current_price?: number;
    insights: { type: string, text: string }[];
}

interface Interaction {
    id: string;
    farmerName: string;
    crop: string;
    status: string;
    timestamp: string;
}

const BuyerDashboard = () => {
    const { t, i18n } = useTranslation();
    const { user } = useAuthStore();
    const { toast } = useToast();
    const API_URL = 'http://localhost:5000';

    const [activeTab, setActiveTab] = useState("marketplace");
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCrop, setSelectedCrop] = useState("All");
    const [selectedState, setSelectedState] = useState("All");

    // Intelligence
    const [insight, setInsight] = useState<MarketInsight | null>(null);
    const [insightLoading, setInsightLoading] = useState(false);
    const [targetCrop, setTargetCrop] = useState("Wheat");
    const [targetState, setTargetState] = useState("Punjab");

    // Interactions
    const [interactions, setInteractions] = useState<Interaction[]>([]);

    // Negotiations State
    const [sentNegotiations, setSentNegotiations] = useState<any[]>([]);
    const [isNegOpen, setIsNegOpen] = useState(false);
    const [negTarget, setNegTarget] = useState<Listing | null>(null);
    const [offerPrice, setOfferPrice] = useState("");
    const [offerMsg, setOfferMsg] = useState("");
    const [negSubmitting, setNegSubmitting] = useState(false);

    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const [savedListings, setSavedListings] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchListings();
        fetchInteractions();
        if (user) fetchNegotiations();
    }, [user]);

    const fetchNegotiations = async () => {
        if (!user) return;
        try {
            const res = await axios.get(`${API_URL}/negotiations?buyerName=${user.name}`);
            setSentNegotiations(res.data);
        } catch (err) {
            console.error("Failed to fetch negotiations", err);
        }
    };

    const fetchListings = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/listings`);
            setListings(res.data);
        } catch (error) {
            console.error("Error fetching listings", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchInsights = async () => {
        try {
            setInsightLoading(true);
            const res = await axios.post(`${API_URL}/buyer/insights`, {
                crop: targetCrop,
                state: targetState
            });
            const rawInsight = res.data;
            
            const langMap: Record<string, string> = {
                'en': 'English', 'hi': 'Hindi', 'bn': 'Bengali', 'as': 'Assamese', 'kn': 'Kannada'
            };
            const targetLang = langMap[i18n.language] || 'English';
            
            const translatedInsight = await translateAnalysisResults(rawInsight, targetLang);
            setInsight(translatedInsight);
        } catch (error) {
            toast({ title: t('common.error'), description: t('buyer.errorInsights'), variant: "destructive" });
        } finally {
            setInsightLoading(false);
        }
    };

    const fetchInteractions = async () => {
        if (!user) return;
        try {
            const res = await axios.get(`${API_URL}/buyer/interactions?buyerId=${user.id}`);
            setInteractions(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleContact = async (listing: Listing) => {
        if (!user) {
            toast({ title: t('buyer.loginRequired'), description: t('buyer.loginRequiredDesc') });
            return;
        }

        setSelectedListing(listing);
        setContactModalOpen(true);

        try {
            await axios.post(`${API_URL}/buyer/interactions`, {
                buyerId: user.id,
                listingId: listing.id,
                farmerName: listing.farmerName,
                crop: listing.cropName
            });
            fetchInteractions();
        } catch (error) {
            console.error(error);
        }
    };

    const handleMakeOffer = async () => {
        if (!offerPrice || !negTarget || !user) return;
        setNegSubmitting(true);
        try {
            await axios.post(`${API_URL}/negotiations`, {
                listingId: negTarget.id,
                buyerId: user.id,
                buyerName: user.name,
                sellerName: negTarget.farmerName,
                offerPrice: parseFloat(offerPrice),
                originalPrice: negTarget.price,
                crop: negTarget.cropName,
                message: offerMsg,
            });
            toast({ title: t('common.success', { defaultValue: "Offer Sent!" }), description: `Your counter-offer for ${negTarget.cropName} has been submitted.` });
            setIsNegOpen(false);
            setOfferPrice("");
            setOfferMsg("");
            fetchNegotiations();
        } catch (err) {
            toast({ title: t('common.error'), description: "Failed to send offer.", variant: "destructive" });
        } finally {
            setNegSubmitting(false);
        }
    };

    const toggleSave = (id: string) => {
        const newSaved = new Set(savedListings);
        if (newSaved.has(id)) {
            newSaved.delete(id);
            toast({ description: t('buyer.toast.unsaved') });
        } else {
            newSaved.add(id);
            toast({ description: t('buyer.toast.saved') });
        }
        setSavedListings(newSaved);
    };

    const [postDemandOpen, setPostDemandOpen] = useState(false);
    const [demandData, setDemandData] = useState({
        crop: "",
        quantity: "",
        price: "",
        location: ""
    });

    const handlePanIndia = () => {
        setSelectedState("All");
        setSelectedCrop("All");
        setSearchQuery("");
        toast({ description: t('buyer.panIndia') });
    };

    const handlePostDemand = async () => {
        if (!demandData.crop || !demandData.quantity) {
            toast({ variant: "destructive", description: t('buyer.fillFields') });
            return;
        }

        try {
            await axios.post(`${API_URL}/demands`, {
                ...demandData,
                buyerName: user?.name || "Verified Buyer",
                buyerId: user?.id
            });
            toast({ title: t('common.success'), description: t('buyer.demand.posted') });
            setPostDemandOpen(false);
            setDemandData({ crop: "", quantity: "", price: "", location: "" });
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", description: t('buyer.errorPostDemand') });
        }
    };

    const filteredListings = listings.filter(l => {
        const matchesSearch = l.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCrop = selectedCrop === "All" || l.cropName.toLowerCase() === selectedCrop.toLowerCase();
        const matchesState = selectedState === "All" || l.location.toLowerCase().includes(selectedState.toLowerCase());
        return matchesSearch && matchesCrop && matchesState;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20 relative">
            <Navbar />

            {/* Custom Contact Modal */}
            {contactModalOpen && selectedListing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <Card className="w-full max-w-md bg-slate-900 border-slate-700 shadow-2xl scale-100 animate-in zoom-in-95">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Phone className="w-5 h-5 text-green-400" />
                                {t('buyer.contact.title')}
                            </CardTitle>
                            <CardDescription>{t('buyer.contact.desc', { name: selectedListing.farmerName })}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                                <span className="text-slate-400">{t('buyer.contact.phone')}</span>
                                <span className="text-xl font-mono text-white select-all">
                                    {/* Mock number if missing, or use listing contact */}
                                    {/* @ts-ignore */}
                                    {selectedListing.contactNumber || "+91 98765-43210"}
                                </span>
                            </div>
                            <div className="text-xs text-slate-500">
                                * {t('buyer.recordedNote')}
                            </div>
                            <div className="flex gap-2">
                                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                    <MessageSquare className="w-4 h-4 mr-2" /> {t('buyer.contact.whatsapp')}
                                </Button>
                                <Button className="flex-1" variant="secondary" onClick={() => window.open(`tel:${// @ts-ignore
                                    selectedListing.contactNumber || "+919876543210"}`)}>
                                    <Phone className="w-4 h-4 mr-2" /> {t('buyer.contact.call')}
                                </Button>
                            </div>
                            <Button variant="outline" className="w-full border-slate-700" onClick={() => setContactModalOpen(false)}>
                                {t('buyer.contact.close')}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Post Demand Modal */}
            {postDemandOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <Card className="w-full max-w-md bg-slate-900 border-slate-700 shadow-2xl scale-100 animate-in zoom-in-95">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-orange-400" />
                                {t('buyer.demand.title')}
                            </CardTitle>
                            <CardDescription>{t('buyer.demand.desc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">{t('buyer.demand.crop')}</label>
                                <Select onValueChange={(v) => setDemandData({ ...demandData, crop: v })}>
                                    <SelectTrigger className="bg-black/40 border-slate-700"><SelectValue placeholder={t('buyer.placeholders.selectCrop')} /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Wheat">Wheat</SelectItem>
                                        <SelectItem value="Rice">Rice</SelectItem>
                                        <SelectItem value="Maize">Maize</SelectItem>
                                        <SelectItem value="Potato">Potato</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">{t('buyer.demand.quantity')}</label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 500"
                                        className="bg-black/40 border-slate-700"
                                        onChange={(e) => setDemandData({ ...demandData, quantity: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">{t('buyer.demand.price')}</label>
                                    <Input
                                        type="number"
                                        placeholder="₹"
                                        className="bg-black/40 border-slate-700"
                                        onChange={(e) => setDemandData({ ...demandData, price: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">{t('buyer.demand.location')}</label>
                                <Input
                                    placeholder="Enter District/State"
                                    className="bg-black/40 border-slate-700"
                                    onChange={(e) => setDemandData({ ...demandData, location: e.target.value })}
                                />
                            </div>

                            <div className="pt-2 flex gap-2">
                                <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handlePostDemand}>
                                    {t('buyer.demand.postBtn')}
                                </Button>
                                <Button variant="outline" className="border-slate-700" onClick={() => setPostDemandOpen(false)}>
                                    {t('buyer.demand.cancel')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <main className="container mx-auto px-4 py-8 pt-24">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-in slide-in-from-top-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 bg-orange-400/10">
                                {t('buyer.title')}
                            </Badge>
                            <span className="text-slate-400 text-sm">{t('nav.farmerDashboard')}</span>
                        </div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">
                            {t('buyer.welcome', { name: user?.name || t('buyer.trader') })}
                        </h1>
                        <p className="text-slate-400 mt-1">{t('buyer.subtitle')}</p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="border-slate-800 text-slate-300 gap-2 hover:bg-slate-800 hover:text-white transition-colors"
                            onClick={handlePanIndia}
                        >
                            <Globe className="w-4 h-4" /> {t('buyer.panIndia')}
                        </Button>
                        <Button
                            className="bg-orange-600 hover:bg-orange-700 gap-2"
                            onClick={() => setPostDemandOpen(true)}
                        >
                            <ShoppingBag className="w-4 h-4" /> {t('buyer.postDemand')}
                        </Button>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-slate-900 border border-slate-800 p-1">
                        <TabsTrigger value="marketplace" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-slate-400">
                            {t('buyer.tabs.listings')}
                        </TabsTrigger>
                        <TabsTrigger value="intelligence" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400">
                            {t('buyer.tabs.intelligence')}
                        </TabsTrigger>
                        <TabsTrigger value="interactions" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-slate-400">
                            {t('buyer.tabs.deals')}
                        </TabsTrigger>
                    </TabsList>

                    {/* MARKETPLACE FEED TAB */}
                    <TabsContent value="marketplace" className="space-y-6 animate-in fade-in">
                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder={t('buyer.filters.search')}
                                    className="pl-10 bg-black/40 border-slate-700 text-white focus:border-orange-500 transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                                <SelectTrigger className="bg-black/40 border-slate-700 text-slate-200">
                                    <SelectValue placeholder={t('buyer.filters.allCrops')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">{t('buyer.filters.allCrops')}</SelectItem>
                                    <SelectItem value="Wheat">Wheat</SelectItem>
                                    <SelectItem value="Rice">Rice</SelectItem>
                                    <SelectItem value="Maize">Maize</SelectItem>
                                    <SelectItem value="Potato">Potato</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedState} onValueChange={setSelectedState}>
                                <SelectTrigger className="bg-black/40 border-slate-700 text-slate-200">
                                    <SelectValue placeholder={t('buyer.filters.allStates')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">{t('buyer.filters.allStates')}</SelectItem>
                                    <SelectItem value="Punjab">Punjab</SelectItem>
                                    <SelectItem value="Haryana">Haryana</SelectItem>
                                    <SelectItem value="UP">UP</SelectItem>
                                    <SelectItem value="Bihar">Bihar</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Listings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-full text-center py-20 text-slate-500">{t('buyer.loading')}</div>
                            ) : filteredListings.length === 0 ? (
                                <div className="col-span-full text-center py-20 border border-dashed border-slate-800 rounded-xl">
                                    <Leaf className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                                    <p className="text-slate-400">{t('buyer.noListings')}</p>
                                </div>
                            ) : (
                                filteredListings.map(listing => (
                                    <Card key={listing.id} className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-all group overflow-hidden relative">
                                        <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                                        <div className="absolute top-4 right-4">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`hover:bg-transparent ${savedListings.has(listing.id) ? "text-yellow-400" : "text-slate-600 hover:text-yellow-400"}`}
                                                onClick={() => toggleSave(listing.id)}
                                            >
                                                <Star className="w-5 h-5 fill-current" />
                                            </Button>
                                        </div>
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-xl text-white">{listing.cropName}</CardTitle>
                                                    <CardDescription className="flex items-center gap-1 mt-1 text-slate-400">
                                                        <MapPin className="w-3 h-3" /> {listing.location}
                                                    </CardDescription>
                                                </div>
                                                <Badge variant="secondary" className="bg-green-900/30 text-green-400 border-green-800 mr-8">
                                                    {listing.quality || t('buyer.gradeA')}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                                                        <span className="block text-slate-500 text-xs">{t('buyer.card.quantity')}</span>
                                                        <span className="text-lg font-semibold text-white">{listing.quantity} Qtl</span>
                                                    </div>
                                                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                                                        <span className="block text-slate-500 text-xs">{t('buyer.card.price')}</span>
                                                        <span className="text-lg font-semibold text-green-400">₹{listing.price}</span>
                                                    </div>
                                                </div>

                                                <div className="pt-2 border-t border-slate-800">
                                                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                                                        <span>{t('buyer.card.farmer')}: {listing.farmerName}</span>
                                                        <span>{t('buyer.card.harvest')}: {listing.harvestDate || t('buyer.ready')}</span>
                                                    </div>
                                                    <div className="flex gap-2 mb-2">
                                                        <Button className="flex-1 bg-white text-black hover:bg-slate-200" onClick={() => handleContact(listing)}>
                                                            <Phone className="w-4 h-4 mr-2" /> {t('buyer.card.callFarmer')}
                                                        </Button>
                                                        {(!user || listing.farmerName.toLowerCase() !== user.name.toLowerCase()) && (
                                                            <Dialog open={isNegOpen && negTarget?.id === listing.id} onOpenChange={(open) => {
                                                                if (!user) {
                                                                    toast({ title: t('buyer.loginRequired'), description: t('buyer.loginRequiredDesc') });
                                                                    return;
                                                                }
                                                                setIsNegOpen(open);
                                                                if (open) setNegTarget(listing);
                                                            }}>
                                                                <DialogTrigger asChild>
                                                                    <Button className="flex-1 bg-slate-800 text-white hover:bg-slate-700">
                                                                        🤝 {t('marketplace.negotiate', { defaultValue: 'Negotiate' })}
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="bg-slate-900 border-slate-700 text-white">
                                                                    <DialogHeader>
                                                                        <DialogTitle>{t('marketplace.listings.negotiate.title', { crop: listing.cropName, defaultValue: `Negotiate for ${listing.cropName}` })}</DialogTitle>
                                                                        <DialogDescription className="text-slate-400">
                                                                            {t('marketplace.listings.negotiate.desc', { seller: listing.farmerName, defaultValue: `Propose a counter-offer to ${listing.farmerName}.` })}
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div className="grid gap-4 py-4">
                                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                                            <Label htmlFor="price" className="text-right text-slate-300">Price/Q</Label>
                                                                            <div className="col-span-3 flex items-center gap-4">
                                                                                <div className="text-slate-500 line-through">₹{listing.price}</div>
                                                                                <Input
                                                                                    id="price"
                                                                                    type="number"
                                                                                    placeholder="Your best offer"
                                                                                    className="col-span-2 bg-slate-800 border-slate-600 text-white"
                                                                                    value={offerPrice}
                                                                                    onChange={(e) => setOfferPrice(e.target.value)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                                            <Label htmlFor="msg" className="text-right text-slate-300">Message</Label>
                                                                            <Input
                                                                                id="msg"
                                                                                placeholder="Add a message for the farmer"
                                                                                className="col-span-3 bg-slate-800 border-slate-600 text-white"
                                                                                value={offerMsg}
                                                                                onChange={(e) => setOfferMsg(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <DialogFooter>
                                                                        <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800" onClick={() => setIsNegOpen(false)}>{t('common.cancel', { defaultValue: 'Cancel' })}</Button>
                                                                        <Button onClick={handleMakeOffer} disabled={negSubmitting} className="bg-orange-600 hover:bg-orange-700 text-white">
                                                                            {negSubmitting ? t('common.sending', { defaultValue: 'Sending...' }) : t('marketplace.listings.negotiate.send', { defaultValue: 'Send Counter-Offer' })}
                                                                        </Button>
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    {/* INTELLIGENCE TAB */}
                    <TabsContent value="intelligence" className="animate-in slide-in-from-right-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Control Panel */}
                            <Card className="bg-slate-900 border-slate-800 h-fit">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-blue-400" /> {t('buyer.intelligence.scope')}
                                    </CardTitle>
                                    <CardDescription>{t('buyer.intelligence.config')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {insight && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-slate-400">{t('buyer.intelligence.forecast')}</p>
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                                    <span className="font-medium text-green-400">{insight.price_forecast}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-slate-400">{t('buyer.intelligence.demand')}</p>
                                                <Badge variant={insight.demand_indicator === 'High' ? 'default' : 'secondary'} className="bg-blue-500/20 text-blue-300 border-none">
                                                    {insight.demand_indicator}
                                                </Badge>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-slate-400">{t('buyer.intelligence.vsMsp')}</p>
                                                <span className="font-medium text-yellow-400">{insight.msp_comparison}</span>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-slate-400">{t('buyer.intelligence.avgPrice')}</p>
                                                <span className="font-bold text-xl text-white">
                                                    {insight.current_price ? `₹${insight.current_price}/Qtl` : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">{t('buyer.targetCrop')}</label>
                                        <Select value={targetCrop} onValueChange={setTargetCrop}>
                                            <SelectTrigger className="bg-black/20 border-slate-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["Wheat", "Rice", "Maize", "Cotton", "Potato", "Onion"].map(c => (
                                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">{t('buyer.targetState')}</label>
                                        <Select value={targetState} onValueChange={setTargetState}>
                                            <SelectTrigger className="bg-black/20 border-slate-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["Punjab", "Haryana", "Maharashtra", "Madhya Pradesh", "Karnataka"].map(s => (
                                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button
                                        className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
                                        onClick={fetchInsights}
                                        disabled={insightLoading}
                                    >
                                        {insightLoading ? t('buyer.intelligence.analyzing') : t('buyer.intelligence.genBtn')}
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* AI Output */}
                            <div className="lg:col-span-2 space-y-6">
                                {!insight ? (
                                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                                        <TrendingUp className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-slate-300">{t('buyer.intelligence.scope')}</h3>
                                        <p className="text-slate-500 mt-2">{t('buyer.intelligence.config')}</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Key Stats Row */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <Card className="bg-slate-900 border-slate-800 p-4">
                                                <div className="text-sm text-slate-500">{t('buyer.intelligence.forecast')}</div>
                                                <div className={`text-xl font-bold mt-1 flex items-center gap-2 ${insight.price_forecast?.includes("Rise") ? "text-red-400" : "text-green-400"}`}>
                                                    {insight.price_forecast?.includes("Rise") ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                                                    {insight.price_forecast || t('buyer.unknown')}
                                                </div>
                                            </Card>
                                            <Card className="bg-slate-900 border-slate-800 p-4">
                                                <div className="text-sm text-slate-500">{t('buyer.intelligence.demand')}</div>
                                                <div className="text-xl font-bold mt-1 text-amber-400">{insight.demand_indicator}</div>
                                            </Card>
                                            <Card className="bg-slate-900 border-slate-800 p-4">
                                                <div className="text-sm text-slate-500">{t('buyer.intelligence.vsMsp')}</div>
                                                <div className="text-xl font-bold mt-1 text-blue-400">{insight.msp_comparison}</div>
                                            </Card>
                                        </div>

                                        {/* Detailed Analysis */}
                                        <Card className="bg-slate-900 border-slate-800">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <div className="space-y-1">
                                                    <CardTitle className="text-white text-lg">{t('buyer.intelligence.strategicAnalysis')}</CardTitle>
                                                    <CardDescription>{insight.analysis_brief}</CardDescription>
                                                </div>
                                                <BuyerVoiceAssistant
                                                    insight={insight}
                                                    crop={targetCrop}
                                                    state={targetState}
                                                />
                                            </CardHeader>
                                            <CardContent className="space-y-4 pt-4">
                                                {insight.insights.map((item, idx) => (
                                                    <div key={idx} className="flex gap-4 p-4 bg-slate-950/50 rounded-lg border border-slate-800/50">
                                                        <div className="mt-1">
                                                            {item.type === "Trend" && <TrendingUp className="w-5 h-5 text-blue-500" />}
                                                            {item.type === "Strategy" && <Star className="w-5 h-5 text-amber-500" />}
                                                            {item.type === "Logistics" && <Truck className="w-5 h-5 text-green-500" />}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-slate-200">{item.type}</h4>
                                                            <p className="text-sm text-slate-400 mt-1">{item.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* INTERACTIONS TAB */}
                    <TabsContent value="interactions" className="animate-in fade-in">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-green-400" />
                                    {t('buyer.tabs.deals', { defaultValue: 'My Deals & Offers' })}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    
                                    {/* Sent Offers Section */}
                                    {sentNegotiations.length > 0 && (
                                        <div className="space-y-4 animate-in fade-in">
                                            <h3 className="text-lg font-bold text-slate-300 border-b border-slate-800 pb-2 flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5 text-indigo-400" />
                                                Active Negotiations
                                                <Badge className="bg-indigo-900 text-indigo-200 ml-2">{sentNegotiations.length}</Badge>
                                            </h3>
                                            <div className="grid gap-3">
                                                {sentNegotiations.map((neg) => (
                                                    <div key={neg.id} className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-slate-800/40 rounded-lg border-l-4 border-l-indigo-500 border-r border-t border-b border-slate-700/50 hover:bg-slate-800/60 transition-all gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                                                                <Leaf className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <div className="text-white font-medium flex items-center gap-2 text-lg">
                                                                    {neg.crop} 
                                                                    <ArrowRight className="w-4 h-4 text-slate-500" /> 
                                                                    <span className="text-green-400 font-bold">₹{neg.offerPrice}/Q</span>
                                                                </div>
                                                                <p className="text-sm text-slate-400">Offered to {neg.sellerName} | Original: ₹{neg.originalPrice}/Q</p>
                                                            </div>
                                                        </div>

                                                        <div className="text-left md:text-right">
                                                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">{t('common.status', { defaultValue: 'Status' })}</div>
                                                            <Badge 
                                                                className={`font-bold py-1 px-3 ${
                                                                    neg.status === 'Pending' ? "bg-yellow-900/50 text-yellow-500 border-yellow-700/50" :
                                                                    neg.status === 'Accepted' ? "bg-green-900/50 text-green-500 border-green-700/50" :
                                                                    "bg-red-900/50 text-red-500 border-red-700/50"
                                                                }`}
                                                            >
                                                                {neg.status === 'Pending' && <Clock className="w-3 h-3 mr-1 inline" />}
                                                                {neg.status === 'Accepted' && <CheckCircle2 className="w-3 h-3 mr-1 inline" />}
                                                                {neg.status === 'Rejected' && <AlertTriangle className="w-3 h-3 mr-1 inline" />}
                                                                {neg.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Traditional Interactions / Calls */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-300 border-b border-slate-800 pb-2 flex items-center gap-2">
                                            <Phone className="w-5 h-5 text-emerald-400" />
                                            Contacted Farmers
                                            <Badge className="bg-emerald-900 text-emerald-200 ml-2">{interactions.length}</Badge>
                                        </h3>
                                        {interactions.length === 0 ? (
                                            <div className="text-slate-500 italic p-6 text-center border border-dashed border-slate-800 rounded-lg">
                                                {t('buyer.noDeals', { defaultValue: 'No interactions yet.' })}
                                            </div>
                                        ) : (
                                            interactions.map((int, i) => (
                                                <div key={i} className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                                                            {int.farmerName[0]}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-medium">{t('buyer.dealLabel', { crop: int.crop, defaultValue: `${int.crop} Deal` })}</h4>
                                                            <p className="text-sm text-slate-400">{t('buyer.withLabel', { name: int.farmerName, defaultValue: `with ${int.farmerName}` })}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <Badge className="bg-emerald-900 text-emerald-200 mb-1">Contacted</Badge>
                                                        <p className="text-xs text-slate-500">
                                                            {new Date(int.timestamp).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default BuyerDashboard;
