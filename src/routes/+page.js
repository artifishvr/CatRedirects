import { databases } from "$lib/appwrite";
import { Query } from "appwrite";
import { PUBLIC_DB, PUBLIC_COLLECTION_CATS } from '$env/static/public';

export async function load() {
    const cats = await databases.listDocuments(PUBLIC_DB, PUBLIC_COLLECTION_CATS, [
        Query.limit(50),
        Query.orderAsc("name"),
    ]);

    return {
        cats: cats.documents,
    };
};