# Q2 Interactive - Blog Challenge

A blog website allowing to see list of created blog posts, see detail of each post, and create a new one.

## Getting Started

### Prerequisites

- Node.js (version 15 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/micholenko/Q2-challenge.git
cd Q2-challenge
```

2. Install dependencies:
```bash
npm install
```

### Configuration

**Important:** Before running the application, you need to configure the API key.

1. Open `src/lib/proxyHelper.ts`
2. Replace the empty `API_KEY` constant with your actual API key:
```typescript
const API_KEY = 'your-api-key-here';
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm start` - Runs the built application
- `npm run lint` - Runs ESLint to check for code issues


