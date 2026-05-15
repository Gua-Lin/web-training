const http = require("http");

const server = http.createServer((req, res) => {
  // 只处理 POST /login
  if (req.method === "POST" && req.url === "/login") {
    let body = "";

    // 接收数据
    req.on("data", chunk => {
      body += chunk;
    });

    // 数据接收完毕
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const { username, password } = data;

        if (username === "admin" && password === "123456") {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(JSON.stringify({
            code: 0,
            data: {
              token: "node-token-123"
            }
          }));
        } else {
          res.writeHead(401, {
            "Content-Type": "application/json"
          });
          res.end(JSON.stringify({
            code: 1,
            message: "用户名或密码错误"
          }));
        }
      } catch (err) {
        res.writeHead(400);
        res.end("Bad Request");
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});