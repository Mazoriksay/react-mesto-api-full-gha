import { useRef, useEffect } from "react"; 
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) { 
    const placeReferal = useRef('');
    const linkReferal = useRef('');

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onAddPlace({
            name: placeReferal.current.value,
            link: linkReferal.current.value
        });
    }

    useEffect(() => {
        placeReferal.current.value = '';
        linkReferal.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="card"
            title="Новое Место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            btnValue="Создать"
        >
            <label className="popup__field">
                <input 
                    id="place-input" 
                    className="popup__input" 
                    type="text" 
                    name="name" 
                    placeholder="Название" 
                    required 
                    minLength="2" 
                    maxLength="30" 
                    ref={placeReferal}
                />
                <span className="popup__input-error place-input-error"></span>
            </label>
            <label className="popup__field">
                <input 
                    id="link-input-img" 
                    className="popup__input" 
                    type="url" 
                    name="link" 
                    placeholder="Ссылка на картинку" 
                    required={true} 
                    minLength="1"
                    ref={linkReferal} 
                />
                <span className="popup__input-error link-input-img-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;