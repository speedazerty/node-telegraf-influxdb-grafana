
import * as StatsdClient from 'statsd-client';

const client = new StatsdClient({debug: true});

setInterval(() => {
    client.increment('redis.set,host=localhost,path=/test/home');
}, 500);