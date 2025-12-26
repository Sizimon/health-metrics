import config from './config.js';
import app from './server.js';
const server = app.listen(config.PORT, () => {
    console.log(`Health Metrics API listening on port ${config.PORT}`);
});
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed gracefully');
    });
});
