const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) =>{
    // res.send('Hello, You are using express application ...')
    console.log('You reqested this route')
    res.status(200)
})

app.post('/api', (req, res) =>{
    console.log(req)
    console.log('You reqested this route, POST method')
    alert(`You've visted this page`)
    // res.send('Hello, You are using express application ...')
})

app.get('/home', (req, res) =>{
    res.send('Hello, You are on HOME')
})


app.get('/products', (req, res) =>{
    res.send('Hello, You are on PRODUCTS')
})


app.get('/category', (req, res) =>{
    res.send('Hello, You are on CATEGORY')
})

app.get('*', (req, res) =>{
    res.send('Hello, You did not found the requested page')
})


app.listen(PORT, () =>{
    console.log(`Server is running on port : ${PORT}`)
})