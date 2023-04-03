import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>React MeetUps</title>
                <meta
                    name={'description'}
                    content={'Browse a huge list of highly active react meetups!'}
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </>
    )
};

//static generation , pre fetching data to the page
//getStaticProps : 해당 이름을 보면 component 불러내기 전에 먼저 실행함
//이걸로 먼저 페이지 렌더링 전에 데이터 불러오고 나서 client 에 보여준다
//during the build process!!!

//build 과정에서만 보여지기 때문에 정보 업데이트가 되지 않음
//revalidate 가 필요함 => regenerate 과정을 만든다!!
//revalidate : 1 => 1초마다 데이터 갱신

export const getStaticProps = async () => {
    //fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://seungheon818:ch00191919!@cluster0.bob9ydu.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    await client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1,
    };
};

//dynamically 갱신 하고 싶다면 server-side rendering 을 사용하자!!
//only server-side! runs on the server!!
// export const getServerSideProps = async (context) => {
//     const request = context.req;
//     const response = context.res;
//
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;