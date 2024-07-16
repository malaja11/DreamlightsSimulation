import './App.css';
import LEDStripe from './components/LEDStripe';
import Stars from './components/Stars';

function App() {

  return (
    <div className="App">

      <LEDStripe count={20} radius={20} x={200} y={200} prefix={"led"} />

      {/* <Stars count={322}/> */}

      <header className="App-header">

        DREAMLIGHTS

      </header>
    </div>
  );



}


export default App;
