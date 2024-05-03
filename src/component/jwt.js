import Cookies from "js-cookie";
import axios from "axios";

/**
 * @description Axios 인스턴스를 생성
 * 목적 : axios 요청 시 header에 token을 보내기 위함
 */

const instance = axios.create({
  baseURL: "",
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // Cookies를 이용해 accessToken을 가져옵니다.

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
  console.log(localStorage.getItem('refreshToken'))
  const response = await instance.post('/auth/reissue',
    {accessToken: localStorage.getItem('accessToken'),refreshToken: localStorage.getItem('refreshToken'),}
    ,{headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }}
  );
  console.log(response);
  if(response.data.state === 400){
    return 
  }
  localStorage.setItem('accessToken', response.data.data.accessToken);
  localStorage.setItem('refreshToken', response.data.data.refreshToken);
  document.cookie ='accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = `accessToken=${response.data.data.accessToken}; Path=/;`;
  return response
}

instance.interceptors.response.use(
  async (response) => { ;return response;},
  async(error) => { 
    if(error.response.status === 403){
      console.log(error,'에러')
      const response = await postRefreshToken();
      //instance.defaults.headers에 토큰을 저장함으로써 이후에 보내게 될 모든 요청에 엑세스 토큰이 자동으로 포함됨
      instance.defaults.headers.common.Authorization = `Bearer ${response.data.data.accessToken}`;          
      //config.headers에 토큰을 저장함으로써 실패한 요청에도 엑세스 토큰을 저장
      //이전에 실패한 요청을 다시 보낼 때 기존의 설정에 새로 발급받은 엑세스 토큰을 포함하여 보내야 함
      error.config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
      return (await axios.get(error.config.url, error.config)).data,window.location.reload();
}})

export default instance;