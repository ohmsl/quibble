import PocketBase from 'pocketbase';

const pb: PocketBase = new PocketBase('http://localhost:8090');

// async function loginAsAdmin() {
//     try {
//         await pb
//             .collection("_superusers")
//             .authWithPassword("ohmslater@outlook.com", "test1234");
//         console.log("Admin token:", pb.authStore.token);
//     } catch (error) {
//         console.error("Failed to login as admin", error);
//     }
// }

// loginAsAdmin();
export default pb;
