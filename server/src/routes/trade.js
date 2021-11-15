const express = require('express');
const rescue = require('express-rescue');
const {create, findAll, findById, updateById, deleteById} = require('../controllers/trade');
// const JoiValidate = require('../middlewares/JoiValidate');
// const { product } = require('../utils/JoiSchemas');
// const validate = require('../middlewares/validators');

const route = express.Router();

// route.use(validate.token);

route.post('/', rescue(create));
route.get('/', rescue(findAll));
route.get('/:id', rescue(findById));
route.put('/:id', rescue(updateById));
route.delete('/:id', rescue(deleteById));

module.exports = route;
