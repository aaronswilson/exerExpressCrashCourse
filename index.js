const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members')

const app = express();

// Init middleware
// app.use(logger);

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
  }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));