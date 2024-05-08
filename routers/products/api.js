import express from "express";
import multer from "multer";
// handlers =================
import { all_products, add_product } from "./controller.js";
import { men_products, women_products, kids_products } from "./controller.js";
import { get_product, delete_product } from "./controller.js";
import E500 from "../../utils/E500.js";
import tokenAdmin_validation from "../../utils/token&admin_validation.js";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = `${Date.now()}-${Math.random() * 1e9}`;

    callback(null, `${file.originalname}-${uniqueSuffix}.${ext}`);
  },
});
const fileFilter = (req, file, callback) => {
  const type = file.mimetype.split("/")[0];

  if (type === "image") {
    callback(null, true);
  } else {
    callback(JSON.stringify(E500("File must be an image", 500)), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// routes ===================
const router = express.Router();
router.route("/").get(all_products).post(tokenAdmin_validation, add_product);
router.route("/image").post(upload.single("image"), (req, res) => {
  res.status(201).json({
    image_url: req.file.filename,
  });
});
router.route("/men").get(men_products);
router.route("/women").get(women_products);
router.route("/kids").get(kids_products);

router
  .route("/:id")
  .get(get_product)
  .delete(tokenAdmin_validation, delete_product);

export default router;
