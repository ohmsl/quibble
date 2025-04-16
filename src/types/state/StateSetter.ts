export type StateSetter<S> = (partial: S | Partial<S> | ((state: S) => S | Partial<S>), replace?: false | undefined) => void;
