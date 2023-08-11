import React from 'react';

function ImagePopup({card, onClose}) {
    return(
        <div className={`popup photo popup_type_photo`+ (card ? " popup_opened" : "")}>
            <div className="popup__photo-container">
                <button className="popup__button-close" type="button" onClick={onClose}></button>
                <img className="popup__image" src={card ? card.link : ""} alt={card ? card.name : ""} />
                <p className="popup__photo-text">{card ? card.name : ""}</p>
            </div>
        </div>
    )
}

export default ImagePopup;