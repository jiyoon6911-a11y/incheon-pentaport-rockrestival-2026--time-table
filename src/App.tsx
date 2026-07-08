import React, { useState, useEffect } from "react";
import { FESTIVAL_DAYS, STAGES, ARTISTS } from "./data/timetable";
import { Favorite, TimeState } from "./types";
import { NowPlaying } from "./components/NowPlaying";
import { FullTimeline } from "./components/FullTimeline";
import { timeToMinutes, minutesToTime } from "./utils/timeHelper";
import {
  Flame,
  Calendar,
  Radio,
  Clock,
  Heart,
  Bell,
  X,
  Play,
  RotateCcw,
  Sliders,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"live" | "timetable">("live");
  const [activeDayId, setActiveDayId] = useState<string>("day1");

  // Favorites State with LocalStorage
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const saved = localStorage.getItem("rockfest_favorites");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing favorites", e);
      }
    }
    return [];
  });

  const [realTime, setRealTime] = useState<string>(() => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  });

  // Custom In-App Toast State
  const [toastAlert, setToastAlert] = useState<{
    visible: boolean;
    artistName: string;
    startTime: string;
    minutesLeft: number;
  } | null>(null);

  // Synchronize favorites with LocalStorage
  useEffect(() => {
    localStorage.setItem("rockfest_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Real-time tick to update device time & handle simulated notification logic
  useEffect(() => {
    const updateRealTime = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      setRealTime(`${hh}:${mm}`);
    };

    updateRealTime();
    const interval = setInterval(updateRealTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeTime = realTime;
  const activeDayForCalculation = activeDayId;

  // Background check for 15-minute alerts
  useEffect(() => {
    // Collect all favorited artists starting on the active day
    favorites.forEach((fav) => {
      if (!fav.alertEnabled) return;

      const artist = ARTISTS.find((a) => a.id === fav.artistId);
      if (!artist || artist.dayId !== activeDayForCalculation) return;

      const startMins = timeToMinutes(artist.startTime);
      const currentMins = timeToMinutes(activeTime);
      const diff = startMins - currentMins;

      // When exactly 15 minutes left, trigger the alert
      if (diff === 15) {
        triggerNotification(artist.name, 15);
      }
    });
  }, [activeTime, activeDayForCalculation, favorites]);

  // Function to trigger system Web Notification + Custom In-app Toast
  const triggerNotification = (artistName: string, minutesLeft: number) => {
    // 1. System Notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("🎸 공연 시작 임박!", {
        body: `잠시 후 ${minutesLeft}분 뒤에 '${artistName}' 공연이 시작됩니다! 서둘러 스테이지로 이동해 주세요.`,
        silent: false,
      });
    }

    // 2. Play beautiful in-app alert toast
    setToastAlert({
      visible: true,
      artistName,
      startTime: minutesToTime(timeToMinutes(activeTime) + minutesLeft),
      minutesLeft,
    });

    // Auto-dismiss toast after 8 seconds
    setTimeout(() => {
      setToastAlert(null);
    }, 8000);
  };

  // Toggle favorite status
  const handleToggleFavorite = (artistId: string) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.artistId === artistId);
      if (exists) {
        return prev.filter((f) => f.artistId !== artistId);
      } else {
        return [...prev, { artistId, alertEnabled: true }];
      }
    });
  };

  // Toggle alert preference inside favorite
  const handleToggleAlert = (artistId: string) => {
    setFavorites((prev) =>
      prev.map((f) =>
        f.artistId === artistId ? { ...f, alertEnabled: !f.alertEnabled } : f
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f5fa] text-slate-800 font-sans selection:bg-[#e61a55] selection:text-white pb-12 relative overflow-x-hidden">
      {/* PLAYFUL BACKGROUND DECORATION TO MATCH THE POSTER */}
      <div className="absolute top-0 left-0 right-0 h-[350px] bg-gradient-to-b from-[#e8ecf8] to-transparent pointer-events-none -z-10" />
      
      {/* TOP DECORATIVE STAGE COLOR BAR */}
      <div className="h-1.5 w-full grid grid-cols-3 sticky top-0 z-50">
        <div className="bg-[#f5a623]" title="KB KOOKMIN CARD STAGE" />
        <div className="bg-[#39b54a]" title="MONSTER ENERGY STAGE" />
        <div className="bg-[#e61a55]" title="STANLEY 1913 STAGE" />
      </div>

      {/* IN-APP TOAST NOTIFICATION BANNER */}
      <AnimatePresence>
        {toastAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-10 right-6 z-50 max-w-sm w-full bg-white border-2 border-[#e61a55] shadow-xl p-4 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#e61a55]/10 text-[#e61a55] rounded-xl border border-[#e61a55]/20 animate-bounce">
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-xs font-bold text-[#e61a55] uppercase tracking-widest">
                  공연 알람 작동!
                </h4>
                <p className="text-sm font-extrabold text-slate-900 leading-tight">
                  {toastAlert.artistName}
                </p>
                <p className="text-xs text-slate-600">
                  잠시 후 <strong className="text-rose-600">{toastAlert.minutesLeft}분 뒤</strong>에 공연이 시작됩니다! ({toastAlert.startTime} 예정)
                </p>
              </div>
              <button
                onClick={() => setToastAlert(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-end">
              <span className="text-[10px] text-slate-400 font-mono">가장 가까운 무대로 이동해주세요</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BAR */}
      <header className="sticky top-1.5 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#e61a55] flex items-center justify-center shadow-md shadow-rose-500/20 text-white font-extrabold text-lg">
              ★
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black tracking-tighter text-slate-900 uppercase">
                  INCHEON PENTAPORT
                </h1>
                <span className="text-[9px] bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded-md font-bold font-mono">
                  2026
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-wide text-indigo-600">
                with KB국민카드 • Live Companion
              </span>
            </div>
          </div>

          {/* DAY SWITCHER HEAD TABS */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-inner">
            {FESTIVAL_DAYS.map((day) => {
              const isSelected = activeDayId === day.id;
              return (
                <button
                  key={day.id}
                  onClick={() => {
                    setActiveDayId(day.id);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black tracking-tight transition-all ${
                    isSelected
                      ? "bg-white text-slate-900 border border-slate-200/50 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#e61a55] mr-1.5" />
                  {day.name}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* NEW HEADER TAB NAVIGATION */}
      <div className="max-w-5xl mx-auto px-4 pt-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/85 p-1.5 shadow-sm flex flex-wrap items-center justify-center gap-1.5">
          <button
            onClick={() => setActiveTab("live")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-xs font-black tracking-tight ${
              activeTab === "live"
                ? "bg-[#e61a55] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Radio className={`h-4 w-4 ${activeTab === "live" ? "animate-pulse" : ""}`} />
            <span>실시간 현황</span>
          </button>

          <button
            onClick={() => setActiveTab("timetable")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-xs font-black tracking-tight ${
              activeTab === "timetable"
                ? "bg-[#39b54a] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>타임테이블</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* COMPONENT DESK VIEWS */}
        <section className="min-h-[400px]">
          {activeTab === "live" && (
            <NowPlaying
              artists={ARTISTS}
              stages={STAGES}
              dayId={activeDayForCalculation}
              currentTime={activeTime}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === "timetable" && (
            <FullTimeline
              artists={ARTISTS}
              stages={STAGES}
              dayId={activeDayForCalculation}
              currentTime={activeTime}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </section>
      </main>

    </div>
  );
}
