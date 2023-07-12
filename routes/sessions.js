const express = require("express");
const router = express.Router();

const {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
} = require("../controllers/sessions.js");

router.get("/", getSessions);

router.get("/:sessionID", getSession);

router.post("/", createSession);

router.put("/:sessionID", updateSession);

router.delete("/:sessionID", deleteSession);

module.exports = router;
