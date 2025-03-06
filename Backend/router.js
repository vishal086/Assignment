const express = require("express");
const { home, create, read, deleteUser, editUser, findone,  } = require("./controller");
const router = express.Router();

router.get("/", home);
router.get('/findone/:id',findone)
router.post("/create", create);
router.get("/read", read);
router.delete("/delete/:id", deleteUser);
router.put("/edit/:id", editUser);

module.exports = router;
