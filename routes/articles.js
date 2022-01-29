const express = require('express')

const Article = require('./../models/article')

const router = express.Router()

router.get('/new', (req, res) => {
	res.render('articles/new', { article: new Article() })
})

router.get('/:slug', async (req, res) => {
	// va a buscar x slug usando el parametro slug
	const article = await Article.findOne({ slug: req.params.slug })
	if (!article) res.redirect('/')
	res.render('articles/show', { article: article })
})

router.post('/', async (req, res) => {
	let article = new Article({
		title: req.body.title,
		description: req.body.description,
		markdown: req.body.markdown,
	})
	try {
		article = await article.save()
		res.redirect(`/articles/${article.slug}`)
	} catch (error) {
		res.render('articles/new', { article: article })
	}
})

module.exports = router
