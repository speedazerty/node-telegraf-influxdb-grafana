import * as request from 'request';

export class Requester {

    private host: string;
    private port: number;

    constructor(host: string = 'localhost', port: number = 8080) {
        this.host = host;
        this.port = port;
     }

    public async start(): Promise<void> {
                
        this.launchRequests();
        setInterval(() => {
            this.launchRequests()            
        }, 5000);
    }

    private launchRequests() {
        const nbrRequestPerSec: number = Math.floor((Math.random() *100) + 50);
        console.log('->' + nbrRequestPerSec);
        const interval = setInterval(() => {
            request(`http://${this.host}:${this.port}/request`, (err: any) => {
                console.log('request --> '+ nbrRequestPerSec);
                if (err) {
                    //console.log(err);
                }
            });
        }, nbrRequestPerSec);

        setTimeout(() => {
            clearInterval(interval);
        }, 5000);
    }
}