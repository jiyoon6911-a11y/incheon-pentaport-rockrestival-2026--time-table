import React, { useState } from "react";
import { MapPin, Info, Compass, Beer, Coffee, ShieldAlert, ShoppingBag, Landmark } from "lucide-react";

interface Zone {
  id: string;
  name: string;
  type: "stage" | "service" | "food" | "medical";
  x: number; // percentage coordinate
  y: number; // percentage coordinate
  description: string;
  facilities: string[];
}

const ZONES: Zone[] = [
  {
    id: "kb-starshop",
    name: "KB KOOKMIN CARD STAGE (메인 무대)",
    type: "stage",
    x: 25,
    y: 35,
    description: "페스티벌의 가장 큰 메인 스테이지입니다. 국내외 최정상급 아티스트들의 공연과 대규모 스탠딩존이 운영됩니다.",
    facilities: ["초대형 메인 LED 전광판", "메인 스피커 어레이", "스태프 컨트롤 타워", "Fanzone 전용 대기 구역"],
  },
  {
    id: "incheon",
    name: "MONSTER ENERGY STAGE (서브 무대)",
    type: "stage",
    x: 75,
    y: 30,
    description: "뜨거운 열정과 개성 넘치는 사운드를 자랑하는 서브 스테이지입니다. 록, 메탈, 일렉트로닉 등 다채로운 공연이 연출됩니다.",
    facilities: ["무대 전면 특수효과 부스", "락 스탠딩 피트", "아티스트 MD 공식 부스"],
  },
  {
    id: "incheon-airport",
    name: "STANLEY 1913 STAGE (어쿠스틱 무대)",
    type: "stage",
    x: 50,
    y: 80,
    description: "푸른 잔디밭에서 감성적인 인디 음악, 시티팝, 어쿠스틱 라이브를 감상할 수 있는 힐링 스테이지입니다.",
    facilities: ["잔디 피크닉 돗자리 존", "야간 감성 스트링 라이트", "친환경 에코 테이블"],
  },
  {
    id: "zone-fb",
    name: "F&B ZONE (푸드 코트)",
    type: "food",
    x: 50,
    y: 25,
    description: "락 페스티벌의 활력을 채워줄 다양한 먹거리 부스입니다. 맥주, 타코, 컵밥, 닭강정 등 다양한 한중일식 메뉴가 판매됩니다.",
    facilities: ["공식 맥주 판매처", "F&B 부스 12개소", "파라솔 테이블 존", "스마트 주문 픽업처"],
  },
  {
    id: "zone-wc-1",
    name: "화장실 & 급수대 A",
    type: "service",
    x: 15,
    y: 70,
    description: "메인 스테이지 좌측 후면에 위치한 대형 간이 화장실 및 급수 공간입니다.",
    facilities: ["여성 전용 10칸", "남성 전용 8칸", "휴대폰 충전 보조 부스", "무료 식수 공급처"],
  },
  {
    id: "zone-wc-2",
    name: "화장실 & F&B 급수대 B",
    type: "service",
    x: 85,
    y: 70,
    description: "서브 스테이지 우측 후면에 위치한 친환경 화장실 구역입니다.",
    facilities: ["남녀 공용 화장실 12칸", "손 세정대", "분리수거 캠페인 존"],
  },
  {
    id: "zone-medical",
    name: "의료 텐트 & 미디어 센터",
    type: "medical",
    x: 10,
    y: 20,
    description: "탈수, 가벼운 상처, 응급 상황 대처를 위한 전문 의료진이 대기하는 안전 센터입니다.",
    facilities: ["구급차 상시 대기", "전문 간호사 대기", "무료 이온 음료", "소방 안전 요원 부스"],
  },
  {
    id: "zone-entrance",
    name: "메인 출입구 & 매표소",
    type: "service",
    x: 50,
    y: 95,
    description: "티켓 부스, 모바일 입장 팔찌 교환처, 분실물 센터가 통합된 진출입 광장입니다.",
    facilities: ["모바일 티켓 교환처", "물품 보관소 (유료)", "반려견 동반 확인처", "공식 가이드 리플릿"],
  }
];

export const VenueMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<Zone>(ZONES[0]);

  const getZoneIcon = (type: Zone["type"]) => {
    switch (type) {
      case "stage":
        return <Landmark className="h-5 w-5 text-[#e61a55]" />;
      case "food":
        return <Beer className="h-5 w-5 text-[#f5a623]" />;
      case "medical":
        return <ShieldAlert className="h-5 w-5 text-[#39b54a]" />;
      default:
        return <Compass className="h-5 w-5 text-indigo-600" />;
    }
  };

  const getMarkerColor = (type: Zone["type"], isSelected: boolean) => {
    if (isSelected) return "bg-slate-900 text-white scale-125 ring-4 ring-[#e61a55] shadow-xl z-30";
    switch (type) {
      case "stage":
        return "bg-[#e61a55] text-white hover:bg-[#c11041]";
      case "food":
        return "bg-[#f5a623] text-slate-950 hover:bg-[#d98200]";
      case "medical":
        return "bg-[#39b54a] text-white hover:bg-[#1e7a2b]";
      default:
        return "bg-slate-600 text-slate-100 hover:bg-slate-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          <Compass className="h-5 w-5 text-[#e61a55]" />
          공연장 인터랙티브 맵
        </h2>
        <p className="text-xs text-slate-500">
          페스티벌 행사장의 주요 부대시설 및 스테이지 위치를 확인하려면 지도상의 마커를 클릭하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Render Map Box */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl overflow-hidden relative shadow-sm aspect-[4/3] w-full max-w-2xl mx-auto">
          {/* Aesthetic Background Grid lines to feel architectural */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70" />

          {/* Core SVG layout illustrating Stage Hill outline, Forest, Road */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-55" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Stage Green Area (Left hill) */}
            <path d="M 0 50 Q 20 20 50 45 T 100 30" fill="none" stroke="#39b54a" strokeWidth="0.7" strokeDasharray="3 3" />
            {/* Stage Rock Area (Right) */}
            <path d="M 0 70 Q 40 50 70 80 T 100 60" fill="none" stroke="#e61a55" strokeWidth="0.7" strokeDasharray="3 3" />
            {/* Pathway/Roadways */}
            <path d="M 50 100 L 50 0" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
            <path d="M 10 20 L 90 20" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
            <path d="M 15 70 L 85 70" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
          </svg>

          {/* Interactive Clickable Markers */}
          {ZONES.map((zone) => {
            const isSelected = selectedZone.id === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`absolute p-2.5 rounded-full transition-all duration-300 font-bold text-xs flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer ${getMarkerColor(
                  zone.type,
                  isSelected
                )}`}
                style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                title={zone.name}
              >
                {zone.type === "stage" ? (
                  <Landmark className="h-4.5 w-4.5" />
                ) : zone.type === "food" ? (
                  <Beer className="h-4.5 w-4.5" />
                ) : zone.type === "medical" ? (
                  <ShieldAlert className="h-4.5 w-4.5" />
                ) : (
                  <MapPin className="h-4.5 w-4.5" />
                )}
              </button>
            );
          })}

          {/* Overlay Map Label annotations for aesthetic flavor */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-400 tracking-widest uppercase font-bold">
            Map Grid Ref: Pentaport-Songdo-2026
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] text-slate-700 bg-white border border-slate-200 shadow-sm px-2.5 py-1 rounded">
            <Compass className="h-3 w-3 text-[#e61a55] animate-spin" />
            <span>상단: 북쪽 (NORTH HILL)</span>
          </div>
        </div>

        {/* Selected Zone Detail Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            {getZoneIcon(selectedZone.type)}
            <div>
              <h3 className="font-black text-slate-900 tracking-tight text-sm leading-tight">
                {selectedZone.name}
              </h3>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold font-mono block mt-0.5">
                {selectedZone.type === "stage"
                  ? "Performance Stage"
                  : selectedZone.type === "food"
                  ? "F&B Area"
                  : selectedZone.type === "medical"
                  ? "Emergency & Safety"
                  : "Facility & Service"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {selectedZone.description}
            </p>

            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                주요 세부 시설 / 운영 품목:
              </span>
              <ul className="space-y-1">
                {selectedZone.facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e61a55] shrink-0" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-start gap-2">
            <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-[10px] text-slate-500 leading-normal font-medium">
              현장 대형 이정표와 안내판에 표시된 컬러 코드를 참고하시면 보다 빠르게 길을 찾을 수 있습니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
