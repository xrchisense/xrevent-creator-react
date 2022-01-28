import { useState, useEffect } from "react";
import { Dropdown, DropdownButton, CustomButton, FormControl } from "react-bootstrap";
import React from "react";

function SkyboxSelecter({unityContext}){

    const [skyboxNames, setSkyboxNames] = useState([])
  
	useEffect( function() {
        unityContext.on("SkyboxList", function (SkyboxList) {
            console.log(SkyboxList);
            if(SkyboxList !== ""){
    		    const itemArray = SkyboxList.split("|");
			    setSkyboxNames(itemArray)
			    console.log('list updated' + itemArray)
            }
        });
	}, []);

    // Get Data for the Skybox dropdown
    function getSkyBoxList(){
         unityContext.send("LevelManager", "getSkyBoxList");
    }
    
    useEffect(() =>{

    }, [skyboxNames]);

    function handleSkySelect(e){
        unityContext.send("LevelManager", "setSkybox", e);
        console.log(e)
    }


    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            getSkyBoxList();  
            e.preventDefault();
            onClick(e);
          }}
          className="border text-reset" style={{ background: "white", textDecoration: "none", boxShadow: "none",  height: "30px" , paddingLeft: "55px", paddingRight: "55px", marginBottom: "30px" }}
        
        
        >
          {children}
         
        </a>
      ));
      
      // forwardRef again here!
      // Dropdown needs access to the DOM of the Menu to measure it
      const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
                
          return (
            <div
              ref={ref}
              style={{marginBottom: "30px"}}
              className={className}
              aria-labelledby={labeledBy}
            >
             
                <ul className="list-unstyled" 
                onClick={(e) => {
                handleSkySelect(e.target.getAttribute('value'));  
                e.preventDefault();
                }}
               
                
                >

                {React.Children.toArray(children)}
              </ul>
            </div>
          );
        },
      );
    

    return(
        <>
         <Dropdown>
                <Dropdown.Toggle as={CustomToggle} >
                    Select Skybox
                </Dropdown.Toggle>

               
                    <Dropdown.Menu as={CustomMenu} >
                        { skyboxNames.map((item) => (
                            <Dropdown.Item value={item.toString()}>{item.toString()}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
        </Dropdown>
            
        </>
    );
}

export default SkyboxSelecter