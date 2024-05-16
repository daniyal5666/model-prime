// import { Server } from 'socket.io';
// // import cors from 'cors';

// const activeUsers = [];

// const initializeSocket = (server) => {
//     // const io = new Server(server);
//     // // Use the cors middleware
//     // io.use(cors("*"));
//     const io = new Server(server, { cors: { origin: '*' } });

//     io.on('connection', (socket) => {
//         if (!activeUsers.some((user) => user.userId === socket.handshake.query.userId)) {
//             activeUsers.push({
//                 userId: socket.handshake.query.userId,
//                 socketId: socket.id,
//             });
//         }

//         console.log('User Connected', activeUsers);

//         socket.on('send-message-to-support', async (data) => {
//             const user = activeUsers.find((user) => user.userId == data.userId);
//             if (user) {
//                 const result = await insertIntoTable('ticket_chats', data);
//                 if (result.affectedRows === 1) {
//                     io.to(user.socketId).emit('recieve-message-from-user', data);
//                 }
//             }
//         });

//         socket.on('recieve-message-from-user', (data) => {
//             console.log(data);
//         });

//         socket.on('send-message-to-user', async (data) => {
//             const { userId } = data;
//             const user = activeUsers.find((user) => user.userId == userId);
//             console.log(user, activeUsers);
//             if (user) {
//                 const result = await insertIntoTable('ticket_chats', data);
//                 if (result.affectedRows == 1) {
//                     io.to(user.socketId).emit('recieve-message-from-admin', data);
//                 }
//             }
//         });

//         socket.on('recieve-message-from-admin', (data) => {
//             console.log(data, 'admin');
//         });

//         socket.on('disconnect', () => {
//             console.log('Socket disconnected: ' + socket.id);
//         });
//     });
// };

// export { initializeSocket, activeUsers };
