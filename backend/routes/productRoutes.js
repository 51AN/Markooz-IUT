const express = require('express')
const router = express.Router()
const {getProducts, setProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const {protect} = require('../middlewares/authMiddleware')

router.route('/').get(getProducts).post(setProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct)

module.exports = router