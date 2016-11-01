
import {Server} from './Server';
import {Requester} from './Requester';
import * as process from 'process';

if (process.env.APP_TYPE === 'server') {
    const server = new Server();
    server.start()
    .catch(err => {
        console.log(err);
        process.exit();
    });    
} else if (process.env.APP_TYPE === 'requester') {
    const requester = new Requester(<string> process.env.APP_HOST, <number> process.env.APP_PORT);
    requester.start()
    .catch(err => {
        console.log(err);
        process.exit();
    });
} else {
    process.exit();
}