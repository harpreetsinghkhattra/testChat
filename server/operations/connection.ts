import { MongoClient } from 'mongodb';

export class Connection {
    /** Mongodb connection */
    static connect(cb) {
        let uri = "mongodb://127.0.0.1";
        // let uri = "mongodb://harpreetsinghkhattra:Ha872909066@ds263740.mlab.com:63740/angularchat";

        MongoClient.connect(uri, (err, client) => {
            console.log('err', err);
            if (err) cb(err, null);
            if (client) {
                const db = client.db('angularchat');
                cb(null, db, client);
            }
        });
    }
}