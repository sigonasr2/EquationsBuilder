import logo from './logo.svg';
import {useEffect,useState} from 'react';
import './App.css';

function Equation(p) {
	const {data} = p
	const [operator,setOperator] = useState("disabled")
	const [field,setField] = useState(0)
	
	return <><select>
	{Object.keys(data).map((key)=><option>{key}</option>)}
	</select></>
}

function EquationBuilder(p) {
	const {data} = p
	const [equationParts,setEquationParts] = useState([<Equation data={data}/>])
	return <>
		<button onClick={()=>{
			setEquationParts([...equationParts,<Equation data={data}/>])}}>+</button>
		<br/><br/>
		{equationParts.map((eq)=>eq)}</>
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
