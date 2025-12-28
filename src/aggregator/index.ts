import { metricStore, MetricEntry } from './metricStore.js';
type recievedData = {
    service: string;
    route: string;
    method: string;
    status: number;
    latencyMs: number;
}

type SnapshotMetric = {
    count: number;
    averageLatency: number;
    statusCounts: Record<number, number>;
    errorCount: number;
    errorRate: number;
}

type Snapshot = Record<string, Record<string, SnapshotMetric>>;


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

export function getAllMetrics() {
    return metricStore;
}

export function createSnapshot(): Snapshot {
    const allMetricData = getAllMetrics();
    const snapshot: Snapshot = {};
    
    allMetricData.forEach((serviceMetrics, service) => {
        snapshot[service] = {};
        
        serviceMetrics.forEach((metricEntry, key) => {
            const averageLatency = metricEntry.count > 0 ? metricEntry.totalLatency / metricEntry.count : 0;
            
            // Calculate error count (status codes >= 400)
            const errorCount = Object.entries(metricEntry.statusCounts)
                .filter(([status]) => parseInt(status) >= 400)
                .reduce((sum, [_, count]) => sum + count, 0);
            
            snapshot[service][key] = {
                count: metricEntry.count,
                averageLatency: parseFloat(averageLatency.toFixed(2)),
                statusCounts: metricEntry.statusCounts,
                errorCount,
                errorRate: metricEntry.count > 0 ? parseFloat((errorCount / metricEntry.count * 100).toFixed(2)) : 0
            };
        });
    });
    
    return snapshot;
}