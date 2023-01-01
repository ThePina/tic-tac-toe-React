import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import TableGame from './game/TableGame'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TableGame></TableGame>
      </header>
    </div>
  );
}

export default App;
