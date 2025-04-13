import pb from "../pocketbase/pb";

export const getLatestUserRecord = async () => {
    const userId = pb.authStore.record?.id;
    if (!userId) throw new Error("No authenticated user");

    const user = await pb.collection("users").getOne(userId);
    return user;
};
