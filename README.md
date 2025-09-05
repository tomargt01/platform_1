SaaS ERP Platform (Frontend)
A modern, scalable frontend for a SaaS ERP platform built with Next.js, TypeScript, Tailwind CSS, and React. This project provides a responsive, multi-language user interface with theme switching, API integration, and robust error tracking.
Features

Framework: Next.js 14.2.0 with App Router,
Type Safety: TypeScript for strict typing,
Styling: Tailwind CSS with Radix UI components,
State Management: Zustand for global state, React Query for API data,
Forms: React Hook Form with Zod validation,
Internationalization: Multi-language support with react-i18next,
Monitoring: Vercel Analytics and Sentry for error tracking,
Documentation: Docusaurus for component and API documentation,
Code Quality: ESLint, Prettier, and Husky for linting and formatting.

Prerequisites

Node.js v20.17.0 or higher
npm v11.5.2 or higher
Git

Installation

Clone the repository:git clone <https://github.com/tomargt01/platform.git>
cd saas-erp-platform


Install dependencies:npm install


Set up environment variables:
Copy .env.example to .env.local and fill in values (e.g., NEXT_PUBLIC_API_URL, SENTRY_DSN).

cp .env.example .env.local


Run the development server:npm run dev



Available Scripts

npm run dev: Start the development server
npm run build: Build the production app
npm run start: Start the production server
npm run lint: Run ESLint
npm run lint:fix: Fix ESLint issues
npm run format: Format code with Prettier
npm run typecheck: Run TypeScript type checking
npm run test: Run Jest tests
npm run test:coverage: Generate test coverage report
npm run analyze: Analyze bundle size
npm run docs: Start Docusaurus documentation server
npm run docs:build: Build Docusaurus documentation

Project Structure
saas-erp-platform/
├── src/                    # Source code
│   ├── app/                # Next.js App Router
│   ├── components/         # Reusable components
│   ├── lib/                # Utilities and API helpers
│   ├── styles/             # Tailwind CSS and global styles
├── docs/                   # Docusaurus documentation
├── public/                 # Static assets
├── tests/                  # Test files
├── .husky/                 # Husky pre-commit hooks
├── .gitignore              # Git ignore rules
├── vercel.json             # Vercel deployment config
├── .vercelignore           # Vercel ignore rules
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m "Add YourFeature").
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

License
This project is licensed under the MIT License.
