// api/new-meetup
// POST/api/new-meetup
import {MongoClient} from "mongodb";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;

        //mongodb connect
        const client = await MongoClient.connect('mongodb+srv://seungheon818:ch00191919!@cluster0.bob9ydu.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        await client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;