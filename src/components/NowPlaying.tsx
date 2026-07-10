import React from "react";
import { Artist, Stage, Favorite } from "../types";
import { getCurrentlyPlayingArtist, getUpcomingArtist, getPreviousArtist, timeToMinutes } from "../utils/timeHelper";
import { Clock, Play, Radio } from "lucide-react";
import { motion } from "motion/react";

interface NowPlayingProps {
  artists: Artist[];
  stages: Stage[];
  dayId: string;
  currentTime: string;
  favorites: Favorite[];
  onToggleFavorite: (artistId: string) => void;
}

// Helper to format/get the clean display name according to rules:
// Show ONLY Korean names for Korean teams (remove English/romanization).
// Keep Hanja, foreign, or originally English teams as is.
const getArtistDisplayName = (artistName: string) => {
  // Foreign / original English / Hanja teams to exclude (keep as is)
  const excludeList = [
    "LITTLE SIMZ",
    "ASIAN KUNG-FU GENERATION",
    "當代電影大師 (Modern Cinema Master)",
    "Tempalay (템플레이)"
  ];
  
  if (artistName === "TheyNeverChange") {
    return { mainName: "데이네버체인지" };
  }

  if (excludeList.includes(artistName)) {
    if (artistName === "當代電影大師 (Modern Cinema Master)") {
      return { mainName: "當代電影大師", subName: "Modern Cinema Master" };
    }
    if (artistName === "Tempalay (템플레이)") {
      return { mainName: "Tempalay" };
    }
    return { mainName: artistName };
  }

  if (artistName.includes(" (") && artistName.endsWith(")")) {
    const startIdx = artistName.indexOf(" (");
    const koreanPart = artistName.substring(startIdx + 2, artistName.length - 1);
    return { mainName: koreanPart };
  }

  return { mainName: artistName };
};

export const NowPlaying: React.FC<NowPlayingProps> = ({
  artists,
  stages,
  dayId,
  currentTime,
  favorites,
  onToggleFavorite,
}) => {
  const getStageColorClass = (stageId: string, hasActiveArtist: boolean) => {
    if (hasActiveArtist) {
      switch (stageId) {
        case "kb-starshop":
          return "border-[3px] border-[#fdb913] bg-white ring-4 ring-[#fdb913]/20 shadow-lg scale-[1.01] z-10";
        case "incheon":
          return "border-[3px] border-[#82d111] bg-white ring-4 ring-[#82d111]/20 shadow-lg scale-[1.01] z-10";
        case "incheon-airport":
          return "border-[3px] border-[#1d242b] bg-white ring-4 ring-[#1d242b]/20 shadow-lg scale-[1.01] z-10";
        default:
          return "border-slate-900 bg-white shadow-lg z-10";
      }
    } else {
      return "border-slate-200 bg-white/90 backdrop-blur-sm opacity-90 hover:opacity-100";
    }
  };

  const getStageBadgeColor = (stageId: string) => {
    switch (stageId) {
      case "kb-starshop":
        return "bg-[#fdb913] text-slate-950 font-black";
      case "incheon":
        return "bg-[#82d111] text-slate-950 font-black";
      case "incheon-airport":
        return "bg-[#1d242b] text-white font-black";
      default:
        return "bg-slate-200 text-slate-700 font-black";
    }
  };

  return (
    <div id="now-playing-dashboard" className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {stages.map((stage) => {
          const nowArtist = getCurrentlyPlayingArtist(artists, stage.id, dayId, currentTime);
          const nextArtist = getUpcomingArtist(artists, stage.id, dayId, currentTime);
          const prevArtist = getPreviousArtist(artists, stage.id, dayId, currentTime);
          const isFavNow = nowArtist ? favorites.some((f) => f.artistId === nowArtist.id) : false;
          const isFavNext = nextArtist ? favorites.some((f) => f.artistId === nextArtist.id) : false;

          // Calculate progress percentage
          let progress = 0;
          if (nowArtist) {
            const startMins = timeToMinutes(nowArtist.startTime);
            const endMins = timeToMinutes(nowArtist.endTime);
            const currentMins = timeToMinutes(currentTime);
            const total = endMins - startMins;
            const elapsed = currentMins - startMins;
            if (total > 0) {
              progress = Math.min(100, Math.max(0, (elapsed / total) * 100));
            }
          }

          return (
            <div
              key={stage.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md ${getStageColorClass(stage.id, !!nowArtist)}`}
            >
              {/* Top Row: Stage Header */}
              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <span className={`text-[10px] tracking-tight px-2.5 py-1 rounded uppercase font-black ${getStageBadgeColor(stage.id)}`}>
                    {stage.name}
                  </span>
                  {stage.id === "incheon" && (
                    <span className="text-[10px] sm:text-xs font-bold text-[#82d111] bg-[#82d111]/10 px-2 py-0.5 rounded-full border border-[#82d111]/20 animate-pulse">
                      ★ 10:30~19:30 드리머 부스 운영!
                    </span>
                  )}
                </div>

                {/* Main Content: NOW PLAYING */}
                <div className="mb-6 space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Now Playing
                  </span>

                  {nowArtist ? (
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        {(() => {
                          const { mainName, subName } = getArtistDisplayName(nowArtist.name);
                          return (
                            <div>
                              <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug flex items-baseline flex-wrap gap-1">
                                <span>{mainName}</span>
                                {subName && (
                                  <span className="text-xs font-bold text-slate-500 font-sans">
                                    ({subName})
                                  </span>
                                )}
                              </h3>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Time and Description */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 font-mono bg-slate-50 p-1.5 rounded border border-slate-200/60">
                        <Play className={`h-3.5 w-3.5 ${
                          stage.id === "kb-starshop"
                            ? "text-[#fdb913] fill-[#fdb913]/10"
                            : stage.id === "incheon"
                            ? "text-[#82d111] fill-[#82d111]/10"
                            : "text-[#1d242b] fill-[#1d242b]/10"
                        }`} />
                        <span>{nowArtist.startTime} - {nowArtist.endTime}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${
                            stage.id === "kb-starshop"
                              ? "bg-[#fdb913]"
                              : stage.id === "incheon"
                              ? "bg-[#82d111]"
                              : "bg-[#1d242b]"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 border border-dashed border-slate-200 rounded-xl text-center bg-slate-50/50">
                      <p className="text-xs text-slate-500 font-bold">현재 진행 중인 공연이 없습니다</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">타임테이블을 확인해 보세요</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Section: PREV & NEXT Split */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="grid grid-cols-2 gap-4 divide-x divide-slate-100">
                  {/* Left Column: PREV */}
                  <div className="pr-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      이전 (Prev)
                    </span>
                    {prevArtist ? (
                      <div className="space-y-0.5">
                        {(() => {
                          const { mainName, subName } = getArtistDisplayName(prevArtist.name);
                          return (
                            <h4 className="text-xs sm:text-sm font-extrabold text-slate-600 line-clamp-1 flex items-baseline flex-wrap gap-0.5" title={prevArtist.name}>
                              <span>{mainName}</span>
                              {subName && (
                                <span className="text-[9px] font-bold text-slate-400 font-sans">
                                  ({subName})
                                </span>
                              )}
                            </h4>
                          );
                        })()}
                        <div className="text-[10px] text-slate-400 font-mono">
                          {prevArtist.startTime} - {prevArtist.endTime}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400">이전 공연 없음</p>
                    )}
                  </div>

                  {/* Right Column: NEXT */}
                  <div className="pl-4">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      이후 (Next)
                    </span>
                    {nextArtist ? (
                      <div className="space-y-0.5">
                        {(() => {
                          const { mainName, subName } = getArtistDisplayName(nextArtist.name);
                          return (
                            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 line-clamp-1 flex items-baseline flex-wrap gap-0.5" title={nextArtist.name}>
                              <span>{mainName}</span>
                              {subName && (
                                <span className="text-[9px] font-bold text-slate-500 font-sans">
                                  ({subName})
                                </span>
                              )}
                            </h4>
                          );
                        })()}
                        <div className="flex items-center gap-0.5 text-[10px] text-slate-500 font-mono flex-wrap">
                          <strong>{nextArtist.startTime}</strong>
                          <span className="text-slate-400">({Math.max(1, timeToMinutes(nextArtist.startTime) - timeToMinutes(currentTime))}분 후)</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400">다음 공연 없음</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
