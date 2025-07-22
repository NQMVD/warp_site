# AGENTS.md

## Build, Lint, and Test Commands
- **Development Server**: `deno task dev`
- **Build**: `deno task build`
- **Lint**: `deno lint`
- **Preview**: `deno task preview`

## Frameworks
- **Frontend**: React (with TypeScript)
- **Styling**: TailwindCSS
- **Build Tool**: Vite

## Code Style Guidelines
1. **Imports**: Use ES module syntax. Group imports by libraries first, then local files.
2. **Formatting**: Follow Prettier defaults if configured.
3. **Types**: Use TypeScript for type safety. Prefer `interface` over `type` for object definitions.
4. **Naming Conventions**: Use camelCase for variables and functions, PascalCase for components and classes.
5. **Error Handling**: Use `try-catch` for async operations. Log errors with context.
6. **React Hooks**: Follow the rules of hooks. Use `eslint-plugin-react-hooks` to enforce.
7. **CSS**: Use TailwindCSS for styling. Avoid inline styles unless dynamic.

## Notes
- Ensure all new code passes linting and type checks.
- Use `eslint` and `typescript-eslint` for consistent code quality.
- Follow the existing folder structure and naming conventions for new files.

Happy coding!