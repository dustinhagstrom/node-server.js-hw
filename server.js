const http = require("http");
const fs = require("fs");

const path = require("path");

function deleteAfter7Seconds(res) {
  setTimeout(() => {
    fs.rmdir("content", { recursive: true }, function (err) {
      if (err) {
        res.end("Something is wrong: ", err);
      } else {
        console.log("Content Folder deleted");
        // res.end("Content Folder deleted");
      }
    });
  }, 7000);
}

console.log(path.dirname);

http
  .createServer(function (req, res) {
    if (req.url === "/create-a-directory" && req.method === "POST") {
      fs.mkdir(path.join(__dirname, "content"), function (err) {
        if (err) {
          res.end("Sorry there is an error :", err);
        } else {
          console.log("content folder created");
          res.end("content folder created");
        }
      });
    }
    if (req.url === "/create-text" && req.method === "POST") {
      let body = "";
      req.on("data", function (data) {
        body += data.toString();
      });
      req.on("end", function () {
        let parsedBody = JSON.parse(body);
        fs.writeFile(parsedBody.fileName, parsedBody.message, function (err) {
          if (err) {
            res.end("Sorry there is an error: ", err);
          } else {
            console.log(`${parsedBody.fileName}`);
            res.end(`${parsedBody.fileName}`);
          }
        });
      });
    }
    if (req.url === "/new-folder-and-file" && req.method === "POST") {
      let body = "";
      req.on("data", function (data) {
        body += data.toString();
      });
      req.on("end", function () {
        // let parsedBody = JSON.parse(body);
        fs.writeFile("content/verbage.txt", "Hardcoded text!", function (err) {
          if (err) {
            res.end("Sorry there is an error: ", err);
          } else {
            deleteAfter7Seconds(res);
            console.log("verbage.txt created");
            res.end("verbage.txt created");
          }
        });
      });
    }
  })
  .listen(3000, function () {
    console.log("Server Started!!");
    //can do listen message here if I want
  });
