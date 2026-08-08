// 포트폴리오 데이터를 관리하는 배열입니다.
// 새로운 영상이나 이미지를 추가하려면 아래 양식에 맞춰 내용을 추가하세요.
// title 속성은 단일 문자열 또는 다국어 객체({ ko, ja, en }) 형식을 지원합니다.

const portfolioData = [
  // --- PV (유튜브 영상) ---
  {
    category: "pv",
    title: {
      ko: "해잉피 - ただ君に晴れ (그저 네게 맑아라)",
      ja: "해잉피 - ただ君に晴れ",
      en: "Haeingpi - Just a Sunny Day for You"
    },
    mediaUrl: "https://www.youtube.com/embed/M4Ml6dvuRlQ?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/M4Ml6dvuRlQ/hqdefault.jpg",
    videoUrl: "https://youtu.be/M4Ml6dvuRlQ"
  },
  {
    category: "pv",
    title: {
      ko: "눅붕 - 피차일반",
      ja: "눅붕 - ピチャイルバン (お互い様)",
      en: "Nukbung - Same Old Story"
    },
    mediaUrl: "https://www.youtube.com/embed/s5AKCJYuaw8?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/s5AKCJYuaw8/hqdefault.jpg",
    videoUrl: "https://youtu.be/s5AKCJYuaw8"
  },
  {
    category: "pv",
    title: {
      ko: "0ml - なんでもにうむ",
      ja: "0ml - なんでもにうむ",
      en: "0ml - Nandemonium"
    },
    mediaUrl: "https://www.youtube.com/embed/_CZxSnLBakA?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/_CZxSnLBakA/hqdefault.jpg",
    videoUrl: "https://youtu.be/_CZxSnLBakA"
  },
  {
    category: "pv",
    title: {
      ko: "한이오 - IO",
      ja: "한이오 - IO",
      en: "Han IO - IO"
    },
    mediaUrl: "https://www.youtube.com/embed/dk6ztXNFmVw?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/dk6ztXNFmVw/hqdefault.jpg",
    videoUrl: "https://youtu.be/dk6ztXNFmVw"
  },
  {
    category: "pv",
    title: {
      ko: "눅붕&위령 - PPPP",
      ja: "눅붕&위령 - PPPP",
      en: "Nukbung & Wiryung - PPPP"
    },
    mediaUrl: "https://www.youtube.com/embed/SqpiqGoxbAk?enablejsapi=1",
    thumbnailUrl: "https://img.youtube.com/vi/SqpiqGoxbAk/hqdefault.jpg",
    videoUrl: "https://youtu.be/SqpiqGoxbAk"
  },

  // --- Thumbnail (이미지) ---
  {
    category: "thumbnail",
    title: {
      ko: "0ml - なんでもにうむ",
      ja: "0ml - なんでもにうむ",
      en: "0ml - Nandemonium"
    },
    mediaUrl: "https://img.youtube.com/vi/_CZxSnLBakA/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: {
      ko: "해잉피 - ただ君に晴れ (그저 네게 맑아라)",
      ja: "해잉피 - ただ君に晴れ",
      en: "Haeingpi - Just a Sunny Day for You"
    },
    mediaUrl: "https://img.youtube.com/vi/M4Ml6dvuRlQ/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: {
      ko: "눅붕&위령 - PPPP",
      ja: "눅붕&위령 - PPPP",
      en: "Nukbung & Wiryung - PPPP"
    },
    mediaUrl: "https://img.youtube.com/vi/SqpiqGoxbAk/maxresdefault.jpg"
  },
  {
    category: "thumbnail",
    title: {
      ko: "한이오 - IO",
      ja: "한이오 - IO",
      en: "Han IO - IO"
    },
    mediaUrl: "https://img.youtube.com/vi/dk6ztXNFmVw/maxresdefault.jpg"
  }
];

/**
 * 아이템의 타이틀을 현재 언어(lang)에 맞춰 반환하는 헬퍼 함수
 */
function getLocalizedTitle(item, lang = 'ko') {
  if (!item || !item.title) return '';
  if (typeof item.title === 'string') return item.title;
  return item.title[lang] || item.title['ko'] || item.title['en'] || Object.values(item.title)[0] || '';
}
