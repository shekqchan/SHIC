const config = require(__dirname + "/handlers/Config")();
const app = require(__dirname + "/handlers/App")();
const { getClientIp, getFormattedDate } = require(__dirname + "/index_modules");

app.get("/robots.txt", async (req, res, next) => {
  res.sendFile(__dirname + '/public/robots.txt');
});

app.get("*", async (req, res, next) => {
  console.log(`[${getFormattedDate()}] [${getClientIp(req)}] [    VIEW    ] - ${req.protocol}://${req.headers.host}${req.originalUrl}`);
  next();
});


(require("./handlers/Route")(app, config)).then(() => {
    app.listen(
        config["PORT"],
        () => { console.log("The server is running on port " + config["PORT"]); }
    );
});