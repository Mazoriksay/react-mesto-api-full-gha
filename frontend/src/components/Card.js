import { useContext }from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onTrashClick, onLikeClick}) {
    const currentUser = useContext(CurrentUserContext);
    
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = ( 
        `list__like ${isLiked && 'list__like_active'}` 
      );

    const handleCardClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onLikeClick(card)
    }

    const handleDeleteClick = () => {
        onTrashClick(card)
    }

    
    return (
        <li className="list__card">
            {isOwn && <button className="list__remove" type="button" onClick={handleDeleteClick} />}
            <button className="list__button-image" type="button" onClick={handleCardClick}><img className="list__image" src={card.link} alt={card.name}/></button>
            <div className="list__container">
                <h2 className="list__text">{card.name}</h2>
                <div className="list__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="list__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li> 
    )
}

export default Card;