import { metricStore } from './metricStore.js';
export function addEvent({ service, route, method, status, latencyMs }) {
    if (!metricStore.has(service))
        metricStore.set(service, new Map());
    const key = `${method}:${route}`;
    const serviceMetrics = metricStore.get(service);
    if (!serviceMetrics.has(key)) {
        serviceMetrics.set(key, { count: 0, totalLatency: 0, statusCounts: {} });
    }
    const metricEntry = serviceMetrics.get(key);
    metricEntry.count += 1;
    metricEntry.totalLatency += latencyMs;
    metricEntry.statusCounts[status] = (metricEntry.statusCounts[status] || 0) + 1;
}
