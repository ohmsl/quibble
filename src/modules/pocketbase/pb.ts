import PocketBase from "pocketbase";
import { TypedPocketBase } from "../../types/pb_types";

const pbEndpoint = import.meta.env.VITE_PB_ENDPOINT;

const pb = new PocketBase(pbEndpoint) as TypedPocketBase;

(window as any).pb = pb;

export default pb;
