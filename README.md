# Gymnastic

## Getting Started

- Git
- Node js v18+
- Visual Studio Code or any other IDE

## Project Setup

1. Clone this project [https://github.com/musmanfarooq/gymnastic.git](https://github.com/musmanfarooq/gymnastic.git)
2. Open workspace form the VS Code
   - Click on Files
   - Click on Open Workspace form files
   - And choose digital-dashboard.code.workspace files present in the root
3. Navigate to client folder by either selecting it form the terminal for run this command in the terminal

```bash
cd client
```

4. Install dependencie

```bash
npm install
```

5. Now navigate to the server folder by using VS Code terminal or use this

```bash
cd server
```

6. Install dependencie

```bash
npm install
```

7. Environment Variables
   - In server folder create a `.env ` file and paste these

```bash
PORT = "5000"
SECRET_KEY = "add_secret_key_here"

```

- In client folder create a `.env.local` file and paste these


## Project Startup

1. Use the following commmand to run the client folder
   ```bash
   npm run dev
   ```
   - Create a new account form the dashboard
2. Use these comand in the server folder to run the server
   ```bash
   npm run build
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
