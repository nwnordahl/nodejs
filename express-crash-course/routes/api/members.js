const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Gets all members
router.get("/", (req, res) => res.json(members));

// Get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => String(member.id) === req.params.id);

  if (!found) {
    return res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }

  res.json(members.find((member) => String(member.id) === req.params.id));
});

// Create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  res.json(members);
  // res.redirect("/");
});

// Update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => String(member.id) === req.params.id);

  if (!found) {
    return res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }

  const updMember = req.body;
  members.forEach((member) => {
    if (String(member.id) === req.params.id) {
      member.name = updMember.name ? updMember.name : member.name;
      member.email = updMember.email ? updMember.email : member.email;
      member.status = updMember.status ? updMember.status : member.status;

      res.json({ msg: "Member was updated", member });
    }
  });
});

// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => String(member.id) === req.params.id);

  if (!found) {
    return res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }

  res.json({
    msg: "Member deleted",
    members: members.splice(
      members.findIndex((member) => String(member.id) === req.params.id),
      1
    ),
  });
});

module.exports = router;
