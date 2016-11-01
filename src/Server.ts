import * as StatsdClient from 'statsd-client';
import * as process from 'process';
import * as express from 'express';
import {Response, Request, Express, NextFunction} from 'express';

const clientHost: string = process.env.STATSD_HOST || "localhost";
const clientPort: number = parseInt(process.env.STATSD_PORT) || 8125;
const appPort: number = parseInt(process.env.APP_PORT) || 8080;

const client = new StatsdClient({
    host: clientHost,
    port: clientPort,
    debug: true
});

export class Server {

    private app: Express; 

    constructor() {
        this.app = express();
    }

    public async start(): Promise<void> {
        
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            req.query.date = new Date();
            next();
        });

        this.app.get('/request', (req: Request, res: Response) => {
            client.increment(`request,`
                +`podIp=${process.env.POD_IP},`
                +`podName=${process.env.POD_NAME},`
                +`podNamespace=${process.env.POD_NAMESPACE},`
                +`path=/test/home`);

            //request delay 10-50ms
            const delay: number = Math.floor((Math.random() * 50) + 10)
            setTimeout(() => {
                client.timing(`latency,`
                +`podIp=${process.env.POD_IP},`
                +`podName=${process.env.POD_NAME},`
                +`podNamespace=${process.env.POD_NAMESPACE},`
                +`path=/test/home`, req.query.date);
                res.send('metric sent.');
            },  delay);
        });

        return new Promise<void>((resolve, reject) => {
            this.app.listen(appPort, (err: any) => {
                if (err) {
                    return Promise.reject(err);
                }
                console.log(`App started on port ${appPort}`);
                return;
            });
        });
    }
}
