import "./App.css";
import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

import TopNav from "./components/TopNav"
import MainNav from "./components/MainNav"
import { Stack } from "react-bootstrap";

const unityContext = new UnityContext({
	loaderUrl: "appweb/Build/appweb.loader.js",
	dataUrl: "appweb/Build/appweb.data",
	frameworkUrl: "appweb/Build/appweb.framework.js",
	codeUrl: "appweb/Build/appweb.wasm",
});


function App() {

	const[fileNames, setFileNames] = useState([])

	useEffect(() =>{
		const getFileNames = async () =>{
			const fileNamesFromServer = await getFileListFromServer()
			const responseString = await fileNamesFromServer.slice(0,-1); // remove last colon
    		const itemArray = await responseString.split(",");
			await setFileNames(itemArray)
			
		}
		getFileNames()
	}, [])

	// Fetch Filenames from Server
	const getFileListFromServer = async () => {
		const response = await fetch('/upload/dir.php?UID=0f8fad5b-d9cb-469f-a165-70867728950e/items');
		const fileListString = await response.text();
		return fileListString
	}

	return (
		<>
			<TopNav />

			<Stack direction="horizontal" gap={3} >

			<div className="" >
				<MainNav fileNames={fileNames} unityContext = {unityContext}></MainNav></div>
			<div className="bg-light border vh-100" >
				<Unity className="Unity" unityContext={unityContext} /></div>
			<div className="bg-light border vh-100 ms-auto">
				Third item</div>
				
			</Stack>
		</>
	);
}

export default App;
