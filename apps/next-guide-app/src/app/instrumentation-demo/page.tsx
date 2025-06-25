export default function InstrumentationDemoPage() {
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Instrumentation Demo</h1>
      <p className="mb-4 text-blue-900">
        This page explains how to use <strong>Instrumentation</strong> in Next.js for logging, tracing, and custom
        metrics.
      </p>
      <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-yellow-900 text-sm mb-6">
        <h2 className="font-semibold mb-2">What is Instrumentation in Next.js?</h2>
        <p className="mb-2">
          Instrumentation in Next.js allows you to hook into the lifecycle of your application to collect metrics, trace
          performance, or log custom events. This is useful for monitoring, debugging, and observability in production.
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>
            You can add an <code>instrumentation.js</code> (or <code>instrumentation.ts</code>) file to your{' '}
            <code>app/</code> directory.
          </li>
          <li>Use it to register OpenTelemetry providers, custom loggers, or to trace requests and responses.</li>
          <li>Instrumentation runs only on the server and is not included in the client bundle.</li>
        </ul>
        <p className="mb-2">
          <a
            href="https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-yellow-700"
          >
            Read more in the official Next.js Instrumentation documentation
          </a>
        </p>
      </div>
      <div className="bg-blue-50 p-4 rounded border border-blue-100 text-blue-900 text-sm mb-6">
        <h2 className="font-semibold mb-2">Example: instrumentation.js</h2>
        <pre className="bg-white p-2 rounded border border-blue-100 overflow-x-auto text-xs mb-2">
          {`// apps/next-guide-app/src/app/instrumentation.js
import { registerOTel } from 'next/otel';

export function register() {
  // Register OpenTelemetry providers, custom loggers, etc.
  registerOTel();
  // You can add custom hooks here
}`}
        </pre>
        <ul className="list-disc pl-5">
          <li>
            Use <code>register()</code> to set up tracing, logging, or metrics.
          </li>
          <li>Works with OpenTelemetry, custom loggers, or any Node.js monitoring tool.</li>
          <li>Instrumentation is run once per server process startup.</li>
        </ul>
      </div>
      <div className="bg-green-50 p-4 rounded border border-green-200 text-green-900 text-sm mb-6">
        <h2 className="font-semibold mb-2">How to connect to Prometheus or Sentry?</h2>
        <p className="mb-2">
          <strong>Prometheus:</strong> You can use OpenTelemetry to export metrics to Prometheus. In your{' '}
          <code>instrumentation.js</code>, set up an OpenTelemetry Prometheus exporter. See the{' '}
          <a
            href="https://opentelemetry.io/docs/instrumentation/js/exporters/#prometheus"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-green-700"
          >
            OpenTelemetry JS Prometheus Exporter docs
          </a>
          .
        </p>
        <pre className="bg-white p-2 rounded border border-green-100 overflow-x-auto text-xs mb-2">
          {`import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { MeterProvider } from '@opentelemetry/sdk-metrics';

export function register() {
  const exporter = new PrometheusExporter({ startServer: true }, () => {
    console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
  });
  const meterProvider = new MeterProvider({ exporter });
  // Register your metrics here
}`}
        </pre>
        <p className="mb-2">
          <strong>Sentry:</strong> You can initialize Sentry in <code>instrumentation.js</code> for server-side error
          tracking and performance monitoring. See the{' '}
          <a
            href="https://docs.sentry.io/platforms/javascript/guides/nextjs/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-green-700"
          >
            Sentry Next.js docs
          </a>
          .
        </p>
        <pre className="bg-white p-2 rounded border border-green-100 overflow-x-auto text-xs mb-2">
          {`import * as Sentry from '@sentry/nextjs';

export function register() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    // ...other Sentry options
  });
}`}
        </pre>
      </div>
    </div>
  );
}
