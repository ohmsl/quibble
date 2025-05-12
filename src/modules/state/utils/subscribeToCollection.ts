import { Collections } from "../../../types/pb_types";
import { StateSetter } from "../../../types/state/StateSetter";
import pb from "../../pocketbase/pb";
import { AppState } from "../useAppState";
import { handleCollectionEvent } from "./handleCollectionEvent";

export const subscribeToCollection = <
    T extends { id: string },
    S extends Record<string, unknown>,
>(
    col: `${Collections}`,
    topic = "*",
    set: StateSetter<S>,
    get: () => Partial<S>,
) => {
    pb.collection(col).unsubscribe(topic);
    pb.collection(col).subscribe(
        topic,
        handleCollectionEvent<S, T>(set, get, col as keyof AppState),
    );
};
