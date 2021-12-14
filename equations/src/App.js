import logo from './logo.svg';
import {useEffect,useState} from 'react';
import './App.css';

function EditorControls(p) {
	const {equation,setEquation,id} = p
	return <>
	{id>0&&<span className="mouseover" style={{position:"absolute",bottom:0,left:0}} onClick={()=>{
		var eqArr = [...equation]
		var oldVal = eqArr[id-1]
		eqArr[id-1] = eqArr[id]
		eqArr[id] = oldVal
		setEquation(eqArr)
	}}>{"<"}</span>}
	{id<equation.length-1&&<span className="mouseover" style={{position:"absolute",bottom:0,right:0}} onClick={()=>{
		var eqArr = [...equation]
		var oldVal = eqArr[id+1]
		eqArr[id+1] = eqArr[id]
		eqArr[id] = oldVal
		setEquation(eqArr)
	}}>{">"}</span>}
	<span className="mouseover exit" style={{position:"absolute",top:0,right:0}} onClick={()=>{
		var eqArr = [...equation]
		eqArr.splice(id,1)
		setEquation(eqArr)
	}}>{"x"}</span>
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
			{arr.map((eq,i)=>Array.isArray(eq)?<EquationGroup equation={myArr} setEquation={setMyArr} data={data} arr={eq} key={i} id={i}/>:eq==="×"||eq==="-"||eq==="+"||eq==="÷"||eq==="^"?<EquationOperator equation={myArr} setEquation={setMyArr} data={data} operator={eq} key={i} id={i}/>:<EquationValue equation={myArr} setEquation={setMyArr} data={data} val={eq} key={i} id={i}/>)}
		</div>
		<EditorControls equation={equation} setEquation={setEquation} id={id}/>
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
	
	return <div style={{position:"relative",display:"inline-block",paddingLeft:"12px",paddingRight:"12px",paddingTop:"10px"}}><select style={{fontSize:"24px"}} value={op} defaultValue={operator} onChange={(ev)=>{setOp(ev.currentTarget.value)}}>
		{["+","-","×","÷","^"].map((sign)=><option key={sign} value={sign}>{sign}</option>)}
	</select>
	<EditorControls equation={equation} setEquation={setEquation} id={id}/>
	</div>
}

function EquationValue(p) {
	const {equation,setEquation,data,val,key,id} = p
	
	const [item,setItem] = useState(val)
	
	useEffect(()=>{
		var eqArr = [...equation]
		eqArr[id] = item
		setEquation(eqArr)
	},[item])
	
	return <div style={{position:"relative",display:"inline-block",border:"1px solid black",paddingTop:"16px"}}>
	<select value={item} defaultValue={val} onChange={(ev)=>{setItem(ev.currentTarget.value)}}>
		{Object.keys(data).map((key)=><option key={key} value={key}>{key}</option>)}
	</select>
	<br/>
	{data[val]}
	<EditorControls equation={equation} setEquation={setEquation} id={id}/>
	</div>
}

function Equation(p) {
	const {data} = p
	const [equation,setEquation]=useState([["atk"],"×","elementalBonus"])
	
	function SolveEquation(eq) {
		var newEq = [...eq]
		//Parenthesis.
		for (var i=0;i<newEq.length;i++) {
			if (Array.isArray(newEq[i])) {
				newEq.splice(i,1,SolveEquation(newEq[i]))
			}
		}
		//Exponents first.
		for (i=1;i<newEq.length-1;i++) {
			if (newEq[i]==="^"&&newEq[i+1]!=="×"&&newEq[i+1]!=="÷"&&newEq[i+1]!=="-"&&newEq[i+1]!=="+"&&newEq[i+1]!=="^"
			&&newEq[i-1]!=="×"&&newEq[i-1]!=="÷"&&newEq[i-1]!=="-"&&newEq[i-1]!=="+"&&newEq[i-1]!=="^") {
				var result = Math.pow(Number(typeof newEq[i-1]==="number"?newEq[i-1]:data[newEq[i-1]]),Number(typeof newEq[i+1]==="number"?newEq[i+1]:data[newEq[i+1]]))
				newEq.splice(i-1,3,result)
				i--
			}
		}
		//Multiplication and Division next.
		for (i=1;i<newEq.length-1;i++) {
			if (newEq[i]==="×"&&newEq[i+1]!=="×"&&newEq[i+1]!=="÷"&&newEq[i+1]!=="-"&&newEq[i+1]!=="+"&&newEq[i+1]!=="^"
			&&newEq[i-1]!=="×"&&newEq[i-1]!=="÷"&&newEq[i-1]!=="-"&&newEq[i-1]!=="+"&&newEq[i-1]!=="^") {
				var product = Number(typeof newEq[i-1]==="number"?newEq[i-1]:data[newEq[i-1]])*Number(typeof newEq[i+1]==="number"?newEq[i+1]:data[newEq[i+1]])
				newEq.splice(i-1,3,product)
				i--
			} else
			if (newEq[i]==="÷"&&newEq[i+1]!=="×"&&newEq[i+1]!=="÷"&&newEq[i+1]!=="-"&&newEq[i+1]!=="+"&&newEq[i+1]!=="^"
			&&newEq[i-1]!=="×"&&newEq[i-1]!=="÷"&&newEq[i-1]!=="-"&&newEq[i-1]!=="+"&&newEq[i-1]!=="^") {
				var quotient = Number(typeof newEq[i-1]==="number"?newEq[i-1]:data[newEq[i-1]])/Number(typeof newEq[i+1]==="number"?newEq[i+1]:data[newEq[i+1]])
				newEq.splice(i-1,3,quotient)
				i--
			}
		}
		for (i=1;i<newEq.length-1;i++) {
			if (newEq[i]==="+"&&newEq[i+1]!=="×"&&newEq[i+1]!=="÷"&&newEq[i+1]!=="-"&&newEq[i+1]!=="+"&&newEq[i+1]!=="^"
			&&newEq[i-1]!=="×"&&newEq[i-1]!=="÷"&&newEq[i-1]!=="-"&&newEq[i-1]!=="+"&&newEq[i-1]!=="^") {
				var sum = Number(typeof newEq[i-1]==="number"?newEq[i-1]:data[newEq[i-1]])+Number(typeof newEq[i+1]==="number"?newEq[i+1]:data[newEq[i+1]])
				newEq.splice(i-1,3,sum)
				i--
			} else
			if (newEq[i]==="-"&&newEq[i+1]!=="×"&&newEq[i+1]!=="÷"&&newEq[i+1]!=="-"&&newEq[i+1]!=="+"&&newEq[i+1]!=="^"
			&&newEq[i-1]!=="×"&&newEq[i-1]!=="÷"&&newEq[i-1]!=="-"&&newEq[i-1]!=="+"&&newEq[i-1]!=="^") {
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
		
		{equation.map((eq,i)=>Array.isArray(eq)?<EquationGroup equation={equation} setEquation={setEquation} data={data} arr={eq} key={i} id={i}/>:eq==="×"||eq==="-"||eq==="+"||eq==="÷"||eq==="^"?<EquationOperator equation={equation} setEquation={setEquation} data={data} operator={eq} key={i} id={i}/>:<EquationValue equation={equation} setEquation={setEquation} data={data} val={eq} key={i} id={i}/>)}
		
		<br/><br/>
		<h1>{SolveEquation(equation).toFixed(2)}</h1>
	</>
}

function EditBox(p) {
	const {val,setVal} = p
	
	const [v,setV] = useState(val)
	
	useEffect(()=>{
		setVal(v)
	},[v])
	
	return <input type="text" value={v} defaultValue={val} onChange={(ev)=>{setV(ev.currentTarget.value)}}/>
}

function ValueEditor(p) {
	const {lv,setLv,atk,setAtk,def,setDef,elementalBonus,setElementalBonus} = p
	
	return <><b>LV</b> <EditBox val={lv} setVal={setLv}/><br/>
	<b>ATK</b> <EditBox val={atk} setVal={setAtk}/><br/>
	<b>ENEMY DEF</b> <EditBox val={def} setVal={setDef}/><br/>
	<b>ENEMY ELEMENTAL BONUS</b> <EditBox val={elementalBonus} setVal={setElementalBonus}/><br/>
	</>
}

function App() {
	const [lv,setLv] = useState(4)
	const [atk,setAtk] = useState(84)
	const [def,setDef] = useState(16)
	const [elementalBonus,setElementalBonus] = useState(0.4)
	
  return (
    <div className="App">
		<ValueEditor lv={lv} setLv={setLv} atk={atk} setAtk={setAtk} def={def} setDef={setDef} elementalBonus={elementalBonus} setElementalBonus={setElementalBonus}/>
		<hr/>
		<Equation data={{lv:lv,atk:atk,def:def,elementalBonus:elementalBonus}}/>
    </div>
  );
}

export default App;
