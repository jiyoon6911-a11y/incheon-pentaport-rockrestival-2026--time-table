import React, { useState } from "react";
import { BookOpen, Code, Database, Smartphone, Check, Copy } from "lucide-react";

export const DevSpecDoc: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const jsonExample = `{
  "stages": [
    {
      "id": "stage-green",
      "name": "GREEN STAGE",
      "color": "lime"
    }
  ],
  "artists": [
    {
      "id": "g1-5",
      "name": "라스트 익스플로전 (Last Explosion)",
      "genre": "Hard Rock / Metal",
      "startTime": "21:00",
      "endTime": "22:30",
      "description": "DAY 1 피날레를 장식할 하드 락 헤드라이너.",
      "stageId": "stage-green",
      "dayId": "day1"
    }
  ]
}`;

  const tsCodeExample = `// 1. 실시간 공연 현황 자동 전환 로직
import React, { useState, useEffect } from 'react';

// 시간 비교를 위해 'HH:MM' 단위를 분(minute)으로 환산하는 헬퍼 함수
const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const LiveStageMonitor = ({ artists, currentDayId }) => {
  const [currentTimeStr, setCurrentTimeStr] = useState("14:30"); // HH:MM 포맷

  // 클라이언트 브라우저 시간 동기화 이펙트 (1초 주기 체크)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setCurrentTimeStr(\`\${hh}:\${mm}\`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 현재 시간(currentTimeStr) 기준, 각 스테이지의 라이브 아티스트 조회
  const getLiveArtist = (stageId: string) => {
    const currentMins = timeToMinutes(currentTimeStr);
    
    return artists.find(artist => {
      if (artist.dayId !== currentDayId || artist.stageId !== stageId) return false;
      const startMins = timeToMinutes(artist.startTime);
      const endMins = timeToMinutes(artist.endTime);
      return currentMins >= startMins && currentMins < endMins;
    });
  };

  return (
    <div>{/* 라이브 대시보드 렌더링 */}</div>
  );
};

// 2. 15분 전 Web Notification 알림 예약 및 백그라운드 폴링
export const setupNotificationAlerts = (favorites, artists, currentTimeStr) => {
  if (Notification.permission !== "granted") return;

  const currentMins = timeToMinutes(currentTimeStr);

  favorites.forEach(fav => {
    if (!fav.alertEnabled) return;
    
    const artist = artists.find(a => a.id === fav.artistId);
    if (!artist) return;

    const startMins = timeToMinutes(artist.startTime);
    const diff = startMins - currentMins;

    // 정확히 시작 15분 전 도래 시 알림 전송 (폴링 내부에서 1회 트리거)
    if (diff === 15) {
      new Notification(\`🎸 페스티벌 알림\`, {
        body: \`잠시 후 15분 뒤에 \${artist.name} 공연이 시작됩니다! (\${artist.startTime})\`,
        icon: "/favicon.ico",
        silent: false
      });
      
      // 모바일 기기 진동 패턴 (Vibration API)
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  });
};`;

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-1">
        <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#e61a55]" />
          락 페스티벌 웹서비스 개발 가이드 & 스펙 문서
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          시니어 풀스택 개발자 및 UX 디자이너 관점에서 설계한 핵심 아키텍처와 구현 사양서입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-medium">
        {/* 1. DATA STRUCTURE */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Database className="h-5 w-5 text-[#f5a623]" />
            <h3 className="font-black text-slate-900 text-sm">1. 데이터 구조 (JSON Schema)</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            가볍고 빠른 조회를 위해 관계형 DB 스키마 대신 <strong>시간 연산(Time Math)이 즉각 가능하도록 최적화된 단일 문서 JSON 구조</strong>를 채택합니다.
            스테이지 매핑용 외래키와 시작/종료 문자열을 가집니다.
          </p>

          <div className="relative bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs text-slate-700 max-h-72 overflow-y-auto">
            <button
              onClick={() => copyToClipboard(jsonExample, "json")}
              className="absolute top-2.5 right-2.5 p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-all shadow-sm"
              title="코드 복사"
            >
              {copiedSection === "json" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <pre className="whitespace-pre-wrap">{jsonExample}</pre>
          </div>
        </div>

        {/* 3. TECHNOLOGY STACK */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Code className="h-5 w-5 text-[#39b54a]" />
            <h3 className="font-black text-slate-900 text-sm">3. 추천 기술 스택 조합</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            현장 관객들은 네트워크 환경이 불안정한 야외 페스티벌 장소에 있습니다. <strong>용량이 작고, 로딩이 수 밀리초 내외이며, 오프라인 작동성이 보장되는 초경량 클라이언트 중심 스택</strong>이 최선입니다.
          </p>

          <div className="space-y-3.5 pt-1">
            <div className="space-y-1">
              <span className="text-xs font-black text-slate-400 block uppercase font-mono">가장 추천하는 미니멀 조합:</span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <p className="text-xs text-indigo-600 font-bold">Vite + React (TypeScript) + Tailwind CSS</p>
                <ul className="text-[11px] text-slate-500 list-disc list-inside space-y-1 leading-relaxed">
                  <li><strong>최고 수준의 번들링 압축:</strong> 빌드 결과물이 수십 KB 수준으로 초고속 압축되어 모바일 로딩 시간 최소화.</li>
                  <li><strong>Tailwind CSS v4:</strong> JS에 스타일 번들을 섞지 않고 네이티브 CSS 번들로 압축되어 렌더링 성능 극대화.</li>
                  <li><strong>LocalStorage & Web Notification API:</strong> 별도의 서버 데이터베이스 비용이나 네트워크 연결 지연 없이 오프라인에서도 동작 가능.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-slate-400 block uppercase font-mono">완전 오프라인 대안 (최종 병기):</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                추후 모바일 PWA(Progressive Web App) 플러그인을 결합하여 <strong>인터넷망이 아예 안 터지는 페스티벌 깊은 산속이나 정체 구역에서도 구동 가능하도록 Service Worker 캐싱을 활성화</strong>하는 설계를 강력 추천합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CORE LOGIC */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm font-medium">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Code className="h-5 w-5 text-[#e61a55]" />
          <h3 className="font-black text-slate-900 text-sm">2. 실시간 자동 전환 & 15분 전 알림 구현 프론트엔드 핵심 로직</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          주기적인 <code className="bg-slate-100 px-1 py-0.5 rounded text-[#e61a55] font-bold">setInterval</code> 폴링(예: 30초 단위)을 활용해 현재 시각을 갱신하고,
          동시에 찜 목록(<code className="bg-slate-100 px-1 py-0.5 rounded text-[#e61a55] font-bold">LocalStorage</code> 캐싱 데이터)에 기록된 예정 공연 시작 15분 전 시점과 일치할 때
          브라우저 백그라운드 팝업 및 모바일 진동 패턴을 발동하는 견고한 로직 예시입니다.
        </p>

        <div className="relative bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs text-slate-700 max-h-96 overflow-y-auto">
          <button
            onClick={() => copyToClipboard(tsCodeExample, "ts")}
            className="absolute top-2.5 right-2.5 p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-all shadow-sm"
            title="코드 복사"
          >
            {copiedSection === "ts" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <pre className="whitespace-pre-wrap">{tsCodeExample}</pre>
        </div>
      </div>

      {/* 4. MOBILE LAYOUT */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm font-medium">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Smartphone className="h-5 w-5 text-[#e61a55]" />
          <h3 className="font-black text-slate-900 text-sm">4. 모바일 화면 최적화 UI/UX 레이아웃 설계안</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          페스티벌 관객은 햇빛 아래 서서 모바일을 한 손으로 들고 조작하는 극한의 사용자 환경을 가집니다. 따라서 다음과 같은 <strong>'원핸드 컨트롤(One-hand Control) 레이아웃'</strong>이 극도로 중요합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-black text-indigo-600 block font-mono">A. 핑거 프렌들리 상단 고정 헤더</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>현재 시간 표시기</strong>와 <strong>Day 1 / Day 2 퀵 전환 탭</strong>을 상단에 최우선 노출합니다. 사용자가 어떤 정보 영역에 도달해 있어도 언제든지 엄지손가락으로 탭 한 번에 일정을 조율할 수 있습니다.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-black text-indigo-600 block font-mono">B. 카드 형태의 수직 스크롤 타임라인</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              양옆으로 미끄러져 조작 오류가 잦은 복잡한 그리드 형태 대신, 모바일 기본 스크롤 습관에 충실한 <strong>수직 목록형 타임라인</strong>을 기본 제안합니다. 한눈에 아티스트 이름과 무대, 찜 상태가 명확한 크기로 들어옵니다.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-black text-indigo-600 block font-mono">C. 탭 바 기반 하단 내비게이션</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>실시간 라이브, 전체 타임테이블, 내 찜 목록, 지도</strong> 버튼을 하단에 엄지손가락이 닿기 쉬운 고정 탭 바 형태로 배치합니다. 스마트폰 한 손 조작만으로 전체 앱의 99% 사용률을 완전하게 커버합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
