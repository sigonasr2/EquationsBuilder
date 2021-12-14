import logo from './logo.svg';
import {useEffect,useState} from 'react';
import './App.css';

function Equation() {
	
	const [equation,setEquation]=useState([[6],"+"])
	
	function SolveEquation(eq) {
		var newEq = [...eq]
		//Parenthesis.
		for (var i=0;i<newEq.length;i++) {
			if (Array.isArray(newEq[i])) {
				newEq.splice(i,1,SolveEquation(newEq[i]))
			}
		}
		//Multiplication and Division first.
		for (i=0;i<newEq.length-1;i++) {
			if (newEq[i]==="×") {
				var product = Number(newEq[i-1])*Number(newEq[i+1])
				newEq.splice(i-1,3,product)
				i--
			} else
			if (newEq[i]==="÷") {
				var quotient = Number(newEq[i-1])/Number(newEq[i+1])
				newEq.splice(i-1,3,quotient)
				i--
			}
		}
		for (i=0;i<newEq.length-1;i++) {
			if (newEq[i]==="+") {
				var sum = Number(newEq[i-1])+Number(newEq[i+1])
				newEq.splice(i-1,3,sum)
				i--
			} else
			if (newEq[i]==="-") {
				var difference = Number(newEq[i-1])-Number(newEq[i+1])
				newEq.splice(i-1,3,difference)
				i--
			}
		}
		return Number(newEq[0])
	}
	
	return <>
		<h1>{SolveEquation(equation)}</h1>
	</>
}

function App() {
	const fieldData = {
		data1:84,
		data2:49,
		data3:3.5,
		data4:67
	}
	
  return (
    <div className="App">
		<hr/>
		<Equation/>
    </div>
  );
}

export default App;
