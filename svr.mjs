import express from 'express';

const app = express();

app.use(express.static('Client', { extensions: '.html' }));

app.listen(8080);