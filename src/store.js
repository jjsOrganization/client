import create from "zustand";
import devtools from "zustand/middleware";

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

const useOrderInfoStore = create((set) => ({
  orderInfo: {
    postCode: "",
    address: "",
    detailAddress: "",
    phoneNumber: "",
    deliveryRequest: "",
  },
  setOrderInfo: (orderInfo) =>
    set((state) => ({
      orderInfo: {
        ...state.orderInfo,
        ...orderInfo,
      },
    })),
}));

const useReformInfoStore = create((set) => ({
  reformInfo: {
    postcode: "",
    address: "",
    detailAddress: "",
    phoneNumber: "",
    deliveryRequest: "",
  },
  setReformInfo: (reformInfo) =>
    set((state) => ({
      reformInfo: {
        ...state.reformInfo,
        ...reformInfo,
      },
    })),
}));

const useLoginStore = create((set) => ({
  memberId: null,
  accessToken: null,
  refreshToken: null,
  setAuth: (authData) => set({ ...authData }),
}));

const store = {
  useProgressStore,
  useOrderInfoStore,
  useReformInfoStore,
  useBtnStore,
  useEndPointStore,
  useLoginStore
};

export default store;
