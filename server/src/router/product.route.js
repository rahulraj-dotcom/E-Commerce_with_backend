import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
} from "../validator/product.validator.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

/**
 * @method post
 * @route /api/products/
 */
router.post(
  "/",
  authenticate,
  upload.single("image"),
  createProductValidator,
  createProduct,
);

/**
 * @method get
 * @route /api/products/
 */
router.get("/", getAllProducts);

/**
 * @method get
 * @route /api/products/:id
 */

router.get("/:id", productIdValidator, getProductById);

/**
 * @method put
 * @route /api/products/:id
 */
router.put(
  "/:id",
  authenticate,
  productIdValidator,
  upload.single("image"),
  updateProductValidator,
  updateProduct,
);

/**
 * @method delete
 * @route /api/products/:id
 */
router.delete("/:id", authenticate, productIdValidator, deleteProduct);

export default router;
