const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        id: {type: mongoose.Schema.Types.ObjectId},
        title: {type: String, require: true},
        description: {type: String, require: true},
        price: {type: Number, require: true},
        discount: {type: Number, default: 0},
        image: {type: String, require: true},
        images: [
            {type: String}
        ],
        createdDate:{ type: Date, required: true, default: Date.now() },
        createdBy: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
        lastModified: {type: Date, required: true, default: Date.now()},
        lastModifiedBy: {type: ObjectId, require: true, ref: 'User'}

    }
)

module.exports = mongoose.modle('Product', productSchema)