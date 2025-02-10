const app = require("./app");
const serverPort = 5000;
const http = require('http');
const connectDatabase = require("./db");

app.listen(serverPort, async () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
  await connectDatabase();
});
 