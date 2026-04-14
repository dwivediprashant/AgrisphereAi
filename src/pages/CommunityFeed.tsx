import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  MessageCircle,
  MessageSquare,
  MapPin,
  Send,
  Star,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "@/store/authStore";

type FarmerCard = {
  id: string;
  firebaseUid?: string;
  username: string;
  name: string;
  address: string;
  photoUrl?: string;
};

type ChatMessage = {
  id: string;
  senderId: string;
  sender: string;
  senderName?: string;
  senderUsername?: string;
  recipientId?: string;
  recipient?: string;
  recipientName?: string;
  recipientUsername?: string;
  text: string;
  timestamp: string;
  read?: boolean;
};

const API_URL = "http://localhost:5000";

const buildDemoRating = (index: number) => {
  const base = 4.1 + (index % 5) * 0.1;
  return Math.min(base, 4.9).toFixed(1);
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "F")
    .join("");

const CommunityFeed = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [farmers, setFarmers] = useState<FarmerCard[]>([]);
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerCard | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState("");
  const [sendError, setSendError] = useState("");
  const [activeTab, setActiveTab] = useState("feed");

  const currentUserId =
    localStorage.getItem("agrisphere_username")?.trim() ||
    user?.name?.trim() ||
    user?.id ||
    "";
  const currentUserName =
    user?.name?.trim() ||
    localStorage.getItem("agrisphere_username")?.trim() ||
    "Me";
  const currentUserUsername =
    localStorage.getItem("agrisphere_username")?.trim() || currentUserName;

  useEffect(() => {
    let isMounted = true;

    const fetchFarmers = async (showLoading = false) => {
      try {
        if (showLoading) {
          setLoading(true);
        }

        const response = await axios.get(`${API_URL}/community/farmers`);
        const normalizedFarmers: FarmerCard[] = (response.data || []).map(
          (farmer: FarmerCard, index: number) => ({
            id:
              farmer.id || farmer.firebaseUid || farmer.username || `${index}`,
            firebaseUid: farmer.firebaseUid || farmer.id,
            username: farmer.username || farmer.name,
            name: farmer.name || farmer.username || "Farmer",
            address: farmer.address || "Address not available",
            photoUrl: farmer.photoUrl,
          }),
        );

        const filteredFarmers = normalizedFarmers.filter((farmer) => {
          const isCurrentUser =
            (currentUserId && farmer.id === currentUserId) ||
            (currentUserId && farmer.firebaseUid === currentUserId) ||
            farmer.username.trim().toLowerCase() ===
              currentUserUsername.toLowerCase() ||
            farmer.name.trim().toLowerCase() === currentUserName.toLowerCase();

          return !isCurrentUser;
        });

        if (isMounted) {
          setFarmers(filteredFarmers);
        }
      } catch (error) {
        console.error("Error loading farmers", error);
        if (isMounted) {
          setFarmers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFarmers(true);
    const interval = setInterval(() => fetchFarmers(false), 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!selectedFarmer) {
      setMessages([]);
      setChatError("");
      setSendError("");
      setChatLoading(false);
      return;
    }

    let isFirstFetch = true;

    const fetchMessages = async () => {
      try {
        if (isFirstFetch) {
          setChatLoading(true);
        }
        setChatError("");
        const response = await axios.get(`${API_URL}/community/chat`, {
          params: {
            user1: currentUserId || currentUserName,
            user2: selectedFarmer.id,
          },
        });

        const sortedMessages = [...(response.data || [])].sort(
          (a: ChatMessage, b: ChatMessage) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        );

        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error loading chat messages", error);
        setChatError("Unable to load chat history right now.");
        if (isFirstFetch) {
          setMessages([]);
        }
      } finally {
        if (isFirstFetch) {
          setChatLoading(false);
          isFirstFetch = false;
        }
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);

    return () => clearInterval(interval);
  }, [currentUserId, currentUserName, currentUserUsername, selectedFarmer]);

  const handleMessageClick = (farmer: FarmerCard) => {
    setSelectedFarmer(farmer);
    setActiveTab("whatsapp");
    toast({
      title: t("community.messageToastTitle"),
      description: t("community.messageToastDesc", { name: farmer.name }),
    });
  };

  const handleSelectFarmer = (farmer: FarmerCard) => {
    setSelectedFarmer(farmer);
    setMessageText("");
    setSendError("");
  };

  const handleSendMessage = async () => {
    if (!selectedFarmer || !messageText.trim()) return;

    try {
      setSending(true);
      setSendError("");
      await axios.post(`${API_URL}/community/chat`, {
        senderId: currentUserId || currentUserName,
        senderName: currentUserName,
        senderUsername: currentUserUsername,
        recipientId: selectedFarmer.id,
        recipientName: selectedFarmer.name,
        recipientUsername: selectedFarmer.username,
        text: messageText.trim(),
      });

      setMessageText("");

      const response = await axios.get(`${API_URL}/community/chat`, {
        params: {
          user1: currentUserId || currentUserName,
          user2: selectedFarmer.id,
        },
      });

      setMessages(
        [...(response.data || [])].sort(
          (a: ChatMessage, b: ChatMessage) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        ),
      );
      setSendError("");
    } catch (error) {
      console.error("Error sending message", error);
      setSendError(t("community.sendError"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-lime-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/30 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-[-6rem] h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute top-28 right-[-5rem] h-80 w-80 rounded-full bg-lime-300/20 blur-3xl dark:bg-lime-500/10" />
        <div className="absolute bottom-[-6rem] left-1/3 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl dark:bg-cyan-500/10" />
      </div>
      <Navbar />

      <main className="relative container mx-auto px-4 py-8 pt-24">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-lime-600">
            {t("community.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 text-base md:text-lg dark:text-slate-400">
            {t("community.subtitle")}
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-xl grid-cols-2 border border-emerald-100 bg-white/90 p-1 shadow-sm shadow-emerald-100/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20">
            <TabsTrigger
              value="feed"
              className="text-slate-600 dark:text-slate-300 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              {t("community.tabs.feed")}
            </TabsTrigger>
            <TabsTrigger
              value="whatsapp"
              className="text-slate-600 dark:text-slate-300 data-[state=active]:bg-lime-200 data-[state=active]:text-lime-950 dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white"
            >
              {t("community.whatsappTab")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {t("community.feedTitle")}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("community.feedSubtitle")}
                </p>
              </div>
              <Badge className="border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Users className="mr-2 h-3.5 w-3.5" />
                {t("community.farmersCount", { count: farmers.length })}
              </Badge>
            </div>

            {loading ? (
              <Card className="border-emerald-100 bg-white shadow-lg shadow-emerald-100/60 dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-black/20">
                <CardContent className="py-12 text-center text-slate-500 dark:text-slate-400">
                  {t("community.loadingFarmers")}
                </CardContent>
              </Card>
            ) : farmers.length === 0 ? (
              <Card className="border-emerald-100 bg-white shadow-lg shadow-emerald-100/60 dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-black/20">
                <CardContent className="py-12 text-center text-slate-500 dark:text-slate-400">
                  {t("community.noFarmers")}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {farmers.map((farmer, index) => {
                  const rating = buildDemoRating(index);

                  return (
                    <Card
                      key={farmer.id}
                      className="overflow-hidden border-emerald-100 bg-white/95 shadow-lg shadow-emerald-100/70 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20 dark:hover:border-emerald-500/40"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-14 w-14 border border-emerald-100 bg-emerald-50 dark:border-slate-700 dark:bg-slate-800">
                            <AvatarImage
                              src={
                                farmer.photoUrl ||
                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(farmer.username)}`
                              }
                              alt={farmer.name}
                            />
                            <AvatarFallback className="bg-emerald-600 text-white dark:bg-emerald-500">
                              {getInitials(farmer.name)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 flex-1">
                            <CardTitle className="truncate text-lg text-slate-900 dark:text-white">
                              {farmer.name}
                            </CardTitle>
                            <CardDescription className="truncate text-slate-500 dark:text-slate-400">
                              @{farmer.username}
                            </CardDescription>
                            <div className="mt-3 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-300">
                              <Star className="h-4 w-4 fill-current text-amber-500" />
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {rating}
                              </span>
                              <span className="text-slate-500 dark:text-slate-400">
                                {t("community.demoRating")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span>{farmer.address}</span>
                        </div>

                        <Button
                          size="sm"
                          className="h-8 w-full rounded-md border border-emerald-200 bg-emerald-600 px-3 text-xs font-medium text-white shadow-none transition-colors hover:bg-emerald-700 hover:shadow-none dark:border-emerald-500/30 dark:bg-emerald-600"
                          onClick={() => handleMessageClick(farmer)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {t("community.messageButton")}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_360px]">
              <Card className="overflow-hidden border-emerald-100 bg-white/95 shadow-lg shadow-emerald-100/70 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20">
                <CardHeader className="border-b border-emerald-100/80 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      {selectedFarmer && (
                        <Avatar className="h-12 w-12 border border-emerald-100 bg-emerald-50 dark:border-slate-700 dark:bg-slate-800">
                          <AvatarImage
                            src={
                              selectedFarmer.photoUrl ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(selectedFarmer.username)}`
                            }
                            alt={selectedFarmer.name}
                          />
                          <AvatarFallback className="bg-emerald-600 text-white dark:bg-emerald-500">
                            {getInitials(selectedFarmer.name)}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className="min-w-0">
                        <CardTitle className="truncate text-slate-900 dark:text-white">
                          {selectedFarmer
                            ? selectedFarmer.name
                            : t("community.chatTitle")}
                        </CardTitle>
                        <CardDescription className="truncate text-slate-600 dark:text-slate-400">
                          {selectedFarmer
                            ? selectedFarmer.address
                            : t("community.chatSubtitle")}
                        </CardDescription>
                      </div>
                    </div>
                    {selectedFarmer && (
                      <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                        {t("community.activeChatBadge")}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex h-[580px] flex-col">
                    <ScrollArea className="flex-1 px-5 py-5">
                      {!selectedFarmer ? (
                        <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/70 text-center dark:border-slate-700 dark:bg-slate-950/60">
                          <div className="max-w-sm px-6 py-10">
                            <MessageCircle className="mx-auto h-10 w-10 text-emerald-500" />
                            <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                              {t("community.selectFarmerChat")}
                            </p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                              {t("community.chatHint")}
                            </p>
                          </div>
                        </div>
                      ) : chatLoading ? (
                        <div className="flex h-full min-h-[420px] items-center justify-center text-slate-500 dark:text-slate-400">
                          {t("community.loadingChatHistory")}
                        </div>
                      ) : chatError ? (
                        <div className="flex h-full min-h-[420px] items-center justify-center text-center text-sm text-red-500 dark:text-red-400">
                          {chatError}
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="flex h-full min-h-[420px] items-center justify-center text-center text-slate-500 dark:text-slate-400">
                          {t("community.noMessagesYet")}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {messages.map((message) => {
                            const isOwnMessage =
                              message.senderId === currentUserId ||
                              message.senderUsername === currentUserUsername ||
                              message.sender === currentUserName;

                            return (
                              <div
                                key={message.id}
                                className={`flex items-end gap-3 ${isOwnMessage ? "justify-end" : "justify-start"}`}
                              >
                                {!isOwnMessage && (
                                  <Avatar className="h-8 w-8 border border-emerald-100 dark:border-slate-700">
                                    <AvatarFallback className="bg-emerald-600 text-white text-xs">
                                      {getInitials(selectedFarmer.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}

                                <div
                                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                                    isOwnMessage
                                      ? "rounded-br-md bg-emerald-600 text-white shadow-emerald-200 dark:shadow-none"
                                      : "rounded-bl-md border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                                  }`}
                                >
                                  <p className="whitespace-pre-wrap break-words leading-relaxed">
                                    {message.text}
                                  </p>
                                  <div
                                    className={`mt-1 text-[11px] ${
                                      isOwnMessage
                                        ? "text-emerald-50/80"
                                        : "text-slate-400 dark:text-slate-500"
                                    }`}
                                  >
                                    {new Date(
                                      message.timestamp,
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </ScrollArea>

                    <div className="border-t border-emerald-100 p-4 dark:border-slate-800">
                      <div className="space-y-2">
                        {sendError && (
                          <div className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                            <span>{sendError}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-red-700 hover:bg-red-100 hover:text-red-800 dark:text-red-300 dark:hover:bg-red-500/20 dark:hover:text-red-200"
                              onClick={handleSendMessage}
                              disabled={
                                !selectedFarmer ||
                                sending ||
                                !messageText.trim()
                              }
                            >
                              {t("community.retry")}
                            </Button>
                          </div>
                        )}

                        <div className="flex items-end gap-3">
                          <Input
                            disabled={!selectedFarmer || sending}
                            value={messageText}
                            onChange={(e) => {
                              setMessageText(e.target.value);
                              if (sendError) setSendError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            placeholder={
                              selectedFarmer
                                ? t("community.messagePlaceholder", {
                                    name: selectedFarmer.name,
                                  })
                                : t("community.selectFarmerChat")
                            }
                            className="h-11 border-emerald-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-500/40 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                          />
                          <Button
                            size="icon"
                            disabled={
                              !selectedFarmer || sending || !messageText.trim()
                            }
                            onClick={handleSendMessage}
                            className="h-11 w-11 shrink-0 bg-emerald-600 text-white shadow-none hover:bg-emerald-700 disabled:opacity-60 dark:shadow-none"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-100 bg-white/95 shadow-lg shadow-emerald-100/70 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20">
                <CardHeader className="border-b border-emerald-100/80 dark:border-slate-800">
                  <CardTitle className="text-slate-900 dark:text-white">
                    {t("community.farmersPanelTitle")}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    {t("community.farmersPanelSubtitle")}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-3">
                  <ScrollArea className="h-[630px] pr-2">
                    <div className="space-y-2">
                      {farmers.map((farmer, index) => {
                        const isSelected = selectedFarmer?.id === farmer.id;

                        return (
                          <button
                            type="button"
                            key={farmer.id}
                            onClick={() => handleSelectFarmer(farmer)}
                            className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors ${
                              isSelected
                                ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                                : "border-slate-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/60 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                            }`}
                          >
                            <Avatar className="h-11 w-11 shrink-0 border border-emerald-100 dark:border-slate-700">
                              <AvatarImage
                                src={
                                  farmer.photoUrl ||
                                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(farmer.username)}`
                                }
                                alt={farmer.name}
                              />
                              <AvatarFallback className="bg-emerald-600 text-white">
                                {getInitials(farmer.name)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="truncate font-medium text-slate-900 dark:text-white">
                                  {farmer.name}
                                </p>
                                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                  #{index + 1}
                                </span>
                              </div>
                              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                {farmer.address}
                              </p>
                            </div>

                            {isSelected && (
                              <Badge className="border border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                                Chatting
                              </Badge>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CommunityFeed;
