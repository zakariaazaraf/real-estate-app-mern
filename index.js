const express = require('express')
const app = express()

const PORT = 3030

app.get('/', (req, res) =>{
    res.send('Hello, You are using express application')
})


app.listen(PORT, () =>{
    console.Console.log(`Server is running on port: ${PORT}`)
})