import { metricStore, MetricEntry } from './metricStore.js';
type recievedData = {
    service: string;
    route: string;
    method: string;
    status: number;
    latencyMs: number;
}


export function addEvent({ service, route, method, status, latencyMs }: recievedData) {
    if (!metricStore.has(service)) metricStore.set(service, new Map<string, MetricEntry>());

    const key = `${method}:${route}`;
    const serviceMetrics = metricStore.get(service)!;

    if (!serviceMetrics.has(key)) {
        serviceMetrics.set(key, { count: 0, totalLatency: 0, statusCounts: {} });
    }

    const metricEntry = serviceMetrics.get(key)!;
    metricEntry.count += 1;
    metricEntry.totalLatency += latencyMs;
    metricEntry.statusCounts[status] = (metricEntry.statusCounts[status] || 0) + 1;
}

export function resetMetrics({ service }: { service: string }) {
    try {
        if (metricStore.has(service)) {
            metricStore.set(service, new Map<string, MetricEntry>());
        }
    } catch (error) {
        console.error('Error resetting metrics:', error);
    }
}

export function getMetrics({ service }: { service: string }) {
    return metricStore.get(service);
}