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

const getTodayDayId = (): string => {
  const day = new Date().getDay();
  if (day === 6) return "day2"; // Saturday -> DAY 2 (8/1)
  if (day === 0) return "day3"; // Sunday -> DAY 3 (8/2)
  return "day1"; // Mon-Fri -> DAY 1 (7/31)
};

const getFormattedToday = (): string => {
  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = weekdays[date.getDay()];
  return `${mm}.${dd} (${dayName})`;
};

const getTodayDayLabel = (): string => {
  const dayId = getTodayDayId();
  if (dayId === "day1") return "1일차";
  if (dayId === "day2") return "2일차";
  if (dayId === "day3") return "3일차";
  return "";
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"live" | "timetable">("live");
  const [activeDayId, setActiveDayId] = useState<string>(getTodayDayId);

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

  const [logoError, setLogoError] = useState(false);

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
  const todayDayId = getTodayDayId();

  // Background check for 15-minute alerts
  useEffect(() => {
    // Collect all favorited artists starting on the active day
    favorites.forEach((fav) => {
      if (!fav.alertEnabled) return;

      const artist = ARTISTS.find((a) => a.id === fav.artistId);
      if (!artist || artist.dayId !== todayDayId) return;

      const startMins = timeToMinutes(artist.startTime);
      const currentMins = timeToMinutes(activeTime);
      const diff = startMins - currentMins;

      // When exactly 15 minutes left, trigger the alert
      if (diff === 15) {
        triggerNotification(artist.name, 15);
      }
    });
  }, [activeTime, todayDayId, favorites]);

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
    <div className="min-h-screen bg-slate-950 sm:bg-gradient-to-tr sm:from-[#5c27bf] sm:via-[#3b82f6] sm:to-[#ec4899] flex items-center justify-center p-0 sm:py-6 md:py-8 select-none">
      
      {/* PHONE WRAPPER FRAME */}
      <div className="w-full max-w-[450px] h-screen sm:h-[840px] bg-[#f3f5fa] sm:rounded-[36px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] sm:border-[8px] sm:border-slate-900 relative flex flex-col overflow-hidden text-slate-800 font-sans selection:bg-[#ec4899] selection:text-white">
        
        {/* PHONE STATUS BAR */}
        <div className="hidden sm:flex justify-between items-center px-6 pt-2 pb-1 bg-white text-[10px] font-black text-slate-500 select-none z-50 shrink-0">
          <span className="font-mono">{activeTime}</span>
          <span className="text-[9px] tracking-tight text-slate-400">PENTAPORT 5G</span>
          <div className="flex items-center gap-1">
            <span>📶</span>
            <span>🔋 98%</span>
          </div>
        </div>

        {/* INNER SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col pb-6">
          {/* Gradient background decoration is handled globally by phone wrapper */}

          {/* IN-APP TOAST NOTIFICATION BANNER */}
          <AnimatePresence>
            {toastAlert && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-4 left-4 right-4 z-50 bg-white border-2 border-[#e61a55] shadow-xl p-4 rounded-2xl"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#e61a55]/10 text-[#e61a55] rounded-xl border border-[#e61a55]/20 animate-bounce shrink-0">
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
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors shrink-0"
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

          {/* HEADER BAR (Vibrant Festival Poster Gradient Style) */}
          <header className="sticky top-0 z-40 bg-gradient-to-r from-[#6e2ef3] via-[#a824e8] to-[#f41e9c] border-b border-white/10 shadow-md shrink-0 text-white">
            <div className="px-4 py-3.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* 
                  [로고 파일(penta.png) 교체 안내]
                  penta.png 파일을 프로젝트의 'public' 폴더 바로 아래에 업로드해주시면 (경로: /public/penta.png),
                  아래 img 태그가 활성화되어 빨간색 ★ 박스 대신 업로드하신 로고 이미지가 나옵니다.
                */}
                <div className="h-8 flex items-center justify-center shrink-0">
                  {!logoError ? (
                    <img
                      src="/penta.png"
                      alt="Penta Logo"
                      className="h-8 w-auto object-contain max-w-[120px] filter drop-shadow-sm brightness-110"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-sm">
                      <span>★</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex flex-col">
                    <h1 className="text-xs font-black tracking-tighter text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] leading-tight">
                      2026 PENTAPORT
                    </h1>
                    <span className="text-[7.5px] font-black text-pink-100 tracking-tighter uppercase leading-none opacity-90">
                      With KB Kookmin Card
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-[9.5px] font-extrabold text-[#a824e8] bg-white shadow-sm px-2 py-0.5 rounded-md mb-1.5 leading-none select-none tracking-tight">
                  {getTodayDayLabel()}
                </span>
                <span className="text-[11px] font-black text-white font-mono leading-none tracking-tight">
                  {getFormattedToday()}
                </span>
              </div>
            </div>
          </header>

          {/* NEW HEADER TAB NAVIGATION */}
          <div className="px-4 pt-3 shrink-0">
            <div className="bg-white/80 backdrop-blur-md rounded-xl border border-slate-200/80 p-1 shadow-sm flex items-center justify-center gap-1">
              <button
                onClick={() => setActiveTab("live")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all text-xs font-black tracking-tight ${
                  activeTab === "live"
                    ? "bg-gradient-to-r from-[#e82482] to-[#f41e9c] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Radio className={`h-3.5 w-3.5 ${activeTab === "live" ? "animate-pulse" : ""}`} />
                <span>실시간 무대 현황</span>
              </button>

              <button
                onClick={() => setActiveTab("timetable")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all text-xs font-black tracking-tight ${
                  activeTab === "timetable"
                    ? "bg-gradient-to-r from-[#6e2ef3] to-[#8b5cf6] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>타임테이블</span>
              </button>
            </div>
          </div>

          {/* MAIN CONTAINER */}
          <main className="px-4 py-4 space-y-4 flex-1">
            <section className="min-h-[300px]">
              {activeTab === "live" && (
                <NowPlaying
                  artists={ARTISTS}
                  stages={STAGES}
                  dayId={todayDayId}
                  currentTime={activeTime}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}

              {activeTab === "timetable" && (
                <FullTimeline
                  artists={ARTISTS}
                  stages={STAGES}
                  dayId={activeDayId}
                  onChangeDay={setActiveDayId}
                  currentTime={activeTime}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
