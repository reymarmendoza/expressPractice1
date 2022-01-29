const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')

// ejs es otro jsx, lo defini como el renderizador
app.set('view engine', 'ejs')
// hay que especificar que se van a usar archivos estaticos
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
	const articles = [
		{
			title: 'Test article 1',
			createdAt: Date.now(),
			description: 'Test description',
		},
		{
			title: 'Test article 2',
			createdAt: Date.now(),
			description: 'Test description',
		},
	]
	res.render('index', { articles: articles })
})

// despues de la ruta articles se anaden las opciones del router
app.use('/articles', articleRouter)

app.listen(5000)
