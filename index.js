import http from 'http';
import express from 'express';
import cors from 'cors';
import authRoute from './src/auth/route.js';
import modalRoute from './src/modals/route.js';
import settingRoute from './src/settings/route.js';
import adminRoute from './src/admin/route.js';
import errorMiddleware from './src/middlewares/errorHandler.middleware.js';
// import { initializeSocket } from './src/socket.js';
import _mailTransporter from './src/utils/mailTransporter.js';

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors('*'))
    .use(express.json())
    .use(express.static('public'))
    .use('/api', authRoute)
    .use('/api', modalRoute)
    .use('/api', settingRoute)
    .use('/api/admin', adminRoute)
    .use(errorMiddleware);

// initializeSocket(server);

server.listen(PORT, () => console.log('server is running at port : ' + PORT));
