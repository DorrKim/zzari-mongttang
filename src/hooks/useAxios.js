import useAsyncFn from '@hooks/useAsyncFn';
import axios from 'axios';

const BASE_URL = 'http://13.209.30.200:5001';

axios.defaults.baseURL = BASE_URL;

const useAxios = (url, options = {}) => useAsyncFn(
  () => axios({
    url,
    ...options
  }).then(res => res.data));

export default useAxios;
