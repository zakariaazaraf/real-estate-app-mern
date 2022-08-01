/* If you are not on the production, Load the env variavles*/

if (process.env.NODE_ENV !== 'production') {
    // require('dotenv').load()
    // require('dotenv').parse()
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
// const upload = multer( {dest:'./upload/'} )

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage});

const path = require('path');

/* Models */
const Product = require('./models/Product')

/* SPECIFY THE DATABASE URL LOCATION, iT'S SET LOCALLY FOR NOW. */
console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/real-estate-mern-app')

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('You are connecting to the database...'))

const PORT = process.env.PORT || 5000

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))
// app.use(upload.array())
app.use(express.json())

app.use(cors())

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

app.post('/api/product', upload.single('myFile'), async (req, res) =>{

    const { title, description, price, discount } = req.body

    const product = new Product({
        title : title,
        description : description,
        price : price,
        discount : discount,
        image : {
            data: new Buffer.from(req.file.buffer, 'base64'),
            contentType: req.file.mimetype
        },
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

    res.json({
        message: `The product has been created successfully!`,
        status: 200
    }).status(200)

    // console.log('You reqested this route, POST method')
    // console.log(req.body)
    // console.log(req.file)
    // // res.send('Hello, You are using express application ...')
    // res.status(200).json(
    //     {
    //         status: 200,
    //         message: 'You have created a new product'
    //     }
    // )
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
})

app.get('/api/image/:id', async (req, res) => {
    const { id } = req.params

    const product = await Product.findById({ _id: id }).exec()


    if (!product) {
        res.json({
            message: `We couldn't find the product with the ID: ${id}`,
            src: `https://media.istockphoto.com/photos/panoramic-sunset-view-of-marrakech-and-old-medina-morocco-picture-id1186702515?b=1&k=20&m=1186702515&s=170667a&w=0&h=Vpn13314Zjj2SgNKYaxzwiRbsHC1Pnxu1bkdEVkEzXI=`
        }).status(201)
        return
    }

    const {data, contentType} = product.image

    /* generate the image src from the returned buffer. */
    let imageSrc = `data:${contentType};charset=utf-8;base64,${data.toString('base64')}`;

    res.status(200).json({
        message: 'We get you the image!!!',
        src: imageSrc
    })
    // res.send(`<img src=${imageSrc} />`).status(200)
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