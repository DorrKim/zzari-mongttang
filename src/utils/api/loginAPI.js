import axios from 'axios';

import { getItem, setItem } from '../storage';

const API_END_POINTS = 'http://13.209.30.200:5001';

export const loginAPI = {
  async postSignUp({ email, fullName, password }){
    const data = { 
      email,
      fullName,
      password 
    };
    try {
      const res = await _request(`${API_END_POINTS}/signup`, {
        method: 'post',
        data
      });
      if (res.status === 400) {
        console.log(res.data);
        
        return;
      }
      const { user, token } = res;
      setItem('IdToken', token);
      console.log('SignUp Complete!', user);
      console.log('set Token into Storage!', token);
        
          
      return user;
    
    } catch (e) {
      console.log(e);
    }
  },

  async postLogin({ email, password }){
    const data = {
      email,
      password
    };
    const res = await _request(`${API_END_POINTS}/login`, {
      method: 'post',
      data
    });
    if (res.status === 400) {
      console.log(res.data);
      
      return;
    }
    const { user, token } = res;
    setItem('IdToken', token);
    console.log('LogIn Complete!', user);
    console.log('set Token into Storage!', token);

    return user;
  },

  async postLogOut(){
    const res = await _request(`${API_END_POINTS}/logout`, {
      method: 'post'
    });
    console.log('Logout!', res);

    return res;
  },

  async getAuthUser(){
    const token = getItem('IdToken', '');
    const user = await _request(`${API_END_POINTS}/auth-user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Get AuthUser', user);

    return user;
  }
};

export const _request = async (url, options) => {
  try {
    const data = await axios({
      url,
      ...options
    })
      .then(res => res.data)
      .catch(err => err.response);
    
    return data;
  } catch (e){
    console.error(e);
  }
};
