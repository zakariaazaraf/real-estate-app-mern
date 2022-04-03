const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId },
        title: { type: String, required: true },
        description: { type: String },
        mainPrice: { type: Number, required: true },
        discountPrice: { type: Number },
        useDiscountPrice: { type: Boolean, default: false },
        coverImage: { type: String, required: true },
        backgroundImage: { type: String, required: true },
        created: { type: Date, default: Date.now() },
        createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        lastModified: { type: Date, default: Date.now() },
        lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        productImages: [
            { type: String, required: true }
        ]
        
    }
)

module.exports = mongoose.model('Product', productSchema)