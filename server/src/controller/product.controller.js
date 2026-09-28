import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  console.log(req.body);
  console.log(req.file);

  if (!req.file) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  const response = await uploadFile({
    buffer: req.file.buffer,
    fileName: req.file.originalname,
  });

  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: response.url,
  });

  res.status(201).json({
    message: "Product created successfully",
    data: {
      product,
    },
  });
}

export async function getAllProducts(req, res) {
  const products = await productModel.find();

  res.status(200).json({
    message: "Products fetched successfully",
    data: {
      products,
    },
  });
}

export async function getProductById(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    message: "Product fetched successfully",
    data: {
      product,
    },
  });
}

export async function updateProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  ((product.title = req.body.title),
    (product.description = req.body.description),
    (product.price = req.body.price));

  if (req.file) {
    const response = await uploadFile({
      buffer: req.file.buffer,
      fileName: req.file.originalname,
    });

    product.image = response.url;
  }

  await product.save();

  res.status(200).json({
    message: "Product updated successfully",
    data: {
      product,
    },
  });
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  await productModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Product deleted successfully",
    data: {
      product,
    },
  });
}
