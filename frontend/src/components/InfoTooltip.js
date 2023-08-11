import React from "react";


function InfoTooltip({ isOpen, onClose, infoTooltipMessage, name}) {
    return (
        <div className={`popup popup_type_${name}`+ (isOpen ? " popup_opened" : "")}>
            <div className={"popup__form-container" + (name==="avatar" ? " popup-avatar" : "") + (name==="delete" ? " popup-delete" : "")}>
                <button className="popup__button-close" type="button" onClick={onClose}></button>
                <img className='popup__auth-image' src={infoTooltipMessage.logo} alt={infoTooltipMessage.text} />
                <h2 className="popup__auth-text">{infoTooltipMessage.text}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;