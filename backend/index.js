/* If you are not on the production, Load the env variavles*/

if (process.env.NODE_ENV !== 'production') {
    // require('dotenv').load()
    // require('dotenv').parse()
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

/* Models */
const Product = require('./models/Product')

/* SPECIFY THE DATABASE URL LOCATION, iT'S SET LOCALLY FOR NOW. */
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('You are connecting to the database...'))

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.send('Hello, You are using express application, edited ...')
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


app.get('/products', async (req, res) => {
    res.send(`
        <!DOCTYPE html>
            <head>
                <title>Creating a new product</title>
            </head>
            <body>
                <form action='/product' method='POST' enctype='multipart/form-data'>
                    <label for='title'>The product title</label>
                    <input type='text' name='title' id='title' />
                    <br />
                    <label for='description'>The product description</label>
                    <input type='text' name='description' id='description' />
                    <br />
                    <label for='price'>The product price</label>
                    <input type='number' name='price' id='price' />
                    <br />
                    <label for='discount'>The product discount</label>
                    <input type='number' name='discount' id='discount' />
                    <br />
                    <label for='image'>The product image</label>
                    <input type='file' name='image' id='image' />
                    <br /><br />
                    <input type='submit' value='submit' name='submit'/>
                    <input type='cancel' value='cancel' name='cancel'/>
                </form>
            </body>
        </html>
    `)
})

app.post('/product', async (req, res) => {
    
    console.log(req.body)
    // console.log(req.files)
    // console.log(req)
    const product = new Product({
        title : 'This the product title',
        description : 'This the product description',
        price : 22.99,
        discount : 5,
        image : '',
        images : []
    })

    
    try {
        const isCreated = await product.save()
        console.log(isCreated)

        if (!isCreated) {
            res.json({
                message: 'We could not create a product'
            }).status(404)
        }

    } catch (error) {
        console.log(error)
        res.json({
            message: 'error'
        }).status(404)
    }

    // if (coverEncoded == null) return
    // const cover = JSON.parse(coverEncoded)
    // if (cover != null && imageMimeTypes.includes(cover.type)) {
    //   product.coverImage = new Buffer.from(cover.data, 'base64')
    //   product.coverImageType = cover.type
    // }

    res.send('Hello, You are on PRODUCTS')
})


app.get('/category', (req, res) =>{
    res.send('Hello, You are on CATEGORY')
})

app.get('*', (req, res) =>{
    console.log(req.body)
    res.send('Hello, You did not found the requested page')
})


app.listen(PORT, () =>{
    console.log(`Server is running on port : ${PORT}`)
})