import {Request, Response} from 'express';

const express = require('express');
const https = require('https');
const fs = require('fs');

const privateKey = fs.readFileSync('./ssl/lam.key');
const certificate = fs.readFileSync('./ssl/lam.crt');

class App {
    private app = express();

    constructor() {
        this.initializeBase();
    }

    private initializeBase = () => {
        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).json({"success":"true"})
        })
    }

    public listen = (port: number) => {
        try {
            https.createServer({
                key: privateKey,
                cert: certificate
            }, this.app).listen(port)
            console.log('info', `App listening on port ${port}`)
        } catch (err: any) {
            console.log('error', `Error starting https server on port ${port}: ${err}`)
        }
    }
}

export default App;