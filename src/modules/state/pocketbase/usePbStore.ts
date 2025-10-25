import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createSelectors } from "../utils/createSelectors";
import { AuthSlice, createAuthSlice } from "./authSlice";

type StoreState = AuthSlice;

export const usePbStore = createSelectors(
    create<StoreState>()(
        devtools((...a) => ({
            ...createAuthSlice(...a),
            // ...createStorageSlice(...a),
        })),
    ),
);
