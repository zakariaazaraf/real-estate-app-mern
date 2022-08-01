const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId },
        username: { type: String, required: true },
        firstname: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: fasle },
        avatarImage: { type: String },
        created: { type: Date, default: Date.now() },
        createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', default: 0 },
        lastModified: { type: Date, default: Date.now() },
        lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', default: 0 },  
    }
)

module.exports = mongoose.model('User', productSchema)