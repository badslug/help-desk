import type { RequestHandler } from './$types';
import { LANGFLOW_API } from '$env/static/private';
import { withSpan } from '$lib/tracing';
import { SpanKind } from '@opentelemetry/api';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	// Actually send to the chatbot
	const payload = {
		input_value: data.message,
		output_type: 'chat',
		input_type: 'chat',
		session_id: data.session
	};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	};

	// Note this is directly to the LangFlow server (running locally during development). If deployed to production
	// the bot will need to proxy calls through the server backend.
	return await withSpan(
		'ai_chat_request',
		async () => {
			const response = await withSpan(
				'langflow_api_call',
				() => fetch(LANGFLOW_API, options),
				{
					'http.url': LANGFLOW_API,
					'http.method': 'POST',
					'session.id': data.session
				},
				SpanKind.CLIENT
			);

			const info = await response.json();
			return new Response(JSON.stringify({ answer: info.outputs[0].outputs[0].artifacts.message }));
		},
		{
			'request.type': 'ai_chat',
			'message.length': data.message.length.toString()
		}
	).catch((err) => {
		console.error(err);
		throw err;
	});
};
