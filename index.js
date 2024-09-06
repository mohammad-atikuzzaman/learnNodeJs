const http = require("http");
const formidable = require("formidable");
const url = require("url");
const fs = require("fs");
const uc = require("upper-case");
const events = require("events");
const eventEmitter = new events.EventEmitter();

// this is home route default route on node js
/*
const homeRoute = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Hello world form node js server");
  res.end();
};
*/

// this is queryString receive route
/*
const getUrl=(req, res)=>{
  res.writeHead(200, {"Content-Type": "text/html"})
  if(req.url){
    return  res.end(req.url)
  }
  res.write("hello")
  res.end()
}
  */

// this is query parameters receive route
/*
const receiveQueryParams = (req, res) => {
  res.writeHeader(200, { "Content-Type": "text/html" });
  const q = url.parse(req.url, true).query;
  let ob = {};
  if (q) {
    if (q.vai) {
      ob.vai = q.vai;
    }
    if (q.year) {
      ob.year = q.year;
    }

    return res.end(ob.vai);
  }

  res.write("hello");
  res.end();
};
*/

// this route for readFiles on node js system
/* const fsRoute = (req, res) => {
  fs.readFile("./files/demofile.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data)
    res.end()
  });
};
*/

// this route for append files
/*
const appendFiles = (req, res) => {
  // here I am getting text form req.url and saving that text on myfile.txt
  fs.appendFile("myfile3.txt", req.url , (err) => {
    if (err) {
      throw err;
    }
    console.log("Saved");
    res.end("fileSaved")
  });
};
*/

// this route for open file
/*
const openFiles =(req, res)=>{
  fs.open("myfile2.txt", "w", (err, file)=>{
    if(err){
      throw err
    }
    console.log("Saved")
  })
}
*/

// this route for writing files
/*
const writeFiles = (req, res) => {
  fs.writeFile("myFile3.txt", "I am writing files data", (err) => {
    if (err) {
      throw err;
    }
    res.end("file writen");
  });
};
*/

// for updating the file content we can use appendFile or write file
/*
 if we use appendFiles it will save previous files data and add new data

 if we use writeFile it will delete previous file data and replace with new data
*/

// this route for deleting files
/*
const deleteFiles = (req, res) => {
  // I have deleted  myfile2.txt
  fs.unlink("myfile2.txt", (err) => {
    if (err) {
      throw err;
    }
    res.end("file deleted")
  });
};
*/

// this route for rename files
/*
const renameFiles = (req, res) => {
  fs.rename("newFile.txt", "file2.txt", (err) => {
    if (err) {
      throw err;
    }
    console.log("file renamed");
  });
};
*/

// testing url
/*
const testUrl = (req, res) => {
  var addr = "http://localhost:3000/winter?year=2017&month=09";

  var q = url.parse(addr, true);

  console.log(q.host);
  console.log(q.pathname);
  console.log(q.search);
  const queryData = q.query
  console.log(queryData.year)

  res.end(addr);
};
*/

// test nodejs file server
/*
const fileServer = (req, res) => {
  const q = url.parse(req.url, true);
  const fileName = "./files" + q.pathname + ".html";

  if (q.pathname === "/") {
    fs.readFile("./files/index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }

  if (q.pathname !== "/") {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 not found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(data);
    });
  }
};
*/

// Use of third party modules (npm package)
/*
const testNpmPackage = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  // I have installed text uppercase module
  res.write(uc.upperCase("Hello world"));
  return res.end();
};
*/

// this route for testing node js events

const testEvent = (req, res) => {
  // when we make any action node js fire a event.
  // when we are opening a file , node js fired a event named open
  /*
  const rs = fs.createReadStream("./myfile.txt");
  rs.on("open", () => {
    console.log("This file is open");
    return res.end("this file is open")
  });
  */

  // Also we can create our won event by requiring "events"
  // const events = require("events")

  // for firing custom event we need eventEmitter()
  // var eventEmitter = new events.EventEmitter();

  // crate a event handler
  const myEventHandler = () => {
    return res.end("my event listened");
  };

  // create a event and assign the event handler to event
  eventEmitter.on("cry", myEventHandler);

  // Fire the custom event
  eventEmitter.emit("cry");
};

// this route for testing upload files using node js
const testUploadFiles = async (req, res) => {
  if (req.url == "/fileupload") {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload[0].filepath;
      var newpath = "./uploaded/" + files.filetoupload[0].originalFilename;
      
      // return console.log(files.filetoupload[0].originalFilename);
      // return console.log(newpath)

      fs.rename(oldpath, newpath, (err)=>{
        if(err){
          throw err
        }
        res.write("File uploaded and moved")
        res.end()
      })

    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      '<form action="fileupload" method="post" enctype="multipart/form-data">'
    );
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write("</form>");
    return res.end();
  }
};

http.createServer(testUploadFiles).listen(3000, () => {
  console.log(`server is running on port : 3000`);
});
