import create from 'zustand';
import devtools from 'zustand/middleware'

const useProgressStore = create((set) => ({
  progressNumber: null, 
  setProgressNumber: (progress) => set({ progressNumber: progress }),
}));

export const useBtnStore = create((set) => ({
  borderSkyBlue : "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-1 border-blue-500 rounded-full"
}))

export const useEndPointStore = create((set) => ({  
  Endpoint : 'https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/'
}))




export default useProgressStore;