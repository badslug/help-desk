import { initTracing } from '$lib/tracing';

// Initialize OpenTelemetry when the server starts
const provider = initTracing();

// This ensures the tracing is properly shut down when the server stops
process.on('SIGTERM', () => {
	provider
		.shutdown()
		.then(() => console.log('Tracing terminated'))
		.catch((error) => console.log('Error terminating tracing', error))
		.finally(() => process.exit(0));
});
