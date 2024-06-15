const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

// In-memory user data
const users = [];

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Utility functions
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('A token is required for authentication');
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const user = { id: users.length + 1, username, password: hashedPassword };

    users.push(user);

    res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).send('User not found');

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid password');

    const token = generateToken(user);

    res.status(200).send({ token });
});

app.get('/protected', verifyToken, (req, res) => {
    res.status(200).send('This is a protected route');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
