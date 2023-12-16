const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.user);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const checkIdBlog = await Blog.findById(request.params.id);

  if (checkIdBlog.user.toString() === request.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: "not authorised to delete this blog" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  );
  response.status(200).json(updated);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  const blogToComment = await Blog.findById(request.params.id);
  const comment = new Comment({
    content: body.content,
    blog: blogToComment._id,
  });
  const savedComment = await comment.save();
  response.status(201).json(savedComment);
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id });
  response.json(comments);
});

module.exports = blogsRouter;
