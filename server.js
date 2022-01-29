const express = require('express')
const mongoose = require('mongoose')

const articleRouter = require('./routes/articles')

const app = express()

mongoose.connect(
	'mongodb+srv://reinaldo:Yv4Rn5baFDid50Es@clusternotes.1nlhq.mongodb.net/ClusterNotes'
	// ,{ useNewUrlParser: true, useUnifiedTopology: true }
)

// ejs es otro jsx, lo defini como el renderizador
app.set('view engine', 'ejs')
// hay que especificar que se van a usar archivos estaticos
app.use('/public', express.static('public'))
// permitir que lea el body
app.use(express.urlencoded({ extended: false }))

// despues de la ruta articles se anaden las opciones del router
app.use('/articles', articleRouter)

app.get('/', (req, res) => {
	const articles = [
		{
			title: 'Test article 1',
			createdAt: new Date(),
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ullam sint saepe hic debitis veniam, assumenda ea natus ipsum aperiam magnam delectus consequuntur esse sit earum vitae, distinctio eveniet aspernatur!',
		},
		{
			title: 'Test article 2',
			createdAt: new Date(),
			description:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum dolor earum fugit molestiae, reprehenderit deleniti!',
		},
	]
	res.render('articles/index', { articles: articles })
})


app.listen(5000)
