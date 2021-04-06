const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      return;
    });
  } else if (req.url === "/about.html") {
    fs.readFile("." + req.url, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      return;
    });
  } else if (req.url === "/contact-me.html") {
    fs.readFile("." + req.url, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      return;
    });
  } else {
    fs.readFile("./404.html", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(data);
      return;
    });
  }
});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080/ ...");
});
