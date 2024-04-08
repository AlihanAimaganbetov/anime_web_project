const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Anime',
    password: '00000000',
    port: 5432,
});

app.use(express.json());
app.use(cors()); // Добавьте эту строку

app.get('/api/Anime', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM anime_data');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
