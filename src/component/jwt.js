import Cookies from "js-cookie";
import axios from "axios";
import { useTokenStore } from "../store";
import useToken from "antd/es/theme/useToken";

/**
 * @description Axios 인스턴스를 생성
 * 목적 : axios 요청 시 header에 token을 보내기 위함
 */

const getAccessToken = () => {
  const state = useTokenStore.getState();
  return state.accessToken
}

const getRefreshToken = () => {
  const state = useTokenStore.getState();
  return state.refreshToken
}

const setAccessToken = (token) => {
  const state = useTokenStore.getState();
  state.setAccessToken(token);
}
const setRefreshToken = (token) => {
  const state = useTokenStore.getState();
  state.setRefreshToken(token);
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    try {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err.message);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

export const postRefreshToken = async () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  const response = await instance.post('/auth/reissue',
    {accessToken: accessToken ,refreshToken: refreshToken,}
    ,{headers: { Authorization: `Bearer ${accessToken}` }}
  );
  console.log(response)
  if(response.data.state === 400){
    return 
  }

  setAccessToken(response.data.data.accessToken);
  setRefreshToken(response.data.data.refreshToken);
  document.cookie = 'accessToken=; Max-Age=0; path=/; domain=localhost';
  document.cookie = `accessToken=${response.data.data.accessToken}; path=/; domain=localhost`;
  return response
}

instance.interceptors.response.use(
  async (response) => { ;return response;},
  async(error) => { 
    if(error.response.status === 403){
      console.log(error,'에러')
      const response = await postRefreshToken();
      instance.defaults.headers.common.Authorization = `Bearer ${response.data.data.accessToken}`;          
      error.config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
      return (await axios.get(error.config.url, error.config)).data,window.location.reload();
}})

export default instance;