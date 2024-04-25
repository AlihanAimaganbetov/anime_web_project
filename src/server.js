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
app.use(cors()); 

app.get('/api/Anime', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("select Distinct * from anime_data WHERE genre NOT LIKE '%Hentai%'");
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
app.get('/api/Anime/:id', async (req, res) => {
    const animeId = req.params.id;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM anime_data WHERE uid = $1', [animeId]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Anime not found' });
        } else {
            res.json(result.rows[0]);
        }
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


app.get('/api/reviews/:anime_uid', async (req, res) => {
    const anime_uid = req.params.anime_uid;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM reviews_data WHERE anime_uid = $1', [anime_uid]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Anime not found' });
        } else {
            res.json(result.rows);
        }
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});



app.get('/api/reviews', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM reviews_data');
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
