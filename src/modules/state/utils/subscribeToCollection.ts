import { Collections } from '../../../types/pb_types';
import { StateSetter } from '../../../types/state/StateSetter';
import pb from '../../pocketbase/pb';
import { AppState } from '../useAppState';
import { handleCollectionEvent } from './handleCollectionEvent';

export const subscribeToCollection = (col: `${Collections}`, topic = '*', set: StateSetter<AppState>) => {
    pb.collection(col).unsubscribe(topic);
    pb.collection(col).subscribe(topic, handleCollectionEvent(set, col as keyof AppState));
};
