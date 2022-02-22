import React from 'react';
import { useState, useEffect, useRef } from "react";


function LoadingScreen({ unityContext }) {

    const [LoadingStatusText, setLoadingStatusText] = useState("Loading");
    const [progression, setProgression] = useState(0);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [opacity, setOpacity] = useState(1);
    
    
    useEffect(function () {
        unityContext.on("progress", function (progress) {
            setProgression(progress);
            
            if (progress >= 1) {
                setTimeout(() => setOpacity(0), 2700);
                setTimeout(() => setShowLoadingScreen(false), 3400);
            }
        });
    }, []);

    
      
    return (
        <>
            {showLoadingScreen &&
            <>
                <div className = "LoadingScreen" style={{transition: `opacity 700ms ease-in-out`, opacity: opacity}}>
               
                    <div class="circle">
                        <svg id="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000">
                            <g id="Gruppe_93" data-name="Gruppe 93">
                            <path id="Pfad_3" data-name="Pfad 3" class="cls-1" d="M777.9,935.2,1000,643.4l222.1,291.8Zm317.68-62.7L1000,746.94,904.44,872.5Z" />
                            <path id="Pfad_4" data-name="Pfad 4" class="cls-1" d="M1197.78,923.13H802.24L1000,663.31ZM880.1,884.55h239.82L1000,727Z" />
                            </g>
                        </svg>
                    </div>
                    

                    <div class="cross">
                        <svg id="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000">
                            <g id="Gruppe_97" data-name="Gruppe 97">
                            <g id="Gruppe_91" data-name="Gruppe 91">
                                <rect id="Rechteck_17" data-name="Rechteck 17" class="cls-1" x="968.65" y="976.88" width="62.7" height="418.9" transform="translate(-545.97 1054.58) rotate(-45)" />
                                <rect id="Rechteck_18" data-name="Rechteck 18" class="cls-1" x="980.72" y="988.94" width="38.58" height="394.78" transform="translate(-545.97 1054.58) rotate(-45)" />
                            </g>
                            <g id="Gruppe_92" data-name="Gruppe 92">
                                <rect id="Rechteck_19" data-name="Rechteck 19" class="cls-1" x="790.55" y="1154.98" width="418.9" height="62.7" transform="translate(-545.97 1054.58) rotate(-45)" />
                                <rect id="Rechteck_20" data-name="Rechteck 20" class="cls-1" x="802.62" y="1167.04" width="394.78" height="38.58" transform="translate(-545.97 1054.58) rotate(-45)" />
                            </g>
                            </g>
                        </svg>
                    </div>

                    <h1 className='loadingBarText' >{LoadingStatusText}</h1>
                    <p className='loadingBarText' style={{marginTop: '40px' }}>Progress: {(progression * 100).toFixed(2)} %</p>
                

                </div>

            </>
            }
        </>
    )     
}
export default LoadingScreen;
