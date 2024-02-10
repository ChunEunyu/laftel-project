import axios from "axios";

const api = axios.create({
    baseURL: 'https://laftel.net/api/',
});

// 홈 페이지에서의 추천 애니메이션 리스트
export const fetchRecommendAnime = async (number) => {
    try {
        const response = await api.post(`home/v2/recommend/${number}/`);
        return response.data
    } catch (error) {
        console.error('Error fetching anime list:', error);
        throw error;
    }
};

// 요일 별 신작 애니메이션
export const fetchDailyAnime = async () => {
    try {
      // 요일 별 애니메이션 리스트 가져오기
      const response = await api.get('search/v2/daily/');
      return response.data;
    } catch (error) {
      console.error('Error fetching daily anime list:', error);
      throw error;
    }
};

// 상세한 애니메이션 정보를 불러오기 
export const fetchAnimeDetail = async (animeId) => {
  try {
      const response = await api.get(`v1.0/items/${animeId}/detail/`);
      return response.data;
  } catch (error) {
      console.error(`Error fetching detail for item ${animeId}:`, error);
      throw error;
  }
};


// 테마 추천 페이지에서 테마 별 애니메이션 리스트 불러오기
export const fetchThemes = async () => {
  try {
    const response = await api.get('recommends/v1/themes/?limit=60&offset=20');
    return response.data;
  } catch (error) {
    console.error('Error fetching daily anime list:', error);
    throw error;
  }
}; 

// 태그 검색 페이지에서의 애니메이션 리스트 불러오기
export const fetchFinder = async () => {
  const startNumber = 41790;
  const endNumber = 41850;
  try {
    let items = [];
    let promises = [];
    for (let number = startNumber; number <= endNumber; number ++) {
      promises.push(
        api.get(`v1.0/items/${number}/detail/`).then(response => {
          items.push(response.data);
        }).catch(error => {
          console.error(`Item ${number} not found, skipping...`);
        })
      );
    }
    await Promise.all(promises);
    return items;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};
