import './App.css'
import '@govtechsg/sgds/css/sgds.css';
import unionJack from './assets/unionJack.webp';
import { Col, Row, Card } from '@govtechsg/sgds-react';
import {APIProvider, Map, InfoWindow, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import {useState} from 'react';

  type sharedTroops ={ position: google.maps.LatLngLiteral, title: string }
  const locations: sharedTroops[] = [
        {
            position: { lat: 1.3480, lng: 103.7193 }, 
            title: "General A's platoon"
        },
        {
            position: { lat: 1.3503, lng: 103.8122 }, 
            title: "General A's Regiment 2"
        },
        {
            position: { lat: 1.3499, lng: 103.7 }, 
            title: "General B's Battalion"
        },
        {
            position: { lat: 1.3521, lng: 103.8193 }, 
            title: "Jonathon Leung"
        },
        {
            position: { lat: 1.35, lng: 103.8 }, 
            title: "Someone's squad"
        },
    ];


    const PoiMarkers = (props: { pois: sharedTroops[] }) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState<number | null>(null);

  return (
    <>
      {props.pois.map((poi: sharedTroops, index: number) => (
        <div key={index}>
          <AdvancedMarker
            position={poi.position}
            onClick={() => setInfoWindowOpen(index)}
          >
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>

          {infoWindowOpen === index && (
            <InfoWindow
              position={poi.position}
              onCloseClick={() => setInfoWindowOpen(null)}
            >
              <div style={{ padding: '8px' }}>
                <strong>{poi.title}</strong>
              </div>
            </InfoWindow>
          )}
        </div>
      ))}
    </>
  );
};

function App() {
  return (
    <>
      <Row>
        <Col style={{ width: '100%', backgroundColor: "#f6eee3" }} lg="5" xs>
          <div className="topBar">
            <h1>Joint Cabinet Crisis</h1>
            <a className='topBarLinks' href="#/">Updates</a>
            <a className='topBarLinks' href="link to google form">Directive Form</a>
            <a className='topBarLinks' href="#/editor">Map Editor</a>
            <a className='topBarLinks' href="#/council-directives">Council Directives</a>
          </div>
          <div className='firstFromTop'>
            <h1>
              <img src={unionJack} width="20%" style={{ margin: '2vw' }} alt="Union Jack" />
              <br />
              Crisis Updates</h1>
            <h2>The Malayan Times</h2>
          </div>

          <APIProvider apiKey={'AIzaSyDdBGrtXdcOkvVC37W-WoCQIK9TjAwYGUs'} onLoad={() => console.log('Maps API has loaded.')}>
          
                              <Map
                                                      
                                                      className='main-map'
                                                      defaultZoom={11.5}
                                                      mapId='DEMO_MAP_ID'
                                                      defaultCenter={ { lat: 1.3521, lng: 103.8193
                                                       } }>
                              
                                                  <PoiMarkers pois={locations} />
                                              </Map>
          
                                  </APIProvider>
          
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
