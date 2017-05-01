let express = require('express')
let path = require('path');
// express日志信息
let logger = require('morgan');

let session = require('express-session')
let serverStatic = require('serve-static')
let bodyParser = require('body-parser')
const DB_URL = 'mongodb://localhost/douban';

let app = express()
let port = process.env.PORT || 3000

let mongoose = require('mongoose')
let mongoStore = require('connect-mongo')(session)

let routes = require('./config/routes');



// 連接數據庫
mongoose.connect(DB_URL);

app.locals.moment=require("moment")

app.set('views', './app/views/pages')
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded())  
// parse application/json  
app.use(bodyParser.json())

// 利用mongodb 做session本队持久化
app.use(session({
  secret: 'douban',
  store: new mongoStore({
    url: DB_URL,
    collection: 'sessions'
  })
}))

// 配置开发环境
if( 'development' === app.get('env')) {
  app.set('showStackError', true);
  app.use(logger(':method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug', true);
}

app.listen(port);

routes(app);


