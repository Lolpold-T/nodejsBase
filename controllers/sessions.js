const sessions = require("../sessionData.js");

const getSessions = (req, res) => {
  res.json(sessions);
};

const getSession = (req, res) => {
  const id = Number(req.params.sessionID);
  const session = sessions.find((session) => session.id === id);

  if (!session) {
    return res.status(404).send("Session not found");
  }
  res.json(session);
};

const createSession = (req, res) => {
  const newSession = {
    id: sessions.length + 1,
    name: req.body.name,
  };
  sessions.push(newSession);
  res.status(201).json(newSession);
};

const updateSession = (req, res) => {
  const id = Number(req.params.sessionID);
  const index = sessions?.findIndex((session) => session.id === id);
  if (index === -1) return res.status(404).send("User not found");
  const updatedSession = {
    id: sessions[index].id,
    name: req.body.name,
  };

  sessions[index] = updatedSession;
  res.status(200).json("Session updated");
};

const deleteSession = (req, res) => {
  const id = Number(req.params.sessionID);
  const index = sessions?.findIndex((session) => session.id === id);
  if (index === -1) return res.status(404).send("User not found");
  sessions.splice(index, 1);
  res.status(200).json("Session deleted");
};

module.exports = {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
};
