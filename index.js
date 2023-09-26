const express = require('express')
const app = express()
const port = 3000 

const bodyPs = require('body-parser'); 
app.use(bodyPs.urlencoded({ extended: false}));
app.use(bodyPs.json());

const mhsRouter = require('./routes/mahasiswa');
app.use('/api/mhs', mhsRouter);
const jrsRouter = require('./routes/jurusan');
app.use('/api/jrs', jrsRouter);

app.listen(port, () => {
    console.log(`running app http:://localhost:${port}`)
})
