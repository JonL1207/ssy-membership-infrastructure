require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const memberRoutes = require('./routes/memberRoutes');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

// Database Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.log(err));

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //set to true in production for https only access!
        httpOnly: true,
        maxAge: 1000 * 60 * 60 //cookie expires after 1 hour
    },
    store: store
}));
app.use(morgan('dev'));

// View Engine
app.set('view engine', 'ejs');

//Routes
app.get('/', (req, res) => res.send('index'));
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/members', memberRoutes);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));