import create from 'zustand';

interface Store {
  afterLoginPath: string;
  setAfterLoginPath(afterLoginPath: string): void;
}

const useStore = create<Store>(set => ({
  afterLoginPath: '',
  setAfterLoginPath: afterLoginPath => set({ afterLoginPath }),
}));

export default useStore;
