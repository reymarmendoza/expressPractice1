const express = require('express')
const mongoose = require('mongoose')

const articleRouter = require('./routes/articles')
const Article = require('./models/article')

const app = express()

mongoose.connect('mongodb+srv://reinaldo:Yv4Rn5baFDid50Es@clusternotes.1nlhq.mongodb.net/ClusterNotes')

// ejs es otro jsx, lo defini como el renderizador
app.set('view engine', 'ejs')
// hay que especificar que se van a usar archivos estaticos
app.use('/public', express.static('public'))
// permitir que lea el body
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
	const articles = await Article.find().sort({ createdAt: 'desc'})
	res.render('articles/index', { articles: articles })
})

// despues de la ruta articles se anaden las opciones del router
app.use('/articles', articleRouter)

app.listen(5000)
