import useAsyncFn from '@hooks/useAsyncFn';
import axios from 'axios';

const BASE_URL = 'http://13.209.30.200:5001';

axios.defaults.baseURL = BASE_URL;

const useAxios = (url, initialOptions = {}) => useAsyncFn(
<<<<<<< HEAD
  options => axios({
    url,
=======
  (options = {}) => axios({
    url: options.url || url,
>>>>>>> 81b6e54a7a9954b3a28641f2c4e7f613d5ce5218
    ...initialOptions,
    ...options
  }).then(res => res.data));

export default useAxios;
