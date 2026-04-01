
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Sprout, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import { useTranslation } from "react-i18next";

const YieldPrediction = () => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState({
        crop: "Rice",
        area: 5000,
        temp: 22.0,
        humidity: 80.0,
        rainfall: 1800.0,
        fertilizer: 600000.0,
        pesticide: 300.0,
        soil_ph: 5.2,
        soil_n: 300.0,
        soil_p: 35.0,
        soil_k: 200.0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData(prev => ({ ...prev, crop: value }));
    };

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handlePredict = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        try {
            // Convert Acres to Hectares for the Model
            // 1 Acre = 0.4047 Hectares
            const areaInAcres = parseFloat(formData.area.toString());
            const areaInHectares = areaInAcres * 0.4047;

            // Prepare payload with Metric units
            const payload = {
                ...formData,
                area: areaInHectares
            };

            const response = await fetch(`${API_URL}/predict-yield-optimized`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Prediction failed');
            }

            const data = await response.json();

            // Calculate Total Production
            // Yield (t/ha) * Area (ha)
            const totalProduction = data.predicted_yield * areaInHectares;

            // Calculate Approximate Revenue (₹)
            // Prices (approx): Rice ₹22/kg, Maize ₹20/kg, Ginger ₹40/kg
            // 1 Ton = 1000 kg
            const prices = { 'Rice': 22000, 'Maize': 20000, 'Ginger': 40000 }; // per Ton
            const pricePerTon = prices[formData.crop] || 20000;
            const revenue = totalProduction * pricePerTon;

            setResult({
                ...data,
                totalProduction,
                revenue,
                areaInAcres,
                areaInHectares
            });

            toast({
                title: "Prediction Successful",
                description: `Estimated Production: ${totalProduction.toFixed(2)} Tons`,
            });

        } catch (error) {
            console.error("Prediction Error:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        {t('disease.backHome')}
                    </Link>
                    <div className="flex items-center gap-2">
                        <Sprout className="w-6 h-6 text-green-500" />
                        <span className="text-xl font-bold gradient-text">AgriSphere AI</span>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">{t('yield.title')}</h1>
                        <p className="text-muted-foreground">
                            {t('yield.desc')}
                            <br />{t('yield.supportedCrops')}: <span className="font-semibold text-green-500">Rice, Maize, Ginger</span>.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Input Form */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                {t('yield.inputTitle')}
                            </h2>
                            <form onSubmit={handlePredict} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>{t('yield.selectCrop')}</Label>
                                    <Select value={formData.crop} onValueChange={handleSelectChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('yield.selectCrop')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Rice">Rice</SelectItem>
                                            <SelectItem value="Maize">Maize</SelectItem>
                                            <SelectItem value="Ginger">Ginger</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>{t('yield.area')}</Label>
                                        <Input
                                            type="number"
                                            name="area"
                                            value={formData.area}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g 2.5"
                                        />
                                        <p className="text-xs text-muted-foreground">{t('yield.areaNote')}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('yield.rainfall')}</Label>
                                        <Input
                                            type="number"
                                            name="rainfall"
                                            value={formData.rainfall}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>{t('yield.temp')}</Label>
                                        <Input
                                            type="number"
                                            name="temp"
                                            value={formData.temp}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('yield.humidity')}</Label>
                                        <Input
                                            type="number"
                                            name="humidity"
                                            value={formData.humidity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>{t('yield.fertilizer')}</Label>
                                        <Input
                                            type="number"
                                            name="fertilizer"
                                            value={formData.fertilizer}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('yield.pesticide')}</Label>
                                        <Input
                                            type="number"
                                            name="pesticide"
                                            value={formData.pesticide}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>{t('yield.soilPh')}</Label>
                                        <Input
                                            type="number"
                                            name="soil_ph"
                                            step="0.1"
                                            value={formData.soil_ph}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('yield.soilN')}</Label>
                                        <Input
                                            type="number"
                                            name="soil_n"
                                            value={formData.soil_n}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>{t('yield.soilP')}</Label>
                                        <Input
                                            type="number"
                                            name="soil_p"
                                            value={formData.soil_p}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('yield.soilK')}</Label>
                                        <Input
                                            type="number"
                                            name="soil_k"
                                            value={formData.soil_k}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? t('yield.analyzing') : t('yield.predictBtn')}
                                </Button>
                            </form>
                        </Card>

                        {/* Results Display */}
                        <div className="space-y-6">
                            {result ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <Card className="p-6 border-green-500/20 bg-green-500/5">
                                        <h3 className="text-lg font-semibold mb-4 text-green-600 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" />
                                            {t('yield.resultsTitle')}
                                        </h3>

                                        <div className="text-center mb-6 p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-border/50">
                                            <p className="text-muted-foreground mb-1 uppercase text-xs font-bold tracking-wider">{t('yield.totalProduction')}</p>
                                            <div className="text-4xl md:text-5xl font-bold text-green-600">
                                                {result.totalProduction.toFixed(2)}
                                                <span className="text-xl text-muted-foreground ml-2">Tons</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                from {result.areaInAcres} Acres ({result.areaInHectares.toFixed(2)} Ha)
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="p-3 bg-blue-500/10 rounded-lg text-center border border-blue-500/20">
                                                <p className="text-xs text-blue-600 font-semibold uppercase mb-1">{t('yield.yieldEfficiency')}</p>
                                                <p className="text-xl font-bold text-foreground">{result.predicted_yield.toFixed(2)} t/ha</p>
                                                <p className="text-xs text-muted-foreground">{t('yield.perHectare')}</p>
                                            </div>
                                            <div className="p-3 bg-amber-500/10 rounded-lg text-center border border-amber-500/20">
                                                <p className="text-xs text-amber-600 font-semibold uppercase mb-1">{t('yield.potentialRevenue')}</p>
                                                <p className="text-xl font-bold text-foreground">₹{(result.revenue / 100000).toFixed(2)} Lakh</p>
                                                <p className="text-xs text-muted-foreground">{t('yield.approx')}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 bg-background/50 p-4 rounded-lg">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">{t('yield.confidence')}:</span>
                                                <span className="font-medium">
                                                    {result.confidence_interval.lower.toFixed(2)} - {result.confidence_interval.upper.toFixed(2)} t/ha
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">{t('yield.modelUsed')}:</span>
                                                <span className="font-medium">XGBoost (Optimized)</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">{t('yield.trainingData')}:</span>
                                                <span className="font-medium">1997 - 2019 (Meghalaya)</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-3 bg-blue-500/10 rounded border border-blue-500/20 text-sm text-blue-600 flex gap-2">
                                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                            <p>
                                                {t('yield.accuracyNote')}
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 border-2 border-dashed rounded-xl">
                                    <Sprout className="w-16 h-16 mb-4 opacity-20" />
                                    <p>{t('yield.readyDesc')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default YieldPrediction;
