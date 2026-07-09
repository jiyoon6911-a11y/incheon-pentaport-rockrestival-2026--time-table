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

  // Stage selection filter state (All stages or a specific stage)
  const [selectedStageId, setSelectedStageId] = useState<string>("all");

  // Height of 1 hour in pixels on the timeline grid - increased to 76px to comfortably fit long English and Korean names!
  const HOUR_HEIGHT = 76;
  const startHour = 11;
  const endHour = 23;
  const totalHours = endHour - startHour; // 12 hours

  // Helper to format: startTime-endTime(durationMins)
  const getDurationText = (start: string, end: string) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const diff = (eh * 60 + em) - (sh * 60 + sm);
    return `${start}-${end}(${diff}m)`;
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

  return (
    <div className="space-y-4">
      {/* Visual Header / Sub-Banner */}
      <div className="flex flex-col gap-2 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm">
        <div className="text-[11px] font-black text-[#e61a55] bg-[#e61a55]/10 border border-[#e61a55]/20 px-3 py-1 rounded-lg self-start">
          {dayId === "day1" ? "DAY 1 (8/1 금요일)" : "DAY 2 (8/2 토요일)"}
        </div>
      </div>

      {/* STAGE SELECTOR FILTER BUTTONS */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/50 shadow-sm">
        <button
          onClick={() => setSelectedStageId("all")}
          className={`flex-1 py-2 text-[10px] sm:text-xs font-black rounded-xl transition-all ${
            selectedStageId === "all"
              ? "bg-slate-900 text-white font-black shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          전체 스테이지
        </button>
        {stages.map((stage) => {
          let activeClass = "bg-slate-900 text-white font-black shadow-sm";
          if (stage.id === "kb-starshop") activeClass = "bg-[#ffcc00] text-slate-950 font-black shadow-sm";
          if (stage.id === "incheon") activeClass = "bg-[#00b0f0] text-slate-950 font-black shadow-sm";
          if (stage.id === "incheon-airport") activeClass = "bg-[#4f81bd] text-white font-black shadow-sm";

          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`flex-1 py-2 px-1 text-[10px] sm:text-xs font-black rounded-xl transition-all truncate ${
                selectedStageId === stage.id
                  ? activeClass
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              {stage.name === "KB STARSHOP STAGE" ? "KB STARSHOP" : stage.name === "INCHEON STAGE" ? "INCHEON" : "AIRPORT"}
            </button>
          );
        })}
      </div>

      {/* PORTRAIT TIME TABLE (Exact Replica Style) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden select-none">
        {/* Full width container - no horizontal scroll or min-width drag needed */}
        <div className="w-full flex flex-col">
          
          {/* COLUMN HEADERS */}
          <div className="flex items-stretch border-b border-slate-200">
            {/* Hour Column Gutter */}
            <div className="w-[35px] flex-shrink-0 bg-slate-50 border-r border-[#4f81bd]/20 flex items-center justify-center font-mono text-[8px] font-black text-slate-400">
              TIME
            </div>

            {/* Stage 1: KB STARSHOP */}
            {(selectedStageId === "all" || selectedStageId === "kb-starshop") && (
              <div className="flex-1 bg-[#ffcc00] text-slate-950 font-black text-center py-1 px-0.5 border-r border-white/40 flex flex-col justify-center items-center h-11">
                <span className="text-[5.5px] tracking-tighter leading-none font-bold uppercase opacity-80">
                  KB KOOKMIN
                </span>
                <span className="text-[8.5px] tracking-tighter leading-tight uppercase font-black mt-0.5">
                  STARSHOP
                </span>
              </div>
            )}

            {/* Stage 2: INCHEON */}
            {(selectedStageId === "all" || selectedStageId === "incheon") && (
              <div className="flex-1 bg-[#00b0f0] text-white font-black text-center py-1 px-0.5 border-r border-white/40 flex flex-col justify-center items-center h-11">
                <span className="text-[5.5px] tracking-tighter leading-none font-bold uppercase opacity-80">
                  PENTAPORT
                </span>
                <span className="text-[8.5px] tracking-tighter leading-tight uppercase font-black mt-0.5">
                  INCHEON
                </span>
              </div>
            )}

            {/* Stage 3: AIRPORT */}
            {(selectedStageId === "all" || selectedStageId === "incheon-airport") && (
              <div className="flex-1 bg-[#4f81bd] text-white font-black text-center py-1 px-0.5 flex flex-col justify-center items-center h-11">
                <span className="text-[5.5px] tracking-tighter leading-none font-bold uppercase opacity-80">
                  AIRPORT
                </span>
                <span className="text-[8.5px] tracking-tighter leading-tight uppercase font-black mt-0.5">
                  STAGE
                </span>
              </div>
            )}
          </div>

          {/* ADMISSION BAR (입장 오픈 10:00) */}
          <div className="flex items-stretch border-b border-slate-200">
            <div className="w-[35px] flex-shrink-0 bg-slate-50 border-r border-[#4f81bd]/20" />
            <div className="flex-1 bg-[#c11041] text-white py-0.5 text-center font-extrabold text-[8.5px] tracking-wide uppercase">
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
                      className="absolute left-0 w-[35px] text-right pr-1 font-black text-slate-900 select-none text-[11px] leading-none"
                      style={{ top: `${i * HOUR_HEIGHT + 4}px` }}
                    >
                      {hourVal}
                    </div>

                    {/* 30-min Dashed Line */}
                    <div 
                      className="absolute left-[35px] right-0 border-t border-dashed border-[#4f81bd]/15"
                      style={{ top: `${i * HOUR_HEIGHT + HOUR_HEIGHT / 2}px` }}
                    />

                    {/* "30" Minute Text */}
                    <div 
                      className="absolute left-0 w-[35px] text-right pr-1 font-extrabold text-[#9ebcd8] select-none text-[8px] leading-none"
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
            <div className="flex-1 flex w-full relative z-10 pl-[35px]">
                
                {/* COLUMN 1: KB STARSHOP STAGE */}
                {(selectedStageId === "all" || selectedStageId === "kb-starshop") && (
                  <div className="flex-1 border-r border-[#4f81bd]/20 relative h-full">
                    {dayArtists
                      .filter((a) => a.stageId === "kb-starshop")
                      .map((artist) => {
                        const isNow = isCurrentlyPlaying(artist.startTime, artist.endTime);
                        const pos = getPositionStyles(artist.startTime, artist.endTime);
                        const borderStyle = isNow 
                          ? "border-[2px] sm:border-[2.5px] border-slate-950 shadow-md ring-4 ring-[#ffe855]/40 scale-[1.01] z-20 font-black" 
                          : "border border-slate-900/10 z-10 hover:scale-[1.01]";

                        return (
                          <div
                            key={artist.id}
                            className={`absolute left-[4px] right-[4px] rounded-lg p-1 sm:p-1.5 transition-all flex flex-col justify-center items-center shadow-sm select-none group bg-[#ffe855] hover:bg-[#ffdd33] ${borderStyle}`}
                            style={pos}
                          >
                            <div className="text-center w-full my-auto">
                              {(() => {
                                const { mainName, subName } = getArtistDisplayName(artist.name);
                                return (
                                  <>
                                    <h4 className="text-[9.5px] sm:text-[11.5px] font-black text-slate-950 tracking-tight leading-tight truncate max-w-[95%] mx-auto">
                                      {mainName}
                                    </h4>
                                    {subName && (
                                      <p className="text-[6.2px] sm:text-[7.8px] font-bold text-slate-800/80 leading-tight mt-0.5 break-words max-w-[95%] mx-auto">
                                        ({subName})
                                      </p>
                                    )}
                                  </>
                                );
                              })()}
                              <p className="text-[7px] sm:text-[8px] font-mono font-black text-slate-700 leading-none mt-1">
                                {getDurationText(artist.startTime, artist.endTime)}
                              </p>
                            </div>
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
                )}

                {/* COLUMN 2: INCHEON STAGE */}
                {(selectedStageId === "all" || selectedStageId === "incheon") && (
                  <div className="flex-1 border-r border-[#4f81bd]/20 relative h-full">
                    {dayArtists
                      .filter((a) => a.stageId === "incheon")
                      .map((artist) => {
                        const isNow = isCurrentlyPlaying(artist.startTime, artist.endTime);
                        const pos = getPositionStyles(artist.startTime, artist.endTime);
                        const borderStyle = isNow 
                          ? "border-[2px] sm:border-[2.5px] border-slate-950 shadow-md ring-4 ring-[#9ceaff]/40 scale-[1.01] z-20 font-black" 
                          : "border border-slate-900/10 z-10 hover:scale-[1.01]";

                        return (
                          <div
                            key={artist.id}
                            className={`absolute left-[4px] right-[4px] rounded-lg p-1 sm:p-1.5 transition-all flex flex-col justify-center items-center shadow-sm select-none group bg-[#9ceaff] hover:bg-[#7be2ff] ${borderStyle}`}
                            style={pos}
                          >
                            <div className="text-center w-full my-auto">
                              {(() => {
                                const { mainName, subName } = getArtistDisplayName(artist.name);
                                return (
                                  <>
                                    <h4 className="text-[9.5px] sm:text-[11.5px] font-black text-slate-950 tracking-tight leading-tight truncate max-w-[95%] mx-auto">
                                      {mainName}
                                    </h4>
                                    {subName && (
                                      <p className="text-[6.2px] sm:text-[7.8px] font-bold text-slate-800/80 leading-tight mt-0.5 break-words max-w-[95%] mx-auto">
                                        ({subName})
                                      </p>
                                    )}
                                  </>
                                );
                              })()}
                              <p className="text-[7px] sm:text-[8px] font-mono font-black text-slate-700 leading-none mt-1">
                                {getDurationText(artist.startTime, artist.endTime)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* COLUMN 3: INCHEON AIRPORT STAGE */}
                {(selectedStageId === "all" || selectedStageId === "incheon-airport") && (
                  <div className="flex-1 relative h-full">
                    {dayArtists
                      .filter((a) => a.stageId === "incheon-airport")
                      .map((artist) => {
                        const isNow = isCurrentlyPlaying(artist.startTime, artist.endTime);
                        const pos = getPositionStyles(artist.startTime, artist.endTime);
                        const borderStyle = isNow 
                          ? "border-[2px] sm:border-[2.5px] border-slate-950 shadow-md ring-4 ring-[#b7ddfc]/40 scale-[1.01] z-20 font-black" 
                          : "border border-slate-900/10 z-10 hover:scale-[1.01]";

                        return (
                          <div
                            key={artist.id}
                            className={`absolute left-[4px] right-[4px] rounded-lg p-1 sm:p-1.5 transition-all flex flex-col justify-center items-center shadow-sm select-none group bg-[#b7ddfc] hover:bg-[#a2d1f7] ${borderStyle}`}
                            style={pos}
                          >
                            <div className="text-center w-full my-auto">
                              {(() => {
                                const { mainName, subName } = getArtistDisplayName(artist.name);
                                return (
                                  <>
                                    <h4 className="text-[9.5px] sm:text-[11.5px] font-black text-slate-950 tracking-tight leading-tight truncate max-w-[95%] mx-auto">
                                      {mainName}
                                    </h4>
                                    {subName && (
                                      <p className="text-[6.2px] sm:text-[7.8px] font-bold text-slate-800/80 leading-tight mt-0.5 break-words max-w-[95%] mx-auto">
                                        ({subName})
                                      </p>
                                    )}
                                  </>
                                );
                              })()}
                              <p className="text-[7px] sm:text-[8px] font-mono font-black text-slate-700 leading-none mt-1">
                                {getDurationText(artist.startTime, artist.endTime)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
                
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
  );
};
