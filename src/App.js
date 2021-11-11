import "./App.css";
import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

import TopNav from "./components/TopNav"
import MainNav from "./components/MainNav"
import { Col, Row, Container, Stack } from "react-bootstrap";

const unityContext = new UnityContext({
	loaderUrl: "AppWeb/Build/AppWeb.loader.js",
	dataUrl: "AppWeb/Build/AppWeb.data",
	frameworkUrl: "AppWeb/Build/AppWeb.framework.js",
	codeUrl: "AppWeb/Build/AppWeb.wasm",
});





function App() {
	return (
		<>
			<TopNav />

			<Stack direction="horizontal" gap={3} >
			<div className="" ><MainNav /></div>
			<div className="bg-light border vh-100" ><Unity className="Unity" unityContext={unityContext} /></div>
			<div className="bg-light border vh-100 ms-auto">Third item</div>
			</Stack>
		</>
	);
}

export default App;
