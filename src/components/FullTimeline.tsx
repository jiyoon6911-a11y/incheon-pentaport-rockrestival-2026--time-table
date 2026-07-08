import React, { useState, useEffect } from "react";
import { Artist, Stage, Favorite } from "../types";
import { Heart, Info, Sparkles, ExternalLink } from "lucide-react";

interface FullTimelineProps {
  artists: Artist[];
  stages: Stage[];
  dayId: string;
  currentTime: string;
  favorites: Favorite[];
  onToggleFavorite: (artistId: string) => void;
}

export const FullTimeline: React.FC<FullTimelineProps> = ({
  artists,
  stages,
  dayId,
  currentTime,
  favorites,
  onToggleFavorite,
}) => {
  // Filter artists for current day
  const dayArtists = artists.filter((a) => a.dayId === dayId);

  // Height of 1 hour in pixels on the timeline grid
  const HOUR_HEIGHT = 85;
  const startHour = 11;
  const endHour = 23;
  const totalHours = endHour - startHour; // 12 hours

  // Helper to format: startTime-endTime(durationMins)
  const getDurationText = (start: string, end: string) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const diff = (eh * 60 + em) - (sh * 60 + sm);
    return `${start}-${end}(${diff}min)`;
  };

  // Helper to calculate absolute positioning top and height
  const getPositionStyles = (startTime: string, endTime: string) => {
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    
    const startMinutes = (sh - startHour) * 60 + sm;
    const endMinutes = (eh - startHour) * 60 + em;
    
    const top = (startMinutes / 60) * HOUR_HEIGHT;
    const height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;
    
    return { top: `${top}px`, height: `${height}px` };
  };

  // Helper to determine if an artist is currently performing
  const isCurrentlyPlaying = (start: string, end: string) => {
    return currentTime >= start && currentTime < end;
  };

  return (
    <div className="space-y-4">
      {/* Visual Header / Sub-Banner */}
      <div className="flex flex-col gap-2 bg-white/90 backdrop-blur p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#e61a55] animate-pulse shrink-0" />
          <p className="text-[11px] font-black text-slate-800">
            실시간 인터랙티브 포스터형 타임테이블
          </p>
        </div>
        <div className="text-[10px] font-black text-[#e61a55] bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg self-start">
          📅 {dayId === "day1" ? "DAY 1 (8/1 금요일)" : "DAY 2 (8/2 토요일)"}
        </div>
      </div>

      {/* PORTRAIT TIME TABLE (Exact Replica Style) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden select-none">
        {/* Scroll Container - Optimized for portrait glance & horizontal swipe on narrow phones */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300">
          <div className="min-w-[480px] flex flex-col">
            
            {/* COLUMN HEADERS */}
            <div className="flex items-stretch border-b border-slate-200">
              {/* Hour Column Gutter */}
              <div className="w-[45px] flex-shrink-0 bg-slate-50 border-r border-[#4f81bd]/20 flex items-center justify-center font-mono text-[9px] font-black text-slate-400">
                TIME
              </div>

              {/* Stage 1: KB STARSHOP */}
              <div className="flex-1 bg-[#ffcc00] text-slate-950 font-black text-center py-2 px-0.5 border-r border-white/40 flex flex-col justify-center items-center h-12">
                <span className="text-[7px] tracking-wider leading-none font-bold uppercase opacity-80">
                  KB KOOKMIN CARD
                </span>
                <span className="text-[10px] tracking-tight leading-tight uppercase font-black mt-0.5">
                  STARSHOP STAGE
                </span>
              </div>

              {/* Stage 2: INCHEON */}
              <div className="flex-1 bg-[#00b0f0] text-white font-black text-center py-2 px-0.5 border-r border-white/40 flex flex-col justify-center items-center h-12">
                <span className="text-[7px] tracking-wider leading-none font-bold uppercase opacity-80">
                  PENTAPORT
                </span>
                <span className="text-[10px] tracking-tight leading-tight uppercase font-black mt-0.5">
                  INCHEON STAGE
                </span>
              </div>

              {/* Stage 3: AIRPORT */}
              <div className="flex-1 bg-[#4f81bd] text-white font-black text-center py-2 px-0.5 flex flex-col justify-center items-center h-12">
                <span className="text-[7px] tracking-wider leading-none font-bold uppercase opacity-80">
                  INCHEON AIRPORT
                </span>
                <span className="text-[10px] tracking-tight leading-tight uppercase font-black mt-0.5">
                  STAGE
                </span>
              </div>
            </div>

            {/* ADMISSION BAR (입장 오픈 10:00) */}
            <div className="flex items-stretch border-b border-slate-200">
              <div className="w-[45px] flex-shrink-0 bg-slate-50 border-r border-[#4f81bd]/20" />
              <div className="flex-1 bg-[#c11041] text-white py-1 text-center font-extrabold text-[9.5px] tracking-wider uppercase">
                입장 오픈 10:00 (Gate Open)
              </div>
            </div>

            {/* GRID CONTENT AREA (Ambient Poster Gradient Swirl Style) */}
            <div 
              className="flex w-full relative" 
              style={{ 
                height: `${totalHours * HOUR_HEIGHT}px`,
                background: "linear-gradient(180deg, #d8e8f8 0%, #f6fafd 50%, #d8e8f8 100%)"
              }}
            >
              
              {/* BACKDROP HORIZONTAL LINES & HOUR LABELS */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {Array.from({ length: totalHours }).map((_, i) => {
                  const hourVal = startHour + i;
                  return (
                    <React.Fragment key={hourVal}>
                      {/* Exact Hour Solid Line */}
                      <div 
                        className="absolute left-0 right-0 border-t border-[#4f81bd]/25"
                        style={{ top: `${i * HOUR_HEIGHT}px` }}
                      />
                      
                      {/* Hour Number Text (Left column gutter) */}
                      <div 
                        className="absolute left-0 w-[45px] text-right pr-2 font-black text-slate-900 select-none text-[13px] leading-none"
                        style={{ top: `${i * HOUR_HEIGHT + 4}px` }}
                      >
                        {hourVal}
                      </div>

                      {/* 30-min Dashed Line */}
                      <div 
                        className="absolute left-[45px] right-0 border-t border-dashed border-[#4f81bd]/15"
                        style={{ top: `${i * HOUR_HEIGHT + HOUR_HEIGHT / 2}px` }}
                      />

                      {/* "30" Minute Text */}
                      <div 
                        className="absolute left-0 w-[45px] text-right pr-2 font-extrabold text-[#9ebcd8] select-none text-[10px] leading-none"
                        style={{ top: `${i * HOUR_HEIGHT + HOUR_HEIGHT / 2 + 3}px` }}
                      >
                        30
                      </div>
                    </React.Fragment>
                  );
                })}
                {/* Final bottom hour solid line */}
                <div 
                  className="absolute left-0 right-0 border-t border-[#4f81bd]/25"
                  style={{ top: `${totalHours * HOUR_HEIGHT}px` }}
                />
              </div>

              {/* STAGE COLUMNS WRAPPER (Interactive Content Layer) */}
              <div className="flex-1 flex w-full relative z-10 pl-[45px]">
                
                {/* COLUMN 1: KB STARSHOP STAGE */}
                <div className="flex-1 border-r border-[#4f81bd]/20 relative h-full">
                  {dayArtists
                    .filter((a) => a.stageId === "kb-starshop")
                    .map((artist) => {
                      const isFav = favorites.some((f) => f.artistId === artist.id);
                      const isNow = isCurrentlyPlaying(artist.startTime, artist.endTime);
                      const pos = getPositionStyles(artist.startTime, artist.endTime);

                      return (
                        <div
                          key={artist.id}
                          className="absolute left-[4px] right-[4px] rounded-lg p-1.5 md:p-2.5 transition-all flex flex-col justify-center items-center shadow-sm select-none border border-slate-900/10 group bg-[#ffe855] hover:bg-[#ffdd33]"
                          style={pos}
                        >
                          <div className="absolute top-1.5 right-1.5 opacity-80 hover:opacity-100 z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(artist.id);
                              }}
                              className="p-1 rounded-full text-slate-900 hover:scale-110 active:scale-95 transition-all"
                            >
                              <Heart className={`h-3 w-3 ${isFav ? "fill-[#e61a55] text-[#e61a55]" : "text-slate-800"}`} />
                            </button>
                          </div>

                          <div className="text-center w-full mt-1.5">
                            <h4 className="text-[10px] sm:text-xs font-black text-slate-950 tracking-tight leading-none truncate max-w-[90%] mx-auto">
                              {artist.name.includes(" (") ? artist.name.split(" (")[0] : artist.name}
                            </h4>
                            {artist.name.includes(" (") && (
                              <p className="text-[7.5px] sm:text-[9px] font-bold text-slate-800 leading-none mt-0.5 truncate max-w-[90%] mx-auto">
                                ({artist.name.split(" (")[1]}
                              </p>
                            )}
                            <p className="text-[7px] sm:text-[8px] font-mono font-black text-slate-700 leading-none mt-1">
                              {getDurationText(artist.startTime, artist.endTime)}
                            </p>
                          </div>

                          {isNow && (
                            <span className="absolute bottom-1 px-1.5 py-0.5 bg-[#e61a55] text-white text-[6.5px] font-black rounded-full animate-bounce">
                              LIVE
                            </span>
                          )}
                        </div>
                      );
                    })}

                  {/* Special Crimson Day 1 Opening Event (개막식) */}
                  {dayId === "day1" && (
                    <div 
                      className="absolute left-[4px] right-[4px] bg-[#c11041] border border-transparent rounded-md flex items-center justify-center text-white p-1 text-center shadow-sm select-none"
                      style={getPositionStyles("21:00", "21:10")}
                    >
                      <span className="text-[7.5px] sm:text-[8.5px] font-extrabold tracking-tight leading-none text-white">
                        개막식 21:00-21:10
                      </span>
                    </div>
                  )}
                </div>

                {/* COLUMN 2: INCHEON STAGE */}
                <div className="flex-1 border-r border-[#4f81bd]/20 relative h-full">
                  {dayArtists
                    .filter((a) => a.stageId === "incheon")
                    .map((artist) => {
                      const isFav = favorites.some((f) => f.artistId === artist.id);
                      const isNow = isCurrentlyPlaying(artist.startTime, artist.endTime);
                      const pos = getPositionStyles(artist.startTime, artist.endTime);

                      return (
                        <div
                          key={artist.id}
                          className="absolute left-[4px] right-[4px] rounded-lg p-1.5 md:p-2.5 transition-all flex flex-col justify-center items-center shadow-sm select-none border border-slate-900/10 group bg-[#9ceaff] hover:bg-[#7be2ff]"
                          style={pos}
                        >
                          <div className="absolute top-1.5 right-1.5 opacity-80 hover:opacity-100 z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(artist.id);
                              }}
                              className="p-1 rounded-full text-slate-900 hover:scale-110 active:scale-95 transition-all"
                            >
                              <Heart className={`h-3 w-3 ${isFav ? "fill-[#e61a55] text-[#e61a55]" : "text-slate-800"}`} />
                            </button>
                          </div>

                          <div className="text-center w-full mt-1.5">
                            <h4 className="text-[10px] sm:text-xs font-black text-slate-950 tracking-tight leading-none truncate max-w-[90%] mx-auto">
                              {artist.name.includes(" (") ? artist.name.split(" (")[0] : artist.name}
                            </h4>
                            {artist.name.includes(" (") && (
                              <p className="text-[7.5px] sm:text-[9px] font-bold text-slate-800 leading-none mt-0.5 truncate max-w-[90%] mx-auto">
                                ({artist.name.split(" (")[1]}
                              </p>
                            )}
                            <p className="text-[7px] sm:text-[8px] font-mono font-black text-slate-700 leading-none mt-1">
                              {getDurationText(artist.startTime, artist.endTime)}
                            </p>
                          </div>

                          {isNow && (
                            <span className="absolute bottom-1 px-1.5 py-0.5 bg-[#e61a55] text-white text-[6.5px] font-black rounded-full animate-bounce">
                              LIVE
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>

                {/* COLUMN 3: INCHEON AIRPORT STAGE */}
                <div className="flex-1 relative h-full">
                  {dayArtists
                    .filter((a) => a.stageId === "incheon-airport")
                    .map((artist) => {
                      const isFav = favorites.some((f) => f.artistId === artist.id);
                      const isNow = isCurrentlyPlaying(artist.startTime, artist.endTime);
                      const pos = getPositionStyles(artist.startTime, artist.endTime);

                      return (
                        <div
                          key={artist.id}
                          className="absolute left-[4px] right-[4px] rounded-lg p-1.5 md:p-2.5 transition-all flex flex-col justify-center items-center shadow-sm select-none border border-slate-900/10 group bg-[#b7ddfc] hover:bg-[#a2d1f7]"
                          style={pos}
                        >
                          <div className="absolute top-1.5 right-1.5 opacity-80 hover:opacity-100 z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(artist.id);
                              }}
                              className="p-1 rounded-full text-slate-900 hover:scale-110 active:scale-95 transition-all"
                            >
                              <Heart className={`h-3 w-3 ${isFav ? "fill-[#e61a55] text-[#e61a55]" : "text-slate-800"}`} />
                            </button>
                          </div>

                          <div className="text-center w-full mt-1.5">
                            <h4 className="text-[10px] sm:text-xs font-black text-slate-950 tracking-tight leading-none truncate max-w-[90%] mx-auto">
                              {artist.name.includes(" (") ? artist.name.split(" (")[0] : artist.name}
                            </h4>
                            {artist.name.includes(" (") && (
                              <p className="text-[7.5px] sm:text-[9px] font-bold text-slate-800 leading-none mt-0.5 truncate max-w-[90%] mx-auto">
                                ({artist.name.split(" (")[1]}
                              </p>
                            )}
                            <p className="text-[7px] sm:text-[8px] font-mono font-black text-slate-700 leading-none mt-1">
                              {getDurationText(artist.startTime, artist.endTime)}
                            </p>
                          </div>

                          {isNow && (
                            <span className="absolute bottom-1 px-1.5 py-0.5 bg-[#e61a55] text-white text-[6.5px] font-black rounded-full animate-bounce">
                              LIVE
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
                
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
