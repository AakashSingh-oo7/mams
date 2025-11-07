# 🪖 Military Asset Management System (MAMS)

The **Military Asset Management System (MAMS)** is designed to help military commanders and logistics personnel efficiently manage, track, and audit critical assets such as vehicles, weapons, and ammunition across multiple bases.  
It ensures **transparency, accountability, and security** through **role-based access control (RBAC)** and **secure RESTful APIs**.

---

## 📋 Table of Contents
- [1️⃣ Project Overview](#1️⃣-project-overview)
- [2️⃣ Tech Stack & Architecture](#2️⃣-tech-stack--architecture)
- [3️⃣ Data Models / Schema](#3️⃣-data-models--schema)
- [4️⃣ RBAC (Role-Based Access Control)](#4️⃣-rbac-role-based-access-control)
- [5️⃣ API Logging](#5️⃣-api-logging)
- [6️⃣ Setup Instructions](#6️⃣-setup-instructions)
- [7️⃣ API Endpoints Overview](#7️⃣-api-endpoints-overview)
- [📷 Screenshots (Optional)](#-screenshots-optional)

---

## 1️⃣ Project Overview


https://github.com/user-attachments/assets/300eed71-cef5-4f5f-bd08-243c89b2474f


### 🎯 Purpose
The **Military Asset Management System (MAMS)** provides centralized management of all military assets, enabling:
- Tracking of **Opening Balances**, **Closing Balances**, and **Net Movements** (Purchases + Transfers In − Transfers Out)
- Recording **asset assignments** and **expenditures**
- Facilitating **asset transfers between bases** with movement history
- Enforcing **role-based access control** for secure and accountable operations

### ✅ Assumptions
- All bases are managed centrally within the system  
- Each asset has a unique ID  
- Every user has an assigned role before system access  

### ⚠️ Limitations
- Predictive analytics for asset needs are **not supported**  
- System requires **real-time internet connectivity** (no offline mode)  

---

## 2️⃣ Tech Stack & Architecture

### 🖥️ Frontend
Built using **React.js** for a modular and responsive UI.

**Technologies:**
- React.js  
- Bootstrap (Responsive UI)  
- React Router (Client-side routing)  
- Axios (API communication)  
- react-hot-toast (User notifications)

---

### ⚙️ Backend
Developed with **Spring Boot** for scalable and secure API services.

**Core Components:**
- Spring Boot  
- Spring Security with **JWT** for authentication and authorization  
- RESTful APIs for asset operations (Purchases, Transfers, Assignments)  
- Middleware/Interceptors for RBAC enforcement  

---

### 🗄️ Database
**MySQL** is used as the primary relational database.

**Key Features:**
- ACID-compliant transactions  
- Supports structured data relationships  
- Scalable and performant  

### ☁️ Cloud Storage
**AWS S3** is used for storing:
- Asset images (e.g., vehicles, weapons)
- Purchase invoices and related documents  

**Integration:**  
All uploaded file URLs are stored in MySQL for easy retrieval.

---

## 3️⃣ Data Models / Schema

### 🧩 Category Table (`tbl_category`)
| Column Name | Type | Constraints | Description |
|--------------|------|-------------|--------------|
| id | BIGINT | PK, Auto Increment | Internal Primary Key |
| categoryId | VARCHAR | Unique | Unique category identifier |
| name | VARCHAR | Unique | Category name |
| description | VARCHAR | Optional | Category description |
| bgColor | VARCHAR | Optional | Background color for UI |
| imageUrl | VARCHAR | Optional | Image URL stored in S3 |
| createdAt | TIMESTAMP | Auto | Creation timestamp |
| updatedAt | TIMESTAMP | Auto | Last update timestamp |

---

### 🧩 Item Table (`tbl_items`)
| Column Name | Type | Constraints | Description |
|--------------|------|-------------|--------------|
| id | BIGINT | PK, Auto Increment | Internal Primary Key |
| itemId | VARCHAR | Unique | Unique item identifier |
| name | VARCHAR | Required | Item name |
| price | DECIMAL | Optional | Item price |
| description | VARCHAR | Optional | Item description |
| imgUrl | VARCHAR | Optional | Item image URL |
| category_id | BIGINT | FK → tbl_category(id) | Linked category ID |
| createdAt | TIMESTAMP | Auto | Creation timestamp |
| updatedAt | TIMESTAMP | Auto | Update timestamp |

**Relationships:**
- One Category → Many Items  
- Category deletion restricted if items exist

---

### 🧍 User Table (`tbl_user`)
| Column Name | Type | Constraints | Description |
|--------------|------|-------------|--------------|
| id | BIGINT | PK, Auto Increment | Internal Primary Key |
| userId | VARCHAR | Unique | User identifier |
| name | VARCHAR | Required | Full name |
| email | VARCHAR | Unique | User email |
| password | VARCHAR | Required | Encrypted password |
| role | VARCHAR | Required | User role (`Admin`, `Commander`, `Logistics`) |
| createdAt | TIMESTAMP | Auto | Creation timestamp |
| updatedAt | TIMESTAMP | Auto | Update timestamp |

---

## 4️⃣ RBAC (Role-Based Access Control)

| Role | Access Level |
|------|---------------|
| **Admin** | Full access: Create, Update, Delete all assets, transfers, users |
| **Base Commander** | Manage Dashboard & Purchases for assigned base |
| **Logistics Officer** | Record & View Dashboard and Purchases for assigned base |

**Implementation Details:**
- RBAC enforced via **middleware** and **JWT validation**
- Each API validates user role and base assignment
- Unauthorized access → `HTTP 403 Forbidden`

---

## 5️⃣ API Logging
- All API requests/responses are logged for auditing  
- Security logs track failed login attempts and unauthorized access  
- Movement logs capture asset transfers and transactions  

---

## 6️⃣ Setup Instructions

### ⚙️ Prerequisites
Ensure you have installed:
- Java 17+  
- Maven  
- Node.js 18+  
- MySQL 8+  
- AWS Account (for S3)  
- Git  

---

### 🔧 Installation Steps

#### 1. Clone Repositories
```bash
# Backend
git clone https://github.com/AakashSingh-oo7/mams-backend.git


2. Backend Setup
cd mams-backend


Edit src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://<DB_HOST>:3306/mams_db
spring.datasource.username=<DB_USERNAME>
spring.datasource.password=<DB_PASSWORD>
jwt.secret=<JWT_SECRET>
aws.s3.bucket=<S3_BUCKET_NAME>
aws.access.key=<AWS_ACCESS_KEY>
aws.secret.key=<AWS_SECRET_KEY>


Build and run:

mvn clean install
mvn spring-boot:run


Backend URL:
👉 http://localhost:8080/

3. Frontend Setup
cd mams-frontEnd
npm install


Create .env file in root:

REACT_APP_API_BASE_URL=http://localhost:8080/api


Start frontend:

npm start


Frontend URL:
👉 http://localhost:3000/

7️⃣ API Endpoints Overview
🔐 Authentication
Endpoint	Method	Description	Access
/api/v1.0/login	POST	Authenticate user & return JWT	Public
/api/v1.0/encode	POST	Encode plaintext password	Public

Headers:
Authorization: Bearer <jwt-token>

📁 Category Management
Endpoint	Method	Description	Access
/api/v1.0/categories	GET	Fetch all categories	Admin, Commander, Logistics
/api/v1.0/admin/categories	POST	Add new category (with image)	Admin
/api/v1.0/admin/categories/{categoryId}	DELETE	Delete category by ID	Admin
🧱 Item / Asset Management
Endpoint	Method	Description	Access
/api/v1.0/admin/items	GET	Fetch all items	Admin
/api/v1.0/admin/items	POST	Add new item (with image)	Admin
/api/v1.0/admin/items/{itemId}	DELETE	Delete item by ID	Admin
👥 User Management
Endpoint	Method	Description	Access
/api/v1.0/admin/register	POST	Register a new user	Admin
/api/v1.0/admin/users	GET	Fetch all users	Admin
/api/v1.0/admin/users/{id}	DELETE	Delete user by ID	Admin
# Frontend
git clone https://github.com/AakashSingh-oo7/mams-frontEnd.git
