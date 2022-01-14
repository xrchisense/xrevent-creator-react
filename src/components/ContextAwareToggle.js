import { useContext } from "react";
import { useAccordionButton, Row, Col } from "react-bootstrap";
import AccordionContext from 'react-bootstrap/AccordionContext';

function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" type="button" style={{ transform: isCurrentEventKey ? 'rotate(180deg)' : 'rotate(90deg)' }}
                onClick={decoratedOnClick} width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
            {'   ' + children}
        </>
    );
}

export default ContextAwareToggle;