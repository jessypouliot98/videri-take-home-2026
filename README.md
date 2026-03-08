# Documentation

## Installation

### Dependencies

- (Optional) [asdf](https://asdf-vm.com/) version manager
- [Nodejs](https://nodejs.org/en/download)
  - (Optional) [asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/)
- [Turborepo](https://turborepo.dev/docs/getting-started/installation#global-installation)

### Setup

- Copy all `.env.example` files to `.env` and fill in the values
- Install dependencies
  - Run `pnpm install`
- Start the database
  - `docker compose up -d` 
- Initialize the database
  - Run `pnpm --filter @apps/api run db:migrate`
- (Optional) Generate any files to codegen
  - Run `pnpm generate`
  - Note that this is optional because running `pnpm start:dev` (`turbo run start:dev`) depends on this script to continue.
- Start backend and frontend applications
  - Run `pnpm start:dev` 
- Build the OpenApi type-definitions
  - Once the API is up and running, run `pnpm codegen`
  - Note that this must run while the API is running and is a temporary solution until the OpenAPI codegen is fixed for CLI script usage.

## Notes

### Environment Variables

To improve the development experience of using variables, we could use [dotenv](https://www.npmjs.com/package/dotenv) to load all environment variables from a single `.env` file from root of the monorepo.

### Miscelaneous

- [Architecture Write-Up](/documentation/Videri%20-%20Architecture%20Write-Up.pdf)
- [Recording](/documentation/Recording.mp4)