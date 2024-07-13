const express = require('express');
const bodyParser = require('body-parser');

//  Passport Requirements
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Data Imports
const agents = require('./data/agents')
const contacts = require('./data/contacts')
const properties = require('./data/properties')
const agentRoutes = require('./routes/agentRoutes')
const contactRoutes = require('./routes/contactRoutes')
const propertyRoutes = require('./routes/propertyRoutes')

// Create express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({extended: true}));

// Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true // Set to true to save uninitialized sessions
}));

// Express flash middleware - used for error handling, 
// specifically for displaying flash messages. 
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Mock user database
const users = [
    { id: 1, username: 'carmen', password: 'pw#123' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'user3', password: 'password3' }
];

// Mock Customer Relationship Management Database/Middleware
app.use('/api/agents',agentRoutes)
app.use('/api/contacts',contactRoutes)
app.use('/api/properties',propertyRoutes)

// Configure passport-local strategy
passport.use(new LocalStrategy(
    function(username, password, done) {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            return done(null, user);
        }
        return done(null, false, { message: 'Incorrect username or password.' });
    }
));

// Serialize/deserialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Middleware function to check authentication
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Mount routes
const indexRoute = require('./routes/index');
const aboutRoute = require('./routes/about');
const loginRoute = require('./routes/login');

// Routes
app.use('/', indexRoute);
app.use('/about', aboutRoute);
app.use('/login', loginRoute);

// Login route
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true // Optionally, enable flash messages
    })
);

// Dashboard route
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { username: req.user.username });
});

// Login page route
app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') });
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.redirect('/login'); // Redirect after logout
    });
});

// Middleware
app.use((req, res)=>{
    res.status(404)
    res.json({error: "Resourse not found"})
})

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});