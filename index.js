const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home')
})

app.post('/books/insertbook', function (req, res) {
  const item = req.body.item
  const quantPorPack = req.body.quantPorPack
  const packs = req.body.packs

  const query = `INSERT INTO registro (item, quantPorPack, packs) VALUES ('${item}', ${quantPorPack}, ${packs})`

  conn.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

app.get('/books', function (req, res) {
  const query = `SELECT * FROM registro`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const books = data

    console.log(data)

    res.render('books', { books })
  })
})

app.get('/books/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM registro WHERE id = ${id}`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('book', { book })
  })
})

app.get('/books/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM registro WHERE id = ${id}`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('editbook', { book })
  })
})

app.post('/books/updatebook', function (req, res) {
  const id = req.body.id
  const item = req.body.item
  const quantPorPack = req.body.quantPorPack
  const packs = req.body.packs

  const query = `UPDATE registro SET item = '${item}', quantPorPack = ${quantPorPack}, packs = ${packs} WHERE id = ${id}`

  conn.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books/edit/${id}`)
  })
})

app.post('/books/remove/:id', function (req, res) {
  const id = req.params.id

  const query = `DELETE FROM registro WHERE id = ${id}`

  conn.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books`)
  })
})


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysqlregistro',
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Conectado ao MySQL!')

  app.listen(3000)
})