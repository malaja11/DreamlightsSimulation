import './App.css';
import LEDStripe from './components/LEDStripe';
import Stars from './components/Stars';

function App() {

  return (
    <div className="App">

      {/* <Stars count={322}/> */}

      <header className="App-header">

        DREAMLIGHTS

      </header>


      <LEDStripe count={20} radius={20} x={300} y={400} prefix={"led"} />
    </div>
  );



}


export default App;
