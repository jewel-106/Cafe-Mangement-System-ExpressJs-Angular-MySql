require('dotenv').config();
const http = require('http');
const app = require('./index');  // Import app from index.js

const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
