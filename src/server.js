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

let users = [];

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

        // Вставка нового пользователя в базу данных
        const result = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );

        const newUser = result.rows[0];
        client.release();

        // Возвращаем данные нового пользователя
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await pool.connect();

        // Проверка, существует ли пользователь с указанным email
        const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length === 0) {
            client.release();
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = userCheck.rows[0];

        // Проверка пароля
        if (user.password !== password) {
            client.release();
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        client.release();

        // Возвращаем данные пользователя (вы можете вернуть токен вместо этого)
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
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
