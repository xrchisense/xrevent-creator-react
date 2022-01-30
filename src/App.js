import "./App.css";
import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

import TopNav from "./components/TopNav"
import MainNav from "./components/MainNav"
import { Stack } from "react-bootstrap";
import Inspector from "./components/Inspector/Inspector";
import PopUp from "./components/PopUp";
import LoadingScreen from "./components/LoadingScreen";

const unityContext = new UnityContext({
	loaderUrl: process.env.PUBLIC_URL + "/appweb/Build/appweb.loader.js",
	dataUrl: process.env.PUBLIC_URL + "/appweb/Build/appweb.data",
	frameworkUrl: process.env.PUBLIC_URL + "/appweb/Build/appweb.framework.js",
	codeUrl: process.env.PUBLIC_URL + "/appweb/Build/appweb.wasm",
});

export const IdbContext = React.createContext(); // ToDo: Shift the Context to a seperate provider.js

function App() {
	const [currentRoomId, setCurrentRoomId] = useState("");
	const [showPopUp,setPopUpState] = useState(false);
	const [showLoadingScreen,setLoadingScreenState] = useState(false);

	//prevent middle MouseClick:
	document.body.onmousedown = function(e) { if (e.button === 1) return false; }

	useEffect(() =>{
		document.addEventListener('mousedown', setWebGLKeyboardCapture)

		return () => {document.removeEventListener('mousedown', setWebGLKeyboardCapture)}
	},[])
	
	
	const setWebGLKeyboardCapture = (e) => {
		//console.log(e.target.id)
		if(e.target.id === "unity-canvas-1"){
			unityContext.send("LevelManager", "SetKeyboardCapture", "1")	
		} else {
			unityContext.send("LevelManager", "SetKeyboardCapture", "0")			
		}
	}

	return (
		<>
			<PopUp unityContext = {unityContext} showPopUpState={showPopUp} setShowPopUpState={setPopUpState}/>
			<LoadingScreen unityContext={unityContext}/>
			<IdbContext.Provider value={{currentRoomId, setCurrentRoomId}}>
				<TopNav unityContext={unityContext}/>
			</IdbContext.Provider>

			<Stack direction="horizontal" gap={3} >
			<div className="" style={{minWidth: 330, width: '20vw'}} >
				<IdbContext.Provider value={{currentRoomId, setCurrentRoomId}}>
					<MainNav unityContext={unityContext}></MainNav>
				</IdbContext.Provider>
			</div>
			<div className="bg-light border" style={{height: 'calc(100vh - 4rem)'}} >
				<Unity className="Unity" unityContext={unityContext} />
			</div>
			<div className="bg-light border ms-auto" style={{minWidth: 280, width:'20vw', height: 'calc(100vh - 4rem)'}}>
				<Inspector unityContext={unityContext} tabIndex={1} setPopUpState={setPopUpState}></Inspector>
			</div>
			
			</Stack>
		</>
	);
}

export default App;
