
import { Bell, Check, Trash2, X, CloudRain, TrendingUp, AlertTriangle, MessageCircle, Info, Droplets, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationStore, NotificationType } from "@/store/notificationStore";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getIcon = (type: NotificationType) => {
    switch (type) {
        case 'weather': return <CloudRain className="h-4 w-4 text-blue-500" />;
        case 'market': return <TrendingUp className="h-4 w-4 text-green-500" />;
        case 'disease': return <AlertTriangle className="h-4 w-4 text-red-500" />;
        case 'community': return <MessageCircle className="h-4 w-4 text-purple-500" />;
        case 'irrigation': return <Droplets className="h-4 w-4 text-cyan-500" />;
        case 'schemes': return <Landmark className="h-4 w-4 text-orange-500" />;
        default: return <Info className="h-4 w-4 text-slate-500" />;
    }
};

const NotificationCenter = () => {
    const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, addNotification } = useNotificationStore();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleNotificationClick = (id: string, actionUrl?: string) => {
        console.log("Notification Clicked:", id, "ActionURL:", actionUrl);
        markAsRead(id);
        if (actionUrl) {
            console.log("Navigating to:", actionUrl);
            setOpen(false); // Close popover
            navigate(actionUrl);
        } else {
            console.log("No ActionURL found.");
        }
    };

    // Poll for System Alerts
    useEffect(() => {
        const fetchSystemAlerts = async () => {
            try {
                // Get username from local storage or auth store (simplified closest access)
                const username = localStorage.getItem("agrisphere_username");
                if (!username) return;

                const res = await import("axios").then(a => a.default.get(`http://localhost:5000/community/notifications?username=${username}`));

                if (res.data.system_alerts) {
                    res.data.system_alerts.forEach((alert: any) => {
                        addNotification({
                            id: alert.id,
                            type: alert.type,
                            title: alert.title,
                            message: alert.message,
                            actionUrl: alert.actionUrl
                        });
                    });
                }
            } catch (error) {
                console.error("Failed to fetch system alerts", error);
            }
        };

        // Initial fetch
        fetchSystemAlerts();

        // Poll every 60s
        const interval = setInterval(fetchSystemAlerts, 60000);
        return () => clearInterval(interval);
    }, []);

    // Demo Trigger (Remove in prod)
    const sendDemo = () => {
        const types: NotificationType[] = ['weather', 'market', 'disease', 'community', 'irrigation', 'schemes'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        addNotification({
            type: randomType,
            title: "New Alert",
            message: "This is a test notification to check the sound and UI."
        });
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-slate-800 rounded-full w-10 h-10">
                    <Bell className={cn("h-5 w-5 text-slate-200 transition-all", unreadCount > 0 && "animate-swing")} />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-slate-950 animate-in zoom-in">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 md:w-96 p-0 bg-slate-950 border-slate-800 shadow-2xl" align="end">
                <div className="flex items-center justify-between p-4 border-b border-slate-800">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                        Notifications <Badge variant="secondary" className="text-xs">{unreadCount} New</Badge>
                    </h4>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-green-400" onClick={markAllAsRead} title="Mark all read">
                            <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-400" onClick={clearAll} title="Clear all">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <ScrollArea className="h-[400px]">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
                            <Bell className="h-12 w-12 text-slate-800" />
                            <p className="text-slate-500 text-sm">No new notifications.</p>
                            <Button variant="outline" size="sm" onClick={sendDemo} className="text-xs">
                                Test Notification
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col divide-y divide-slate-800">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "p-4 flex gap-4 transition-colors hover:bg-slate-900 cursor-pointer",
                                        !notification.read ? "bg-slate-900/50" : ""
                                    )}
                                    onClick={() => handleNotificationClick(notification.id, notification.actionUrl)}
                                >
                                    <div className={cn(
                                        "mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-slate-900 border border-slate-800",
                                        !notification.read && "border-primary/50"
                                    )}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-start">
                                            <p className={cn("text-sm font-medium text-slate-200", !notification.read && "text-white font-bold")}>
                                                {notification.title}
                                            </p>
                                            <span className="text-[10px] text-slate-500 whitespace-nowrap ml-2">
                                                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 line-clamp-2">
                                            {notification.message}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationCenter;
