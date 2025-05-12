# Firebase Functions API Example

This project demonstrates how to create and deploy a simple HTTP API using **Firebase Cloud Functions** and **TypeScript**.

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) v16 or v18
- [Firebase CLI](https://firebase.google.com/docs/cli) installed globally:

```bash
npm install -g firebase-tools
```

- A Firebase project already created ([console](https://console.firebase.google.com/))

## 🚀 Setup Instructions

### 1. Initialize Firebase project with Functions + Hosting

```bash
firebase init
```

- Choose both **Functions** and **Hosting**
- Choose **TypeScript** as the language for Functions
- Say "Yes" to installing dependencies
- Use `public` as the Hosting directory
- Configure as a single-page app → Yes

### 2. Create a simple HTTP API (functions/src/index.ts)

Replace the contents of `functions/src/index.ts` with:

```ts
import * as functions from "firebase-functions";
import { Request, Response } from "express";

export const helloWorld = functions.https.onRequest((req: Request, res: Response) => {
  res.send("Hello from Firebase!");
});
```

### 3. Install necessary dependencies

If not already installed:

```bash
cd functions
npm install express
npm install --save-dev @types/express
```

### 4. Build the TypeScript code

```bash
cd functions
npm run build
```

### 5. Deploy the function

```bash
firebase deploy --only functions
```

The CLI will show a URL like:

```
Function URL (helloWorld): https://us-central1-<your-project-id>.cloudfunctions.net/helloWorld
```

### 6. (Optional) Set up Hosting rewrite to call the API via your frontend domain

In `firebase.json`, add:

```json
"rewrites": [
  {
    "source": "/api/**",
    "function": "helloWorld"
  }
]
```

Then:

```bash
firebase deploy
```

Now your API is available at:

```
https://<your-project-id>.web.app/api/helloWorld
```

## ✅ Test your API

You can test it via:

```bash
curl https://<your-project-id>.web.app/api/helloWorld
```

or open in a browser.

## 🧪 Local development (optional)

To emulate locally:

```bash
firebase emulators:start
```

Then open:

```
http://localhost:5001/<your-project-id>/us-central1/helloWorld
```

## 📝 Notes

- Always use `express.Request` and `express.Response` for proper TypeScript support
- Express v4 is currently most compatible with Firebase Functions

