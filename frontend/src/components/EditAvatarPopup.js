import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarReferal = useRef('');
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarReferal.current.value,
        });

    }

    useEffect(() => {
        avatarReferal.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить Аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            btnValue="Сохранить"
        >
            <label className="popup__field">
                <input 
                    id="link-input-avatar" 
                    className="popup__input" 
                    type="url" 
                    name="avatar" 
                    placeholder="Ссылка на картинку" 
                    required={true} 
                    minLength="1"
                    ref={avatarReferal}

                />
                <span className="popup__input-error link-input-avatar-error"></span>
            </label>   
        </PopupWithForm>
    )
}

export default EditAvatarPopup;