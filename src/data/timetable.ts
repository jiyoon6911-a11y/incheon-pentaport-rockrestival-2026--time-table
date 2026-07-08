import { Artist, Stage, FestivalDay } from "../types";

export const FESTIVAL_DAYS: FestivalDay[] = [
  { id: "day1", name: "8/1 (FRI)", date: "2026-08-01" }
];

export const STAGES: Stage[] = [
  {
    id: "kb-starshop",
    name: "KB STARSHOP STAGE",
    color: "lime",
    description: "KB국민카드 STARSHOP STAGE - 페스티벌 최대 메인 무대"
  },
  {
    id: "incheon",
    name: "INCHEON STAGE",
    color: "pink",
    description: "INCHEON STAGE - 국내외 정상이 보여주는 파워풀한 서브 무대"
  },
  {
    id: "incheon-airport",
    name: "AIRPORT STAGE",
    color: "cyan",
    description: "INCHEON AIRPORT STAGE - 신선하고 트렌디한 글로벌 신예 아티스트들의 스테이지"
  }
];

export const ARTISTS: Artist[] = [
  // KB STARSHOP STAGE (KB_KOOKMIN_CARD_STARSHOP_STAGE)
  {
    id: "k1",
    name: "MEANINGFUL STONE (김뜻돌)",
    genre: "Indie Rock / Alternative",
    startTime: "12:00",
    endTime: "12:40",
    description: "독특하고 날것의 인디 감성과 강력한 사회적 가사를 위트 넘치게 빚어내는 싱어송라이터.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k2",
    name: "REDOOR (리도어)",
    genre: "Alternative Rock",
    startTime: "13:10",
    endTime: "13:50",
    description: "서정적인 멜로디와 호소력 짙은 보컬, 몰입도 높은 사운드로 마음을 울리는 차세대 얼터너티브 락 밴드.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k3",
    name: "NERD CONNECTION (너드커넥션)",
    genre: "Britpop / Indie Rock",
    startTime: "14:20",
    endTime: "15:00",
    description: "단단하고 세련된 브릿팝 사운드와 함께 청중을 압도하는 보컬 멜로디로 대규모 떼창을 선사하는 밴드.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k4",
    name: "TOUCHED (터치드)",
    genre: "Hard Rock",
    startTime: "15:40",
    endTime: "16:30",
    description: "보컬 윤민의 한계 없는 가창력과 압도적인 사운드로 관객의 시선을 강제로 훔쳐내는 완성형 하드 락 퍼포머.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k5",
    name: "LITTLE SIMZ",
    genre: "Hip-Hop / Rap",
    startTime: "17:10",
    endTime: "18:10",
    description: "영국 런던 출신의 글로벌 탑 티어 래퍼. 깊이 있는 서사와 독보적인 라임, 무대를 지배하는 화려한 밴드 라이브 퍼포먼스.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k6",
    name: "CHANG KIHA (장기하)",
    genre: "Alternative Rock / Synth Folk",
    startTime: "19:00",
    endTime: "20:00",
    description: "한국어의 독창적인 운율과 리듬을 탁월한 그루브로 녹여내 전 연령층을 열광시키는 천재 이야기꾼이자 프로듀서.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k7",
    name: "ASIAN KUNG-FU GENERATION",
    genre: "J-Rock / Alternative",
    startTime: "21:10",
    endTime: "22:30",
    description: "수많은 애니메이션 오프닝과 히트곡을 탄생시키며 한 시대를 풍미한 전설적인 제이락 밴드, 대망의 8/1 피날레 헤드라이너!",
    stageId: "kb-starshop",
    dayId: "day1"
  },

  // INCHEON STAGE
  {
    id: "i1",
    name: "Dragon Pony (드래곤포니)",
    genre: "Modern Rock / Pop Rock",
    startTime: "11:30",
    endTime: "12:00",
    description: "청량하고 뜨거운 에너지를 노래하며 페스티벌의 시작을 기분 좋게 열어줄 슈퍼 루키 모던 락 밴드.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i2",
    name: "THE BOWLS (더 보울스)",
    genre: "Psychedelic / Garage Rock",
    startTime: "12:40",
    endTime: "13:10",
    description: "60-70년대 빈티지 락 스타일을 세련되게 변형하여 특유의 나른하고 강렬한 사이키델릭 감성을 뽐내는 실력파.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i3",
    name: "QWER (큐더블유이알)",
    genre: "J-Rock Style Pop Punk",
    startTime: "13:50",
    endTime: "14:20",
    description: "탄탄한 성장을 보이며 대중의 큰 사랑을 받고 있는 올 비주얼 걸밴드, 가슴 벅찬 캐치한 팝 펑크 선율의 대향연.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i4",
    name: "當代電影大師 (Modern Cinema Master)",
    genre: "Post-Punk / Indie Rock",
    startTime: "15:00",
    endTime: "15:40",
    description: "대만 타이베이 출신의 포스트 펑크 밴드. 거칠고 시니컬한 가사 속 가슴 뛰는 리듬과 독창적인 기타 톤이 매력.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i5",
    name: "bongjeingan (봉제인간)",
    genre: "Experimental / Psychedelic Rock",
    startTime: "16:30",
    endTime: "17:10",
    description: "장기하와 얼굴들 출신 지윤해를 필두로 결성된 3인조 초강력 연주 밴드. 타이트한 리듬 섹션 위에 얹어지는 무아지경의 노이즈 잼.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i6",
    name: "Tempalay (템플레이)",
    genre: "Neo-Psychedelic / Synth-Pop",
    startTime: "18:10",
    endTime: "19:00",
    description: "기묘하면서도 중독적인 멜로디, 부유하는 듯한 독보적인 우주적 감각으로 글로벌 음악 씬을 놀라게 한 일본의 대세 3인조.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i7",
    name: "CRYING NUT (크라잉넛)",
    genre: "Punk Rock",
    startTime: "20:00",
    endTime: "21:00",
    description: "한국 인디 1세대 펑크 락의 시조새이자 여전히 대한민국 축제 섭외 0순위를 자랑하는 영원한 청춘 '말달리자' 주역.",
    stageId: "incheon",
    dayId: "day1"
  },

  // INCHEON AIRPORT STAGE (INCHEON_AIRPORT_STAGE)
  {
    id: "a1",
    name: "kimseungjoo (김승주)",
    genre: "Folk Rock / Acoustic",
    startTime: "12:00",
    endTime: "12:30",
    description: "맑고 편안한 보이스와 감정선 깊은 포크 멜로디로 지친 마음에 산뜻한 쉼터를 선물하는 라이징 싱어송라이터.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "a2",
    name: "HYANG (향)",
    genre: "Dream Pop / Shoegaze",
    startTime: "13:00",
    endTime: "13:30",
    description: "아련하고 몽환적인 공간감 위에 얹어진 쓸쓸하면서도 낭만적인 멜로디의 슈게이징 신성.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "a3",
    name: "CATCH THE YOUNG (캐치더영)",
    genre: "Pop Rock",
    startTime: "14:00",
    endTime: "14:30",
    description: "찬란하고 파릇파릇한 청춘의 소중한 순간들을 경쾌하고 밝은 연주로 표현하는 보이 밴드.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "a4",
    name: "TheyNeverChange",
    genre: "Melodic Hardcore / Emo",
    startTime: "15:10",
    endTime: "15:40",
    description: "강렬하고 날카로운 디스토션과 대비되는 서정적이고 절박한 하모니가 무대를 가득 채우는 하드코어 신예.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "a5",
    name: "Rolling Quartz (롤링쿼츠)",
    genre: "Hard Rock / Heavy Metal",
    startTime: "16:10",
    endTime: "16:40",
    description: "국내외 두터운 팬덤을 형성한 파워풀한 여성 5인조 하드 락 밴드. 시선을 잡아끄는 메탈 리프와 카리스마 보컬.",
    stageId: "incheon-airport",
    dayId: "day1"
  }
];
