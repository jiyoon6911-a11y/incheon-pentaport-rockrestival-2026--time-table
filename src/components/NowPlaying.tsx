import React from "react";
import { Artist, Stage, Favorite } from "../types";
import { getCurrentlyPlayingArtist, getUpcomingArtist, timeToMinutes } from "../utils/timeHelper";
import { Clock, Play, Radio, Volume2 } from "lucide-react";
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
  const getStageColorClass = (stageId: string) => {
    switch (stageId) {
      case "kb-starshop":
        return "border-[#f5a623]/30 bg-white hover:border-[#f5a623]";
      case "incheon":
        return "border-[#39b54a]/30 bg-white hover:border-[#39b54a]";
      case "incheon-airport":
        return "border-[#e61a55]/30 bg-white hover:border-[#e61a55]";
      default:
        return "border-slate-200 bg-white";
    }
  };

  const getStageBadgeColor = (stageId: string) => {
    switch (stageId) {
      case "kb-starshop":
        return "bg-[#f5a623] text-slate-950 font-black";
      case "incheon":
        return "bg-[#39b54a] text-white font-black";
      case "incheon-airport":
        return "bg-[#e61a55] text-white font-black";
      default:
        return "bg-slate-200 text-slate-700 font-black";
    }
  };

  return (
    <div id="now-playing-dashboard" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <Radio className="h-5 w-5 text-[#e61a55] animate-pulse" />
            실시간 스테이지 현황
          </h2>
          <p className="text-xs text-slate-500">
            현재 스테이지별 공연 상황과 다음 공연 팀을 실시간으로 안내합니다.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 shadow-sm rounded-full text-[11px] font-mono text-slate-600">
          <Clock className="h-3 w-3 text-[#39b54a]" />
          <span>기준 시간: <strong>{currentTime}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stages.map((stage) => {
          const nowArtist = getCurrentlyPlayingArtist(artists, stage.id, dayId, currentTime);
          const nextArtist = getUpcomingArtist(artists, stage.id, dayId, currentTime);
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
              className={`relative flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md ${getStageColorClass(stage.id)}`}
            >
              {/* Top Row: Stage Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] tracking-tight px-2.5 py-1 rounded uppercase font-black ${getStageBadgeColor(stage.id)}`}>
                    {stage.name}
                  </span>
                  {nowArtist && (
                    <span className="flex items-center gap-1 text-[10px] font-extrabold text-[#e61a55] animate-pulse bg-[#e61a55]/10 px-2.5 py-0.5 rounded border border-[#e61a55]/20">
                      <Volume2 className="h-3 w-3" /> LIVE
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
                              <p className="text-xs text-slate-500 mt-0.5">{nowArtist.genre}</p>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Time and Description */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 font-mono bg-slate-50 p-1.5 rounded border border-slate-200/60">
                        <Play className="h-3.5 w-3.5 text-[#39b54a] fill-[#39b54a]/20" />
                        <span>{nowArtist.startTime} - {nowArtist.endTime}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-500 font-sans">
                          종료까지 <strong>{Math.max(1, timeToMinutes(nowArtist.endTime) - timeToMinutes(currentTime))}분</strong> 남음
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#f5a623] via-[#39b54a] to-[#e61a55] transition-all duration-1000"
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

              {/* Bottom Section: UP NEXT */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
                  Up Next
                </span>

                {nextArtist ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      {(() => {
                        const { mainName, subName } = getArtistDisplayName(nextArtist.name);
                        return (
                          <h4 className="text-sm font-extrabold text-slate-800 line-clamp-1 flex items-baseline flex-wrap gap-1">
                            <span>{mainName}</span>
                            {subName && (
                              <span className="text-xs font-bold text-slate-500 font-sans">
                                ({subName})
                              </span>
                            )}
                          </h4>
                        );
                      })()}
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span><strong>{nextArtist.startTime}</strong> 시작</span>
                        <span className="text-slate-400">({Math.max(1, timeToMinutes(nextArtist.startTime) - timeToMinutes(currentTime))}분 전)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">이후 대기 중인 공연 일정이 없습니다.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
