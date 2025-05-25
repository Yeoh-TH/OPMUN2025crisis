
import './App.css'
import '@govtechsg/sgds/css/sgds.css';
import unionJack from './assets/unionJack.webp';
import { Col, Row, Card } from '@govtechsg/sgds-react';

function App() {

  return (
    <>
      <Row>
        <Col
          style={{ width: '50%', backgroundColor: "#f6eee3" }}
          lg="5"
          xs
        >
          <div style={{ marginBottom: "2vw", width: '100%' }}>

            <h1>
              <img src={unionJack} width="60%" style={{ margin: '2vw' }}></img>
              <br />
              Crisis Updates</h1>
            <h2>Can be Malayan Command or Singapore War Cabinet</h2>
          </div>
          <Card style={{ margin: '4vw' }}>
            <Card.Body>
              <Card.Title>
                Another Cool Title
              </Card.Title>
              <Card.Text>
                Some serious crisis update text goes here.<br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Card.Text>
              <Card.Link href="#">
                New link to new thing
              </Card.Link>
            </Card.Body>
            <Card.Img
              alt="img alternate text goes here"
              src="https://picsum.photos/600"
              variant="bottom"
            />
          </Card>
          <Card style={{ margin: '4vw' }}>
            <Card.Img
              alt="img alternate text goes here"
              src="https://picsum.photos/600"
              variant="top"
            />
            <Card.Body>
              <Card.Title>
                Very Cool Title
              </Card.Title>
              <Card.Text>
                Some funny crisis update text goes here.<br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Card.Text>
              <Card.Link href="#">
                Link to something
              </Card.Link>
            </Card.Body>
          </Card>

        </Col>
        <Col lg="5" xs >
          <embed style={{ width: '50%', position: "fixed", right: "0px", height: "100%" }} src="https://www.scribblemaps.com/maps/view/Singapore-1942-Map/MNGubJMTlv" ></embed>
        </Col>
      </Row>
    </>
  )
}

export default App
