# Project Information

## Project Structure
The project follows a modular structure with clear separation of concerns. Key directories include:
- **src/**: Contains the main application code, including components, pages, and utilities.
- **public/**: Static assets like images and fonts.
- **styles/**: TailwindCSS configuration and global styles.
- **tests/**: Unit and integration tests.

## Frameworks and Libraries
- **React**: Used for building the user interface.
- **TypeScript**: Ensures type safety across the codebase.
- **TailwindCSS**: Provides utility-first CSS for styling.
- **Vite**: A fast build tool for development and production.
- **Deno**: Used as the runtime environment.

## Build and Development Tools
- **Development Server**: `deno task dev` to start the development server.
- **Build**: `deno task build` to create a production build.
- **Linting**: `deno lint` to enforce code quality.
- **Preview**: `deno task preview` to preview the production build.

## Key Components
- **Pages**: Each page is a React component, located in the `src/pages` directory.
- **Components**: Reusable UI components are in `src/components`.
- **State Management**: Managed using React's Context API and hooks.

## Data Flow
The application uses a unidirectional data flow:
1. Data is fetched via API calls in services or hooks.
2. State is managed centrally and passed down as props or via context.
3. Components trigger actions to update the state.

## Styling
- **TailwindCSS**: Used for all styling needs, ensuring consistency and responsiveness.
- **Custom Themes**: Configured in the TailwindCSS configuration file.

## Notable Architectural Patterns
- **Component-Based Architecture**: Promotes reusability and modularity.
- **Type Safety**: Ensured through TypeScript.
- **Utility-First CSS**: Simplifies styling with TailwindCSS.
- **Fast Builds**: Achieved using Vite.
