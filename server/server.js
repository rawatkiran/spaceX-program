import express from 'express'
import fs from 'fs'
import path from 'path'

import React from 'react';
import ReactDomServer from 'react-dom/server';

import App from '../src/App';

const PORT = 5000;

const app = express();

app.use('^/$', (req, res, next)=> {
    const myApp = ReactDomServer.renderToString(<App />);
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => { 
        if(err){
            console.log(err)
            return res.status(500).send("Some error happened")
        }
        return res.send(data.replace('<div id="root"></div>', `<div id="root">${myApp}</div>`
        )
        );
    });
});

app.use(express.static(path.resolve(__dirname, '..', 'build-folder')))
app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
} )
