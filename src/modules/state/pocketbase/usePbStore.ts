import { create } from 'zustand';
import { createSelectors } from '../utils/createSelectors';
import { AuthSlice, createAuthSlice } from './authSlice';

type StoreState = AuthSlice;

export const usePbStore = createSelectors(
    create<StoreState>()((...a) => ({
        ...createAuthSlice(...a),
        // ...createStorageSlice(...a),
    })),
);
