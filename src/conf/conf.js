const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteProfileCollectionId: (import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteBucket2Id: String(import.meta.env.VITE_APPWRITE_AVATARS_BUCKET_ID),
    appwriteTinyMce: String(import.meta.env.VITE_TINYMCE),
    defaultAvatarId: String(import.meta.env.VITE_APPWRITE_DEFAULT_AVATAR)
}

export default conf