const { Router } = require('express');
const { productModel } = require('../models/product.model');

const productRouter = Router();

productRouter.get('/', async (req, res) => {
    try {
        const product = await productModel.find()

        res.send({ payload: product })
    } catch (error) {
        console.log(error)
    }
})

productRouter.post('/', async (req, res) => {
    try {
        const { name, category, price, stock, image } = req.body

        const information = { name, category, price, stock, image }
        let result = await productModel.create(information)

        res.send({ payload: result })
    } catch (error) {
        console.log(error)
    }
})

productRouter.put('/:uid', async (req, res) => {
    try {
        const paramId = req.params
        const findProduct = await productModel.findOne({ _id: paramId.uid })

        const newProductinfo = req.body
        const update = await findProduct.updateOne(newProductinfo)
        res.send({ payload: update })

    } catch (error) {
        console.error(error)
    }
})

productRouter.delete('/:uid', async (req, res) => {
    try {
        const paramId = req.params
        const deleteProduct = await productModel.deleteOne({ _id: paramId.uid })

        res.send({ payload: deleteProduct })
    } catch (error) {
        console.log(error)
    }
})

module.exports = productRouter;