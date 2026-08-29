// 포트폴리오 데이터를 관리하는 배열입니다.
// 새로운 영상이나 이미지를 추가하려면 아래 양식에 맞춰 내용을 추가하세요.
// title 속성은 번역 없이 초기 입력값(단일 문자열) 그대로 사용됩니다.

const portfolioData = [
  // --- PV (유튜브 영상) ---
  {
    category: "pv",
    title: "해잉피 - ただ君に晴れ (그저 네게 맑아라)",
    mediaUrl: "https://www.youtube.com/embed/M4Ml6dvuRlQ?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/M4Ml6dvuRlQ/hqdefault.jpg",
    videoUrl: "https://youtu.be/M4Ml6dvuRlQ"
  },
  {
    category: "pv",
    title: "눅붕 - 피차일반",
    mediaUrl: "https://www.youtube.com/embed/s5AKCJYuaw8?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/s5AKCJYuaw8/hqdefault.jpg",
    videoUrl: "https://youtu.be/s5AKCJYuaw8"
  },
  {
    category: "pv",
    title: "0ml - なんでもにうむ",
    mediaUrl: "https://www.youtube.com/embed/_CZxSnLBakA?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/_CZxSnLBakA/hqdefault.jpg",
    videoUrl: "https://youtu.be/_CZxSnLBakA"
  },
  {
    category: "pv",
    title: "한이오 - IO",
    mediaUrl: "https://www.youtube.com/embed/dk6ztXNFmVw?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/dk6ztXNFmVw/hqdefault.jpg",
    videoUrl: "https://youtu.be/dk6ztXNFmVw"
  },
  {
    category: "pv",
    title: "0ml - 水族館に行きたい",
    mediaUrl: "https://www.youtube.com/embed/zRPeS4TlAJE?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/zRPeS4TlAJE/hqdefault.jpg",
    videoUrl: "https://youtu.be/zRPeS4TlAJE"
  },
  {
    category: "pv",
    title: "눅붕&위령 - PPPP",
    mediaUrl: "https://www.youtube.com/embed/SqpiqGoxbAk?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/SqpiqGoxbAk/hqdefault.jpg",
    videoUrl: "https://youtu.be/SqpiqGoxbAk"
  },
  {
    category: "pv",
    title: "에루 - プレイ (PLAY)",
    mediaUrl: "https://www.youtube.com/embed/MvwT41NCJnU?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/MvwT41NCJnU/hqdefault.jpg",
    videoUrl: "https://youtu.be/MvwT41NCJnU"
  },

  // --- Live2D (유튜브 영상) ---
  {
    category: "live2d",
    title: "에루 - プレイ (PLAY)",
    mediaUrl: "https://www.youtube.com/embed/MvwT41NCJnU?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/MvwT41NCJnU/hqdefault.jpg",
    videoUrl: "https://youtu.be/MvwT41NCJnU"
  },
  {
    category: "live2d",
    title: "0ml - 水族館に行きたい",
    mediaUrl: "https://www.youtube.com/embed/zRPeS4TlAJE?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/zRPeS4TlAJE/hqdefault.jpg",
    videoUrl: "https://youtu.be/zRPeS4TlAJE"
  },

  // --- Thumbnail (이미지) ---
  {
    category: "thumbnail",
    title: "0ml - 水族館に行きたい",
    mediaUrl: "https://img.youtube.com/vi/zRPeS4TlAJE/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "0ml - なんでもにうむ",
    mediaUrl: "https://img.youtube.com/vi/_CZxSnLBakA/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "해잉피 - ただ君に晴れ (그저 네게 맑아라)",
    mediaUrl: "https://img.youtube.com/vi/M4Ml6dvuRlQ/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "눅붕&위령 - PPPP",
    mediaUrl: "https://img.youtube.com/vi/SqpiqGoxbAk/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "한이오 - IO",
    mediaUrl: "https://img.youtube.com/vi/dk6ztXNFmVw/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: "에루 - プレイ (PLAY)",
    mediaUrl: "https://img.youtube.com/vi/MvwT41NCJnU/maxresdefault.jpg"
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
