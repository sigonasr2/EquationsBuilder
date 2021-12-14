import logo from './logo.svg';
import {useEffect,useState} from 'react';
import './App.css';

function Equation(p) {
	const [operator,setOperator] = useState("disabled")
	const [val,setVal] = useState(0)
	
	return <>val</>
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Equation/>
      </header>
    </div>
  );
}

export default App;
