import express from 'express'
import sqlite3 from 'sqlite3'

const app = express()
const port = 4001
const db = new sqlite3.Database('memories.db')

app.use(express.json())

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memory_lanes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT,
      slug TEXT,
      description TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_lane_id INTEGER,
      title TEXT,
      description TEXT,
      timestamp DATE,
      images TEXT,
      FOREIGN KEY (memory_lane_id) REFERENCES memory_lanes(id)
    )
  `)
})

// Memory Lanes Endpoints
app.get('/memory-lanes', (req, res) => {
  db.all('SELECT * FROM memory_lanes', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ memoryLanes: rows })
  })
})

app.post('/memory-lanes', (req, res) => {
  const { user_name, slug, description } = req.body

  if (!user_name || !slug || !description) {
    res.status(400).json({
      error: 'Please provide all fields: user_name, slug, description',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO memory_lanes (user_name, slug, description) VALUES (?, ?, ?)',
  )
  stmt.run(user_name, slug, description, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({
      memoryLane: {
        id: this.lastID,
        user_name,
        slug,
        description,
      },
    })
  })
})

app.get('/memory-lanes/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memory_lanes WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory Lane not found' })
      return
    }
    res.json({ memoryLane: row })
  })
})

app.put('/memory-lanes/:id', (req, res) => {
  const { id } = req.params
  const { user_name, slug, description } = req.body

  if (!user_name || !slug || !description) {
    res.status(400).json({
      error: 'Please provide all fields: user_name, slug, description',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memory_lanes SET user_name = ?, slug = ?, description = ? WHERE id = ?',
  )
  stmt.run(user_name, slug, description, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({
      memoryLane: {
        id,
        user_name,
        slug,
        description,
      },
    })
  })
})

app.delete('/memory-lanes/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memory_lanes WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory Lane deleted successfully' })
  })
})

app.post('/memories', (req, res) => {
  const { memory_lane_id, title, description, timestamp, images } = req.body

  if (!memory_lane_id || !title || !description || !timestamp || !images) {
    res.status(400).json({
      error:
        'Please provide all fields: memory_lane_id, title, description, timestamp, images',
    })
    return
  }

  try {
    if (!Array.isArray(images) || images.length === 0) {
      throw new Error('Images must be a non-empty array')
    }
  } catch (err) {
    res.status(400).json({
      error: 'Images must be a non-empty array',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO memories (memory_lane_id, title, description, timestamp, images) VALUES (?, ?, ?, ?, ?)',
  )
  stmt.run(memory_lane_id, title, description, timestamp, images, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({
      memory: {
        id: this.lastID,
        memory_lane_id,
        title,
        description,
        timestamp,
        images,
      },
    })
  })
})

app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { memory_lane_id, title, description, timestamp, images } = req.body

  if (!memory_lane_id || !title || !description || !timestamp || !images) {
    res.status(400).json({
      error:
        'Please provide all fields: memory_lane_id, title, description, timestamp, images',
    })
    return
  }

  // Validate that images is a non-empty array
  let imageArray
  try {
    imageArray = JSON.parse(images)
    if (!Array.isArray(imageArray) || imageArray.length === 0) {
      throw new Error('Images must be a non-empty array')
    }
  } catch (err) {
    res.status(400).json({
      error: 'Images must be a non-empty array',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET memory_lane_id = ?, title = ?, description = ?, timestamp = ?, images = ? WHERE id = ?',
  )
  stmt.run(memory_lane_id, title, description, timestamp, images, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({
      memory: {
        id,
        memory_lane_id,
        title,
        description,
        timestamp,
        images,
      },
    })
  })
})

app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})