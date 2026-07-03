const Products = require('../models/products');

exports.addProduct = async (req, res) => {
  try {
    const { name, price, mrp, stock } = req.body;

    const product = await Products.create({
      name,
      price,
      mrp,
      stock,
      isPublished: false
    });

    res.status(201).json(product);
  } catch (e) {
    res.status(405).json({ message: e.message });
  }
};

exports.listProduct = async (req, res) => {
  try {
    const products = await Products.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(products);
  } catch (e) {
    res.status(405).json({ message: e.message });
  }
};

exports.publishProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await Products.findByPk(id);

    const errors = [];

    if (product.mrp < product.price) {
      errors.push('MRP should not be less than equal to the Price');
    }

    if (product.stock <= 0) {
      errors.push('Stock count is 0');
    }

    if (errors.length) {
      return res.status(422).json(errors);
    }

    await product.update({ isPublished: true });
    return res.sendStatus(204);
  } catch (e) {
    return res.status(422).json([e.message]);
  }
};

exports.putProduct = async (req, res) => {
  res.sendStatus(405);
};

exports.deleteProduct = async (req, res) => {
  res.sendStatus(405);
};