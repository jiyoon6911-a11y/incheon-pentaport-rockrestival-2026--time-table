import { Artist, Stage, FestivalDay } from "../types";

export const FESTIVAL_DAYS: FestivalDay[] = [
  { id: "day1", name: "8/1 (FRI)", date: "2026-08-01" },
  { id: "day2", name: "8/2 (SAT)", date: "2026-08-02" },
  { id: "day3", name: "8/3 (SUN)", date: "2026-08-03" }
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
  // ==========================================
  // DAY 1 (8/1 FRI)
  // ==========================================
  // KB STARSHOP STAGE
  {
    id: "k1-d1",
    name: "MEANINGFUL STONE (김뜻돌)",
    genre: "Indie Rock / Alternative",
    startTime: "12:00",
    endTime: "12:40",
    description: "독특하고 날것의 인디 감성과 강력한 사회적 가사를 위트 넘치게 빚어내는 싱어송라이터.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k2-d1",
    name: "REDOOR (리도어)",
    genre: "Alternative Rock",
    startTime: "13:10",
    endTime: "13:50",
    description: "서정적인 멜로디와 호소력 짙은 보컬, 몰입도 높은 사운드로 마음을 울리는 차세대 얼터너티브 락 밴드.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k3-d1",
    name: "NERD CONNECTION (너드커넥션)",
    genre: "Britpop / Indie Rock",
    startTime: "14:20",
    endTime: "15:00",
    description: "단단하고 세련된 브릿팝 사운드와 함께 청중을 압도하는 보컬 멜로디로 대규모 떼창을 선사하는 밴드.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k4-d1",
    name: "TOUCHED (터치드)",
    genre: "Hard Rock",
    startTime: "15:40",
    endTime: "16:30",
    description: "보컬 윤민의 한계 없는 가창력과 압도적인 사운드로 관객의 시선을 강제로 훔쳐내는 완성형 하드 락 퍼포머.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k5-d1",
    name: "LITTLE SIMZ",
    genre: "Hip-Hop / Rap",
    startTime: "17:10",
    endTime: "18:10",
    description: "영국 런던 출신의 글로벌 탑 티어 래퍼. 깊이 있는 서사와 독보적인 라임, 무대를 지배하는 화려한 밴드 라이브 퍼포먼스.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k6-d1",
    name: "CHANG KIHA (장기하)",
    genre: "Alternative Rock / Synth Folk",
    startTime: "19:00",
    endTime: "20:00",
    description: "한국어의 독창적인 운율과 리듬을 탁월한 그루브로 녹여내 전 연령층을 열광시키는 천재 이야기꾼이자 프로듀서.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k7-d1",
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
    id: "i1-d1",
    name: "Dragon Pony (드래곤포니)",
    genre: "Modern Rock / Pop Rock",
    startTime: "11:30",
    endTime: "12:00",
    description: "청량하고 뜨거운 에너지를 노래하며 페스티벌의 시작을 기분 좋게 열어줄 슈퍼 루키 모던 락 밴드.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i2-d1",
    name: "THE BOWLS (더 보울스)",
    genre: "Psychedelic / Garage Rock",
    startTime: "12:40",
    endTime: "13:10",
    description: "60-70년대 빈티지 락 스타일을 세련되게 변형하여 특유의 나른하고 강렬한 사이키델릭 감성을 뽐내는 실력파.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i3-d1",
    name: "QWER (큐더블유이알)",
    genre: "J-Rock Style Pop Punk",
    startTime: "13:50",
    endTime: "14:20",
    description: "탄탄한 성장을 보이며 대중의 큰 사랑을 받고 있는 올 비주얼 걸밴드, 가슴 벅찬 캐치한 팝 펑크 선율의 대향연.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i4-d1",
    name: "當代電影大師 (Modern Cinema Master)",
    genre: "Post-Punk / Indie Rock",
    startTime: "15:00",
    endTime: "15:40",
    description: "대만 타이베이 출신의 포스트 펑크 밴드. 거칠고 시니컬한 가사 속 가슴 뛰는 리듬과 독창적인 기타 톤이 매력.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i5-d1",
    name: "bongjeingan (봉제인간)",
    genre: "Experimental / Psychedelic Rock",
    startTime: "16:30",
    endTime: "17:10",
    description: "장기하와 얼굴들 출신 지윤해를 필두로 결성된 3인조 초강력 연주 밴드. 타이트한 리듬 섹션 위에 얹어지는 무아지경의 노이즈 잼.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i6-d1",
    name: "Tempalay (템플레이)",
    genre: "Neo-Psychedelic / Synth-Pop",
    startTime: "18:10",
    endTime: "19:00",
    description: "기묘하면서도 중독적인 멜로디, 부유하는 듯한 독보적인 우주적 감각으로 글로벌 음악 씬을 놀라게 한 일본의 대세 3인조.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "i7-d1",
    name: "CRYING NUT (크라잉넛)",
    genre: "Punk Rock",
    startTime: "20:00",
    endTime: "21:00",
    description: "한국 인디 1세대 펑크 락의 시조새이자 여전히 대한민국 축제 섭외 0순위를 자랑하는 영원한 청춘 '말달리자' 주역.",
    stageId: "incheon",
    dayId: "day1"
  },

  // INCHEON AIRPORT STAGE
  {
    id: "a1-d1",
    name: "kimseungjoo (김승주)",
    genre: "Folk Rock / Acoustic",
    startTime: "12:00",
    endTime: "12:30",
    description: "맑고 편안한 보이스와 감정선 깊은 포크 멜로디로 지친 마음에 산뜻한 쉼터를 선물하는 라이징 싱어송라이터.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "a2-d1",
    name: "HYANG (향)",
    genre: "Dream Pop / Shoegaze",
    startTime: "13:00",
    endTime: "13:30",
    description: "아련하고 몽환적인 공간감 위에 얹어진 쓸쓸하면서도 낭만적인 멜로디의 슈게이징 신성.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "a3-d1",
    name: "CATCH THE YOUNG (캐치더영)",
    genre: "Pop Rock",
    startTime: "14:00",
    endTime: "14:30",
    description: "찬란하고 파릇파릇한 청춘의 소중한 순간들을 경쾌하고 밝은 연주로 표현하는 보이 밴드.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "a4-d1",
    name: "TheyNeverChange",
    genre: "Melodic Hardcore / Emo",
    startTime: "15:10",
    endTime: "15:40",
    description: "강렬하고 날카로운 디스토션과 대비되는 서정적이고 절박한 하모니가 무대를 가득 채우는 하드코어 신예.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "a5-d1",
    name: "Rolling Quartz (롤링쿼츠)",
    genre: "Hard Rock / Heavy Metal",
    startTime: "16:10",
    endTime: "16:40",
    description: "국내외 두터운 팬덤을 형성한 파워풀한 여성 5인조 하드 락 밴드. 시선을 잡아끄는 메탈 리프와 카리스마 보컬.",
    stageId: "incheon-airport",
    dayId: "day1"
  },

  // ==========================================
  // DAY 2 (8/2 SAT)
  // ==========================================
  // KB STARSHOP STAGE
  {
    id: "k1-d2",
    name: "KARDI (카디)",
    genre: "Alternative Rock / Band",
    startTime: "12:00",
    endTime: "12:40",
    description: "거문고와 락 사운드의 강렬한 만남, 유니크하고 중독적인 사운드로 무대를 휘잡는 밴드.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k2-d2",
    name: "Galaxy Express (갤럭시 익스프레스)",
    genre: "Garage Rock / Punk Rock",
    startTime: "13:10",
    endTime: "13:50",
    description: "탈우주급 에너지를 뿜어내는 대한민국 대표 개러지 락의 자존심. 브레이크 없는 펑크 질주!",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k3-d2",
    name: "Omoinotake",
    genre: "J-Pop / City Pop",
    startTime: "14:30",
    endTime: "15:10",
    description: "감성적인 소울과 세련된 피아노 팝 사운드로 일본 열도와 국내 팬들을 매료시킨 대세 트리오.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k4-d2",
    name: "ADOY",
    genre: "Synth-pop / Indie Pop",
    startTime: "15:50",
    endTime: "16:30",
    description: "청춘의 밤, 사랑, 꿈의 잔상을 신스팝 선율 위에 그려내는 한국 시티팝/신스팝의 대표 주자.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k5-d2",
    name: "Glen Check (글렌체크)",
    genre: "Electronic Rock / Synth-pop",
    startTime: "17:10",
    endTime: "18:00",
    description: "끊임없이 진화하는 일렉트로닉 락 사운드. 페스티벌을 순식간에 대형 댄스 플로어로 뒤바꾸는 장인들.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k6-d2",
    name: "HYUKOH & SUNSET ROLLERCOASTER",
    genre: "Alternative Rock / Indie Pop",
    startTime: "18:50",
    endTime: "20:00",
    description: "아시아 인디 씬을 대표하는 두 거장의 만남. 낭만과 청춘, 몽환적인 감성의 극한을 선사하는 특별한 협업 무대.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k7-d2",
    name: "Pulp",
    genre: "Britpop / Alternative Rock",
    startTime: "21:00",
    endTime: "22:30",
    description: "영국의 전설적인 브릿팝 거장. 보컬 자비스 코커의 치명적 위트와 감성을 느낄 수 있는 토요일 피날레 헤드라이너!",
    stageId: "kb-starshop",
    dayId: "day2"
  },

  // INCHEON STAGE
  {
    id: "i1-d2",
    name: "다양성",
    genre: "Modern Rock / Indie Pop",
    startTime: "11:30",
    endTime: "12:00",
    description: "일상 속 다양한 감정을 산뜻하고 섬세한 모던 락 사운드로 채워가는 감성 인디 밴드.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "i2-d2",
    name: "BABO",
    genre: "Pop Rock / Indie",
    startTime: "12:40",
    endTime: "13:10",
    description: "유쾌한 에너지와 중독적인 그루브로 어깨를 들썩이게 만드는 유쾌한 청춘 밴드.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "i3-d2",
    name: "소음발광",
    genre: "Punk Rock / Noise Rock",
    startTime: "13:50",
    endTime: "14:30",
    description: "가슴 속 뜨거운 무언가를 시원하게 터트리는 폭발적인 소음과 날것 그대로의 펑크 에너지를 노래하는 팀.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "i4-d2",
    name: "단편선 순간들",
    genre: "Psychedelic Folk / Experimental",
    startTime: "15:10",
    endTime: "15:50",
    description: "독보적인 아우라와 가청 능력을 초월한 주술적 사운드로 압도적 몰입감을 선사하는 실험적 혼성 밴드.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "i5-d2",
    name: "바이 바이 배드맨",
    genre: "Synth-pop / Indie Rock",
    startTime: "16:30",
    endTime: "17:10",
    description: "영국 매드체스터 사운드를 트렌디하게 재해석해 아련하고 청량한 드림팝의 극치를 선사하는 밴드.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "i6-d2",
    name: "kanekoayano",
    genre: "J-Folk / Indie Rock",
    startTime: "18:00",
    endTime: "18:50",
    description: "날카로우면서도 따스한 감성, 특유의 단단하고 강한 보컬로 노래하는 일본의 대표 싱어송라이터.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "i7-d2",
    name: "메써드",
    genre: "Thrash Metal",
    startTime: "20:00",
    endTime: "21:00",
    description: "대한민국 스래쉬 메탈의 자존심. 한치의 오차도 없는 초강력 헤드뱅잉과 메탈 리프의 향연.",
    stageId: "incheon",
    dayId: "day2"
  },

  // INCHEON AIRPORT STAGE
  {
    id: "a1-d2",
    name: "creespy",
    genre: "Pop Punk",
    startTime: "11:30",
    endTime: "12:00",
    description: "톡 쏘는 탄산처럼 짜릿하고 활기찬 리듬으로 무대를 유쾌하게 채워나가는 팝 펑크 루키.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "a2-d2",
    name: "비공정",
    genre: "Alternative Rock",
    startTime: "12:30",
    endTime: "13:00",
    description: "하늘을 나는 비행선처럼 자유롭고 웅장한 사운드 텍스쳐를 선보이는 얼터너티브 밴드.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "a3-d2",
    name: "오마르와 동방전력",
    genre: "World Music / Psychedelic Rock",
    startTime: "13:30",
    endTime: "14:10",
    description: "모로코 출신의 오마르를 필두로 아프리칸 비트와 아시아 감성이 결합된 독창적인 사이키델릭 월드 뮤직.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "a4-d2",
    name: "서울전자음악단",
    genre: "Psychedelic Rock / Blues Rock",
    startTime: "14:50",
    endTime: "15:30",
    description: "한국 대중음악사에 굵은 족적을 남긴 거장 신윤철의 정교하고 아름다운 블루스-사이키델릭 사운드.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "a5-d2",
    name: "로다운 30",
    genre: "Blues Rock / Alternative",
    startTime: "16:10",
    endTime: "16:50",
    description: "묵직하고 원초적인 기타 리프와 미니멀하고 그루비한 리듬으로 블루스의 묵직함을 말하는 트리오.",
    stageId: "incheon-airport",
    dayId: "day2"
  },

  // ==========================================
  // DAY 3 (8/3 SUN)
  // ==========================================
  // KB STARSHOP STAGE
  {
    id: "k1-d3",
    name: "윤마치",
    genre: "Synth-pop / R&B",
    startTime: "12:00",
    endTime: "12:40",
    description: "세련되고 트렌디한 보이스와 감각적인 프로듀싱으로 주목받는 차세대 팝 아티스트.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k2-d3",
    name: "한로로",
    genre: "Indie Rock / Modern Rock",
    startTime: "13:10",
    endTime: "13:50",
    description: "이 시대 청춘들의 아픔과 위로를 담은 서정적인 가사와 폭발적인 락 스피릿으로 주목받는 신성.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k3-d3",
    name: "AUDREY NUNA",
    genre: "Alternative R&B / Hip-Hop",
    startTime: "14:30",
    endTime: "15:10",
    description: "전 세계 음악 씬이 주목하는 독보적인 그루브와 카리스마 넘치는 플로우를 선보이는 한국계 미국인 아티스트.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k4-d3",
    name: "Balming Tiger (Band Set)",
    genre: "Alternative K-Pop / Hip-hop",
    startTime: "15:50",
    endTime: "16:40",
    description: "전 세계가 주목하는 얼터너티브 다국적 크리에이티브 집단. 이번 무대는 특별히 풍성한 밴드 셋 라이브로 선사합니다!",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k5-d3",
    name: "이승윤",
    genre: "Indie Rock / Pop Rock",
    startTime: "17:20",
    endTime: "18:10",
    description: "정형화되지 않은 장르와 깊고 날카로운 통찰력을 노래하는 아티스트. 압도적인 무대 장악력과 떼창의 제왕.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k6-d3",
    name: "자우림",
    genre: "Alternative Rock / Modern Rock",
    startTime: "19:00",
    endTime: "20:00",
    description: "대한민국 락의 아이콘이자 위대한 밴드. 세대를 초월해 관객의 목소리를 터뜨릴 자우림만의 찬란하고 눈부신 라이브 페스티벌!",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k7-d3",
    name: "BECK",
    genre: "Alternative / Indie Rock",
    startTime: "21:00",
    endTime: "22:20",
    description: "그래미 어워드를 휩쓴 전 세계 얼터너티브 락의 선구자이자 팝의 천재 아티스트. 드디어 한국 펜타포트에 전격 상륙하는 최종 헤드라이너!",
    stageId: "kb-starshop",
    dayId: "day3"
  },

  // INCHEON STAGE
  {
    id: "i1-d3",
    name: "극동아시아타이거즈",
    genre: "Punk Rock / Modern Rock",
    startTime: "11:30",
    endTime: "12:00",
    description: "터프하고 날렵한 드럼 비트와 시원한 연주로 뜨거운 호랑이의 기운을 불어넣는 인디 락 밴드.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "i2-d3",
    name: "송소희",
    genre: "Crossover / Gugak Pop",
    startTime: "12:40",
    endTime: "13:10",
    description: "전통 국악의 정교함을 바탕으로 현대적인 팝 사운드를 더해 신비로운 크로스오버 라이브를 선보이는 아티스트.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "i3-d3",
    name: "Brandy Senki",
    genre: "J-Rock / Alternative Rock",
    startTime: "13:50",
    endTime: "14:30",
    description: "독보적인 청량감과 속도감 넘치는 리프를 선보이는 일본의 차세대 여성 보컬 라이징 밴드.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "i4-d3",
    name: "LUCY",
    genre: "Pop Band / Classic Crossover",
    startTime: "15:10",
    endTime: "15:50",
    description: "청명한 바이올린 선율과 드라마틱한 곡 전개로 기분 좋은 벅차오름과 소년미 넘치는 라이브를 들려주는 밴드.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "i5-d3",
    name: "Touché Amoré",
    genre: "Post-Hardcore / Emo",
    startTime: "16:40",
    endTime: "17:20",
    description: "거칠고 절규하는 보컬 뒤로 펼쳐지는 촘촘하고 감정선 깊은 포스트 하드코어 사운드의 진수.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "i6-d3",
    name: "김민규 (델리스파이스, 스위트피)",
    genre: "Modern Rock / Indie Pop",
    startTime: "18:10",
    endTime: "19:00",
    description: "90년대 한국 인디 팝/모던 락의 명가 델리스파이스와 스위트피를 아우르며, 시대를 초월해 아련한 위로를 선물하는 음악 거장.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "i7-d3",
    name: "3호선 버터플라이",
    genre: "Indie Rock / Dream Pop",
    startTime: "20:00",
    endTime: "21:00",
    description: "몽환적이고 실험적인 노이즈 위에 얹어지는 아름다운 사이키델릭 드림 팝의 역사적 밴드.",
    stageId: "incheon",
    dayId: "day3"
  },

  // INCHEON AIRPORT STAGE
  {
    id: "a1-d3",
    name: "심아일랜드",
    genre: "Dream Pop / Shoegaze",
    startTime: "12:00",
    endTime: "12:30",
    description: "섬 같은 고요함 속에 깊이 있는 감성을 켜켜이 쌓아 신비롭고 맑은 우주로 인도하는 드림팝 밴드.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "a2-d3",
    name: "컨파인드 화이트",
    genre: "Alternative Rock",
    startTime: "13:00",
    endTime: "13:30",
    description: "가공되지 않은 와일드한 에너지와 묵직한 하모니로 긴장감 도는 그런지 사운드를 들려주는 루키.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "a3-d3",
    name: "데카당",
    genre: "Art Rock / Soul Punk",
    startTime: "14:00",
    endTime: "14:30",
    description: "치밀하고 감각적인 연주 위에 낭만과 파격을 넘나드는 보컬 연출로 연주의 정점을 수놓는 독창적 아트 락 밴드.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "a4-d3",
    name: "Milledenials",
    genre: "Shoegaze / Noise Pop",
    startTime: "15:00",
    endTime: "15:40",
    description: "인도네시아 출신의 대세 슈게이징 신성. 아련한 노이즈와 청량한 보컬로 공간을 채우는 글로벌 신예.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "a5-d3",
    name: "밀레나",
    genre: "Dream Pop / Ambient Folk",
    startTime: "16:10",
    endTime: "16:40",
    description: "한 줄기 온기처럼 스며드는 포근한 목소리와 미니멀하고 서정적인 사운드로 치유의 순간을 건네는 싱어송라이터.",
    stageId: "incheon-airport",
    dayId: "day3"
  }
];
