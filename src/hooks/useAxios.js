import useAsyncFn from '@hooks/useAsyncFn';
import axios from 'axios';


axios.defaults.baseURL = 'http://13.209.30.200:5001';

const useAxios = (url, options = {}) => useAsyncFn(
  async() => await axios({
    url,
    ...options
  }).then(res => res.data));

export default useAxios;
