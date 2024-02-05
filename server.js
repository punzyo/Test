const express = require('express');
const cookieParsar = require('cookie-parser');
const app = express();

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

app.use(express.urlencoded({ extended: false }));
app.use(cookieParsar());
app.use('/static', express.static('public')) //localhost:3000/static/stylesheets/style.css

app.set('view engine', 'pug');

const mainRoutes = require('./routes')
const cardRoutes = require('./routes/cards')

app.use(mainRoutes);
app.use('/cards', cardRoutes)

app.use((req,res,next) => { 
	const err = new Error('404錯誤')
	err.status = 404; 
	next(err);
})

app.use((req,res,next) => { //錯誤參數的中間件 
	const err = new Error('錯誤訊息')
	err.status = 500; //幫錯誤物件設定一個status屬性，這只是單純的JS，不具特別意義
	next(err);
})

app.use((err,req,res,next) => { //接收錯誤參數的中間件
	res.locals.error = err 
	res.status(err.status) //讓瀏覽器console的network也能顯示錯誤碼
	res.render('err') //渲染錯誤頁面，顯示err.status，err.message等
})


const PORT = 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

/*
不使用middleware
const querystring = require('querystring');
app.post('/hello', (req, res) => {
  let body = '';
  let result
  req.on('data', (chunk) => {
      body += chunk.toString();
  }).on('end', () => {
    result = querystring.parse(body);
    res.render('hello', {username: result.username});
  })
});
*/
