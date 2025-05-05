import PocketBase from 'pocketbase';
import { TypedPocketBase } from '../../types/pb_types';

const pb = new PocketBase('http://192.168.50.29:8090') as TypedPocketBase;

(window as any).pb = pb;

export default pb;
