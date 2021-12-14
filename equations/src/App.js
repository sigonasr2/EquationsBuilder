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
	{data[field]}</div><div style={{display:"inline-block",border:"1px solid black"}}>
	<select onChange={(ev)=>{updateEquation(field,ev.currentTarget.value)}}>
	{["+","-","x","÷","()"].map((key)=><option key={key} value={key}>{key}</option>)}
	</select><br/>{id}</div></>
}

function EquationBuilder(p) {
	const {data} = p
	const [equationParts,setEquationParts] = useState([])
	const [equation,setEquation] = useState([])
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
		{equationParts.map((eq,i)=><Equation equationParts={equationParts} setEquationParts={setEquationParts} id={i} data={data} field={equationParts[i].field} operator={equationParts[i].operator}/>)}
		<br/><br/>
		{equation}
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
