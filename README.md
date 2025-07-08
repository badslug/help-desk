# Help Desk

AI lead help desk software using agents to guide support ticket creation.

## Set up

The app is a [SvelteKit](https://svelte.dev/docs/kit/introduction) which will run in any Node.js environment. Data is saved locally in a sqlite database with [Drizzle](https://orm.drizzle.team/) as an ORM (making it easy to migrate to a production database later). To begin, you will need the latest stable [node.js](https://nodejs.org) installed. The project uses [Volta](https://volta.sh) for pinning node and npm versions so it is recommended but not required to install Volta which will automatically configure node and npm to the correct versions when running npm in the project directory.

### AI

The AI chatbot uses local Ollama rather than a hosted AI service for offline development and ease of set up.

We also use the low-code LangFlow tooling to assist in the chatbot implementation making it easier to understand how the AI system is set up and troubleshoot issues. LangFlow can be turned into normal python code and deployed (or customized) for more sophisticated deployments in the future.

To set up for the AI system we will perform the following steps:

- Install Ollama
  - Install and run an ollama llm and embeddings
- Install LangFlow

#### Install Ollamma

https://ollama.com/download

Then download and run `qwen2.5` as our LLM, and `all-minilm:latest` as the embeddings.

```bash
ollama run qwen2.5
ollama run all-minilm:latest
```

#### Install LangFlow

https://www.langflow.org/desktop

Once installed (or when using the web UI via pip), in a new project, create a new, blank flow, then drag and drop the `Ahoy Matey.json` file into the flow to load the current chatbot flow. You can play with the chatbot using the `Playground` play button in the top right. Use the `Share > API Access` drop down in the top right of the flow to view the URL for accessing the flow via API. You will need to copy the URL for setting up the web app.

### Web App

Change into the project directory and set up by installing node dependencies and running the server.

#### Env Setup

Before you begin, copy the `.env.example` file to `.env` and configure the environmental variables. In general, you will only need to update the `LANGFLOW_API` variable to match the URL you copied in the previous step.

#### npm Setup

```bash
# Install dependencies
npm install
# Configure initial, empty sqlite database
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

### LangFlow

During normal development, you will need to keep LangFlow running to serve up the chatbot API. For production systems, the LangFlow solution can be compiled and deployed as a docker container or to a cloud hosted system. This setup has not been completed yet.

### OpenTelemetry

The application is instrumented with OpenTelemetry for distributed tracing. This allows you to monitor and debug the application's performance and behavior.

#### Viewing Traces

By default, the application sends traces to `http://localhost:4318/v1/traces` using the OTLP HTTP exporter. To view these traces, you need to run a compatible OpenTelemetry collector or visualization tool. Here are some options:

1. **Jaeger**: A popular open-source distributed tracing system.
   ```bash
   # Run Jaeger with Docker
   docker run -d --name jaeger \
     -e COLLECTOR_OTLP_ENABLED=true \
     -p 16686:16686 \
     -p 4317:4317 \
     -p 4318:4318 \
     jaegertracing/all-in-one:latest
   ```
   Then open http://localhost:16686 in your browser to view traces.

2. **Zipkin**: Another open-source distributed tracing system.
   ```bash
   # Run Zipkin with Docker
   docker run -d --name zipkin \
     -p 9411:9411 \
     openzipkin/zipkin
   ```
   Then open http://localhost:9411 in your browser to view traces.

3. **OpenTelemetry Collector**: You can also use the OpenTelemetry Collector to receive, process, and export telemetry data.
   ```bash
   # Run OpenTelemetry Collector with Docker
   docker run -d --name otel-collector \
     -p 4317:4317 \
     -p 4318:4318 \
     -v $(pwd)/otel-collector-config.yaml:/etc/otel-collector-config.yaml \
     otel/opentelemetry-collector:latest \
     --config=/etc/otel-collector-config.yaml
   ```

#### Configuring the Exporter

The OpenTelemetry exporter can be configured using environment variables:

- `OTEL_EXPORTER_OTLP_ENDPOINT`: The URL to send traces to (default: http://localhost:4318/v1/traces)
- `OTEL_EXPORTER_OTLP_HEADERS`: Headers to include with the OTLP requests
- `OTEL_RESOURCE_ATTRIBUTES`: Additional resource attributes to include with the traces

For example, to send traces to a different endpoint, you can set:
```
OTEL_EXPORTER_OTLP_ENDPOINT=https://your-collector-endpoint.com/v1/traces
```

#### Available Traces

The application currently traces:
- API requests to the AI endpoint (`ai_chat_request`)
- External calls to the LangFlow API (`langflow_api_call`)

Each trace includes relevant attributes such as HTTP method, URL, session ID, and message length.

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
