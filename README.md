# 🎯 HydraShop

A sleek and modern **e-commerce web app** designed to provide a smooth shopping experience, built with **Next.js 15**, **Tailwind CSS**, and **Sanity CMS**.

---

## 🚀 Features

### 🛒 Customer Features

- ✅ **User authentication & registration (Clerk)**
- ✅ **Profile & order management**
- ✅ **Browse products with categories and filters**
- ✅ **Add to cart & wishlist**
- ✅ **Secure checkout with Stripe payments**
- ✅ **View order history & details**
- ✅ **Product reviews & ratings**

### 🏪 Admin Features

- ✅ **Manage products, categories, and inventory (Sanity CMS)**
- ✅ **Update pricing, discounts, and promotions**
- ✅ **Track and manage customer orders**
- ✅ **Dashboard with sales insights**

---

## 🛠️ Technical Highlights

- ✅ **Next.js 15 with App Router for modern frontend**
- ✅ **Tailwind CSS responsive UI**
- ✅ **Framer Motion for smooth animations & transitions**
- ✅ **Sanity as Headless CMS & database**
- ✅ **Stripe integration for secure online payments**
- ✅ **Clerk for authentication & user management**
- ✅ **React Hook Form + Zod for form validation**
- ✅ **Zustand for lightweight state management**
- ✅ **ShadCN UI for modern, accessible components**
- ✅ **Toast notifications for alerts & feedback**

---

## .ENV

```bash
AUTH_GOOGLE_CLIENT_ID=""
AUTH_GOOGLE_CLIENT_SECRET=""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_BASE_URL=""
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET=""
SANITY_API_TOKEN=""
SANITY_API_READ_TOKEN=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

## 🧰 Tech Stack

| Layer      | Technology                      |
| ---------- | ------------------------------- |
| Frontend   | NEXT.JS 15.5.4, Tailwind CSS    |
| Backend    | Sanity (Headless CMS)           |
| Database   | Sanity (content + data storage) |
| Auth       | Clerk                           |
| Animations | Framer Motion                   |
| Forms      | React Hook Form                 |
| UI         | ShadCN                          |
| Alerts     | React Hot Toast                 |

---

## 🧑‍💻 Getting Started

### 🔧 Prerequisites

- Node.js `v22+`

### 📦 Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd HydraShop
```

# 2. Install dependencies

```bash
pnpm install && npm install
```

# 3. Run

```bash
npm run dev
```

### ✨ UI & UX

- Clean, modern design with **TailwindCSS**
- Fully responsive (desktop, tablet, mobile)
- Smooth transitions & micro-interactions with **Framer Motion**
- **Role-based dashboards** (Customer / Admin)
- **ShadCN UI components** for accessibility & consistency

---

### 🔐 Security & Performance

- Secure authentication & authorization with **Clerk**
- Safe online payments with **Stripe**
- Form validation & sanitization using **Zod**
- Optimized content & product data with **Sanity CMS**
- Lightweight global state management with **Zustand**
- Fast rendering & performance optimization with **Next.js 15**

---

### 🚢 Deployment

- **Frontend & backend deployed on Vercel** (Next.js)
- **Sanity Studio hosted on Sanity.io**
- **Stripe for payment infrastructure**
- **Clerk for authentication & user management**

---
