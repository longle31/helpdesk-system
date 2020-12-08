const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const accountRoutes = require('./routes/accountRoutes');
const reportRoutes = require('./routes/reportRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();
/// app config
const cors = require('cors');
const { requireAuth, checkEmployee } = require('./middlewares/authMiddleWare');
// connect to mongodb
const port = process.env.PORT || 3000;
const dbURI = 'mongodb://localhost/helpdesk';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => { console.log(`listening in port ${port}`); }))
    .catch(err => console.log('cannot connect to db: ', err));


app.set('view engine', 'ejs');
///static files and middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());



app.use(authRoutes);


app.use('*', checkEmployee); 

app.get('/', requireAuth, (req, res) => {
    const auth = req.cookies.auth;
    if (parseInt(auth) === 0) res.redirect('/management');
    else if (parseInt(auth) === -2) res.redirect('/reporting');
    else if( parseInt(auth) === -1) res.redirect('/solving');
    else res.redirect('/404');
});

app.get('/reporting', requireAuth, (req, res) => {
    const auth = req.cookies.auth;
    if (parseInt(auth) === -2) res.render('reporting');
    else  if (parseInt(auth) === -1) res.render('solving');
    else res.redirect('/404');
})

app.get('/management', requireAuth, (req, res) => {
    const auth = req.cookies.auth;
    if (parseInt(auth) === 0) res.render('management');
    else res.redirect('/404');
})

app.get('/solving', requireAuth, (req, res)=>{
    const auth = req.cookies.auth;
    
    if (parseInt(auth) === -1) res.render('solving');
    else res.redirect('/404');
})


app.use('/api',requireAuth, employeeRoutes, accountRoutes, reportRoutes, deviceRoutes, taskRoutes);

app.use((req, res) => {
    res.status(404).render('404');
})



