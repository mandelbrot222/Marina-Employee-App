
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let db = {
  employees: ['1234', '5678', '9012'],
  logs: [],
  schedule: [],
  staff: [],
  maintenance: [],
  moveOuts: []
};

const saveDb = () => {
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
};

if (fs.existsSync('./db.json')) {
  db = JSON.parse(fs.readFileSync('./db.json'));
}

app.post('/api/login', (req, res) => {
  const { code } = req.body;
  if (db.employees.includes(code)) {
    return res.json({ success: true, code });
  }
  return res.status(401).json({ success: false });
});

app.post('/api/log', (req, res) => {
  const entry = { ...req.body, timestamp: new Date().toISOString() };
  db.logs.push(entry);
  saveDb();
  res.json({ success: true });
});

app.get('/api/logs', (req, res) => {
  res.json(db.logs);
});

app.get('/api/schedule', (req, res) => {
  res.json(db.schedule);
});

app.post('/api/schedule', (req, res) => {
  db.schedule.push(req.body);
  saveDb();
  res.json({ success: true });
});

app.get('/api/staff', (req, res) => {
  res.json(db.staff);
});

app.post('/api/staff', (req, res) => {
  db.staff.push(req.body);
  saveDb();
  res.json({ success: true });
});

app.get('/api/maintenance', (req, res) => {
  res.json(db.maintenance);
});

app.post('/api/maintenance', (req, res) => {
  db.maintenance.push(req.body);
  saveDb();
  res.json({ success: true });
});

app.get('/api/moveouts', (req, res) => {
  res.json(db.moveOuts);
});

app.post('/api/moveouts', (req, res) => {
  db.moveOuts.push(req.body);
  saveDb();
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
