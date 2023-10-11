const { Schema, model } = require('mongoose');
const mongooseAutoPopulate = require("mongoose-autopopulate");

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "product",
                autopopulate: true
            },
            quantity: Number,
            _id: false
        }]
    }
})
cartSchema.plugin(mongooseAutoPopulate)
const cartModel = model('carts', cartSchema)

module.exports = cartModel