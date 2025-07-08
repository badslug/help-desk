import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { trace, SpanKind, SpanStatusCode } from '@opentelemetry/api';

// Initialize the OpenTelemetry SDK
export function initTracing() {
	const resource = Resource.default().merge(
		new Resource({
			[ATTR_SERVICE_NAME]: 'help-desk',
			[ATTR_SERVICE_VERSION]: '0.0.1'
		})
	);

	const provider = new NodeTracerProvider({
		resource
	});

	// Configure the OTLP exporter
	// By default, it will send traces to http://localhost:4318/v1/traces
	// This can be configured via environment variables
	const otlpExporter = new OTLPTraceExporter({
		// Optional: customize the OTLP endpoint
		// url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
	});

	// Use BatchSpanProcessor for better performance
	provider.addSpanProcessor(new BatchSpanProcessor(otlpExporter));

	// Register the provider
	provider.register();

	return provider;
}

// Create a tracer
export const tracer = trace.getTracer('help-desk-tracer');

// Helper function to create a span for API requests
export async function withSpan<T>(
	name: string,
	fn: () => Promise<T>,
	attributes: Record<string, string> = {},
	kind: SpanKind = SpanKind.SERVER
): Promise<T> {
	return tracer.startActiveSpan(name, { attributes, kind }, async (span) => {
		try {
			const result = await fn();
			span.setStatus({ code: SpanStatusCode.OK });
			return result;
		} catch (error) {
			span.setStatus({
				code: SpanStatusCode.ERROR,
				message: error instanceof Error ? error.message : String(error)
			});
			throw error;
		} finally {
			span.end();
		}
	});
}
