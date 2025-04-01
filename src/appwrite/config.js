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
                ID.unique(),
                { title, content, featuredImage, status, userId, slug }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(postid, { title, content, featuredImage, status, slug }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postid,
                { title, content, featuredImage, status, slug }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(postid) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postid
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(postid) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postid
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

// Check if a user has already liked a specific post
async checkUserLike(postId, userId) {
    try {
        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteLikesCollectionId,  // Ensure this collection is set in conf
            [
                Query.equal("postId", postId),
                Query.equal("userId", userId)
            ]
        );
        return response.documents.length ? response.documents[0] : null;
    } catch (error) {
        console.error("Appwrite service :: checkUserLike :: error", error);
        return null;
    }
}

// Retrieve the total number of likes for a specific post
async getPostLikes(postId) {
    try {
        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteLikesCollectionId,
            [Query.equal("postId", postId)]
        );
        return response.documents.length;
    } catch (error) {
        console.error("Appwrite service :: getPostLikes :: error", error);
        return 0;
    }
}

// Add a like to a post for a given user
async likePost(postId, userId) {
    try {
        // Check if user has already liked the post
        const existingLike = await this.checkUserLike(postId, userId);
        if (existingLike) {
            return existingLike; // Return existing like if already liked
        }

        // Create a new like document
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteLikesCollectionId,
            ID.unique(),
            { postId, userId }
        );
    } catch (error) {
        console.error("Appwrite service :: likePost :: error", error);
        throw error;
    }
}

// Remove a like from the database using the likeId
async unlikePost(likeId) {
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteLikesCollectionId,
            likeId
        );
        return true;
    } catch (error) {
        console.error("Appwrite service :: unlikePost :: error", error);
        return false;
    }
}

// adding a comments section.

async addComment(postId, userId, text, username) {
    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCommentsCollectionId,
      ID.unique(),
      {
        postId,
        userId,
        text,
        username,
      }
    )
  };

  async getPostComments(postId)  {
    const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
      [Query.equal("postId", postId)]
    );
    return response.documents;
  };

  async deleteComment(commentId) {
    return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        commentId
    )
}
  
  

}

const service = new Service();

export default service;
