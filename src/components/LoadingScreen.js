import React from 'react';
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';

function LoadingScreen({ unityContext }) {

    const [LoadingStatusText, setLoadingStatusText] = useState("Loading");
    const [progression, setProgression] = useState(0);
    const [progression2, setProgression2] = useState(0);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    

      useEffect(function () {
        unityContext.on("progress", function (progression) {
          setProgression(progression);
        });
      }, []);
      useEffect(function () {
        unityContext.on("ReportLoadingStatus", function (progression) {
          setProgression2(progression);
          if (progression == 100) {
            setShowLoadingScreen(false);
          }
        });
      }, []);



      if(showLoadingScreen) {
        return (
            <div className = "LoadingScreen">
                <h1 className='text-center' >{LoadingStatusText}</h1>
                <p className='text-center' >Loading Unity: {progression * 100} percent...</p>
                <p  className='text-center'>Loading Room: {progression2} percent...</p>
            </div>
        );
      }
      return <></>
    
}

export default LoadingScreen;
