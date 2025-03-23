# **Blog Website Setup with React and Appwrite**  

This guide provides step-by-step instructions for setting up a blog website using **React, Vite, Appwrite, Redux Toolkit, React Router, Tailwind CSS, and other essential libraries**.

---

## **Prerequisites**  
Ensure you have the following installed on your system before starting:  
- **Node.js** (LTS version recommended)  
- **npm or yarn**  
- **A code editor** (VS Code preferred)  

---

## **Project Setup**  

### 1. Create a React Project using Vite  
Follow the official [Vite documentation](https://vite.dev/guide/) to set up a React project:  

```sh
npm create vite@latest my-blog --template react
cd my-blog
npm install
```

---

## **Installing Dependencies**  

### Install Required Packages  
Run the following command to install all required dependencies:  

```sh
npm install react-redux @reduxjs/toolkit react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form
```

### Install Tailwind CSS  
Follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation/using-vite):  

```sh
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.js`:  

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})

```

Add Tailwind to `index.css`:  

```css
@import "tailwindcss";
```

---

## **Testing the Setup**  
Run the development server to ensure everything is working correctly:  

```sh
npm run dev
```

If everything runs without errors, proceed to the next step.

---

## **Environment Variables Setup**  

### 1. Create a `.env` file in the project root and add the following variables:  

```plaintext
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""
VITE_TINYMCE=""
```

Ensure you add `.env` to `.gitignore` to prevent exposing sensitive credentials.  

```plaintext
# .gitignore
.env
```

---

## **Setting Up Appwrite**  

### **1. Create an Appwrite Account**  
- Go to [Appwrite](https://appwrite.io/) and sign up.  
- Click **Create Project** and give it a name.  

### **2. Retrieve and Configure Appwrite Credentials**  
- **Project ID & API URL** → Found in **Project Settings**  
- **Database & Collection Setup**:  
  - Create a **Database**, copy its **ID** to `.env`  
  - Create a **Collection**, copy its **ID** to `.env`  
  - Set **Permissions**: Allow all users **(Create, Read, Update, Delete)**  
  - Define **Attributes**:  
    - `title` (String)  
    - `content` (String)  
    - `featured_image` (String)  
    - `status` (String)  
    - `userid` (String)  
  - Create an **Index** on `status`  

- **Storage Configuration**:  
  - Create a **Bucket** for images  
  - Allow all users to perform **all operations**  
  - Copy **Bucket ID** to `.env`  

---

## **Managing Configuration Efficiently**  

Create a `conf/` folder and inside it, a `conf.js` file:  

```js
const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteTinyMce: String(import.meta.env.VITE_TINYMCE),
};

export default conf;
```

This approach prevents redundant usage of environment variable names throughout the codebase.

---

lets move to authentication 

here we will make authentication using appwrite.
docs - https://appwrite.io/docs/products/auth 
make a folder named and appwrite and a file auth.js in it and write down auth.js code 

