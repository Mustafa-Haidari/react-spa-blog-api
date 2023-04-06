const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", ["firstname", "lastname", "email"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(blogs);
};

exports.createBlog = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWTSECRET, {}, async (err, tokenInfo) => {
    if (err) throw err;
    const { title, image, description } = req.body;
    await Blog.create({
      title,
      description,
      image,
      author: tokenInfo.id,
    });
    return res.json({ message: "Blog saved successfully!" });
  });
};

exports.deleteBlog = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWTSECRET, {}, async (err, tokenInfo) => {
    if (err) throw err;
    const { id } = req.params;
    console.log(id);
    await Blog.deleteOne({ _id: id })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  });
};

exports.getSingleBlog = async (req, res) => {
  const { id } = req.params;
  const data = await Blog.findById(id).populate("author", [
    "email",
    "firstname",
    "lastname",
  ]);

  return res.json(data);
};

exports.editBlog = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWTSECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, image, description, id } = req.body;
    const blog = await Blog.findById(id);
    const isAuthor = JSON.stringify(blog.author) === JSON.stringify(info.id);
    if (!isAuthor) res.status(400).json({ error: "You are not the author" });
    const updatedBlog = await blog.updateOne({
      title,
      image,
      description,
    });
    return res.json(updatedBlog);
  });
};
