const express = require('express')
const app = express()

const PORT = process.env.PORT || 3030

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.send('Hello, You are using express application ...')
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