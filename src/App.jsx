import './App.css';
import LEDStripe from './components/LEDStripe';

function App() {

  return (
    <div className="App">

      <LEDStripe count={20} radius={20} x={200} y={200} prefix={"led"} />

      <header className="App-header">

        DREAMLIGHTS

      </header>
    </div>
  );



}


export default App;
