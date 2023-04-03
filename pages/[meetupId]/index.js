import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";
import Head from "next/head";

const MeetupDetailPage = (props) => {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name={'description'}
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
};

//getStaticPath : 당연히 데이터도 미리 만들어 놓기 때문에 경로 url 들도 미리 만들어 놓아야 한다
export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://seungheon818:ch00191919!@cluster0.bob9ydu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

    await client.close();

    return {
        fallback: false,//밑에 해당하는 path 들만 미리 생성해놓도록 설정 (true 일경우)
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
    }
};

//static site generation(SSG)
export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://seungheon818:ch00191919!@cluster0.bob9ydu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});

    await client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
                address: selectedMeetup.address,
            }
        }
    }
}

export default MeetupDetailPage;