import create from "zustand";
import { persist } from 'zustand/middleware';

const useProgressStore = create((set) => ({
  progressNumber: null,
  setProgressNumber: (progress) => set({ progressNumber: progress }),
}));

export const useBtnStore = create((set) => ({
  borderSkyBlue:
    "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-1 border-blue-500 rounded-full",
}));

export const useEndPointStore = create((set) => ({
  Endpoint: "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/",
}));

export const useTokenStore = create(persist(
  (set) => ({
    accessToken: '',
    refreshToken: '',
    setAccessToken: (token) => set({ accessToken: token }),
    setRefreshToken: (token) => set({ refreshToken: token }),
    clearTokens: () => set({ accessToken: '', refreshToken: '' })
  }),
  {
    name: 'token-storage', 
  }
));

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

const usePurchaserMypageStore = create((set) => ({
  requestN : null,
  orderList: [],
  open: true,
  customerShoppingBasket: [],
  purchaserOrderProducts: [],
  purchaserReformProducts: [],
  showMore: false,
  showMoreForReform: false,
  msg: "",
  messages: [],
  stompClient: null,
  roomId: null,
  purchaserEmail: null,
  connected: false,
  chatOpen: false,
  messageData: [],
  estimateNumber: null,
  requestNumberEstimate: null,
  isNull : null,

  setIsNull : (isNull) => set({isNull}),
  setRequestN : (requestN) => set({requestN}),
  setOrderList: (orderList) => set({ orderList }),
  setOpen: (open) => set({ open }),
  setCustomerShoppingBasket: (basket) =>
    set({ customerShoppingBasket: basket }),
  setPurchaserOrderProducts: (products) =>
    set({ purchaserOrderProducts: products }),
  setPurchaserReformProducts: (products) =>
    set({ purchaserReformProducts: products }),
  setShowMore: (showMore) => set({ showMore }),
  setShowMoreForReform: (showMoreForReform) => set({ showMoreForReform }),
  setMsg: (msg) => set({ msg }),
  setMessages: (messages) => set({ messages }),
  setStompClient: (stompClient) => set({ stompClient }),
  setRoomId: (roomId) => set({ roomId }),
  setPurchaserEmail: (email) => set({ purchaserEmail: email }),
  setConnected: (connected) => set({ connected }),
  setChatOpen: (chatOpen) => set({ chatOpen }),
  setMessageData: (messageData) => set({ messageData }),
  setEstimateNumber: (estimateNumber) => set({ estimateNumber }),
  setRequestNumberEstimate: (requestNumberEstimate) =>
    set({ requestNumberEstimate}),
}));

const store = {
  useProgressStore,
  useOrderInfoStore,
  useReformInfoStore,
  useBtnStore,
  useEndPointStore,
  useLoginStore,
  usePurchaserMypageStore,
};

export default store;
