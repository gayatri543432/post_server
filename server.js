const PORT = 3000;

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let posts = [
  {
    id: 1,
    title: "Python Basics",
    body: "Introduction to Python programming.",
    author: "Rohan"
  },
  {
    id: 2,
    title: "Django Framework",
    body: "Build web applications using Django.",
    author: "Neha"
  },
  {
    id: 3,
    title: "SQL Queries",
    body: "Learn SELECT, INSERT, UPDATE and DELETE.",
    author: "Karan"
  },
  {
    id: 4,
    title: "React JS",
    body: "Create interactive user interfaces.",
    author: "Anjali"
  },
  {
    id: 5,
    title: "Node.js",
    body: "Build backend APIs with Express.",
    author: "Vikram"
  }
];


app.get("/posts", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts"
    });
  }
});

app.get("/posts/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const Post = posts.find(post => post.id === id);

    if (!Post) {
      return res.status(404).json({
        success: false,
        message: `Post with id ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: Post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Post"
    });
  }
});


app.post("/posts", (req, res) => {
  try {
    const { title, body, author } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "Title and Body are required"
      });
    }

    const newPost = {
      id: Date.now(),
      title,
      body,
      author,
      createdAt: Date.now(),
      updatedAt: null
    };

    posts.unshift(newPost);

    res.status(201).json({
      success: true,
      data: newPost,
      message: "Post created successfully.."
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating Post"
    });
  }
});


app.patch("/posts/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const index = posts.findIndex(post => post.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Post with id ${id} not found`
      });
    }

    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "Title and Body are required"
      });
    }

    posts[index] = {
      ...posts[index],
      ...req.body,
      updatedAt: Date.now()
    };

    res.status(200).json({
      success: true,
      data: posts[index]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating blog"
    });
  }
});


app.delete("/posts/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const index = posts.findIndex(post => post.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${id} not found`
      });
    }

    posts.splice(index, 1);

    res.status(200).json({
      success: true,
      data: posts,
      message: "Post deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting Post"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});