# Medical Care Register

# 🛠️ Backend Tech Stack Overview

## 🚀 Technology Stack

### 🔙 Backend

- **Language:** JavaScript (ES6+)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)

### 🗄️ Database

- **Relational Database:** [MariaDB](https://mariadb.org/)
- **ORM:** [Objection.js](https://vincit.github.io/objection.js/)
- **Query Builder:** [Knex.js](http://knexjs.org/)

### ⚙️ Infrastructure & DevOps

- **Process Manager:** [PM2](https://pm2.keymetrics.io/)
- **Environment Management:** `.env` files for development and production environments
- **Version Control:** [Git](https://git-scm.com/) via [GitLab](https://gitlab.com/)

---

## 🌳 Branching Strategy

### 📂 Branches

- **Default Branch:** `dev` – All feature branches are created from this branch.
- **Production Branch:** `prod` – Used for stable, production-ready code.

### 🔧 Feature Development Workflow

1. Create a new feature branch from `dev`.
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
