<div align="center">
  <br />
      <img src="https://miro.medium.com/v2/resize:fit:2000/1*d8-4IYqquJ0yGIKZ3bjzWg.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-React_Query-black?style=for-the-badge&logoColor=white&logo=reactquery&color=FF4154" alt="reactquery" />
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  </div>

  <h3 align="center">A Social Media Application</h3>

   <div align="center">
     Build this project step by step by Motaz_Y
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🔗 [Links](#links)
7. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

Explore social media with this user-friendly platform that has a nice look and lots of features. Easily create and explore posts, and enjoy a strong authentication system and quick data fetching using React Query for a smooth user experience.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React.js
- Appwrite
- React Query
- TypeScript
- Shadcn
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Authentication System**: A robust authentication system ensuring security and user privacy

👉 **Explore Page**: Homepage for users to explore posts, with a featured section for top creators

👉 **Like and Save Functionality**: Enable users to like and save posts, with dedicated pages for managing liked and saved content

👉 **Detailed Post Page**: A detailed post page displaying content and related posts for an immersive user experience

👉 **Profile Page**: A user profile page showcasing liked posts and providing options to edit the profile

👉 **Browse Other Users**: Allow users to browse and explore other users' profiles and posts

👉 **Create Post Page**: Implement a user-friendly create post page with effortless file management, storage, and drag-drop feature

👉 **Edit Post Functionality**: Provide users with the ability to edit the content of their posts at any time

👉 **Responsive UI with Bottom Bar**: A responsive UI with a bottom bar, enhancing the mobile app feel for seamless navigation

👉 **React Query Integration**: Incorporate the React Query (Tanstack Query) data fetching library for, Auto caching to enhance performance, Parallel queries for efficient data retrieval, First-class Mutations, etc

👉 **Backend as a Service (BaaS) - Appwrite**: Utilize Appwrite as a Backend as a Service solution for streamlined backend development, offering features like authentication, database, file storage, and more

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/MoTaz-Y/SnapGram.git
cd social_media_app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_STORAGE_ID=
VITE_APPWRITE_USER_COLLECTION_ID=
VITE_APPWRITE_POST_COLLECTION_ID=
VITE_APPWRITE_SAVES_COLLECTION_ID=
```

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

**Running the Project**

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>constants.index.ts</code></summary>

```typescript
export const sidebarLinks = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: '/assets/icons/people.svg',
    route: '/all-users',
    label: 'People',
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create Post',
  },
];

export const bottombarLinks = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create',
  },
];
```

</details>

<details>
<summary><code>globals.css</code></summary>

```css
@import 'tailwindcss';

* {
  box-sizing: border-box;
  list-style: none;
  scroll-behavior: smooth;
}
body {
  font-family: 'Inter', sans-serif;
  background-color: #000000;
  color: #f9f9f9;
  min-height: 100vh;
}
.text-primary-500 {
  color: #877eff;
}
.bg-primary-500 {
  background-color: #877eff;
}
.rounded-10 {
  border-radius: 10px;
}
.text-primary-600 {
  color: #5d5fef;
}
.text-light-4 {
  color: #f9f9f9;
}
.text-secondary-500 {
  color: #ffb620;
}
.bg-dark-3 {
  background-color: #1a1a1a;
}

.h1-bold {
  font-size: 36px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.05em;
}

.h1-semibold {
  font-size: 36px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.05em;
}

.h2-bold {
  font-size: 30px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.05em;
}

.h3-bold {
  font-size: 24px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.05em;
}

.base-semibold {
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.05em;
}

.base-medium {
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
}

.base-regular {
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
}

.body-bold {
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
}

.body-medium {
  font-size: 18px;
  font-weight: 500;
  line-height: 140%;
}

.small-semibold {
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.05em;
}

.small-medium {
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
}

.small-regular {
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
}

.subtle-semibold {
  font-size: 12px;
  font-weight: 600;
  line-height: 140%;
}

.tiny-medium {
  font-size: 10px;
  font-weight: 500;
  line-height: 140%;
}
/* UTILITIES */
.invert-white {
  filter: invert(1) brightness(0);
  transition: all 0.2s;
}
.text-light-2 {
  color: #f7f7f7;
}
.group-hover:invert-white:hover {
  filter: invert(0) brightness(1);
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #09090a;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #5c5c7b;
  border-radius: 50px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #7878a3;
}

.common-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  gap: 2.5rem;
  overflow: scroll;
  padding: 2.5rem 1.25rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding: 3.5rem; /* for lg */
  /* custom-scrollbar styles will apply by class */
}

.user-container {
  max-width: 64rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1.5rem;
  gap: 2.25rem; /* for md */
}

.user-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.75rem;
  max-width: 64rem;
}

@media (min-width: 480px) {
  .user-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .user-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .user-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .user-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.explore-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  overflow: scroll;
  padding: 2.5rem 1.25rem;
  padding: 3.5rem; /* md */
}

.explore-inner_container {
  max-width: 64rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
  gap: 2.25rem; /* md */
}

.explore-search {
  height: 3rem;
  background-color: #1f1f22; /* equivalent to dark-4 */
  border: none;
  color: inherit;
}

.explore-search::placeholder {
  color: #5c5c7b; /* equivalent to light-4 */
}

.explore-search:focus-visible {
  outline: none;
  box-shadow: none;
}

.home-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  gap: 2.5rem;
  overflow: scroll;
  padding: 2.5rem 1.25rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding: 3.5rem; /* for lg */
}

.home-posts {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
  gap: 2.25rem; /* md */
}

.home-creators {
  display: none;
}

@media (min-width: 1280px) {
  .home-creators {
    display: flex;
    flex-direction: column;
    width: 18rem;
    padding: 2.5rem 1.5rem;
    gap: 2.5rem;
    overflow: scroll;
  }
}

@media (min-width: 1536px) {
  .home-creators {
    width: 29.0625rem;
  }
}

/* Post Details */
.post_details-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2.5rem;
  overflow: scroll;
  padding: 2.5rem 1.25rem;
  padding: 3.5rem; /* md:p-14 */
  align-items: center;
}

.post_details-card {
  background-color: #09090a;
  width: 100%;
  max-width: 80rem;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  flex-direction: row; /* xl:flex-row */
  border: 1px solid #1f1f22;
  border-radius: 24px; /* xl:rounded-l-[24px] */
}

.post_details-img {
  height: 20rem; /* h-80 */
  height: 30rem; /* lg:h-[480px] */
  width: 48%; /* xl:w-[48%] */
  border-radius: 30px 30px 0 0;
  border-top-right-radius: 0; /* xl:rounded-tr-none */
  border-top-left-radius: 24px; /* xl:rounded-l-[24px] */
  object-fit: cover;
  padding: 1.25rem;
  background-color: #000000;
}

.post_details-info {
  background-color: #09090a;
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* gap-5 */
  gap: 1.75rem; /* lg:gap-7 */
  flex: 1;
  align-items: flex-start;
  padding: 2rem;
  border-radius: 30px;
}

.post_details-delete_btn {
  padding: 0;
  display: flex;
  gap: 0.75rem;
  color: #ffffff;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  font-size: 16px; /* lg:base-medium */
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 2.5rem;
  overflow: scroll;
  padding: 2.5rem 1.25rem;
  padding: 3.5rem; /* md:p-14 */
}

.profile-inner_container {
  display: flex;
  align-items: center;
  margin-bottom: 2rem; /* md:mb-8 */
  align-items: flex-start;
  gap: 2rem;
  flex-direction: column;
  flex-direction: row;
  position: relative;
  max-width: 80rem;
  width: 100%;
}

.profile-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
  width: 12rem;
  background-color: #09090a;
  transition: all 0.3s;
  flex: 1;
  flex: initial;
}

.saved-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  gap: 2.5rem;
  overflow: scroll;
  padding: 2.5rem 1.25rem;
  padding: 3.5rem;
}

.bottom-bar {
  z-index: 50;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #09090a;
  padding: 1rem 1.25rem;
  display: none; /* md:hidden */
}

.file_uploader-img {
  height: 20rem;
  height: 38rem;
  width: 100%;
  border-radius: 24px;
  object-fit: cover;
  object-position: top;
}

.file_uploader-label {
  color: #5c5c7b;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  width: 100%;
  padding: 1rem;
  border-top: 1px solid #1f1f22;
}

.file_uploader-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.75rem;
  height: 20rem;
  height: 38.25rem;
}

.grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* sm:grid-cols-2 */
  grid-template-columns: repeat(1, minmax(0, 1fr)); /* md */
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* lg */
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* xl */
  gap: 1.75rem;
  max-width: 80rem;
}

.grid-post_link {
  display: flex;
  border-radius: 24px;
  border: 1px solid #1f1f22;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.grid-post_user {
  position: absolute;
  bottom: 0;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: linear-gradient(to top, #101012, transparent);
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  gap: 0.5rem;
}

.leftsidebar {
  display: none;
  display: flex;
  padding: 2.5rem 1.5rem;
  flex-direction: column;
  justify-content: space-between;
  min-width: 270px;
  background-color: #09090a;
}

.leftsidebar-link {
  width: 100%;
  border-radius: 0.5rem;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  transition: all 0.3s;
  /* background-color: transparent; */
}

.post-card {
  background-color: #09090a;
  border-radius: 1.5rem;
  border: 1px solid #1f1f22;
  padding: 1.25rem;
  padding: 1.75rem;
  width: 100%;
  max-width: 640px;
}

.post-card_img {
  height: 16rem;
  height: 25rem;
  height: 28.125rem;
  width: 100%;
  border-radius: 24px;
  object-fit: cover;
  margin-bottom: 1.25rem;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: none;
  background-color: #09090a;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .bottom-bar {
    display: flex;
  }
  .topbar {
    display: inline-block;
  }
  .leftsidebar {
    display: none;
  }
  .md-h2-bold {
    font-size: 24px;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: -0.05em;
  }
}
@media screen and (max-width: 480px) {
}

.user-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #1f1f22;
  border-radius: 20px;
  padding: 2rem 1.25rem;
}

/* SHADCN COMPONENTS */
.shad-form_label {
  color: white !important;
}

.shad-form_message {
  color: #ff5a5a !important;
}

.shad-input {
  height: 2.6rem;
  background-color: #1f1f22;
  border: none;
  color: #5c5c7b;
  outline: none;
  /* box-shadow: 0 0 0 1px #7878a3, 0 0 0 1px #7878a3 !important; */
}

.shad-textarea {
  height: 9rem;
  background-color: #101012;
  border-radius: 0.75rem;
  border: none;
  /* box-shadow: 0 0 0 1px #7878a3, 0 0 0 2px #7878a3 !important; */
}

.shad-button_primary {
  background-color: #877eff;
  color: #ffffff;
  display: flex;
  gap: 0.5rem;
  transition: background 0.2s;
}

.shad-button_dark_4 {
  height: 3rem;
  background-color: #1f1f22;
  padding: 0 1.25rem;
  color: #ffffff;
  display: flex;
  gap: 0.5rem;
}

.shad-button_ghost {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
  color: white;
}
```

</details>

<details>
<summary><code>queryKeys.ts</code></summary>

```typescript
export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = 'createUserAccount',

  // USER KEYS
  GET_CURRENT_USER = 'getCurrentUser',
  GET_USERS = 'getUsers',
  GET_USER_BY_ID = 'getUserById',

  // POST KEYS
  GET_POSTS = 'getPosts',
  GET_INFINITE_POSTS = 'getInfinitePosts',
  GET_RECENT_POSTS = 'getRecentPosts',
  GET_POST_BY_ID = 'getPostById',
  GET_USER_POSTS = 'getUserPosts',
  GET_FILE_PREVIEW = 'getFilePreview',

  //  SEARCH KEYS
  SEARCH_POSTS = 'getSearchPosts',
}
```

</details>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'primary-500': '#877EFF',
        'primary-600': '#5D5FEF',
        'secondary-500': '#FFB620',
        'off-white': '#D0DFFF',
        red: '#FF5A5A',
        'dark-1': '#000000',
        'dark-2': '#09090A',
        'dark-3': '#101012',
        'dark-4': '#1F1F22',
        'light-1': '#FFFFFF',
        'light-2': '#EFEFEF',
        'light-3': '#7878A3',
        'light-4': '#5C5C7B',
      },
      screens: {
        xs: '480px',
      },
      width: {
        420: '420px',
        465: '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

</details>

<details>
<summary><code>types.index.ts</code></summary>

```typescript
export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};
```

</details>

<details>
<summary><code>useDebounce.ts</code></summary>

```typescript
import { useEffect, useState } from 'react';

// https://codesandbox.io/s/react-query-debounce-ted8o?file=/src/useDebounce.js
export default function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}
```

</details>

<details>
<summary><code>utils.ts</code></summary>

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${formattedDate} at ${time}`;
}

//
export const multiFormatDateString = (timestamp: string = ''): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return 'Just now';
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
```

</details>

## <a name="links">🔗 Links</a>

Assets used in the project are [here](https://drive.google.com/file/d/13_7FofRAC3wARqPtAVPi53QNJJRd5RH_/view?usp=sharing)

## 👨‍💻 About Me

<div align="center">

<img src="./public/assets/MoTaz_Y.png" width="100" alt="MoTaz_Y"  />

</div>

<p align="center">
  I'm <strong>MoTaz</strong>, a <strong>Full-Stack Developer</strong> passionate about building clean, user-friendly applications with modern technologies.
  <br/>
  I love working with <strong>MERN Stack</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, and <strong>Appwrite</strong>. I'm also interested in DevOps and building scalable cloud-native apps.
</p>

<div align="center">
  <img src="https://skillicons.dev/icons?i=react,typescript,nodejs,express,mongodb,tailwind,appwrite,git,github,vscode,figma,docker" />
</div>

### 💡 Capabilities

- ⚡ Building full-stack web apps with MERN & Appwrite
- 📱 Creating responsive, accessible UIs with Tailwind
- 🔐 Secure authentication systems
- ⚙️ API design, database modeling, and cloud deployment
- 🔄 Real-time data fetching with React Query
- 🧪 Writing clean, reusable, testable code

---

> "Code is like humor. When you have to explain it, it’s bad."

---

### 🎯 Contact Me

<div align="center">
  <a href="https://www.linkedin.com/in/motaz-yasser" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Motaz-blue?style=for-the-badge&logo=linkedin" />
  </a>
  <a href="mailto:motazyasser84@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-Contact-red?style=for-the-badge&logo=gmail" />
  </a>
  <a href="https://github.com/MoTaz-Y" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Motaz_Y-black?style=for-the-badge&logo=github" />
  </a>
</div>
