# Help Desk

AI lead help desk software using agents to guide support ticket creation.

## Set up

The app is a [SvelteKit](https://svelte.dev/docs/kit/introduction) which will run in any Node.js environment. Data is saved locally in a sqlite database with [Drizzle](https://orm.drizzle.team/) as an ORM (making it easy to migrate to a production database later). To begin, you will need the latest stable [node.js](https://nodejs.org) installed. The project uses [Volta](https://volta.sh) for pinning node and npm versions so it is recommended but not required to install Volta which will automatically configure node and npm to the correct versions when running npm in the project directory.

Set up by installing node dependencies

```bash
# Install dependencies
npm install
# Configure initial sqlite database
npm run db:push
```

## Developing

Once you've installed dependencies, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Database

Database management is performed via [Drizzle](https://orm.drizzle.team/):

```bash
# create and configure the initial sqlite database
npm run db:push

# Use Drizzle studio to browser and interact with the database
npm run db:studio
```

### Storybook

Svelte components can be browsed, developed and explored using [Storybook](https://storybook.js.org/):

```bash
npm run storybook
```

## Building

To create a production version of your app:

```bash
npm run build
```

The build products are stored in the `build` directory where it can be launched as a node app.

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

### Testing

A variety of tests are available:

```bash
# Run all tests
npm test

# Run only vitest unit tests
npm run test:unit

# Run only Playwright UI/e2e tests
npm run test:e2e
```
