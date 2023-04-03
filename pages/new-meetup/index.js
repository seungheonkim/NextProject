import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {router} from "next/client";
import Head from "next/head";

const NewMeetupPage = () => {
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    };

    return (
        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta
                    name={'description'}
                    content={'Add a New Meetup!!'}
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </>
    )
};

export default NewMeetupPage;