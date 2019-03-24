import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/components/app';
import template from './template';

// const CLIENT_PATH = path.resolve(__dirname, '../client/index.html');

const clientAppWrapper = renderToString(<App />);
const app = express();

// app.use('/assets')

app.get('/', (req, res) => {
  const htmlResponse = template(clientAppWrapper);
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(htmlResponse);
});

export default app;
