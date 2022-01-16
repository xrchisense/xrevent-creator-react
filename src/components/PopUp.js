import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from "react";


function PopUp({unityContext,showPopUpState,setShowPopUpState}) {

  const handleButton0 = () => {
    unityContext.send("LevelManager", "PopUpFeedback",0)
  setShowPopUpState(false);
}
    const handleButton1 = () => {
      unityContext.send("LevelManager", "PopUpFeedback",1)
    setShowPopUpState(false);
  }
    const handleButton2 = () => {
      unityContext.send("LevelManager", "PopUpFeedback",2)
      setShowPopUpState(false);
    }
    const handleButton3 = () => {
      unityContext.send("LevelManager", "PopUpFeedback",3)
      setShowPopUpState(false);
    }
    
    
    

    const [showX,setShowX] = useState(true);
    const [PopUpTitle,setPopUpTitle] = useState("Default Title");
    const [PopUpBody,setPopUpBody] = useState("Default Text");
    const [PopUpButton1,setPopUpButton1] = useState(["Default",handleButton1,"primary"]);
    const [PopUpButton2,setPopUpButton2] = useState(["Default",handleButton2,"secondary"]);
    const [PopUpButton3,setPopUpButton3] = useState(["null",handleButton3,"secondary"]);

    useEffect(function () {
      unityContext.on("ShowPopup", function (TitelString, BodyTextString,Button1Text,Button2Text,Button3Text,showX) {
          console.log("recieved 'PopUpInfo' From Unity");
          setPopUpTitle(TitelString);
          setPopUpBody(BodyTextString);
          PopUpButton1[0] = Button1Text;
          PopUpButton2[0] = Button2Text;
          PopUpButton3[0] = Button3Text;
          setShowX(showX);
          setShowPopUpState(true);
      });
  }, []);
    

    

    var PopUpButtonArray = [PopUpButton1,PopUpButton2,PopUpButton3];

    return (
      <>
        
        <Modal
          show={showPopUpState}
          onHide={handleButton0}
          backdrop="static"
          keyboard={false}
        >
          {showX == false &&
            <Modal.Header >
              <Modal.Title>{PopUpTitle}</Modal.Title>
            </Modal.Header>
          }
          {showX == true &&
            <Modal.Header closeButton>
              <Modal.Title>{PopUpTitle}</Modal.Title>
            </Modal.Header>
          }
          <Modal.Body>
            {PopUpBody}
          </Modal.Body>
          <Modal.Footer>
            <CustomButton ButtonArray = {PopUpButtonArray}/>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default PopUp

function CustomButton({ButtonArray}) {
    
    return (<>
        {ButtonArray[0][0] != "null" && 
            <Button variant={ButtonArray[0][2]} onClick={ButtonArray[0][1]}>{ButtonArray[0][0]}</Button>}
        {ButtonArray[1][0] != "null" && 
            <Button variant={ButtonArray[1][2]} onClick={ButtonArray[1][1]}>{ButtonArray[1][0]}</Button>}
        {ButtonArray[2][0] != "null" && 
            <Button variant={ButtonArray[2][2]} onClick={ButtonArray[2][1]}>{ButtonArray[2][0]}</Button>}
        </>)
    
}