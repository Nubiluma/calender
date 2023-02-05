const express = require("express");
const cors = require("cors");
const Appointment = require("./appointment");
const db = require("./db");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ extended: true, limit: "1mb" }));

app.get("/", (_, res) => {
  res.json(db.getAll());
});

app.get("/:id", (req, res) => {
  const requestedObject = db.get(req.params.id);
  if (requestedObject) {
    res.json(requestedObject);
  } else {
    res.sendStatus(404);
  }
});

app.post("/", (req, res) => {
  try {
    const appointment = new Appointment(
      req.body.name,
      req.body.dateStart,
      req.body.dateEnd,
      req.body.description,
      req.body.location
    );
    db.add(appointment);
    res.setHeader("Location", `/${appointment.id}`).sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
