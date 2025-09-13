import React, { useState, useRef } from 'react';
import './App.css'
import '@govtechsg/sgds/css/sgds.css';
import unionJack from './assets/unionJack.webp';
import mapOne from "./assets/Map.jpg";
import { Col, Row, Card } from '@govtechsg/sgds-react';

const symbolTemplates: Record<string, string> = {
  infantry: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="4"/>
    <line x1="30" y1="30" x2="70" y2="70" stroke="currentColor" stroke-width="4"/>
    <line x1="70" y1="30" x2="30" y2="70" stroke="currentColor" stroke-width="4"/>`,
  armor: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="4"/>
    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="4"/>`,
  artillery: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="4"/>
    <circle cx="50" cy="50" r="20" fill="currentColor"/>`,
  reconnaissance: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="4"/>
    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="4"/>
    <line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" stroke-width="3"/>`,
  aerial: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="4"/>
    <path d="M 30,50 L 50,30 L 70,50 L 50,70 Z" fill="none" stroke="currentColor" stroke-width="4"/>`,
};

const COLORS = [
  { name: 'BLUE', value: '#0066FF', title: 'Blue - Friendly Forces' },
  { name: 'RED', value: '#FF0000', title: 'Red - Hostile Forces' },
  { name: 'GREEN', value: '#00FF00', title: 'Green - Neutral Forces' },
  { name: 'YELLOW', value: '#FFFF00', title: 'Yellow - Unknown Forces' },
  { name: 'WHITE', value: '#FFFFFF', title: 'White - Assumed Friendly' },
  { name: 'PURPLE', value: '#800080', title: 'Purple - Exercise/Joker' },
  { name: 'ORANGE', value: '#FFA500', title: 'Orange - Suspect' },
  { name: 'GRAY', value: '#808080', title: 'Gray - Pending' },
];

const UNIT_TYPES = [
  { type: 'infantry', label: 'INF', svg: symbolTemplates.infantry },
  { type: 'armor', label: 'ARM', svg: symbolTemplates.armor },
  { type: 'artillery', label: 'ART', svg: symbolTemplates.artillery },
  { type: 'reconnaissance', label: 'REC', svg: symbolTemplates.reconnaissance },
  { type: 'aerial', label: 'AIR', svg: symbolTemplates.aerial },
];

function App() {
  const [selectedColor, setSelectedColor] = useState('#0066FF');
  const [units, setUnits] = useState<any[]>([]);
  const [draggedUnit, setDraggedUnit] = useState<any | null>(null);
  const [contextMenu, setContextMenu] = useState<{ visible: boolean, x: number, y: number, unitId: string | null }>({ visible: false, x: 0, y: 0, unitId: null });
  const mapOverlayRef = useRef<HTMLDivElement>(null);

  // Drag from palette
  const handleDragStartPalette = (unitType: string, type: string) => (e: React.DragEvent) => {
    setDraggedUnit({ symbol: unitType, type, color: selectedColor });
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Drop on map
  const handleDropMap = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedUnit) return;
    const rect = mapOverlayRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left - 25;
    const y = e.clientY - rect.top - 25;
    setUnits(units => [
      ...units,
      {
        id: 'unit-' + (units.length + 1),
        symbol: draggedUnit.symbol,
        type: draggedUnit.type,
        color: draggedUnit.color,
        x: Math.max(0, Math.min(x, rect.width - 50)),
        y: Math.max(0, Math.min(y, rect.height - 50)),
      }
    ]);
    setDraggedUnit(null);
  };

  // Drag over map
  const handleDragOverMap = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggedUnit ? 'copy' : 'move';
  };

  // Drag start unit on map
  const handleDragStartUnit = (unitId: string) => (e: React.DragEvent) => {
    e.dataTransfer.setData('unitId', unitId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Drop unit on map (move)
  const handleDropMoveUnit = (e: React.DragEvent) => {
    const unitId = e.dataTransfer.getData('unitId');
    if (unitId) {
      e.preventDefault();
      const rect = mapOverlayRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left - 25;
      const y = e.clientY - rect.top - 25;
      setUnits(units =>
        units.map(u =>
          u.id === unitId
            ? { ...u, x: Math.max(0, Math.min(x, rect.width - 50)), y: Math.max(0, Math.min(y, rect.height - 50)) }
            : u
        )
      );
    }
  };

  const handleContextMenuUnit = (unitId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (mapOverlayRef.current) {
      const x = e.clientX -400;
      const y = e.clientY -50;
      setContextMenu({
        visible: true,
        x,
        y,
        unitId
      });
    }
  };

  const handleHideContextMenu = () => {
    setContextMenu({
      visible: false,
      x: contextMenu.x,
      y: contextMenu.y,
      unitId: null
    });
  };

  // Delete unit
  const handleDeleteUnit = () => {
    if (contextMenu.unitId) {
      setUnits(units => units.filter(u => u.id !== contextMenu.unitId));
      handleHideContextMenu();
    }
  };

  // Stats
  const stats = {
    infantry: units.filter(u => u.type === 'infantry').length,
    tank: units.filter(u => u.type === 'tank' || u.type === 'artillery' || u.type === 'reconnaissance').length,
    aerial: units.filter(u => u.type === 'aerial').length,
    total: units.length,
  };

  return (
    <>
      <Row>
        <Col style={{ width: '30%', backgroundColor: "#f6eee3" }} lg="5" xs>
          <div className="topBar">
            <h1>Singapore 1942</h1>
            <a className='topBarLinks' href="google form">Directive Form</a>
            <a className='topBarLinks' href="#/about">About us</a>
          </div>
          <div style={{ marginBottom: "2vw", width: '100%', marginTop: '5vw' }}>
            <h1>
              <img src={unionJack} width="60%" style={{ margin: '2vw' }} alt="Union Jack" />
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
                <p>
                  Some serious crisis update text goes here.<br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
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
        <Col lg="5" xs style={{ width: '70%', top: '2vw', position: 'fixed', marginTop: "5vw", right:'0' }}>
          <div className="header">
            <h1>Troop Map Editor</h1>
          </div>
          <div className="container">
            <div className="sidebar">
              <h3>Unit Symbols</h3>
              <div className="unit-palette">
                {UNIT_TYPES.map(u => (
                  <div
                    key={u.type}
                    className={`unit-item ${u.type}`}
                    draggable
                    onDragStart={handleDragStartPalette(u.type, u.type)}
                    data-type={u.type}
                    data-symbol={u.type}
                    title={`${u.label} Unit`}
                  >
                    <svg viewBox="0 0 100 100" dangerouslySetInnerHTML={{ __html: u.svg }} />
                    <div className="unit-label">{u.label}</div>
                  </div>
                ))}
              </div>
              <h3>Colors</h3>
              <div className="color-controls">
                <div className="color-grid">
                  {COLORS.map(c => (
                    <div
                      key={c.value}
                      className={`color-option${selectedColor === c.value ? ' selected' : ''}`}
                      style={{ background: c.value }}
                      title={c.title}
                      onClick={() => setSelectedColor(c.value)}
                    >
                    </div>
                  ))}
                </div>
              </div>
              <div className="stats">
                <strong>Unit Deployment:</strong><br />
                Infantry: <span id="infantry-count">{stats.infantry}</span><br />
                Armor/Artillery: <span id="tank-count">{stats.tank}</span><br />
                Aerial: <span id="aerial-count">{stats.aerial}</span><br />
                <strong>Total: <span id="total-count">{stats.total}</span></strong>
              </div>
              <div className="instructions">
                <strong>Operations Manual:</strong><br />
                • Select allegiance color first<br />
                • Drag symbols onto map<br />
                • Reposition units by dragging<br />
                • Right-click to delete units<br />
              </div>
            </div>
            <div
              className="map-container"
              onDragOver={handleDragOverMap}
              onDrop={e => {
                if (draggedUnit) handleDropMap(e);
                else handleDropMoveUnit(e);
              }}
            >
              <img src={mapOne} alt="Singapore & Johore Map" className="map-image" />
              <div className="map-overlay" id="mapOverlay" ref={mapOverlayRef}>
                {units.map(unit => (
                  <div
                    key={unit.id}
                    className="unit-on-map"
                    style={{
                      left: unit.x,
                      top: unit.y,
                      borderColor: unit.color,
                      color: unit.color,
                      position: 'absolute',
                      cursor: 'move',
                    }}
                    draggable
                    onDragStart={handleDragStartUnit(unit.id)}
                    onContextMenu={handleContextMenuUnit(unit.id)}
                  >
                    <svg viewBox="0 0 100 100" dangerouslySetInnerHTML={{ __html: symbolTemplates[unit.symbol] }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {contextMenu.visible && (
            <div
              className="context-menu"
              style={{
                display: 'block',
                position: 'absolute',
                left: contextMenu.x,
                top: contextMenu.y,
                zIndex: 1000,
                background: '#fff',
                border: '1px solid #ccc',
                padding: '8px',
              }}
              onClick={handleDeleteUnit}
              onMouseLeave={handleHideContextMenu}
            >
              <div className="context-menu-item" id="deleteUnit">🗑️ Delete Unit</div>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default App;
