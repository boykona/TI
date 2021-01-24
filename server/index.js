const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 9999;
const hostname = 'localhost';

let companies = [];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/billboardarr', async (request, response) => {
    companies = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(companies);
});

app.post('/billboardarr', async (request, response) => {
    const bilboardArr = request.body;
    companies.push(bilboardArr);
    await writeData(companies);
    response.status(200).json({info: 'Bilboard succefully created!'});
});

app.post('/billboardarr/:BilboardArrId/order', async (request, response) => {
    const order = request.body;
    const BilboardArrId = Number(request.params.BilboardArrId);
    companies[BilboardArrId].bilboards.push(order);
    await writeData(companies);
    response.status(200).json({info: 'Bilboard succefully created!'});
});

app.patch('/billboardarr/:BilboardArrId/bilboard/:bilboardId', async (request, response) => {
    const { newName, newAuthor } = request.body;
    const BilboardArrId = Number(request.params.BilboardArrId);
    const bilboardId = Number(request.params.bilboardId);

    companies[BilboardArrId].bilboards[bilboardId].name = newName;
    companies[BilboardArrId].bilboards[bilboardId].author = newAuthor;

    await writeData(companies);
    response.status(200).json({info: 'Bilboard succefully changed!'});
});

app.delete('/billboardarr/:BilboardArrId/bilboard/:bilboardId', async (request, response) => {
    const BilboardArrId = Number(request.params.BilboardArrId);
    const bilboardId = Number(request.params.bilboardId);

    companies[BilboardArrId].bilboards.splice(bilboardId, 1);

    await writeData(companies);
    response.status(200).json({info: 'Bilboard succefully deleted!'});
});

app.patch('/billboardarr/:BilboardArrId', async (request, response) => {
    const BilboardArrId = Number(request.params.BilboardArrId);
    const { bilboardId, destCompanyId } = request.body;

    const bilboardToMove =  companies[BilboardArrId].bilboards.splice(bilboardId, 1);
    companies[destCompanyId].bilboards.push(bilboardToMove);

    await writeData(companies);
    response.status(200).json({info: 'Bilboard succefully moved!'});
});

app.listen(port, hostname, (error) => {
    if (error) {
        console.error(error);
    }
});
