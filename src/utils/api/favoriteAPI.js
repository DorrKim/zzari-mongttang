import { getItem } from '../storage';
import { _request } from './loginAPI';

const API_END_POINTS = 'http://13.209.30.200:5001';

// Todo : 중복 로직 통합하기
export const favoriteAPI = {
  async postFavorite(postId) {
    const token = getItem('IdToken', '');

    try {
      const response = await _request(`${API_END_POINTS}/likes/create`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'post',
        data: {
          postId
        }
      });

      if (response.status === 400) {
        return;
      }
        
      return response;
    } catch (error) {
      console.log(error);
    } 
  },
  async deleteFavorite(id) {
    const token = getItem('IdToken', '');

    try {
      const response = await _request(`${API_END_POINTS}/likes/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'delete',
        data: {
          id
        }
      });

      if (response.status === 400) {
        return;
      }
        
      return response;
    } catch (error) {
      console.log(error);
    } 
  }
};
