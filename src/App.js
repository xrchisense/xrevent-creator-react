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

	

	return (
		<>
			<TopNav />

			<Stack direction="horizontal" gap={3} >

			<div className="" >
				<MainNav unityContext = {unityContext}></MainNav></div>
			<div className="bg-light border vh-100" >
				<Unity className="Unity" unityContext={unityContext} /></div>
			<div className="bg-light border vh-100 ms-auto">
				Third item</div>
				
			</Stack>
		</>
	);
}

export default App;
