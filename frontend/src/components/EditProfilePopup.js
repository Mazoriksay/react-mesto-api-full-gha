import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);
    
 
    const handleNameChange = (evt) => setName(evt.target.value);
    const handleDescriptionChange = (evt) => setDescription(evt.target.value);
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
      
        onUpdateUser({
          name,
          about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            btnValue="Cохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field"> 
                <input 
                    id="name-input" 
                    className="popup__input" 
                    type="text" 
                    name="name" 
                    placeholder="Ваше имя" 
                    required={true} 
                    minLength="2" 
                    maxLength="40" 
                    value={name || ''}
                    onChange={handleNameChange}
                />
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__field">
                <input 
                    id="about-input" 
                    className="popup__input" 
                    type="text" 
                    name="about" 
                    placeholder="Чем вы занимаетесь" 
                    required={true} 
                    minLength="2" 
                    maxLength="200" 
                    value={description || ''}
                    onChange={handleDescriptionChange}
                />
                <span className="popup__input-error about-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;