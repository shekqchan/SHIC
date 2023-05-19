const express = require("express");
const asyncify = require('express-asyncify');
const compression = require("compression");

const indexPath = require.main.path;

module.exports = function() {
  // app 정의
  const app = asyncify(express());
  app.use(compression());
  app.use(express.json());
  app.set('views', './views');
  
  app.use(express.urlencoded({extended: false}));
  app.disable("x-powered-by");
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  app.set('trust proxy', true);
  app.set('json spaces', 4);

  // app 기타 설정
  app.use('/static', express.static(indexPath + '/public'));
  
  return app;
}