
import * as StatsdClient from 'statsd-client';
import * as process from 'process';
import * as fs from 'fs';

const clientHost: string = process.env.STATSD_HOST || "localhost";
const clientPort: number = parseInt(process.env.STATSD_PORT) || 8125;

const client = new StatsdClient({
    host: clientHost,
    port: clientPort,
    debug: true
});

client.increment('up,host=localhost,path=/test/home');
console.log('test');

fs.appendFile('notified.event', `Event sent ${(new Date().toString())}`, (err: Error) => {
    if (err) {
        console.log(err);
    }
});

setTimeout(() => {
    process.exit(0);
}, 3000);
