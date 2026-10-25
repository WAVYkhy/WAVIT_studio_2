// 포트폴리오 데이터를 관리하는 배열입니다.
// 새로운 영상이나 이미지를 추가하려면 아래 양식에 맞춰 내용을 추가하세요.
// date 속성은 "YYYY-MM-DD" 또는 "YYYY-MM" 형식으로 입력하면 날짜순 정렬 및 월별 구분에 반영됩니다.
// title 속성은 번역 없이 초기 입력값(단일 문자열) 그대로 사용됩니다.

const portfolioData = [
  // --- PV (유튜브 영상) ---
  {
    category: "pv",
    title: "truth - 에루",
    date: "2026-10-20",
    mediaUrl: "https://www.youtube.com/embed/yLWyPyALMLc?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/yLWyPyALMLc/hqdefault.jpg",
    videoUrl: "https://youtu.be/yLWyPyALMLc"
  },
  {
    category: "pv",
    title: "ニャニャニャチュニャ - 눅붕",
    date: "2026-09-28",
    mediaUrl: "https://www.youtube.com/embed/lfKXCWEUk6g?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/lfKXCWEUk6g/hqdefault.jpg",
    videoUrl: "https://youtu.be/lfKXCWEUk6g"
  },
  {
    category: "pv",
    title: "생일축하전파 -HBD- 912 - 0ml",
    date: "2026-09-12",
    mediaUrl: "https://www.youtube.com/embed/ZUceUkp0Wr8?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/ZUceUkp0Wr8/hqdefault.jpg",
    videoUrl: "https://youtu.be/ZUceUkp0Wr8"
  },
  {
    category: "pv",
    title: "青春のアーカイブ - 텐코 외 4인",
    date: "2026-08-30",
    mediaUrl: "https://www.youtube.com/embed/pRWgHJ5LLdY?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/pRWgHJ5LLdY/hqdefault.jpg",
    videoUrl: "https://youtu.be/pRWgHJ5LLdY"
  },
  {
    category: "pv",
    title: "プレイ (PLAY) - 에루",
    date: "2026-08-01",
    mediaUrl: "https://www.youtube.com/embed/MvwT41NCJnU?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/MvwT41NCJnU/hqdefault.jpg",
    videoUrl: "https://youtu.be/MvwT41NCJnU"
  },
  {
    category: "pv",
    title: "PPPP - 눅붕&위령",
    date: "2026-07-28",
    mediaUrl: "https://www.youtube.com/embed/SqpiqGoxbAk?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/SqpiqGoxbAk/hqdefault.jpg",
    videoUrl: "https://youtu.be/SqpiqGoxbAk"
  },
  {
    category: "pv",
    title: "水族館に行きたい - 0ml",
    date: "2026-07-20",
    mediaUrl: "https://www.youtube.com/embed/zRPeS4TlAJE?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/zRPeS4TlAJE/hqdefault.jpg",
    videoUrl: "https://youtu.be/zRPeS4TlAJE"
  },
  {
    category: "pv",
    title: "IO - 한이오",
    date: "2026-07-15",
    mediaUrl: "https://www.youtube.com/embed/dk6ztXNFmVw?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/dk6ztXNFmVw/hqdefault.jpg",
    videoUrl: "https://youtu.be/dk6ztXNFmVw"
  },
  {
    category: "pv",
    title: "なんでもにうむ - 0ml",
    date: "2026-06-25",
    mediaUrl: "https://www.youtube.com/embed/_CZxSnLBakA?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/_CZxSnLBakA/hqdefault.jpg",
    videoUrl: "https://youtu.be/_CZxSnLBakA"
  },
  {
    category: "pv",
    title: "피차일반 - 눅붕",
    date: "2026-06-10",
    mediaUrl: "https://www.youtube.com/embed/s5AKCJYuaw8?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/s5AKCJYuaw8/hqdefault.jpg",
    videoUrl: "https://youtu.be/s5AKCJYuaw8"
  },
  {
    category: "pv",
    title: "ただ君に晴れ (그저 네게 맑아라) - 해잉피",
    date: "2026-05-18",
    mediaUrl: "https://www.youtube.com/embed/M4Ml6dvuRlQ?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/M4Ml6dvuRlQ/hqdefault.jpg",
    videoUrl: "https://youtu.be/M4Ml6dvuRlQ"
  },

  // --- Live2D (유튜브 영상) ---
  {
    category: "live2d",
    title: "truth - 에루",
    date: "2026-10-20",
    mediaUrl: "https://www.youtube.com/embed/yLWyPyALMLc?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/yLWyPyALMLc/hqdefault.jpg",
    videoUrl: "https://youtu.be/yLWyPyALMLc"
  },
  {
    category: "live2d",
    title: "プレイ (PLAY) - 에루",
    date: "2026-08-01",
    mediaUrl: "https://www.youtube.com/embed/MvwT41NCJnU?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/MvwT41NCJnU/hqdefault.jpg",
    videoUrl: "https://youtu.be/MvwT41NCJnU"
  },
  {
    category: "live2d",
    title: "水族館に行きたい - 0ml",
    date: "2026-07-20",
    mediaUrl: "https://www.youtube.com/embed/zRPeS4TlAJE?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/zRPeS4TlAJE/hqdefault.jpg",
    videoUrl: "https://youtu.be/zRPeS4TlAJE"
  },

  // --- Thumbnail (이미지) ---
  {
    category: "thumbnail",
    title: "truth - 에루",
    date: "2026-10-20",
    mediaUrl: "https://img.youtube.com/vi/yLWyPyALMLc/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "ニャニャニャチュニャ - 눅붕",
    date: "2026-09-28",
    mediaUrl: "https://res.cloudinary.com/ddaeo1gux/image/upload/v1790586986/thumb_001_esxmcx.png"
  },
  {
    category: "thumbnail",
    title: "생일축하전파 -HBD- 912 - 0ml",
    date: "2026-09-12",
    mediaUrl: "https://img.youtube.com/vi/ZUceUkp0Wr8/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "青春のアーカイブ - 텐코 외 4인",
    date: "2026-08-30",
    mediaUrl: "https://img.youtube.com/vi/pRWgHJ5LLdY/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "プレイ (PLAY) - 에루",
    date: "2026-08-01",
    mediaUrl: "https://img.youtube.com/vi/MvwT41NCJnU/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "PPPP - 눅붕&위령",
    date: "2026-07-28",
    mediaUrl: "https://img.youtube.com/vi/SqpiqGoxbAk/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "水族館に行きたい - 0ml",
    date: "2026-07-20",
    mediaUrl: "https://img.youtube.com/vi/zRPeS4TlAJE/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "IO - 한이오",
    date: "2026-07-15",
    mediaUrl: "https://img.youtube.com/vi/dk6ztXNFmVw/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "なんでもにうむ - 0ml",
    date: "2026-06-25",
    mediaUrl: "https://img.youtube.com/vi/_CZxSnLBakA/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "ただ君に晴れ (그저 네게 맑아라) - 해잉피",
    date: "2026-05-18",
    mediaUrl: "https://img.youtube.com/vi/M4Ml6dvuRlQ/maxresdefault.jpg"
  }
];

/**
 * 아이템의 타이틀을 번역 없이 초기 입력값 그대로 반환하는 헬퍼 함수
 */
function getLocalizedTitle(item, lang = 'ko') {
  if (!item || !item.title) return '';
  if (typeof item.title === 'string') return item.title;
  return item.title['ko'] || item.title['ja'] || item.title['en'] || Object.values(item.title)[0] || '';
}
