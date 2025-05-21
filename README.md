# create-exa-app

A command-line tool to quickly set up a new Exa AI project with Next.js, TailwindCSS, and more.

## Overview

`create-exa-app` provides a streamlined way to start building applications with [Exa AI](https://exa.ai)'s powerful search and content retrieval capabilities. This tool sets up a fully configured Next.js project with integrated Exa AI API components, allowing you to build AI-powered search applications in minutes instead of hours.

## Features

- 🚀 **Instant Setup**: Create a fully functional Exa AI + Next.js application in seconds
- 🧩 **Ready-to-Use Components**: Pre-built components for Search, Contents, Find Similar, and Answer APIs
- 🎨 **Responsive UI**: Beautiful, responsive UI with Tailwind CSS and dark/light mode support
- 📝 **Interactive Examples**: Working examples for all major Exa AI features
- 🛠️ **Modern Stack**: Next.js 15, React 19, Tailwind v4, and more

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- An Exa AI API key (get one at [exa.ai](https://exa.ai))

### Create Your App

```bash
npx create-exa-app my-exa-project
```

This will create a new directory with your project and install all dependencies.

### Configure API Key

Create a `.env.local` file in your project root:

```env
EXA_API_KEY=your_api_key_here
```

### Start Development Server

```bash
cd my-exa-project
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to see your application.

## Available API Components

The template includes examples for all major Exa AI features:

- **Search**: Search the web with Exa's semantic search capabilities
- **Contents**: Retrieve clean, structured content from any URL
- **Find Similar**: Discover websites semantically similar to a given URL
- **Answer**: Get AI-generated answers with citations backed by Exa's search

## Project Structure

```
my-exa-project/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API routes for Exa AI
│   │   ├── search/          # Search page example
│   │   ├── contents/        # Contents page example
│   │   ├── find-similar/    # Find Similar page example
│   │   ├── answer/          # Answer page example
│   │   └── page.js          # Home page
│   ├── components/          # Reusable UI components
│   └── lib/                 # Utility functions
├── public/                  # Static assets
├── .env.local               # Environment variables (add your API key here)
└── package.json             # Project dependencies
```

## Customization

### Styling

The project uses Tailwind CSS v4 with a clean, minimal design. You can customize the theme by editing:

```js
// src/app/globals.css
// Modify the CSS variables for colors, spacing, etc.
```

### API Options

Each API route can be customized to fit your needs:

```js
// src/app/api/search/route.js
// Modify the search parameters, result count, etc.
```

### Components

The UI components are modular and can be reused across your application:

```jsx
// Example: Import Button component
import { Button } from "@/components/ui/button";
```

## Learn More

- [Exa AI Documentation](https://exa.ai/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created by [Samarth Saxena](https://github.com/awesamarth)