import React, { useEffect, useState } from "react";
import { Artist, Stage, Favorite } from "../types";
import { Bell, BellOff, Heart, Clock, AlertCircle, Info, Volume2 } from "lucide-react";
import { timeToMinutes } from "../utils/timeHelper";

interface MyTimelineProps {
  artists: Artist[];
  stages: Stage[];
  favorites: Favorite[];
  currentTime: string;
  onToggleFavorite: (artistId: string) => void;
  onToggleAlert: (artistId: string) => void;
  onTriggerTestNotification: (artistName: string, minutesLeft: number) => void;
}

export const MyTimeline: React.FC<MyTimelineProps> = ({
  artists,
  stages,
  favorites,
  currentTime,
  onToggleFavorite,
  onToggleAlert,
  onTriggerTestNotification,
}) => {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("이 브라우저는 웹 알림(Web Notification)을 지원하지 않습니다.");
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  // Get favorited artists info
  const favoritedArtists = favorites
    .map((f) => {
      const artist = artists.find((a) => a.id === f.artistId);
      return artist ? { ...artist, alertEnabled: f.alertEnabled } : null;
    })
    .filter((item): item is Artist & { alertEnabled: boolean } => item !== null)
    // Sort chronologically by day and then start time
    .sort((a, b) => {
      if (a.dayId !== b.dayId) {
        return a.dayId.localeCompare(b.dayId);
      }
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });

  const getStageName = (stageId: string) => {
    return stages.find((s) => s.id === stageId)?.name || stageId;
  };

  return (
    <div className="space-y-6">
      {/* Notification Status and Action Card */}
      <div className="bg-gradient-to-r from-white to-[#edf1f9] rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-[#e61a55]" />
              스마트 공연 시작 알림 (15분 전)
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              찜한 아티스트의 공연 시작 15분 전에 브라우저 Web Notification API 및 진동을 활용하여 리마인더를 발송합니다.
            </p>
          </div>
          <span className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase ${
            notificationPermission === "granted"
              ? "bg-emerald-50 text-[#1e7a2b] border-[#39b54a]/30"
              : notificationPermission === "denied"
              ? "bg-rose-50 text-[#c11041] border-[#e61a55]/30"
              : "bg-amber-50 text-[#a06200] border-[#f5a623]/30"
          }`}>
            {notificationPermission === "granted" ? "알림 허용됨" : notificationPermission === "denied" ? "알림 거부됨" : "권한 확인 필요"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {notificationPermission !== "granted" && (
            <button
              onClick={requestNotificationPermission}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Bell className="h-3.5 w-3.5" />
              브라우저 알림 권한 허용하기
            </button>
          )}
          <button
            onClick={() => onTriggerTestNotification("라스트 익스플로전 (Test)", 15)}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1.5"
          >
            <Volume2 className="h-3.5 w-3.5 text-slate-500" />
            15분 전 알림 즉시 시뮬레이션
          </button>
        </div>

        {/* Info Box about Sandbox Iframe Limitation */}
        <div className="flex gap-2 p-3 bg-white/60 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed font-medium">
          <Info className="h-4 w-4 text-[#e61a55] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-slate-800">샌드박스 보안(Iframe) 제한 안내</p>
            <p>
              현재 AI Studio 미리보기(Iframe) 환경은 브라우저 보안 규정에 의해 시스템 알림 창이 비활성화될 수 있습니다.
              사용자 경험을 완벽히 제공하기 위해, <strong>앱 상단 우측에 화려한 '인앱(In-app) 알림 토스트' 팝업을 추가로 구현</strong>해 두었습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Favorites List */}
      <div>
        <h3 className="text-xs font-black text-slate-500 mb-3 tracking-wider uppercase">
          나만의 스케줄 리스트 ({favoritedArtists.length}개)
        </h3>

        {favoritedArtists.length > 0 ? (
          <div className="space-y-3">
            {favoritedArtists.map((artist) => {
              const getDayLabel = (dayId: string) => {
                if (dayId === "day1") return "DAY 1";
                if (dayId === "day2") return "DAY 2";
                if (dayId === "day3") return "DAY 3";
                return dayId.toUpperCase();
              };

              return (
                <div
                  key={artist.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-sm transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Date/Time badge */}
                    <div className="flex flex-col items-center justify-center bg-slate-900 text-white px-3 py-2 rounded-xl font-mono text-center min-w-[70px] shadow-sm">
                      <span className="text-[9px] font-black tracking-tight text-[#f5a623]">{getDayLabel(artist.dayId)}</span>
                      <span className="text-xs font-bold mt-0.5">{artist.startTime}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-slate-900 tracking-tight">{artist.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <span className="text-indigo-600 font-bold">{getStageName(artist.stageId).split(" ")[0]} 스테이지</span>
                        <span className="text-slate-300">•</span>
                        <span>{artist.genre}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions: Toggle Alarm / Remove Fav */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <button
                      onClick={() => onToggleAlert(artist.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        artist.alertEnabled
                          ? "bg-emerald-50 border-emerald-200 text-[#1e7a2b] shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-500"
                      }`}
                      title={artist.alertEnabled ? "알림 끄기" : "시작 15분 전 알림 켜기"}
                    >
                      {artist.alertEnabled ? (
                        <>
                          <Bell className="h-3.5 w-3.5" />
                          <span>알림 ON</span>
                        </>
                      ) : (
                        <>
                          <BellOff className="h-3.5 w-3.5" />
                          <span>알림 OFF</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onToggleFavorite(artist.id)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-[#e61a55] transition-colors"
                      title="찜 목록에서 제거"
                    >
                      <Heart className="h-4.5 w-4.5 fill-[#e61a55] text-[#e61a55]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
            <AlertCircle className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500 font-bold">나만의 타임테이블이 비어 있습니다.</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              타임테이블 탭에서 아티스트 옆의 <Heart className="h-3 w-3 inline text-[#e61a55] fill-[#e61a55]" /> 단추를 눌러 스케줄에 보관해 보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
