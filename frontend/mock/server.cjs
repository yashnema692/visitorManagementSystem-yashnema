const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("mock/db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

const PORT = 5000;



server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const users = router.db.get("users").value();

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  return res.json({
    message: "Login successful",
    token: "mock-jwt-token-visitor-management",
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});



server.patch("/visitors/:id/approve", (req, res) => {
  const { id } = req.params;

 
  const visitor = router.db
    .get("visitors")
    .find((item) => String(item.id) === String(id))
    .value();

  if (!visitor) {
    return res.status(404).json({
      message: "Visitor not found"
    });
  }

  const updatedVisitor = {
    ...visitor,
    status: "approved"
  };

  router.db
    .get("visitors")
    .find((item) => String(item.id) === String(id))
    .assign(updatedVisitor)
    .write();

  return res.json(updatedVisitor);
});



server.patch("/visitors/:id/reject", (req, res) => {
  const { id } = req.params;

  const visitor = router.db
    .get("visitors")
    .find((item) => String(item.id) === String(id))
    .value();

  if (!visitor) {
    return res.status(404).json({
      message: "Visitor not found"
    });
  }

  const updatedVisitor = {
    ...visitor,
    status: "rejected"
  };

  router.db
    .get("visitors")
    .find((item) => String(item.id) === String(id))
    .assign(updatedVisitor)
    .write();

  return res.json(updatedVisitor);
});



server.use(router);



server.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});