// require package used in the project
const express = require('express')
const moviesList = require('./movies.json')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { movies: moviesList.results })
  // res.send('<h1>this is my movie list built with express</h1>')
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = moviesList.results.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { movies: movies, keyword: keyword })
  // res.send('<h1>this is my movie list built with express</h1>')
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = moviesList.results.find(movie => movie.id.toString() === req.params.movie_id)

  res.render('show', { movies: movie })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

