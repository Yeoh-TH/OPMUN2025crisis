import './App.css'
import '@govtechsg/sgds/css/sgds.css';
import unionJack from './assets/unionJack.webp';
import { Col, Row, Card } from '@govtechsg/sgds-react';


function App() {
  return (
    <>
      <Row>
        <Col style={{ width: '100%', backgroundColor: "#f6eee3" }} lg="5" xs>
          <div className="topBar">
            <h1>Joint Cabinet Crisis</h1>
            <a className='topBarLinks' href="/">Updates</a>
            <a className='topBarLinks' href="link to google form">Directive Form</a>
            <a className='topBarLinks' href="#/editor">Map Editor</a>
            <a className='topBarLinks' href="#/council-directives">Council Directives</a>
          </div>
          <div style={{ marginBottom: "2vw", width: '100%', marginTop: '5vw' }}>
            <h1>
              <img src={unionJack} width="10%" style={{ margin: '2vw' }} alt="Union Jack" />
              <br />
              Crisis Updates</h1>
            <h2>The Malayan Times</h2>
          </div>
          <Card style={{ marginLeft: '2vw', marginRight: '2vw', marginBottom: '4vw' }}>
            
            <Card.Body>
              <Card.Title>Someone is in trouble</Card.Title>
              <Card.Text>Go save him or something</Card.Text>
              </Card.Body>

          </Card>
          <Card style={{ marginLeft: '2vw', marginRight: '2vw', marginBottom: '4vw' }}>
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
              src="https://picsum.photos/300"
              variant="bottom"
            />
          </Card>
          <Card style={{  marginLeft: '2vw', marginRight: '2vw', marginBottom: '4vw'  }}>
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
        
      </Row>
    </>
  );
}

export default App;
