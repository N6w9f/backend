// utils
import F400 from "../../utils/F400.js";
import catcher from "../../utils/catcher.js";

// db
import Products from "../../models/products.js";
import { MEN, WOMEN, KIDS } from "../../utils/categories.js";

const all_products = catcher(async (req, res) => {
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const length = (await Products.find()).length;
  const products = await Products.find(
    {},
    { __v: false },
    { sort: { created_at: -1 }, limit: limit, skip: skip }
  );

  res.status(200).json({ products, length, limit });
});
const men_products = catcher(async (req, res) => {
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const length = await Products.find({ category: MEN });
  const products = await Products.find({ category: MEN }, null, {
    sort: { created_at: -1 },
    limit: limit,
    skip: skip,
  });

  res.status(200).json({ products, length: length.length, limit: limit });
});
const women_products = catcher(async (req, res) => {
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const filter = req.query.popular
    ? { category: WOMEN, popular: true }
    : { category: WOMEN };

  const length = await Products.find({ category: WOMEN });
  const products = await Products.find(filter, null, {
    sort: { created_at: -1 },
    limit: limit,
    skip: skip,
  });

  res.status(200).json({ products, length: length.length, limit: limit });
});
const kids_products = catcher(async (req, res) => {
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const length = await Products.find({ category: KIDS });
  const products = await Products.find({ category: KIDS }, null, {
    sort: { created_at: -1 },
    limit: limit,
    skip: skip,
  });

  res.status(200).json({ products, length: length.length, limit: limit });
});
const add_product = catcher(async (req, res) => {
  const { title, description, category, price, discount, image, sizes, tags } =
    req.body.data;

  const product = new Products({
    title,
    description,
    category,
    price,
    discount,
    sizes: sizes.split(" "),
    image,
    tags: tags.split(" "),
    created_at: Date.now(),
  });
  await product.save();

  res.status(201).json({ product: 123 });
});

// :id
const get_product = catcher(async (req, res) => {
  const ID = req.params.id;
  const product = await Products.findById(ID, { __v: false });

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json(F400("Product not found"));
  }
});

const delete_product = catcher(async (req, res) => {
  const ID = req.params.id;
  const product = await Products.findById(ID);

  if (product) {
    await Products.deleteOne({ _id: ID });

    res.status(200).json({ title: "Done" });
  } else {
    res.status(404).json(F400("Product not found"));
  }
});

export { all_products, add_product };
export { men_products, women_products, kids_products };
export { get_product, delete_product };
