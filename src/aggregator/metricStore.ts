type MetricEntry = {
    count: number;
    totalLatency: number;
    statusCounts: Record<number, number>;
}

const metricStore = new Map<string, Map<string, MetricEntry>>();

export { metricStore, MetricEntry };