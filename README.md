# My-Own-OAuth
# 🔐 OAuth 2.0 / OpenID Connect Server (Node.js)

A lightweight OAuth 2.0 + OpenID Connect (OIDC) server built with Node.js and Express.
Extended the authentication code of hitesh sir with OAuth functionality
Implements the **Authorization Code flow**, JWT-based access tokens (RS256), JWKS endpoint, and user info retrieval.

---

## 🚀 Features

* 🔑 Authorization Code Flow
* 🔐 JWT Access Tokens (RS256)
* 🔁 Public/Private key generation (RSA)
* 📡 JWKS endpoint (`/jwks`)
* 👤 User Info endpoint (`/userinfo`)
* ⚙️ OpenID Discovery (`.well-known`)
* 🧪 Postman collection included for testing

---
---

## 🧠 How It Works

1. Client fetches configuration from `.well-known/openid-configuration`
2. User logs in via `authorization_endpoint`
3. Server returns a short-lived **authorization code**
4. Backend exchanges code at `/token`
5. Access token is issued (JWT signed with private key)
6. API verifies token using **JWKS**
7. Client fetches user details via `/userinfo`

---

## 📡 Endpoints

### 🔹 OpenID Configuration

```
GET /api/oauth/authenticate/.well-known/openid-configuration
```

Returns metadata:

* `issuer`
* `authorization_endpoint`
* `token_endpoint`
* `userinfo_endpoint`
* `jwks_uri`

---

### 🔹 Authorization Endpoint

```
GET /api/auth/logincode
```

* Authenticates user
* Returns short-lived authorization code

---

### 🔹 Token Endpoint

```
POST /api/oauth/token
```

#### Request Body

```json
{
  "clientId": "1234",
  "code": "authorization-code"
}
```

#### Response

```json
{
  "access_token": "JWT_TOKEN",
}
```

---

### 🔹 JWKS Endpoint

```
GET /api/oauth/jwks
```

#### Response

```json
{
  "keys": [
    {
      "kty": "RSA",
      "n": "...",
      "e": "AQAB",
      "kid": "1",
      "alg": "RS256",
      "use": "sig"
    }
  ]
}
```

---

### 🔹 User Info Endpoint

```
GET /api/oauth/userinfo
Authorization: Bearer <access_token>
```

#### Response

```json
{
    "success": true,
    "message": "user details",
    "data": {
        "_id": "69e3cb04c08ec0e3f4561a0f",
        "name": "Hrishikesh",
        "email": "hrishikesh@gmail.com",
        "role": "customer",
        "isVerified": true,
        "createdAt": "2026-04-18T18:18:44.521Z",
        "updatedAt": "2026-04-18T18:18:44.521Z",
        "__v": 0
    }
}
```

---

## 🔐 JWT Details

* Algorithm: `RS256`
* Signed using **private key**
* Verified using **public key (JWKS)**

#### Example Payload

```json
{
  "sub": "123",
  "role": "admin",
  "iss": "http://localhost:4000",
  "aud": "1234",
  "exp": 1712345678
}
```

---

## 🔑 Key Management

* `private.pem` → used to sign JWT
* `public.pem` → used internally for verification
* JWKS → exposes public key in JWK format

Keys are generated once and reused.

---

## 📬 Postman Collection

A ready-to-use Postman collection is included to test all endpoints.

### 📁 Location

```
OAuth.postman_collection.json
```

---

### ▶️ Steps to Use

1. Open Postman
2. Click **Import**
3. Select the collection file
4. Set environment variables

---

### ⚙️ Environment Variables

```json
{
  "client_id": "1234",
}
```

---

### 🔄 Flow in Postman

1. Call `.well-known`
2. Hit `/api/auth/logincode` → get `code`
3. Use `code` in `/token`
4. Save `access_token`
5. Call `/userinfo`

---

## ⚙️ Environment Setup

Create a `.env` file:

```
CLIENT_ID=1234
REDIRECT_URI=http://localhost:3000/callback
```

---

## 🛠️ Installation

```
npm install
npm run dev
```

---

## ⚠️ Security Notes

* Never accept public keys from client ❌
* Always verify:

  * `iss` (issuer)
  * `aud` (audience)
  * `exp` (expiry)
* Use HTTPS in production
* Store private keys securely

---

## 📌 Future Improvements

* 🔄 Refresh Tokens
* 👥 Multi-client support
* 🔁 Key rotation

---

## 🧱 Tech Stack

* Node.js
* Express
* jsonwebtoken
* crypto (RSA)

---

## 👨‍💻 Author

Hrishikesh Shanbhag

---

## ⭐ Note

This project is built for learning and demonstration purposes.
Enhance security and scalability before using in production.
