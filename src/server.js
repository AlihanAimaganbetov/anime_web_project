const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

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

const secretKey = 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401); // Добавлен return
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Добавлен return
        }
        req.user = user;
        next();
    });
};


app.get('/api/users', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("select * from users");
        res.json(result.rows);
        client.release();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const client = await pool.connect();

        // Проверка, существует ли пользователь
        const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            client.release();
            return res.status(400).json({ message: 'User already exists' });
        }
        const result = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );
        const newUser = result.rows[0];
        client.release();

        res.status(201).json(newUser);
    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const client = await pool.connect();

        const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length === 0) {
            client.release();
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const user = userCheck.rows[0];

        if (user.password !== password) {
            client.release();
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.sign({ id: user.id, email: user.email }, secretKey);
        client.release();
        return res.json({ message: 'Login successful', user, accessToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});


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
