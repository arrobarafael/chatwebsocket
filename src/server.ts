import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.send('get');
});

app.post('/', (request, response) => {
  return response.send('post');
});

app.listen(3333, () => console.log('Server running'));
