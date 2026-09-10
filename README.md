# Shoshos Oil and Gas Intl. Limited — Full Stack Website

> **Stack:** Next.js 14 (React, TypeScript) + FastAPI (Python) + PostgreSQL

Company content and colours come from the supplied Shoshos profile. See [brand and content notes](docs/brand-and-content.md) for page references, domain spelling notes and configuration details. The downloadable profile is `frontend/public/brochure.pdf`.

---

## 📁 Project Structure

```
shoshos-website/
├── frontend/                  # Next.js 14 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx               ← Home page
│   │   │   ├── layout.tsx             ← Root layout
│   │   │   ├── contact/page.tsx       ← Contact page
│   │   │   └── admin/
│   │   │       ├── page.tsx           ← Admin login
│   │   │       └── dashboard/page.tsx ← Admin dashboard
│   │   ├── components/
│   │   │   ├── layout/Navbar.tsx
│   │   │   └── sections/
│   │   │       ├── Hero.tsx
│   │   │       ├── StatsBar.tsx
│   │   │       ├── WhatWeDo.tsx
│   │   │       ├── WhyPartner.tsx
│   │   │       └── CTAAndFooter.tsx
│   │   └── styles/globals.css
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   └── .env.local.example
│
└── backend/                   # FastAPI + PostgreSQL
    ├── app/
    │   ├── main.py                    ← FastAPI app entry
    │   ├── core/
    │   │   ├── config.py              ← Settings / env vars
    │   │   ├── database.py            ← Async SQLAlchemy
    │   │   └── security.py            ← JWT + password hashing
    │   ├── models/
    │   │   ├── user.py                ← Admin user model
    │   │   └── content.py             ← Contact + Service models
    │   ├── schemas/
    │   │   └── schemas.py             ← Pydantic schemas
    │   └── api/
    │       ├── auth.py                ← Login + seed admin
    │       ├── contact.py             ← Contact form submission
    │       ├── services.py            ← Services CRUD
    │       └── admin.py               ← Admin stats + messages
    ├── requirements.txt
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- SQLite for local development (included with Python), or PostgreSQL

---

### 1. Database Setup

Local development uses SQLite and requires no Supabase account or database server. Keep `DATABASE_URL=sqlite+aiosqlite:///./shoshos.db` in `backend/.env`. Tables are created automatically.

For optional PostgreSQL, configure its connection string and create the database:

```bash
# Create the database
psql -U postgres
CREATE DATABASE shoshos_db;
\q
```

---

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials and secret key

# Start the server
uvicorn app.main:app --reload --port 8000
```

The API will be live at: **http://localhost:8000**
Interactive docs at: **http://localhost:8000/docs**

#### Seed the Admin Account
Set `ADMIN_EMAIL_DEFAULT` and `ADMIN_PASSWORD_DEFAULT` in `backend/.env`, then run from the `backend` directory:
```bash
python -m app.manage_admin
```
This creates the administrator using your configured credentials. The example defaults are `admin@shoshosltd.com` / `ChangeMe123!`; choose your own password before creating the account.

Editing `.env` alone does not change an existing account. To apply an updated password explicitly:
```bash
python -m app.manage_admin --reset-password
```

Start the backend on port 8000 before signing in. Both local frontend ports 3000 and 3100 are allowed by the example CORS configuration.

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000

# Start development server
npm run dev
```

Frontend will be live at: **http://localhost:3000**

---

## 🔐 Admin Panel

Access: **http://localhost:3000/admin**

Features:
- ✅ Dashboard with stats (messages, services counts)
- ✅ View and manage contact form submissions
- ✅ Mark messages as read / delete
- ✅ Reply to inquiries via email link
- ✅ JWT-based secure authentication

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page — Hero, Stats, Services, Why Partner, CTA, Footer |
| `/contact` | Contact form (submits to backend API) |
| `/services` | Services listing (extend as needed) |
| `/admin` | Admin login |
| `/admin/dashboard` | Admin dashboard (protected) |

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/services` | List active services |
| GET | `/api/services/{slug}` | Get single service |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login → JWT token |
| POST | `/api/auth/seed-admin` | Create default admin (run once) |

### Admin (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/messages` | All contact submissions |
| PATCH | `/api/admin/messages/{id}/read` | Mark message as read |
| DELETE | `/api/admin/messages/{id}` | Delete message |
| POST | `/api/services` | Create service |
| PUT | `/api/services/{id}` | Update service |
| DELETE | `/api/services/{id}` | Delete service |

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--red` | `#B94312` | Accessible orange for CTAs |
| `--brand-orange` | `#F36B2B` | Orange from the company profile |
| `--brand-cyan` | `#19B8D1` | Cyan from the company profile |
| `--navy` | `#071827` | Background, navbar, footer |
| `--navy-light` | `#0B2438` | Secondary dark surfaces |
| `--slate-500` | `#64748B` | Body text |
| `--bg-light` | `#F4F8FA` | Section backgrounds |
| Font Display | Montserrat | Headings, logo |
| Font Body | Inter | Body text |
| Font UI | Inter | Buttons, labels, nav |

---

## 📦 Deployment

### Frontend → Vercel
```bash
npm install -g vercel
cd frontend && vercel
# Set NEXT_PUBLIC_API_URL to your backend URL in Vercel dashboard
```

### Backend → Railway / Render
1. Push the `backend/` folder to a GitHub repo
2. Connect to Railway or Render
3. Set all environment variables from `.env.example`
4. Deploy — it will auto-run `uvicorn app.main:app --host 0.0.0.0 --port 8000`

### Database → Supabase / Railway Postgres
- Use the connection string in `DATABASE_URL` in `.env`

---

## 🖼️ Adding Images

Place these images in `frontend/public/images/`:
- `hero-offshore.jpg` — Offshore rig / energy industry hero image
- `team-offshore.jpg` — Team photo for "Why Partner" section

---

## 📧 Email Notifications (SendGrid)

To activate email notifications when a contact form is submitted:
1. Sign up at sendgrid.com and get an API key
2. Add `SENDGRID_API_KEY` to `.env`
3. Uncomment the email lines in `backend/app/api/contact.py`

---

Built with ❤️ for Shoshos Oil and Gas Intl. Limited
