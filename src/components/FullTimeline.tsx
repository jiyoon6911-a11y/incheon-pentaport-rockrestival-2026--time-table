import React, { useState, useEffect } from "react";
import { Artist, Stage, Favorite } from "../types";
import { Heart, Info, Sparkles, ExternalLink } from "lucide-react";

interface FullTimelineProps {
  artists: Artist[];
  stages: Stage[];
  dayId: string;
  onChangeDay?: (dayId: string) => void;
  currentTime: string;
  favorites: Favorite[];
  onToggleFavorite: (artistId: string) => void;
}

export const FullTimeline: React.FC<FullTimelineProps> = ({
  artists,
  stages,
  dayId,
  onChangeDay,
  currentTime,
  favorites,
  onToggleFavorite,
}) => {
  // Filter artists for current day
  const dayArtists = artists.filter((a) => a.dayId === dayId);

  // Stage selection filter state (All stages or a specific stage)
  const [selectedStageId, setSelectedStageId] = useState<string>("all");

  // Reset stage filter when changing days
  useEffect(() => {
    setSelectedStageId("all");
  }, [dayId]);

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
      "Tempalay (템플레이)",
      "Balming Tiger (Band Set)",
      "김민규 (델리스파이스, 스위트피)",
      "Omoinotake",
      "ADOY",
      "Pulp",
      "BECK",
      "Touché Amoré",
      "LUCY",
      "Brandy Senki",
      "Milledenials",
      "The Lemon Twigs",
      "The Jesus and Mary Chain",
      "never young beach",
      "Song Dongye",
      "Isyana Sarasvati",
      "Original Love",
      "Eddie and the Bricks",
      "CASUALLY CONNECTED",
      "Flesh Juicer"
    ];
    
    if (artistName === "TheyNeverChange") {
      return { mainName: "데이네버체인지" };
    }

    if (artistName === "극동아시아타이거즈") {
      return { mainName: "극동아시아\n타이거즈", isWrapped: true };
    }

    if (artistName === "Galaxy Express (갤럭시 익스프레스)" || artistName === "갤럭시 익스프레스") {
      return { mainName: "갤럭시\n익스프레스", isWrapped: true };
    }

    if (artistName === "The Jesus and Mary Chain") {
      return { mainName: "The Jesus and\nMary Chain", isWrapped: true };
    }

    if (artistName === "never young beach") {
      return { mainName: "never young beach", isWrapped: false };
    }

    if (artistName === "Flesh Juicer") {
      return { mainName: "Flesh Juicer 血肉果汁機", isWrapped: false };
    }

    if (artistName === "Eddie and the Bricks") {
      return { mainName: "Eddie and\nthe Bricks", isWrapped: true };
    }

    if (artistName === "CASUALLY CONNECTED") {
      return { mainName: "CASUALLY\nCONNECTED", isWrapped: true };
    }

    if (artistName === "아시안 스파이스 하우스") {
      return { mainName: "아시안\n스파이스 하우스", isWrapped: true };
    }

    if (artistName === "우륵과 풍각쟁이들") {
      return { mainName: "우륵과\n풍각쟁이들", isWrapped: true };
    }

    if (artistName === "피치트럭하이재커스") {
      return { mainName: "피치트럭\n하이재커스", isWrapped: true };
    }

    if (artistName.startsWith("스탠리와 함께하는")) {
      return { mainName: "스탠리와 함께하는 펜타로빅 w.김혜선", isWrapped: true };
    }

    if (artistName === "Balming Tiger (Band Set)") {
      return { mainName: "바밍타이거", subName: "Band Set" };
    }

    if (artistName === "김민규 (델리스파이스, 스위트피)") {
      return { mainName: "김민규", subName: "델리스파이스, 스위트피" };
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
      <div className="flex gap-1.5 p-1.5 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
        {[
          { id: "day1", label: "DAY 1", date: "7/31 (금)" },
          { id: "day2", label: "DAY 2", date: "8/1 (토)" },
          { id: "day3", label: "DAY 3", date: "8/2 (일)" },
        ].map((day) => {
          const isSelected = dayId === day.id;
          return (
            <button
              key={day.id}
              onClick={() => onChangeDay?.(day.id)}
              className={`flex-1 py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center border ${
                isSelected
                  ? "bg-gradient-to-r from-[#6e2ef3] to-[#8b5cf6] border-transparent text-white shadow-sm font-black"
                  : "bg-slate-50/80 border-slate-200/50 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span className="text-[11px] font-black tracking-tight">
                {day.label}
              </span>
              <span className={`text-[9px] ${isSelected ? "text-white/80" : "text-slate-400"} font-bold tracking-tighter mt-0.5`}>
                {day.date}
              </span>
            </button>
          );
        })}
      </div>

      {/* STAGE SELECTOR FILTER BUTTONS */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/50 shadow-sm">
        <button
          onClick={() => setSelectedStageId("all")}
          className={`flex-1 py-2 text-[10px] min-[375px]:text-[11px] sm:text-xs font-black rounded-xl transition-all ${
            selectedStageId === "all"
              ? "bg-slate-900 text-white font-black shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          전체
        </button>
        {stages.map((stage) => {
          let activeClass = "bg-slate-900 text-white font-black shadow-sm";
          if (stage.id === "kb-starshop") activeClass = "bg-[#fdb913] text-slate-950 font-black shadow-sm";
          if (stage.id === "incheon") activeClass = "bg-[#82d111] text-slate-950 font-black shadow-sm";
          if (stage.id === "incheon-airport") activeClass = "bg-[#1d242b] text-white font-black shadow-sm";

          const stageShortName = stage.name === "KB KOOKMIN CARD STAGE" 
            ? "KB국민" 
            : stage.name === "MONSTER ENERGY STAGE" 
            ? "몬스터" 
            : "스탠리";

          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`flex-1 py-2 px-0.5 text-[10px] min-[375px]:text-[11px] sm:text-xs font-black rounded-xl transition-all ${
                selectedStageId === stage.id
                  ? activeClass
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              {stageShortName}
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

            {/* Stage 1: KB KOOKMIN CARD STAGE */}
            {(selectedStageId === "all" || selectedStageId === "kb-starshop") && (
              <div className="flex-1 bg-[#fdb913] text-slate-950 font-black text-center py-1.5 px-0.5 border-r border-white/40 flex flex-col justify-center items-center min-h-[48px] h-auto">
                <span className="text-[5.5px] tracking-tighter leading-none font-bold uppercase opacity-85">
                  KB KOOKMIN CARD
                </span>
                <span className="text-[8.5px] tracking-tighter leading-tight uppercase font-black mt-0.5">
                  STAGE
                </span>
              </div>
            )}

            {/* Stage 2: MONSTER ENERGY STAGE */}
            {(selectedStageId === "all" || selectedStageId === "incheon") && (
              <div className="flex-1 bg-[#82d111] text-slate-950 font-black text-center py-1.5 px-0.5 border-r border-white/40 flex flex-col justify-center items-center min-h-[48px] h-auto">
                <span className="text-[5.5px] tracking-tighter leading-none font-bold uppercase opacity-85">
                  MONSTER ENERGY
                </span>
                <span className="text-[8.5px] tracking-tighter leading-tight uppercase font-black mt-0.5">
                  STAGE
                </span>
                <span className="text-[6px] sm:text-[7.5px] tracking-tighter leading-none font-black text-slate-950 mt-1.5 drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.3)]">
                  ★ 10:30~19:30 드리머 부스 운영!
                </span>
              </div>
            )}

            {/* Stage 3: STANLEY 1913 STAGE */}
            {(selectedStageId === "all" || selectedStageId === "incheon-airport") && (
              <div className="flex-1 bg-[#1d242b] text-white font-black text-center py-1.5 px-0.5 flex flex-col justify-center items-center min-h-[48px] h-auto">
                <span className="text-[5.5px] tracking-tighter leading-none font-bold uppercase opacity-85 text-white/80">
                  STANLEY 1913
                </span>
                <span className="text-[8.5px] tracking-tighter leading-tight uppercase font-black mt-0.5 text-white">
                  STAGE
                </span>
              </div>
            )}
          </div>

          {/* ADMISSION BAR (입장 오픈 10:30) */}
          <div className="flex items-stretch border-b border-slate-100">
            <div className="w-[35px] flex-shrink-0 bg-slate-50 border-r border-[#38bdf8]/10" />
            <div className="flex-1 bg-[#c11041] text-white py-0.5 text-center font-extrabold text-[8.5px] tracking-wide uppercase">
              입장 오픈 10:30 (Gate Open)
            </div>
          </div>

          {/* GRID CONTENT AREA (Clean White Layout with light sky blue dashed grid lines) */}
          <div 
            className="flex w-full relative" 
            style={{ 
              height: `${totalHours * HOUR_HEIGHT}px`,
              background: "#ffffff"
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
                      className="absolute left-0 right-0 border-t border-[#38bdf8]/15"
                      style={{ top: `${i * HOUR_HEIGHT}px` }}
                    />
                    
                    {/* Hour Number Text (Left column gutter) */}
                    <div 
                      className="absolute left-0 w-[35px] text-right pr-1.5 font-black text-slate-700 select-none text-[10px] leading-none"
                      style={{ top: `${i * HOUR_HEIGHT + 4}px` }}
                    >
                      {hourVal}
                    </div>

                    {/* 30-min Dashed Line */}
                    <div 
                      className="absolute left-[35px] right-0 border-t border-dashed border-[#38bdf8]/10"
                      style={{ top: `${i * HOUR_HEIGHT + HOUR_HEIGHT / 2}px` }}
                    />

                    {/* "30" Minute Text */}
                    <div 
                      className="absolute left-0 w-[35px] text-right pr-1.5 font-extrabold text-[#7dd3fc] select-none text-[8px] leading-none"
                      style={{ top: `${i * HOUR_HEIGHT + HOUR_HEIGHT / 2 + 3}px` }}
                    >
                      30
                    </div>
                  </React.Fragment>
                );
              })}
              {/* Final bottom hour solid line */}
              <div 
                className="absolute left-0 right-0 border-t border-[#38bdf8]/15"
                style={{ top: `${totalHours * HOUR_HEIGHT}px` }}
              />
            </div>

            {/* STAGE COLUMNS WRAPPER (Interactive Content Layer) */}
            <div className="flex-1 flex w-full relative z-10 pl-[35px]">
                
                {/* COLUMN 1: KB STARSHOP STAGE */}
                {(selectedStageId === "all" || selectedStageId === "kb-starshop") && (
                  <div className="flex-1 border-r border-[#38bdf8]/10 relative h-full">
                    {dayArtists
                      .filter((a) => a.stageId === "kb-starshop")
                      .map((artist) => {
                        const isNow = isCurrentlyPlaying(artist.startTime, artist.endTime);
                        const pos = getPositionStyles(artist.startTime, artist.endTime);
                        const borderStyle = isNow 
                          ? "border-[2px] sm:border-[2.5px] border-[#fdb913] bg-[#fffbeb] shadow-md ring-4 ring-[#ffe855]/60 scale-[1.01] z-20 font-black" 
                          : "border border-slate-900/10 z-10 hover:scale-[1.01]";

                        const isCurated = artist.name === "never young beach";
                        const curatedCardStyle = isCurated
                          ? "rounded-t-none rounded-b-lg border-t-0 p-1 sm:p-1.5 justify-center"
                          : "rounded-lg p-1 sm:p-1.5 justify-center overflow-hidden";
                        return (
                          <div
                            key={artist.id}
                            className={`absolute left-[4px] right-[4px] transition-all flex flex-col items-center shadow-sm select-none group bg-[#ffe855] hover:bg-[#ffdd33] ${curatedCardStyle} ${borderStyle}`}
                            style={pos}
                          >
                            {isCurated && (
                              <div 
                                className={`absolute bottom-full left-[-1px] right-[-1px] h-[18px] bg-[#f59e0b] text-slate-950 font-black text-[6.5px] min-[375px]:text-[7.5px] sm:text-[9px] uppercase tracking-wider text-center flex items-center justify-center rounded-t-lg shadow-sm leading-none select-none z-30 ${
                                  isNow 
                                    ? "border-t-[2px] border-x-[2px] sm:border-t-[2.5px] sm:border-x-[2.5px] border-[#fdb913] left-[-2px] right-[-2px] sm:left-[-2.5px] sm:right-[-2.5px]" 
                                    : "border-t border-x border-slate-900/10"
                                }`}
                              >
                                Curated by SPACE SHOWER
                              </div>
                            )}
                            <div className="text-center w-full my-auto">
                              {(() => {
                                const { mainName, subName, isWrapped } = getArtistDisplayName(artist.name);
                                return (
                                  <>
                                    <h4 className={`font-black text-slate-950 tracking-tight leading-tight mx-auto ${
                                      isWrapped 
                                        ? "text-[7.5px] sm:text-[9.5px] whitespace-pre-line" 
                                        : "text-[9.5px] sm:text-[11.5px] truncate max-w-[95%]"
                                    }`}>
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

                {/* COLUMN 2: MONSTER ENERGY STAGE */}
                {(selectedStageId === "all" || selectedStageId === "incheon") && (
                  <div className="flex-1 border-r border-[#38bdf8]/10 relative h-full">
                    {dayArtists
                      .filter((a) => a.stageId === "incheon")
                      .map((artist) => {
                        const isNow = isCurrentlyPlaying(artist.startTime, artist.endTime);
                        const pos = getPositionStyles(artist.startTime, artist.endTime);
                        const borderStyle = isNow 
                          ? "border-[2px] sm:border-[2.5px] border-[#82d111] bg-[#f4fde8] shadow-md ring-4 ring-[#82d111]/60 scale-[1.01] z-20 font-black" 
                          : "border border-slate-900/10 z-10 hover:scale-[1.01]";

                        const isCurated = artist.name === "Isyana Sarasvati";
                        const curatedCardStyle = isCurated
                          ? "rounded-t-none rounded-b-lg border-t-0 p-1 sm:p-1.5 justify-center"
                          : "rounded-lg p-1 sm:p-1.5 justify-center overflow-hidden";
                        return (
                          <div
                            key={artist.id}
                            className={`absolute left-[4px] right-[4px] transition-all flex flex-col items-center shadow-sm select-none group bg-[#b8f154] hover:bg-[#a1e533] ${curatedCardStyle} ${borderStyle}`}
                            style={pos}
                          >
                            {isCurated && (
                              <div 
                                className={`absolute bottom-full left-[-1px] right-[-1px] h-[18px] bg-[#78be11] text-slate-950 font-black text-[6.5px] min-[375px]:text-[7.5px] sm:text-[9px] uppercase tracking-wider text-center flex items-center justify-center rounded-t-lg shadow-sm leading-none select-none z-30 ${
                                  isNow 
                                    ? "border-t-[2px] border-x-[2px] sm:border-t-[2.5px] sm:border-x-[2.5px] border-[#82d111] left-[-2px] right-[-2px] sm:left-[-2.5px] sm:right-[-2.5px]" 
                                    : "border-t border-x border-slate-900/10"
                                }`}
                              >
                                Curated by LaLaLa Fest
                              </div>
                            )}
                            <div className="text-center w-full my-auto">
                              {(() => {
                                const { mainName, subName, isWrapped } = getArtistDisplayName(artist.name);
                                return (
                                  <>
                                    <h4 className={`font-black text-slate-950 tracking-tight leading-tight mx-auto ${
                                      isWrapped 
                                        ? "text-[7.5px] sm:text-[9.5px] whitespace-pre-line" 
                                        : "text-[9.5px] sm:text-[11.5px] truncate max-w-[95%]"
                                    }`}>
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

                {/* COLUMN 3: STANLEY 1913 STAGE */}
                {(selectedStageId === "all" || selectedStageId === "incheon-airport") && (
                  <div className="flex-1 relative h-full">
                    {dayArtists
                      .filter((a) => a.stageId === "incheon-airport")
                      .map((artist) => {
                        const isNow = isCurrentlyPlaying(artist.startTime, artist.endTime);
                        const pos = getPositionStyles(artist.startTime, artist.endTime);
                        const isPentarobic = artist.name.includes("펜타로빅");
                        const isRookie = artist.name.includes("펜타루키");
                        const cardBg = isPentarobic
                          ? "bg-[#eb439b] text-white hover:bg-[#d8318b]"
                          : isRookie 
                          ? "bg-[#ffccd8] hover:bg-[#ffb3c6] text-[#c11041]" 
                          : "bg-[#e0e4e8] hover:bg-[#d1d6db] text-slate-950";
                        const borderStyle = isNow 
                          ? `border-[2px] sm:border-[2.5px] ${isPentarobic ? "border-[#ffe855] bg-[#eb439b] ring-[#ffe855]/60" : isRookie ? "border-[#ff3b6c] bg-[#fff0f4] ring-[#ffccd8]/85" : "border-[#475569] bg-[#f8fafc] ring-slate-400/35"} shadow-md ring-4 scale-[1.01] z-20 font-black` 
                          : "border border-slate-900/10 z-10 hover:scale-[1.01]";

                        const isCurated = artist.name === "Flesh Juicer";
                        const curatedCardStyle = isCurated
                          ? "rounded-t-none rounded-b-lg border-t-0 p-1 sm:p-1.5 justify-center"
                          : "rounded-lg p-1 sm:p-1.5 justify-center overflow-hidden";
                        return (
                          <div
                            key={artist.id}
                            className={`absolute left-[4px] right-[4px] transition-all flex flex-col items-center shadow-sm select-none group ${cardBg} ${curatedCardStyle} ${borderStyle}`}
                            style={pos}
                          >
                            {isCurated && (
                              <div 
                                className={`absolute bottom-full left-[-1px] right-[-1px] h-[18px] bg-slate-950 text-white font-black text-[6.5px] min-[375px]:text-[7.5px] sm:text-[9px] uppercase tracking-wider text-center flex items-center justify-center rounded-t-lg shadow-sm leading-none select-none z-30 ${
                                  isNow 
                                    ? "border-t-[2px] border-x-[2px] sm:border-t-[2.5px] sm:border-x-[2.5px] border-[#475569] left-[-2px] right-[-2px] sm:left-[-2.5px] sm:right-[-2.5px]" 
                                    : "border-t border-x border-slate-900/10"
                                }`}
                              >
                                Curated by FireBall
                              </div>
                            )}
                            <div className="text-center w-full my-auto px-0.5">
                              {isPentarobic ? (
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                  <span className="text-[6.8px] min-[375px]:text-[7.5px] sm:text-[8.5px] font-extrabold text-pink-100 tracking-tight leading-none block">
                                    스탠리와 함께하는
                                  </span>
                                  <span className="text-[8.2px] min-[375px]:text-[9px] sm:text-[10.5px] font-black text-white tracking-tight leading-tight block">
                                    펜타로빅 w.김혜선
                                  </span>
                                  <span className="text-[6.8px] sm:text-[7.8px] font-mono font-extrabold text-pink-50 leading-none mt-0.5 block">
                                    20:30 -21:00 (30min)
                                  </span>
                                </div>
                              ) : (
                                <>
                                  {(() => {
                                    const { mainName, subName, isWrapped } = getArtistDisplayName(artist.name);
                                    return (
                                      <>
                                        <h4 className={`font-black tracking-tight leading-tight mx-auto ${
                                          isRookie ? "text-[#c11041]" : "text-slate-950"
                                        } ${
                                          isWrapped 
                                            ? "text-[7.5px] sm:text-[9.5px] whitespace-pre-line" 
                                            : "text-[9.5px] sm:text-[11.5px] truncate max-w-[95%]"
                                        }`}>
                                          {mainName}
                                        </h4>
                                        {subName && (
                                          <p className="text-[6.2px] sm:text-[7.8px] font-bold opacity-80 leading-tight mt-0.5 break-words max-w-[95%] mx-auto">
                                            ({subName})
                                          </p>
                                        )}
                                      </>
                                    );
                                  })()}
                                  <p className={`text-[7px] sm:text-[8px] font-mono font-black leading-none mt-1 ${
                                    isRookie ? "text-[#c11041]/85" : "text-slate-700"
                                  }`}>
                                    {getDurationText(artist.startTime, artist.endTime)}
                                  </p>
                                </>
                              )}
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
