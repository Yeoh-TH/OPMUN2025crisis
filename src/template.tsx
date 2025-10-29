import './App.css'
import {Row, Card} from '@govtechsg/sgds-react';

function Template() {
        // This is a brief template for crisis staffers and my guide yo yall on how to add updates.
        //First of all, there are multiple advantages using a custom made website over tumblr for updates, which we will be
        // testing for dry run before the actual crisis happens - custom music, videos and whatever embedded content we want can be added to updates.
        // This includes audio files (music), funny effects and other custom shenanigans u want to add at your discretion. Imagination is the limit here, just ask me for help or my copilot
        // But when overwhelmed, follow my documentation here:

    return(
        <>
        <Row>
        {/* This is how you add content: think of it as wrapping a giant card wrapper over what you want*/}
        <Card>
            {/* Card boddy is the main part of the card object. Inside, I have provided certain placeholders for you to use:
            A title, which is hello goregous here*/}
            <Card.Body>
                <Card.Title>
                    Hello gorgeous 
                </Card.Title>
                <Card.Text>
                    {/* Actual crisis update content goes here. I have separated them yet again, foo is normal text, and Lorem ipsum is the br text
                    You have multiple options here, just ask me if u want to apply that style: 
                    bold, italicise, increase font size of certain text, hyperlink etc possibilities are endless*/ }
                    <p>
                    Foo<br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </Card.Text>
                <Card.Link href="#"> {/*The hyperlink is changed in the quotations of href, and put what u want the link to display*/}
                     New link to new thing
                </Card.Link>
                </Card.Body>
                <Card.Img 
                alt="img alternate text goes here"
                src="https://picsum.photos/600"
                variant="bottom"
                />

        </Card>
        </Row>
        </>

        /*All the basics are here, if anything refer back to this guide, you do not need to delete MY comments because rest assured it will not show up i nthe final product wahoo
            All the best and happy backrooming! - TH
            */ 
    )

}

export default Template