import PocketBase from 'pocketbase';
import { TypedPocketBase } from '../../types/pb_types';

const pb = new PocketBase('http://localhost:8090') as TypedPocketBase;

(window as any).pb = pb;

export default pb;
