import { create } from "zustand";

interface IAdmin {
  isAdmin: boolean;
  setIsAdmin: (newIsAdmin: boolean) => void;
}

const useAdmin = create<IAdmin>((set) => ({
  isAdmin: false,
  setIsAdmin: (newIsAdmin) =>
    set(() => ({
      isAdmin: newIsAdmin,
    })),
}));

export default useAdmin;
