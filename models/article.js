const mongoose = require('mongoose')
// permite usar markdown como html
const marked = require('marked')
// usar el titulo como url
const slugify = require('slugify')

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	markdown: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	slug: {
		type: String,
		required: true,
		unique: true
	}
})

// antes de ejecutar cualquier peticion a este esquema se va a validar func
// next es para que el middleware siga despues de ejecutar
articleSchema.pre('validate', function(next) {
	if (this.title) {
		// convierte a lowercase y se deshace de cualquier caracter que no se pueda usar en la url
		this.slug = slugify(this.title, {lower: true, strict: true})
	}
	next()
})

// coleccion Article
module.exports = mongoose.model('Article', articleSchema)