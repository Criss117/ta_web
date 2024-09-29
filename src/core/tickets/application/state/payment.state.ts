import { create } from "zustand";

interface PaymentState {
  inProgress: boolean;
  isCredit: boolean;

  setInProgress: (inProgress: boolean) => void;
  setIsCredit: (isCredit: boolean) => void;

  clearState: () => void;
}

const usePaymentState = create<PaymentState>((set) => ({
  inProgress: false,
  isCredit: false,

  setInProgress(inProgress: boolean) {
    set({ inProgress });
  },
  setIsCredit(isCredit: boolean) {
    set({ isCredit });
  },

  clearState() {
    set({ inProgress: false, isCredit: false });
  },
}));

export default usePaymentState;
