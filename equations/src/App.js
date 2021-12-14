import logo from './logo.svg';
import {useEffect,useState} from 'react';
import './App.css';

function Equation(p) {
	const {data,id,equationParts,setEquationParts,field,operator} = p
	
	function updateEquation(field,operator) {
		var eq = [...equationParts]
		eq[id].field=field
		eq[id].operator=operator
		setEquationParts(eq)
	}
	return <><div style={{display:"inline-block",border:"1px solid black"}}>
	<select onChange={(ev)=>{
		updateEquation(ev.currentTarget.value,operator)
	}}>
	{Object.keys(data).map((key)=><option key={key} value={key}>{key}</option>)}
	</select><br/>
	{data[field]}</div>{operator!=="disabled"&&<div style={{display:"inline-block",border:"1px solid black"}}>
	<select onChange={(ev)=>{updateEquation(field,ev.currentTarget.value)}}>
	{["+","-","×","÷","()"].map((key)=><option key={key} value={key}>{key}</option>)}
	</select><br/> </div>}</>
}

function EquationBuilder(p) {
	const {data} = p
	const [equationParts,setEquationParts] = useState([])
	const [equation,setEquation] = useState([])
	
	function SolveEquation(eq) {
		var newEq = [...eq]
		//Multiplication and Division first.
		for (var i=0;i<newEq.length-1;i++) {
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
		for (var i=0;i<newEq.length-1;i++) {
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
		return newEq.slice(0,-1)
	}
	
	useEffect(()=>{
		var newEq = []
		for (var i=0;i<equationParts.length;i++) {
			newEq.push(data[equationParts[i].field])
			newEq.push(equationParts[i].operator)
		}
		setEquation(newEq)
	},[equationParts])
	return <>
		<button onClick={()=>{
			setEquationParts([...equationParts,{field:Object.keys(data)[0],operator:"+"}])}}>+</button>
		<br/><br/>
		{equationParts.map((eq,i)=><Equation key={i} equationParts={equationParts} setEquationParts={setEquationParts} id={i} data={data} field={equationParts[i].field} operator={i!==equationParts.length-1?equationParts[i].operator:"disabled"}/>)}
		<br/><br/>
		{equation.slice(0,-1)}
		<br/><h1>{SolveEquation(equation)}</h1>
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
        <EquationBuilder data={fieldData}/>
    </div>
  );
}

export default App;
