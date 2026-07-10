import { Artist, Stage, FestivalDay } from "../types";

export const FESTIVAL_DAYS: FestivalDay[] = [
  { id: "day1", name: "7/31 (FRI)", date: "2026-07-31" },
  { id: "day2", name: "8/1 (SAT)", date: "2026-08-01" },
  { id: "day3", name: "8/2 (SUN)", date: "2026-08-02" }
];

export const STAGES: Stage[] = [
  {
    id: "kb-starshop",
    name: "KB KOOKMIN CARD STAGE",
    color: "yellow",
    description: "KB국민카드 KOOKMIN CARD STAGE - 페스티벌 최대 메인 무대"
  },
  {
    id: "incheon",
    name: "MONSTER ENERGY STAGE",
    color: "green",
    description: "MONSTER ENERGY STAGE - 강력하고 화려한 서브 무대"
  },
  {
    id: "incheon-airport",
    name: "STANLEY 1913 STAGE",
    color: "gray",
    description: "STANLEY 1913 STAGE - 감성 가득 개성 넘치는 스테이지"
  }
];

export const ARTISTS: Artist[] = [
  // ==========================================
  // DAY 1 (7/31 FRI)
  // ==========================================
  // KB KOOKMIN CARD STAGE
  {
    id: "k1-d1",
    name: "나상현씨밴드",
    genre: "Indie Rock / Modern Rock",
    startTime: "12:00",
    endTime: "12:40",
    description: "경쾌하고 유쾌한 모던 록 사운드로 일상 속 특별한 위로와 신선한 에너지를 노래하는 3인조 인기 밴드.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k2-d1",
    name: "QWER",
    genre: "J-Rock Style Pop Punk",
    startTime: "13:10",
    endTime: "13:50",
    description: "가슴 벅찬 선율과 청량한 감성으로 대중을 사로잡은 실력과 대세를 아우르는 최정상 걸밴드.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k3-d1",
    name: "브로큰 발렌타인",
    genre: "Post-Grunge / Hard Rock",
    startTime: "14:30",
    endTime: "15:10",
    description: "강렬한 포스트 그런지 사운드와 카리스마 넘치는 무대 매너로 마음을 사로잡는 하드 록의 명가.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k4-d1",
    name: "The Poles",
    genre: "Modern Rock / Dream Pop",
    startTime: "15:50",
    endTime: "16:30",
    description: "맑고 아련한 드림팝적 무드 위에 깊이 있는 사운드를 쌓아 올리는 김다니엘 중심의 록 밴드.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k5-d1",
    name: "쏜애플",
    genre: "Psychedelic Rock",
    startTime: "17:20",
    endTime: "18:10",
    description: "시적이고 독창적인 가사와 신비롭고 몽환적인 사이키델릭 연주로 독보적인 예술성을 보여주는 팀.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k6-d1",
    name: "더 발룬티어스",
    genre: "Grunge / Alternative Rock",
    startTime: "19:00",
    endTime: "20:00",
    description: "백예린을 필두로 거친 그런지 질감과 자유분방한 팝 감각을 압도적인 연주력으로 뿜어내는 밴드.",
    stageId: "kb-starshop",
    dayId: "day1"
  },
  {
    id: "k7-d1",
    name: "KHRUANGBIN",
    genre: "Psychedelic Funk / Instrumental",
    startTime: "21:10",
    endTime: "22:30",
    description: "텍사스 출신의 글로벌 사이키델릭 덥-펑크 트리오. 평화롭고 그루비한 이국적 연주로 한여름 밤을 홀릴 금요일 헤드라이너.",
    stageId: "kb-starshop",
    dayId: "day1"
  },

  // MONSTER ENERGY STAGE
  {
    id: "m1-d1",
    name: "심아일랜드",
    genre: "Dream Pop / Shoegaze",
    startTime: "11:30",
    endTime: "12:00",
    description: "부유하는 소리 입자들과 찬란한 멜로디로 투명하고 깊은 우주적 힐링을 선사하는 드림팝 라이징 스타.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "m2-d1",
    name: "신인류",
    genre: "Modern Rock / Pop Rock",
    startTime: "12:40",
    endTime: "13:10",
    description: "맑고 다사로운 온기처럼 스며드는 섬세한 선율และ 따뜻한 노랫말을 건네는 감성 모던 록 밴드.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "m3-d1",
    name: "MONO NO AWARE",
    genre: "J-Rock / Indie Pop",
    startTime: "13:50",
    endTime: "14:30",
    description: "도쿄 출신의 유니크한 제이록 밴드. 경쾌한 리듬 위에 얹힌 기발하고 위트 넘치는 송라이팅이 매력.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "m4-d1",
    name: "윤마치",
    genre: "Synth-pop / R&B",
    startTime: "15:10",
    endTime: "15:50",
    description: "도회적이고 매혹적인 보이스로 감각적인 신스팝과 알앤비를 노래하는 트렌디 라이징 아이콘.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "m5-d1",
    name: "키라라",
    genre: "Electronic",
    startTime: "16:30",
    endTime: "17:20",
    description: "‘키라라는 이쁩니다. 키라라는 음악을 합니다.’ 쉴 새 없이 몰아치는 강력한 일렉트로닉 비트와 아름다운 신스 멜로디.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "m6-d1",
    name: "The Lemon Twigs",
    genre: "Baroque Pop / Power Pop",
    startTime: "18:10",
    endTime: "19:00",
    description: "뉴욕 출신의 형제 듀오. 60-70년대 바로크 팝과 클래식 록의 찬란하고 드라마틱한 멜로디를 복원하는 천재들.",
    stageId: "incheon",
    dayId: "day1"
  },
  {
    id: "m7-d1",
    name: "Xdinary Heroes",
    genre: "K-Pop Rock / Alternative",
    startTime: "20:00",
    endTime: "21:00",
    description: "JYP 엔터테인먼트의 강력한 보이 밴드. 화려한 연주 테크닉과 압도적 록 보컬로 메탈릭한 매력을 발산.",
    stageId: "incheon",
    dayId: "day1"
  },

  // STANLEY 1913 STAGE
  {
    id: "s1-d1",
    name: "노이",
    genre: "Alternative Rock / Indie",
    startTime: "11:40",
    endTime: "12:10",
    description: "쓸쓸하지만 따뜻한 청춘의 파편들을 아날로그 질감의 감각적인 사운드로 섬세하게 어루만지는 밴드.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "s2-d1",
    name: "포져군단",
    genre: "Punk Rock",
    startTime: "12:40",
    endTime: "13:10",
    description: "날것 그대로의 거칠고 파워풀한 정통 펑크 록으로 무대 위에서 시원한 일탈을 부르짖는 팀.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "s3-d1",
    name: "피치트럭하이재커스",
    genre: "Ska Punk",
    startTime: "13:40",
    endTime: "14:10",
    description: "신나고 경쾌한 업비트 스카 펑크의 진수를 보여주며 관객을 쉼 없이 점프하게 만드는 흥 폭발 밴드.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "s4-d1",
    name: "향우회",
    genre: "Indie Rock",
    startTime: "14:40",
    endTime: "15:10",
    description: "친근하고 소박한 일상을 노래하며 듣는 이로 하여금 깊은 공감과 미소를 자아내게 만드는 팀.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "s5-d1",
    name: "SUMIN",
    genre: "Neo-Soul / K-R&B",
    startTime: "15:40",
    endTime: "16:20",
    description: "프로듀서이자 싱어송라이터. 네오 소울, K-팝, 일렉트로니카를 아우르며 가창력과 작곡력을 뽐내는 올라운더.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "s6-d1",
    name: "머드 더 스튜던트",
    genre: "Experimental Hip-hop",
    startTime: "16:50",
    endTime: "17:30",
    description: "독창적인 비트메이킹과 날카롭고 유니크한 가사로 힙합과 얼터너티브 록의 한계를 허무는 괴물 신예.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "s7-d1",
    name: "더 픽스",
    genre: "Alternative Metal",
    startTime: "18:00",
    endTime: "18:40",
    description: "여성 4인조 얼터너티브 메탈 밴드. 폭발적인 가창력과 세련된 연주로 짙은 어둠 속 카리스마를 완성.",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "s8-d1",
    name: "Flesh Juicer",
    genre: "Metalcore",
    startTime: "19:20",
    endTime: "20:00",
    description: "대만 출신의 초강력 메탈코어 밴드. 전통 요소와 헤비니스 사운드를 기막히게 융합해 혼을 쏙 빼놓는 헤드뱅잉 선사. (Curated by FireBall)",
    stageId: "incheon-airport",
    dayId: "day1"
  },
  {
    id: "s9-d1",
    name: "스탠리와 함께하는 펜타로빅 (w.김혜선)",
    genre: "Pentarobic Showcase",
    startTime: "20:30",
    endTime: "21:00",
    description: "스탠리와 함께 에너지 넘치는 댄스와 에어로빅으로 펜타포트의 밤을 한층 더 뜨겁게 불태우는 스페셜 타임!",
    stageId: "incheon-airport",
    dayId: "day1"
  },

  // ==========================================
  // DAY 2 (8/1 SAT)
  // ==========================================
  // KB KOOKMIN CARD STAGE
  {
    id: "k1-d2",
    name: "잭킹콩",
    genre: "Indie Pop / Soul",
    startTime: "12:00",
    endTime: "12:40",
    description: "나른하고 그루비한 소울과 재즈 팝 감성으로 여름날의 여유로움을 기분 좋게 노래하는 밴드.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k2-d2",
    name: "극동아시아타이거즈",
    genre: "Punk Rock / Modern Rock",
    startTime: "13:10",
    endTime: "13:50",
    description: "시원시원하고 거침없는 드럼 비트와 타이트한 리프로 록의 본질적인 짜릿함을 뿜어내는 정통 펑크 록 밴드.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k3-d2",
    name: "권진아",
    genre: "Pop / Ballad",
    startTime: "14:30",
    endTime: "15:10",
    description: "명품 가창력과 뛰어난 작사, 작곡 능력으로 깊은 발라드 감성부터 트렌디한 팝까지 완성도 높게 소화하는 보컬리스트.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k4-d2",
    name: "never young beach",
    genre: "J-Pop / Indie Pop",
    startTime: "15:50",
    endTime: "16:30",
    description: "도쿄 출신의 시티팝/인디팝 대표 밴드. 따뜻한 아날로그 사운드와 청량한 리듬으로 기분 좋은 파도 소리를 선사. (Curated by SPACE SHOWER)",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k5-d2",
    name: "이승윤",
    genre: "Indie Rock / Pop Rock",
    startTime: "17:10",
    endTime: "18:00",
    description: "음악적 고정관념을 파괴하며 종횡무진하는 자유로운 아티스트. 한 번 보면 잊을 수 없는 독보적인 열정의 퍼포머.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k6-d2",
    name: "혁오",
    genre: "Alternative Rock",
    startTime: "18:50",
    endTime: "20:00",
    description: "청춘의 아픔과 낭만을 날것 그대로의 얼터너티브 록 선율에 실어 시대를 위로하는 아이코닉 밴드.",
    stageId: "kb-starshop",
    dayId: "day2"
  },
  {
    id: "k7-d2",
    name: "MASSIVE ATTACK",
    genre: "Trip Hop / Electronic",
    startTime: "21:10",
    endTime: "22:40",
    description: "영국 트립합의 창시자이자 거장. 묵직하고 서늘한 베이스, 몽환적 영상 비주얼로 토요일 밤을 영원히 각인시킬 전설.",
    stageId: "kb-starshop",
    dayId: "day2"
  },

  // MONSTER ENERGY STAGE
  {
    id: "m1-d2",
    name: "하이파이유니콘",
    genre: "Pop Rock",
    startTime: "11:30",
    endTime: "12:00",
    description: "산뜻한 팝 멜로디와 하이 에너지를 가득 품은 청량 보컬로 국경을 넘어 큰 사랑을 받는 차세대 보이 밴드.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "m2-d2",
    name: "초록불꽃소년단",
    genre: "Punk Rock",
    startTime: "12:40",
    endTime: "13:10",
    description: "청량하고 에너제틱한 멜로딕 펑크 록으로 지치지 않는 청춘의 폭발하는 열망을 질주하듯 노래하는 팀.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "m3-d2",
    name: "세이수미",
    genre: "Surf Rock / Indie Rock",
    startTime: "13:50",
    endTime: "14:30",
    description: "부산을 기반으로 세계적인 인기를 끄는 서프 록/인디 팝 밴드. 노스탤지어 넘치는 따사롭고 청량한 해변의 분위기.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "m4-d2",
    name: "Song Dongye",
    genre: "Chinese Folk / Ballad",
    startTime: "15:10",
    endTime: "15:50",
    description: "대만의 깊이 있는 감성을 대변하는 거장 포크 싱어송라이터. 묵직하고 담담한 저음으로 서정적인 수채화를 그리는 목소리.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "m5-d2",
    name: "Isyana Sarasvati",
    genre: "Crossover Progressive / Rock",
    startTime: "16:30",
    endTime: "17:10",
    description: "인도네시아의 국민 가수로, 클래식 오페라부터 헤비메탈을 융합한 프로그레시브 록까지 한계 없는 장르 파괴자. (Curated by LaLaLa Fest)",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "m6-d2",
    name: "장필순",
    genre: "Folk Rock",
    startTime: "18:00",
    endTime: "18:50",
    description: "한국 대중음악 역사에 길이 남을 영원한 포크의 대모. 바람과 햇살을 닮은 깊고 아련한 음색으로 영혼을 정화하는 라이브.",
    stageId: "incheon",
    dayId: "day2"
  },
  {
    id: "m7-d2",
    name: "The Jesus and Mary Chain",
    genre: "Shoegaze / Noise Rock",
    startTime: "20:00",
    endTime: "21:00",
    description: "노이즈 팝 and 슈게이징의 살아있는 역사이자 교과서. 피드백 노이즈와 아름다운 멜로디가 공존하는 거장의 귀환.",
    stageId: "incheon",
    dayId: "day2"
  },

  // STANLEY 1913 STAGE
  {
    id: "s1-d2",
    name: "릴리 잇 머신",
    genre: "Alternative Rock",
    startTime: "11:40",
    endTime: "12:10",
    description: "공상과학적인 사운드 이펙트와 얼터너티브 록의 야성적인 연주가 기막히게 맞물린 독창적 라이징 스타.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "s2-d2",
    name: "청요일",
    genre: "Garage Punk",
    startTime: "12:40",
    endTime: "13:10",
    description: "거칠고 반항적인 차고지 감성의 개러지 펑크로 질주하며 스트레스를 단숨에 날려버리는 에너지 넘치는 밴드.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "s3-d2",
    name: "산보",
    genre: "Indie Rock",
    startTime: "13:40",
    endTime: "14:10",
    description: "나른한 햇살 아래 산책하듯 다채롭고 친근한 팝 록 선율을 기분 좋게 연주하는 팀.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "s4-d2",
    name: "우륵과 풍각쟁이들",
    genre: "Psychedelic Folk",
    startTime: "14:40",
    endTime: "15:10",
    description: "한국의 토속적인 해학과 정취를 날카로운 사이키델릭 포크로 빚어내는 전무후무한 개성파 액트.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "s5-d2",
    name: "baan",
    genre: "Indie Rock",
    startTime: "15:40",
    endTime: "16:20",
    description: "차가우면서도 서정적인 우울함을 겹겹이 쌓아 올려 웅장하고 깊은 감동을 안겨주는 인디 록 밴드.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "s6-d2",
    name: "TURTLE ISLAND",
    genre: "Punk / World Music",
    startTime: "17:00",
    endTime: "17:40",
    description: "전 세계 민속 음악 리듬과 펑크 록의 무아지경 폭동 같은 에너지를 융합해 축제판을 완성하는 일본의 대형 퍼포머.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "s7-d2",
    name: "할로우 잰",
    genre: "Post-Rock / Post-Hardcore",
    startTime: "18:10",
    endTime: "18:50",
    description: "감정을 극단으로 몰아붙이는 절규의 스크리밍과 웅장한 포스트 록 사운드로 슬픔을 정화하는 독보적 포스트 하드코어.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "s8-d2",
    name: "the geeks",
    genre: "Hardcore Punk",
    startTime: "19:20",
    endTime: "20:00",
    description: "한국 하드코어 펑크의 글로벌 프론티어. 무대 위아래 경계를 지우고 모두를 스테이지 다이빙으로 이끄는 열광의 팀.",
    stageId: "incheon-airport",
    dayId: "day2"
  },
  {
    id: "s9-d2",
    name: "스탠리와 함께하는 펜타로빅 (w.김혜선)",
    genre: "Pentarobic Showcase",
    startTime: "20:30",
    endTime: "21:00",
    description: "스탠리와 함께 에너지 넘치는 댄스와 에어로빅으로 펜타포트의 밤을 한층 더 뜨겁게 불태우는 스페셜 타임!",
    stageId: "incheon-airport",
    dayId: "day2"
  },

  // ==========================================
  // DAY 3 (8/2 SUN)
  // ==========================================
  // KB KOOKMIN CARD STAGE
  {
    id: "k1-d3",
    name: "드래곤포니",
    genre: "Modern Rock / Pop Rock",
    startTime: "12:00",
    endTime: "12:40",
    description: "식지 않는 열망과 순수한 멜로디로 청춘의 빛나는 한 페이지를 힘찬 모던 록 사운드로 연주하는 괴물 루키.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k2-d3",
    name: "봉제인간",
    genre: "Experimental / Psychedelic Rock",
    startTime: "13:10",
    endTime: "13:50",
    description: "탄탄한 드럼과 베이스 위에 기타리스트 지윤해의 무아지경 사이키델릭 노이즈가 휘몰아치는 라이브 명물.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k3-d3",
    name: "HANA",
    genre: "Pop / Indie Pop",
    startTime: "14:30",
    endTime: "15:10",
    description: "청아하고 은은한 보이스와 감성 가득한 일기장 같은 노랫말로 위로를 건네는 싱어송라이터.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k4-d3",
    name: "리도어",
    genre: "Alternative Rock",
    startTime: "15:50",
    endTime: "16:30",
    description: "한 편의 서사시 같은 드라마틱한 전개와 절절한 보컬로 관객을 소름 돋게 만드는 얼터너티브 록 신성.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k5-d3",
    name: "터치드",
    genre: "Hard Rock",
    startTime: "17:10",
    endTime: "18:00",
    description: "카리스마 넘치는 보컬 윤민의 압도적 성량과 폭발하는 밴드 사운드로 무대를 빈틈없이 압도하는 명실상부한 대세.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k6-d3",
    name: "실리카겔",
    genre: "Indie Rock / Neo-Psychedelic",
    startTime: "18:50",
    endTime: "20:00",
    description: "시각과 청각을 완벽히 교란하는 혁신적인 비주얼 아트와 사이키델릭 노이즈로 현시점 한국 밴드씬의 최고 아이콘.",
    stageId: "kb-starshop",
    dayId: "day3"
  },
  {
    id: "k7-d3",
    name: "PIXIES",
    genre: "Alternative Rock",
    startTime: "21:10",
    endTime: "22:40",
    description: "너바나, 라디오헤드 등에 막대한 영향을 끼친 얼터너티브 록의 전설이자 시조새. 드디어 펜타포트의 일요일 밤을 장식할 대망의 피날레.",
    stageId: "kb-starshop",
    dayId: "day3"
  },

  // MONSTER ENERGY STAGE
  {
    id: "m1-d3",
    name: "컨파인드 화이트",
    genre: "Alternative Rock",
    startTime: "11:30",
    endTime: "12:00",
    description: "90년대 그란지 록의 와일드함과 묵직한 디스토션을 장착하여 무대를 흔들어놓는 루키 밴드.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "m2-d3",
    name: "다브다",
    genre: "Math Rock / Post-Rock",
    startTime: "12:40",
    endTime: "13:10",
    description: "유려한 타악 리듬과 독창적인 기타 탭핑이 엮어내는 화려하고 입체적인 매스 록/포스트 록의 최고봉.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "m3-d3",
    name: "백현진",
    genre: "Avant-Garde / Alternative",
    startTime: "13:50",
    endTime: "14:30",
    description: "미술, 연기를 넘나드는 예술가. 예측 불가능한 아방가르드한 그루브와 독보적인 감성 연출의 대가.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "m4-d3",
    name: "betcover!!",
    genre: "Avant-Prog / J-Rock",
    startTime: "15:10",
    endTime: "15:50",
    description: "일본 인디 씬에서 가장 뜨거운 천재 음악가 야나세 지로의 프로젝트. 재즈, 클래식, 록을 오가는 충격적인 무대 연출.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "m5-d3",
    name: "노이즈가든",
    genre: "Grunge / Heavy Rock",
    startTime: "16:30",
    endTime: "17:10",
    description: "대한민국 얼터너티브/헤비 록 역사에 위대한 이정표를 세운 전설의 컴백. 정교한 리프와 묵직한 에너지를 만나는 경이로운 기회.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "m6-d3",
    name: "Original Love",
    genre: "J-Pop / Shibuya-kei",
    startTime: "18:00",
    endTime: "18:50",
    description: "일본 시부야케이 팝의 시조새이자 살아있는 거장 다지마 타카오. 낭만적이고 소울풀한 그루브로 어른스러운 여름밤을 수놓을 팀.",
    stageId: "incheon",
    dayId: "day3"
  },
  {
    id: "m7-d3",
    name: "술탄 오브 더 디스코",
    genre: "Disco / Funk / Soul",
    startTime: "20:00",
    endTime: "21:00",
    description: "완벽한 소울/디스코 브라스 그루브와 코믹하면서도 완벽히 짜인 댄스 퍼포먼스로 모두를 춤추게 만드는 댄스 본능 밴드.",
    stageId: "incheon",
    dayId: "day3"
  },

  // STANLEY 1913 STAGE
  {
    id: "s1-d3",
    name: "Eddie and the Bricks",
    genre: "Alternative Rock",
    startTime: "11:40",
    endTime: "12:10",
    description: "탄탄하고 속도감 넘치는 개러지 록 비트 위에 경쾌한 에너지를 흘려보내는 영국 브릿 감성의 루키.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "s2-d3",
    name: "CASUALLY CONNECTED",
    genre: "Modern Rock",
    startTime: "12:40",
    endTime: "13:10",
    description: "우연한 만남처럼 찾아와 기분 좋은 여운을 남기는 청량하고 부드러운 모던 록 연주 밴드.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "s3-d3",
    name: "양정훈",
    genre: "Indie Folk / Singer-Songwriter",
    startTime: "13:40",
    endTime: "14:10",
    description: "가장 낮고 소박한 목소리로 삶의 가늘고 고귀한 감정들을 깊고 서글픈 멜로디로 노래하는 싱어송라이터.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "s4-d3",
    name: "감귤서리단",
    genre: "Indie Pop / Acoustic",
    startTime: "14:50",
    endTime: "15:20",
    description: "감귤밭의 바람처럼 산뜻하고 맑은 하모니로 어깨를 들썩이게 만드는 따스한 제주 감성 포크 팝 듀오.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "s5-d3",
    name: "Nyteh",
    genre: "Indie Rock",
    startTime: "15:50",
    endTime: "16:20",
    description: "차가운 신스 텍스처와 도회적인 밤의 열기를 대변하는 트렌디한 인디 록으로 주목받는 루키.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "s6-d3",
    name: "아시안 스파이스 하우스",
    genre: "Indie Rock",
    startTime: "17:00",
    endTime: "17:30",
    description: "동양적인 아련한 멜로디 라인과 서부 감성의 개러지 록 리프가 독특하게 조화된 매력 넘치는 개성 밴드.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "s7-d3",
    name: "팻햄스터 & 캉뉴",
    genre: "Pop Rock",
    startTime: "18:00",
    endTime: "18:40",
    description: "인디 록의 친근한 리듬 위에 유쾌하고 사랑스러운 팝 감성을 한 스푼 얹어 행복을 건네는 듀오.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "s8-d3",
    name: "이날치",
    genre: "Crossover Gugak Pop",
    startTime: "19:20",
    endTime: "20:00",
    description: "범 내려온다! 판소리와 중독적인 80년대 뉴웨이브 베이스 그루브를 결합하여 전 세계에 국악 신드롬을 몰고 온 장본인.",
    stageId: "incheon-airport",
    dayId: "day3"
  },
  {
    id: "s9-d3",
    name: "스탠리와 함께하는 펜타로빅 (w.김혜선)",
    genre: "Pentarobic Showcase",
    startTime: "20:30",
    endTime: "21:00",
    description: "스탠리와 함께 에너지 넘치는 댄스와 에어로빅으로 펜타포트의 밤을 한층 더 뜨겁게 불태우는 스페셜 타임!",
    stageId: "incheon-airport",
    dayId: "day3"
  }
];
