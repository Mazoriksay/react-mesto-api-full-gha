import React from 'react';

function PopupWithForm({name, title, children, btnValue, isOpen, onClose, onSubmit}) {
    return (
        <div className={`popup popup_type_${name}`+ (isOpen ? " popup_opened" : "")}>
            <div className={"popup__form-container" + (name==="avatar" ? " popup-avatar" : "") + (name==="delete" ? " popup-delete" : "")} >
                <button className="popup__button-close" type="button" onClick={onClose}></button>
                <h2 className="popup__text">{title}</h2>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                    <input className="popup__button-save" id={`${name}-btn`} type="submit" value={btnValue} />
                </form>
            </div>
        </div>
    )   
}

export default PopupWithForm;