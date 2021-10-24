import useAsyncFn from '@hooks/useAsyncFn';
import axios from 'axios';


const useAxios = (url, options = {}) => useAsyncFn(
  async() => await axios({
    url,
    ...options
  }).then(res => res.data));

export default useAxios;
