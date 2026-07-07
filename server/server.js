import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const requireAuth = (req, res, next) => {
  const secretKey = process.env.ADMIN_SECRET_KEY || 'admin1234';
  if (req.headers.authorization === secretKey) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.post('/api/admin/login', (req, res) => {
  const secretKey = process.env.ADMIN_SECRET_KEY || 'admin1234';
  if (req.body.password === secretKey) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

let holds = [];
let holdIdCounter = 1;

const ipRequests = {};
const rateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  if (!ipRequests[ip]) {
    ipRequests[ip] = { count: 1, firstRequest: now };
  } else {
    if (now - ipRequests[ip].firstRequest > 60000) {
      ipRequests[ip] = { count: 1, firstRequest: now };
    } else {
      ipRequests[ip].count++;
      if (ipRequests[ip].count > 15) {
        return res.status(429).json({ error: 'Забагато запитів. Зачекайте хвилину.' });
      }
    }
  }
  next();
};


setInterval(() => {
  const now = new Date().getTime();
  holds = holds.filter(h => h.hold_until > now);
  for (const ip in ipRequests) {
    if (now - ipRequests[ip].firstRequest > 60000) delete ipRequests[ip];
  }
}, 60000);

app.get('/api/photos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM chalet_photos');
    res.json(rows);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

app.post('/api/photos', requireAuth, upload.single('photo'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  try {
    const [result] = await pool.query('INSERT INTO chalet_photos (url) VALUES (?)', [fileUrl]);
    res.json({ id: result.insertId, url: fileUrl });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

app.post('/api/photos/about', requireAuth, upload.single('photo'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  try {
    const [rows] = await pool.query('SELECT url FROM chalet_photos WHERE id = 999');
    if (rows.length > 0) {
      const oldFilename = rows[0].url.split('/').pop();
      const oldFilePath = `./uploads/${oldFilename}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await pool.query(
      'INSERT INTO chalet_photos (id, url) VALUES (999, ?) ON DUPLICATE KEY UPDATE url = ?',
      [fileUrl, fileUrl]
    );
    res.json({ success: true, url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/photos/update/:id', requireAuth, upload.single('photo'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  const photoId = parseInt(req.params.id);
  try {

    const [rows] = await pool.query('SELECT url FROM chalet_photos WHERE id = ?', [photoId]);
    if (rows.length > 0) {
      const oldFilename = rows[0].url.split('/').pop();
      const oldFilePath = `./uploads/${oldFilename}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    

    await pool.query(
      'INSERT INTO chalet_photos (id, url) VALUES (?, ?) ON DUPLICATE KEY UPDATE url = ?',
      [photoId, fileUrl, fileUrl]
    );
    res.json({ success: true, url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/photos/:id', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT url FROM chalet_photos WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      const fileUrl = rows[0].url;
      const filename = fileUrl.split('/').pop();
      const filePath = `./uploads/${filename}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await pool.query('DELETE FROM chalet_photos WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

app.get('/api/bookings/busy-dates', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT check_in, check_out FROM chalet_bookings WHERE status IN ("confirmed", "pending")');
    const now = new Date().getTime();
    holds = holds.filter(h => h.hold_until > now);
    const busyDates = [...rows, ...holds.map(h => ({ check_in: h.check_in, check_out: h.check_out }))];
    res.json(busyDates);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

app.post('/api/bookings/hold', rateLimit, async (req, res) => {
  const { check_in, check_out } = req.body;
  if (!check_in || !check_out || check_in > check_out) return res.status(400).json({ error: 'Invalid dates' });

  const now = new Date().getTime();
  holds = holds.filter(h => h.hold_until > now);
  
  const hasHoldOverlap = holds.some(h => check_in <= h.check_out && check_out >= h.check_in);
  if (hasHoldOverlap) return res.status(400).json({ error: 'Dates already held' });

  try {
    const [rows] = await pool.query(
      'SELECT id FROM chalet_bookings WHERE status IN ("confirmed", "pending") AND check_in <= ? AND check_out >= ?',
      [check_out, check_in]
    );
    if (rows.length > 0) return res.status(400).json({ error: 'Dates already booked' });

    const hold_until = now + 300000;
    const newHold = { id: holdIdCounter++, check_in, check_out, hold_until };
    holds.push(newHold);
    res.json({ id: newHold.id, hold_until });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings/confirm', rateLimit, async (req, res) => {
  const { id, pib, phone, comment } = req.body;
  
  const now = new Date().getTime();
  holds = holds.filter(h => h.hold_until > now);
  const holdIndex = holds.findIndex(h => h.id === id);

  if (holdIndex !== -1) {
    const hold = holds[holdIndex];
    holds.splice(holdIndex, 1);

    try {
      await pool.query(
        'INSERT INTO chalet_bookings (check_in, check_out, pib, phone, comment, status) VALUES (?, ?, ?, ?, ?, "pending")',
        [hold.check_in, hold.check_out, pib, phone, comment]
      );

      if (process.env.RESEND_API_KEY && process.env.MANAGER_EMAIL) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: process.env.MANAGER_EMAIL,
            subject: 'Нове бронювання Chalet Weekend',
            text: `Клієнт: ${pib}\nТелефон: ${phone}\nДати: з ${hold.check_in} по ${hold.check_out}\nПобажання: ${comment}`
          })
        }).catch(err => console.error(err));
      }

      res.json({ success: true });
    } catch (err) { 
      holds.push(hold);
      res.status(500).json({ error: err.message }); 
    }
  } else {
    res.status(404).json({ error: 'Hold expired or not found' });
  }
});

app.post('/api/bookings/admin-reserve', requireAuth, async (req, res) => {
  const { check_in, check_out, pib, phone, comment } = req.body;
  if (!check_in || !check_out || check_in > check_out) return res.status(400).json({ error: 'Invalid dates' });

  try {
    const [rows] = await pool.query(
      'SELECT id FROM chalet_bookings WHERE status IN ("confirmed", "pending") AND check_in <= ? AND check_out >= ?',
      [check_out, check_in]
    );
    if (rows.length > 0) return res.status(400).json({ error: 'Dates already booked' });
    await pool.query(
      'INSERT INTO chalet_bookings (check_in, check_out, pib, phone, comment, status) VALUES (?, ?, ?, ?, ?, "confirmed")',
      [check_in, check_out, pib, phone, comment]
    );
    res.json({ success: true });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

app.put('/api/bookings/:id/status', requireAuth, async (req, res) => {
  try {
    await pool.query('UPDATE chalet_bookings SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
    res.json({ success: true });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

app.delete('/api/bookings/:id', requireAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM chalet_bookings WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

app.get('/api/admin/bookings', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM chalet_bookings ORDER BY check_in ASC');
    res.json(rows);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));