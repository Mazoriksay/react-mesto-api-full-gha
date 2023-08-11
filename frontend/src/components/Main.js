import { useContext } from 'react';
import '../index.css'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onTrashClick, onLikeClick, cards}) {
    const currentUser = useContext(CurrentUserContext);
    const cardsElements = cards.map((card) => (
        <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onTrashClick={onTrashClick}
            onLikeClick={onLikeClick}
        />
    )); 
    
    return (
        <main className="content">
            <section className="profile">
                <img src={currentUser.avatar} className="profile__avatar" alt="Аватар"/>
                <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit" type="button" onClick={onEditProfile}></button>
                    <h2 className="profile__about">{currentUser.about}</h2>
                </div>
                <button className="profile__add" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="gallery">
                <ul className="list">
                    {cardsElements}
                </ul>
            </section>
        </main>
    )
}


export default Main;