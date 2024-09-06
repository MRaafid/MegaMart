const express = require("express");
const router = express.Router();

const {
  getProducts,
  getAdminProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReviews,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/admin/products").get(getAdminProducts);

router.route("/products/:id").get(getProductById);

router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/admin/products/:id")
  .put(updateProduct, authorizeRoles("admin"), isAuthenticatedUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReviews);

module.exports = router;
