const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        id: {type: mongoose.Schema.Types.ObjectId},
        title: {type: String, require: true},
        description: {type: String, require: true},
        price: {type: Number, require: true},
        discount: {type: Number, default: 0},
        /* Store the image in the DB for now, Later on, It would be much better to store them using ws3 */
        image: {
            data: {type: Buffer, require: true},
            contentType: {type: String, require: true}
        },
        images: [
            {type: String}
        ],
        createdDate:{ type: Date, required: true, default: Date.now() },
        createdBy: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
        lastModified: {type: Date, required: true, default: Date.now()},
        lastModifiedBy: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'}

    }
)

module.exports = mongoose.model('Product', productSchema)