import './App.css';
import LEDStripe from './components/LEDStripe';


function App() {
  return (
    <div className="App">

      <LEDStripe count={30} radius={10} x={200} y={200}/>

      <header className="App-header">
        
        DREAMLIGHTS
        
      </header>
    </div>
  );
}

export default App;
