import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import {auth} from '../utils/AuthApi'
import InfoTooltip from './InfoTooltip';



function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [infoTooltipMessage, setInfoTooltipMessage] = useState({
        logo: '',
        text: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
       if (!isLoggedIn) return;
        api.getUserInfo()
        .then(res => {
            setCurrentUser(res);
        })
        .catch((err) => console.log(err));

        api.getInitialCards()
        .then((res) => {
            setCards(res)
        })
        .catch((err) => console.log(err));
        
    }, [isLoggedIn]);

    useEffect(() => {
        handleTokenCheck();
    }, []);

    const handleTokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setEmail(res.email)
                    navigate('/', {replace: true})
                }
            })
            .catch((err) => {
                setIsLoggedIn(false);
                console.log(err);
            });
        }
    }

    const handleLogin = (email) => {
        setEmail(email);
        setIsLoggedIn(true);
    }

    const signOut = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
    }

    const insertAlarm = (data) => {
        setInfoTooltipMessage(data);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleInfoTooltipOpen = () => {
        setIsInfoTooltipOpen(true);
    }

    const handleCloseAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsInfoTooltipOpen(false);
    }

    const handleCardClick = (item) => {
        setSelectedCard(item);
    }

    const handleLikeClick = (card) => {
        const isLiked = card.likes.some(i => i === currentUser._id);
        
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
    }

    const handleDeleteClick = (card) => {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((item) => item._id !== card._id));
        })
        .catch((err) => console.log(err));
    }

    const handleUpdateUser = (data) => {
        api.setProfileInfo(data)
        .then((res) => {
            setCurrentUser(res);
            handleCloseAllPopups();
        })
        .catch((err) => console.log(err));
    }

    const handleUpdateAvatar = (data) => {
        api.setAvatar(data)
        .then((res) => {
            setCurrentUser(res);
            handleCloseAllPopups();
        })
        .catch((err) => console.log(err));
    }

    const handlePlaceSubmit = (data) => {
        api.addNewCard(data)
        .then((res) => {
            setCards([res, ...cards]);
            handleCloseAllPopups();
        })
        .catch((err) => console.log(err));
    }
 

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Header onSignOut={signOut} email={email} />
                    <Routes>
                        <Route 
                            path='/'
                            element={
                                <ProtectedRoute 
                                    element={Main}
                                    onEditProfile={handleEditProfileClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    onTrashClick={handleDeleteClick}
                                    onLikeClick={handleLikeClick}
                                    cards={cards}
                                    isLoggedIn={isLoggedIn}
                                 />
                            }
                            
                        />
                        <Route 
                            path='sign-up'
                            element={<Register openInfoTooltip={handleInfoTooltipOpen} insertAlarm={insertAlarm} />}
                        />
                        <Route 
                            path='sign-in'
                            element={<Login  handleLogin={handleLogin} />}
                        />
                        <Route
                            path='*'
                            element={isLoggedIn ? <Navigate to='/' replace /> : <Navigate to='sign-in' replace/>}
                        />
                    </Routes>
                    <Footer />
                    <EditProfilePopup 
                        isOpen={isEditProfilePopupOpen} 
                        onClose={handleCloseAllPopups} 
                        onUpdateUser={handleUpdateUser} 
                    />
                    <EditAvatarPopup 
                        isOpen={isEditAvatarPopupOpen} 
                        onClose={handleCloseAllPopups} 
                        onUpdateAvatar={handleUpdateAvatar} 
                    />
                    <AddPlacePopup 
                        isOpen={isAddPlacePopupOpen} 
                        onClose={handleCloseAllPopups} 
                        onAddPlace={handlePlaceSubmit} 
                    />
                    <InfoTooltip 
                        isOpen={isInfoTooltipOpen} 
                        onClose={handleCloseAllPopups} 
                        infoTooltipMessage={infoTooltipMessage} 
                    />
                    <ImagePopup
                        card={selectedCard}
                        onClose={handleCloseAllPopups}
                        name="infoTooltip"
                    /> 
                    
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
