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

## **Authentication with Appwrite**  

In this section, we will set up **user authentication** using **Appwrite's Auth API**.  

📌 **Features we will implement:**  
✅ **User Registration** (Create Account)  
✅ **User Login**  
✅ **User Logout**  
✅ **Get Current Logged-in User**  

---

## **Step 1: Create the Authentication Module**  

1. **Create a new folder** inside the `src/` directory:  

   ```sh
   mkdir src/appwrite
   ```

2. **Inside the `appwrite/` folder, create a file named `auth.js`:**  

   ```sh
   touch src/appwrite/auth.js
   ```

---

## **Step 2: Implement Authentication Functions**  

Now, open `auth.js` and add the source code. 

## **Step 3: Explanation of the Functions**  

1. **`createAccount(email, password, name)`**  
   - Registers a new user using **email, password, and name**.  
   - Uses `account.create("unique()", email, password, name)` to generate a unique user ID.  

2. **`login(email, password)`**  
   - Authenticates a user using **email and password**.  
   - Creates an **email session** for the user.  

3. **`getCurrentUser()`**  
   - Fetches the **currently logged-in user** details.  
   - If no user is logged in, it returns `null`.  

4. **`logout()`**  
   - Ends the **current session**, logging the user out.  

---

Now let's set up the **config.js** file to manage Appwrite services for handling blog posts.  

---

## **Step 1: Create the Config File**  
Inside the `src/appwrite/` folder, create a new file:  

```sh
touch src/appwrite/config.js
```
---

## **Step 2: Implement CRUD Operations for Blog Posts**  

Now, open `config.js` and add the code from the source code. 

---

# **Step 4: Explanation of some Functions**  

1. **`createPost(title, content, userId)`**  
   - Creates a new blog post with a unique ID.  
   - Stores **title, content, and userId**.  

2. **`getPost(postId)`**  
   - Fetches a **single post** based on its ID.  

3. **`getPosts()`**  
   - Retrieves **all blog posts** from the database.  

4. **`updatePost(postId, title, content)`**  
   - Updates a post's **title** and **content**.  

5. **`deletePost(postId)`**  
   - Deletes a post permanently.  

---

Let's set up Redux Toolkit for managing authentication state. We'll create a store folder and two files:

store.js → Configures Redux store

authSlice.js → Manages authentication state

---

Great! Now we'll create a components folder and add the following:

Header.js → The navigation bar

Footer.js → The page footer

index.js → Exports all components for easy imports

---

Now update the app.jsx.
### **Summary of `App.jsx`**  

This file manages authentication state and layout for the application.  

- **Handles User Authentication** 🛡️  
  - Uses `useEffect` to check if a user is logged in via `authService.getCurrentUser()`.  
  - Dispatches `login` if a user exists, otherwise dispatches `logout`.  
  - Prevents rendering until authentication check is complete (`loading` state).  

- **Defines Main Layout** 🏗️  
  - Wraps the app with a flexible, responsive container.  
  - Includes **Header**, **Footer**, and dynamic content via `Outlet` for routing.  

This ensures seamless user authentication and structured page rendering. 🚀

---

Now, we will update the main.jsx. This file **initializes and renders** the React application, setting up **routing, global state management, and authentication handling**.  

#### **🔹 Key Functionalities**  
1️⃣ **Imports Dependencies**  
   - React, Redux (`Provider` for global state), and React Router (`createBrowserRouter` for routing).  
   - Project-specific components (e.g., `App`, `AuthLayout`, `Home`, `Login`, `Signup`).  

2️⃣ **Configures React Router**  
   - Uses `createBrowserRouter` to define the **routes and layout** of the application.  
   - Ensures that pages like `Login`, `Signup`, and `Posts` follow authentication rules via `AuthLayout`.  

3️⃣ **Sets Up the Redux Store**  
   - Wraps the app inside `<Provider store={store}>` to manage **global authentication state**.  

4️⃣ **Renders the App**  
   - Uses `createRoot().render()` to mount the app inside the root DOM element (`#root`).  

#### **🔹 Why This is Important?**  
✅ **Ensures proper routing** between pages.  
✅ **Manages authentication state globally** using Redux.  
✅ **Optimized rendering** with React’s `StrictMode`.  

---

