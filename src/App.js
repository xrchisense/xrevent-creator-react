import "./App.css";
import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

import TopNav from "./components/TopNav"
import MainNav from "./components/MainNav"
import { Stack } from "react-bootstrap";
import Inspector from "./components/Inspector";

const unityContext = new UnityContext({
	loaderUrl: "appweb/Build/appweb.loader.js",
	dataUrl: "appweb/Build/appweb.data",
	frameworkUrl: "appweb/Build/appweb.framework.js",
	codeUrl: "appweb/Build/appweb.wasm",
});

export const IdbContext = React.createContext(); // ToDo: Shift the Context to a seperate provider.js

function App() {
	const [currentRoomId, setCurrentRoomId] = useState("");

	//prevent middle MouseClick:
	document.body.onmousedown = function(e) { if (e.button === 1) return false; }

	return (
		<>
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
				<Inspector unityContext={unityContext}></Inspector>
			</div>
			
			</Stack>
		</>
	);
}

export default App;
