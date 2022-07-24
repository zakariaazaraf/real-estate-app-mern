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
const multer = require('multer')
const upload = multer( {dest:'./upload/'} )

const path = require('path');

/* Models */
const Product = require('./models/Product')

/* SPECIFY THE DATABASE URL LOCATION, iT'S SET LOCALLY FOR NOW. */
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('You are connecting to the database...'))

const PORT = process.env.PORT || 3000

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))
// app.use(upload.array())
app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.send('Hello, You are using express application, edited ...')
    console.log('You reqested this route')
    res.status(200)
})

app.post('/api', (req, res) =>{
    console.log('You reqested this route, POST method')
    // res.send('Hello, You are using express application ...')
    res.status(200)
})

app.get('/home', (req, res) =>{
    res.send('Hello, You are on HOME')
})


app.get('/products', async (req, res) => {
    res.sendFile(`${path.join(__dirname)}/render.html`)
})

app.post('/product', upload.single('myFile'), async (req, res) => {
    
    // console.log(req.files)
    // console.log(req)

    const { title, description, price, discount } = req.body

    const product = new Product({
        title : title,
        description : description,
        price : price,
        discount : discount,
        image : '',
        images : []
    })

    // console.log(req)    
    console.log(req.body)    
    console.log(req.file)
    

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

    res.json({
        message: `The product has been created successfully!`,
        status: 200
    }).status(200)
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