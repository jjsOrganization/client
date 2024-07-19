import create from 'zustand';
import devtools from 'zustand/middleware'

const useProgressStore = create((set) => ({
  progressNumber: null, 
  setProgressNumber: (progress) => set({ progressNumber: progress }),
}));




export default useProgressStore;