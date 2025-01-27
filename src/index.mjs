import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const mockUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

app.get("/", (req, res) => {
  res.status(201).send({ mgd: "Hello World!" });
});

app.get(`/api/users`, (req, res) => {
  res.send(mockUsers);
});

//route parameters
app.get(`/api/users/:id`, (req, res) => {
  console.log(req.params);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//localhost:3000
