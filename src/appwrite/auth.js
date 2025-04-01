import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
import service from "./config";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name )
            await this.account.createEmailPasswordSession(email, password),
            await this.account.createVerification(
                `${conf.appwriteFrontendUrl}/verify`
            )
            
            if(userAccount) {
                // Create initial profile
                return await service.createInitialProfile(userAccount.$id, name)
                // call another method

            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);


        } catch (error) {
            throw error;
        }
    }

    async verifyEmail(userId, secret) {
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            console.error("Verification failed:", error);
            throw error;
        }
    }

    async sendVerificationEmail() {
        try {
            return await this.account.createVerification(
                `${conf.appwriteFrontendUrl}/verify`
            );
        } catch (error) {
            console.error("Verification email failed:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            if (error.message.includes("missing scope (account)")) {
                return null;
            }
            console.error("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();

        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService