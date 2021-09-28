import React from 'react';
import "../../App.css";

const PopUpDialog = (props) => {
    const {
        open,
        onClose = () => {}
    } = props;

    const closeOnEscKeyDown = React.useCallback((e) => {
        if ((e.charCode || e.keyCode === 27)) {
            onClose();
        }
    }, [onClose])

    React.useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscKeyDown);
        return function cleanUp() {
            document.body.removeEventListener('keydown', closeOnEscKeyDown)
        }
    }, [closeOnEscKeyDown]);

    if(!open) return null;


    return (
        <div className="modal" onClick={onClose} onKeyDown={(e) => {window.alert(e.key)}}>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default PopUpDialog
