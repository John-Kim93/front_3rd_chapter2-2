import { create } from "zustand";

// store interface 정의
interface IAdminState {
  isAdmin: boolean;
  setIsAdmin: (newIsAdmin: boolean) => void;
}

// action 함수 생성
const setIsAdminAction = (set: any, newIsAdmin: boolean) => {
  set(() => ({
    isAdmin: newIsAdmin,
  }));
};

// store 생성
const useAdmin = create<IAdminState>((set) => ({
  isAdmin: false,
  setIsAdmin: (newIsAdmin) => setIsAdminAction(set, newIsAdmin),
}));

export default useAdmin;
