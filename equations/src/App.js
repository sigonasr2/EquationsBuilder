import logo from './logo.svg';
import {useEffect,useState} from 'react';
import './App.css';

function EditorControls(p) {
	return <>
	<span className="mouseover" style={{position:"absolute",bottom:0,left:0}}>{"<"}</span><span className="mouseover" style={{position:"absolute",bottom:0,right:0}}>{">"}</span>
	</>
}

function EquationGroup(p) {
	const {equation,setEquation,data,arr,key,id} = p
	
	const [myArr,setMyArr] = useState(arr)
	
	useEffect(()=>{
		var eqArr = [...equation]
		eqArr[id] = [...myArr]
		setEquation(eqArr)
	},[myArr])
	
	return <>
	<span style={{fontSize:"24px"}}>(</span>
	<div style={{position:"relative",display:"inline-block",paddingLeft:"12px",paddingRight:"12px"}}>
		<div style={{display:"inline-block",border:"3px solid green"}}>
			<button style={{backgroundColor:"blue",color:"white"}} onClick={()=>{
				var eqArr=[...myArr]
				eqArr.push(Object.keys(data)[0])
				setMyArr(eqArr)
			}}>Add Value</button>
			<button style={{backgroundColor:"green",color:"white"}} onClick={()=>{
				var eqArr=[...myArr]
				eqArr.push([])
				setMyArr(eqArr)
			}}>Add Group</button>
			<button style={{backgroundColor:"beige",color:"black"}} onClick={()=>{
				var eqArr=[...myArr]
				eqArr.push("+")
				setMyArr(eqArr)
			}}>Add Operator</button>
			<br/>
			{arr.map((eq,i)=>Array.isArray(eq)?<EquationGroup equation={myArr} setEquation={setMyArr} data={data} arr={eq} key={i} id={i}/>:eq==="×"||eq==="-"||eq==="+"||eq==="÷"?<EquationOperator equation={myArr} setEquation={setMyArr} data={data} operator={eq} key={i} id={i}/>:<EquationValue equation={myArr} setEquation={setMyArr} data={data} val={eq} key={i} id={i}/>)}
		</div>
	<EditorControls/>
	</div>
	<span style={{fontSize:"24px"}}>)</span>
	</>
}

function EquationOperator(p) {
	const {equation,setEquation,data,operator,key,id} = p
	
	const [op,setOp] = useState(operator)
	
	useEffect(()=>{
		var eqArr = [...equation]
		eqArr[id] = op
		setEquation(eqArr)
	},[op])
	
	return <select value={op} defaultValue={operator} onChange={(ev)=>{setOp(ev.currentTarget.value)}}>
		{["+","-","×","÷"].map((sign)=><option key={sign} value={sign}>{sign}</option>)}
	</select>
}

function EquationValue(p) {
	const {equation,setEquation,data,val,key,id} = p
	
	const [item,setItem] = useState(val)
	
	useEffect(()=>{
		var eqArr = [...equation]
		eqArr[id] = item
		setEquation(eqArr)
	},[item])
	
	return <div style={{display:"inline-block",border:"1px solid black"}}>
	<select value={item} defaultValue={val} onChange={(ev)=>{setItem(ev.currentTarget.value)}}>
		{Object.keys(data).map((key)=><option key={key} value={key}>{key}</option>)}
	</select>
	<br/>
	{data[val]}
	</div>
}

function Equation(p) {
	const {data} = p
	const [equation,setEquation]=useState([["data2"],"+","data3"])
	
	function SolveEquation(eq) {
		var newEq = [...eq]
		//Parenthesis.
		for (var i=0;i<newEq.length;i++) {
			if (Array.isArray(newEq[i])) {
				newEq.splice(i,1,SolveEquation(newEq[i]))
			}
		}
		//Multiplication and Division first.
		for (i=1;i<newEq.length-1;i++) {
			if (newEq[i]==="×"&&newEq[i+1]!=="×"&&newEq[i+1]!=="÷"&&newEq[i+1]!=="-"&&newEq[i+1]!=="+"
			&&newEq[i-1]!=="×"&&newEq[i-1]!=="÷"&&newEq[i-1]!=="-"&&newEq[i-1]!=="+") {
				var product = Number(typeof newEq[i-1]==="number"?newEq[i-1]:data[newEq[i-1]])*Number(typeof newEq[i+1]==="number"?newEq[i+1]:data[newEq[i+1]])
				newEq.splice(i-1,3,product)
				i--
			} else
			if (newEq[i]==="÷"&&newEq[i+1]!=="×"&&newEq[i+1]!=="÷"&&newEq[i+1]!=="-"&&newEq[i+1]!=="+"
			&&newEq[i-1]!=="×"&&newEq[i-1]!=="÷"&&newEq[i-1]!=="-"&&newEq[i-1]!=="+") {
				var quotient = Number(typeof newEq[i-1]==="number"?newEq[i-1]:data[newEq[i-1]])/Number(typeof newEq[i+1]==="number"?newEq[i+1]:data[newEq[i+1]])
				newEq.splice(i-1,3,quotient)
				i--
			}
		}
		for (i=1;i<newEq.length-1;i++) {
			if (newEq[i]==="+"&&newEq[i+1]!=="×"&&newEq[i+1]!=="÷"&&newEq[i+1]!=="-"&&newEq[i+1]!=="+"
			&&newEq[i-1]!=="×"&&newEq[i-1]!=="÷"&&newEq[i-1]!=="-"&&newEq[i-1]!=="+") {
				var sum = Number(typeof newEq[i-1]==="number"?newEq[i-1]:data[newEq[i-1]])+Number(typeof newEq[i+1]==="number"?newEq[i+1]:data[newEq[i+1]])
				newEq.splice(i-1,3,sum)
				i--
			} else
			if (newEq[i]==="-"&&newEq[i+1]!=="×"&&newEq[i+1]!=="÷"&&newEq[i+1]!=="-"&&newEq[i+1]!=="+"
			&&newEq[i-1]!=="×"&&newEq[i-1]!=="÷"&&newEq[i-1]!=="-"&&newEq[i-1]!=="+") {
				var difference = Number(typeof newEq[i-1]==="number"?newEq[i-1]:data[newEq[i-1]])-Number(typeof newEq[i+1]==="number"?newEq[i+1]:data[newEq[i+1]])
				newEq.splice(i-1,3,difference)
				i--
			}
		}
		return typeof newEq[0]==="number"?newEq[0]:Number(data[newEq[0]])
	}
	
	return <>
		<button style={{backgroundColor:"blue",color:"white"}} onClick={()=>{
			var eqArr=[...equation]
			eqArr.push(Object.keys(data)[0])
			setEquation(eqArr)
		}}>Add Value</button>
		<button style={{backgroundColor:"green",color:"white"}} onClick={()=>{
			var eqArr=[...equation]
			eqArr.push([])
			setEquation(eqArr)
		}}>Add Group</button>
		<button style={{backgroundColor:"beige",color:"black"}} onClick={()=>{
			var eqArr=[...equation]
			eqArr.push("+")
			setEquation(eqArr)
		}}>Add Operator</button>
		<br/><br/>
		
		{equation.map((eq,i)=>Array.isArray(eq)?<EquationGroup equation={equation} setEquation={setEquation} data={data} arr={eq} key={i} id={i}/>:eq==="×"||eq==="-"||eq==="+"||eq==="÷"?<EquationOperator equation={equation} setEquation={setEquation} data={data} operator={eq} key={i} id={i}/>:<EquationValue equation={equation} setEquation={setEquation} data={data} val={eq} key={i} id={i}/>)}
		
		<br/><br/>
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
		<Equation data={fieldData}/>
    </div>
  );
}

export default App;
