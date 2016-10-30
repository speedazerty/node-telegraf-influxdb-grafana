

import * as StatsdClient from 'statsd-client';
import * as process from 'process';
import * as express from 'express';
import {Response, Request} from 'express';

const clientHost: string = process.env.STATSD_HOST || "localhost";
const clientPort: number = parseInt(process.env.STATSD_PORT) || 8125;
const appPort: number = parseInt(process.env.APP_PORT) || 8080;

const client = new StatsdClient({
    host: clientHost,
    port: clientPort,
    debug: true
});

const app = express();

app.get('/healthCheck', (req: Request, res: Response) => {
    client.increment('up,host=localhost,path=/test/home');
    res.send('metric sent.');
});


app.get('/redis', (req: Request, res: Response) => {
    client.increment('redis.set,host=localhost,path=/test/home');
    res.send('metric sent.');
});

app.listen(appPort, () => {
    console.log(`App started on port ${appPort}`);
});