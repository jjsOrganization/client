import axiosInstance from "../component/jwt.js";

export const postAxios = async(url, data) => {
    try {
        const fetchData = await axiosInstance.post(`${url}`, data);
        return fetchData; 
    } catch (err) {
        console.log(err);
        throw err; 
    }
}

export const putAxios = async(url, data) => {
    try{
        const fetchData = await axiosInstance.put(`${url}`,data)
        console.log('상품수정 시도')
    }
    catch(err){
        console.log(err)
    }
}

export const patchAxios = async (url) => {
    try{
        const fetchData = await axiosInstance.patch(`${url}`,)
    }
    catch(err){
        console.log(err)
    }
}

export const getAxios = async (url) => {
    try{
        const fetchData = await axiosInstance.get(`${url}`,)
        return fetchData
    }
    catch(err){
        console.log(err)
    }
}

export const deleteAxios = async (url) => {
    try{
        const fetchData = await axiosInstance.delete(`${url}`,)
        return fetchData
    }
    catch(err){
        console.log(err)
    }
}




