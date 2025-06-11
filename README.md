# Training monorepo

A monorepo project demonstrating different approaches to routing in React applications, built with modern tooling and best practices. This project showcases two different routing implementations:

- Data-driven routing approach
- Declarative routing approach

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Yarn 4.6.0+ for package management
- ESLint + Prettier for code quality
- Husky for git hooks

## Project Structure

This is a monorepo using Yarn workspaces, organized as follows:

- `apps/` - Contains the routing implementation examples:
  - `data-way/` - Data-driven routing approach
  - `declarative-way/` - Declarative routing approach
- `packages/` - Shared packages:
  - `ui/` - Common UI components

## Prerequisites

- Node.js >= 20.0.0
- Yarn 4.6.0+

### Installing Yarn 4

1. First, install the latest version of Yarn globally:

   ```bash
   npm install -g yarn
   ```

2. Then, enable Yarn Berry (Yarn 4) in your project:

   ```bash
   yarn set version berry
   ```

3. Verify the installation:

   ```bash
   yarn --version
   # Should show 4.6.0 or higher
   ```

4. (Optional) Enable Zero-Installs for faster installations:
   ```bash
   yarn config set enableGlobalCache true
   ```

## Getting Started

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Build ui package:

```bash
   yarn build:ui
```

3. Start the development server for a specific routing approach:

   ```bash
   # For data-driven routing approach
   yarn start:data-way

   # For declarative routing approach
   yarn start:declarative-way
   ```

## Available Scripts

- `yarn start:data-way` - Start the data-driven routing example
- `yarn start:declarative-way` - Start the declarative routing example
- `yarn lint` - Run ESLint to check code quality
- `yarn lint:fix` - Fix ESLint issues automatically
- `yarn pretty` - Check code formatting with Prettier
- `yarn pretty:fix` - Fix code formatting issues automatically
- `yarn qa` - Run both linting and formatting checks
- `yarn clean` - Clean all node_modules and build artifacts

## Development

For local development, you can use:

```bash
yarn start:data-way
# or with artificial delay
yarn start:declarative-way
```

## Contributing

1. Make sure to run `yarn qa` before committing changes
2. Follow the established code style (ESLint + Prettier)
3. Write meaningful commit messages

## License

Private - Training purposes only
