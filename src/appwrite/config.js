import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            if (error.message.includes("not authorized")) {
                return null;
            }
            console.error("Appwrite service :: getPosts :: error", error);
            return null;
        }
    }

    // File upload services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error);
            return conf.defaultFilePreview;
        }
    }

    // Profile Section
    async createInitialProfile(userId, name_of_user) {
        try {
            const defaultUsername = `user${userId.slice(-4)}`;
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                ID.unique(),
                {
                    userId,
                    username: defaultUsername,
                    name: name_of_user,
                    bio: "",
                    avatar: conf.defaultAvatarId,
                    social_instagram: "",
                    social_twitter: "",
                    social_linkedin: "",
                    social_github: "",
                }
            );
        } catch (error) {
            console.error("Appwrite Profile :: createInitialProfile :: error", error);
            throw error;
        }
    }

    async getProfileByUsername(username) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                [Query.equal("username", username)]
            );
            return response.documents.length ? response.documents[0] : null;
        } catch (error) {
            console.error("Appwrite Profile :: getProfileByUsername :: error", error);
            return null;
        }
    }

    getAvatarPreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucket2Id, fileId);
        } catch (error) {
            console.error("Appwrite Profile :: getAvatarPreview :: error", error);
            return conf.defaultAvatarId;
        }
    }

    async getProfileByUserId(userId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                [Query.equal("userId", userId)]
            );
            return response.documents.length ? response.documents[0] : null;
        } catch (error) {
            console.error("Appwrite Profile :: getProfileByUserId :: error", error);
            return null;
        }
    }

    async isUsernameAvailable(username) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                [Query.equal("username", username.toLowerCase())]
            )
            return response.documents.length === 0
        } catch (error) {
            console.error("Username check error:", error)
            return false
        }
    }

    // In your appwrite/config.js service class

async getProfileByUserId(userId) {
    try {
        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteProfileCollectionId,
            [Query.equal("userId", userId)]
        )
        return response.documents[0] || null
    } catch (error) {
        console.error("Get profile by user ID error:", error)
        return null
    }
}

async isUsernameAvailable(username) {
    try {
        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteProfileCollectionId,
            [Query.equal("username", username.toLowerCase())]
        )
        return response.documents.length === 0
    } catch (error) {
        console.error("Username check error:", error)
        return false
    }
}

async updateProfile(profileId, { username, bio, avatarFile, userId, name, social_instagram, social_twitter, social_linkedin, social_github }) {
    try {
        let avatarId = null
        
        // Handle avatar upload
        if (avatarFile) {
            // Delete old avatar if exists
            try {
                await this.bucket.deleteFile(conf.appwriteBucket2Id, userId)
            } catch (error) {
                if (error.code !== 404) console.error("Avatar delete error:", error)
            }
            
            // Upload new avatar
            const file = await this.bucket.createFile(
                conf.appwriteBucket2Id,
                userId, // Using user ID as file ID
                avatarFile
            )
            avatarId = file.$id
        }

        // Update profile document
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteProfileCollectionId,
            profileId,
            {
                username: username.toLowerCase(),
                bio,
                name,
                social_instagram,
                social_twitter,
                social_linkedin,
                social_github,
                ...(avatarId && { avatar: avatarId })
            }
        )
    } catch (error) {
        console.error("Update profile error:", error)
        throw error
    }
}

}

const service = new Service();

export default service;
