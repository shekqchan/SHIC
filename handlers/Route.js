const path = require("path");
const { glob } = require('glob');
// const { promisify } = require('util');
// const globPromise = promisify(glob)

const indexPath = require.main.path;

const { getClientIp, getFormattedDate } = require(indexPath + "/index_modules");


module.exports = async (app, config) => {
  const routeFiles = await glob(indexPath + '/routes/*.js')

  routeFiles.map((File) => {
    try {
      app.use(require(indexPath + '/' + File)(config));
      console.log(`[+] Successfully Route Added : ${File}`)
    } catch (exception) { 
      console.log(`[-] An Error Occurred While Adding Route : ${File}`)
      console.log("EXCEPTION: \n    " + String(exception.stack))
    }
  });

  app.use("*", async (req, res) => {  // 존재하지 않는 경로 접속 핸들링
    console.log(`[${getFormattedDate()}] [${getClientIp(req)}] [     404    ] - ${req.protocol}://${req.headers.host}${req.originalUrl}`);
    res.render(indexPath + '/views/404.ejs', { user: null });
  });
}
