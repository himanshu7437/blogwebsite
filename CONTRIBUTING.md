# **Contributing to BlogSphere** 🚀  

Welcome to **BlogSphere**! 🎉 We appreciate your interest in contributing to this open-source blogging platform. Your contributions—whether through bug reports, feature suggestions, code improvements, or documentation—are highly valued.  

---

## **📜 Table of Contents**  
- [Getting Started](#getting-started)  
- [How to Contribute](#how-to-contribute)  
- [Code Guidelines](#code-guidelines)  
- [Branching & Commit Messages](#branching--commit-messages)  
- [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)  
- [Reporting Issues](#reporting-issues)  
- [Community Guidelines](#community-guidelines)  

---

## **🚀 Getting Started**  

Before contributing, please ensure that you:  
✅ Have **Node.js** and **npm** installed.  
✅ Have **Git** installed.  
✅ Have an Appwrite account and project setup.  

To set up the project locally:  

```bash
# Clone the repository
git clone https://github.com/himanshu7437/blogwebsite.git

# Navigate into the project directory
cd blogwebsite

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## **🛠️ How to Contribute**  

### 📝 **1. Fork the Repository**  
Click on the **Fork** button at the top-right of this repo. This creates a copy of the project under your GitHub account.  

### 📥 **2. Clone Your Forked Repository**  
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/blogwebsite.git
cd blogwebsite
```

### 🔀 **3. Create a New Branch**  
Always create a separate branch for your changes. Use a meaningful name based on your contribution:  

```bash
git checkout -b feature/add-dark-mode
```

### 👨‍💻 **4. Make Your Changes**  
Edit files in the `src/` directory and test locally. Follow [Code Guidelines](#code-guidelines).  

### ✅ **5. Commit Your Changes**  
Use **descriptive commit messages** to explain your changes:  
```bash
git add .
git commit -m "✨ Added dark mode toggle feature"
```

### 📤 **6. Push Your Changes**  
```bash
git push origin feature/add-dark-mode
```

### 🔄 **7. Open a Pull Request (PR)**  
1. Go to your forked repository on GitHub.  
2. Click **Compare & pull request**.  
3. Add a meaningful description.  
4. Click **Create pull request**.  

---

## **📏 Code Guidelines**  

- **Use meaningful variable & function names** (e.g., `handleLogin` instead of `x`).  
- **Follow React best practices** (use functional components, avoid inline styles).  
- **Use Tailwind CSS classes for styling** instead of traditional CSS.  
- **Ensure all code is formatted** using Prettier before committing:  
  ```bash
  npm run format
  ```
- **Avoid committing API keys or sensitive data**.  

---

## **📂 Branching & Commit Messages**  

### **Branch Naming Convention**  
- `feature/feature-name` → For new features  
- `bugfix/fix-description` → For bug fixes  
- `docs/update-readme` → For documentation updates  

### **Commit Message Format**  
Use **emoji prefixes** for better clarity:  

| Emoji | Commit Type |
|--------|------------|
| ✨ `✨ Added` | New feature |
| 🐛 `🐛 Fixed` | Bug fix |
| 🎨 `🎨 Improved` | UI/UX enhancement |
| 🔥 `🔥 Removed` | Deleted code/files |
| 📝 `📝 Updated` | Documentation updates |
| 🚀 `🚀 Deployed` | Deployment changes |

Example:  
```bash
git commit -m "🐛 Fixed authentication bug in Login.js"
```

---

## **📩 Submitting a Pull Request (PR)**  

🔹 Make sure your PR follows these guidelines:  
- Ensure **your branch is up to date** with `main`.  
- Run `npm run lint` and fix any linting errors.  
- Add necessary **screenshots** if your PR modifies UI.  
- Add **comments** in your code for better readability.  

---

## **🐞 Reporting Issues**  

If you find a **bug** or have a **feature request**, please:  
1. **Check existing issues** to avoid duplicates.  
2. **Open a new issue** with:  
   - A clear title & description.  
   - Steps to reproduce (for bugs).  
   - Screenshots if applicable.  

---

## **🌎 Community Guidelines**  

We encourage a **friendly and inclusive** environment:  
✅ Be **respectful** to contributors.  
✅ **Constructive feedback** is welcome.  
✅ **No spam** or self-promotion.  

---

### 🎉 **Thank you for contributing to BlogSphere!**  

💙 Happy coding! 🚀