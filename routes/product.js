const router = require('express').Router()


router.get('/:id', (req, res) => {
    res.status(200).json(
        {
            message: 'This is the response message',
            info: {
                status: 200,
                data: 'This the data test'
            }
        }
    )
})

router.get('/:id/edit', (req, res) => {
    res.status(200).json(
        {
            message: 'This is the response message',
            info: {
                status: 200,
                data: 'This the data test'
            }
        }
    )
})

router.post('/', (req, res) => {
    res.status(200).json(
        {
            message: 'This is the response message',
            info: {
                status: 200,
                data: 'This the data test'
            }
        }
    )
})

router.put('/:id', (req, res) => {
    res.status(200).json(
        {
            message: 'This is the response message',
            info: {
                status: 200,
                data: 'This the data test'
            }
        }
    )
})

router.delete('/:id', (req, res) => {
    res.status(200).json(
        {
            message: 'This is the response message',
            info: {
                status: 200,
                data: 'This the data test'
            }
        }
    )
})


module.exports = router