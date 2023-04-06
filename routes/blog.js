const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getSingleBlog,
  editBlog,
} = require("../controllers/blog");

const router = require("express").Router();

router.post("/blogs", createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getSingleBlog);
router.delete("/blogs/:id", deleteBlog);
router.put("/blogs/", editBlog);

module.exports = router;
