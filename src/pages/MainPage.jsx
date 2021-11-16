import React, {useState, useEffect}from 'react';
import io from 'socket.io-client';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import TradeModal from '../components/TradeModal';
import { fetchPokemonByName } from '../services/pokemonApi';
import { MainPageDisplay } from './styles/MainPageDisplay';
import ConfirmButtons from '../components/ConfirmButtons';

function MainPage() {
    const [user ,setUser] = useState('');
    const [partner ,setPartner] = useState('');
    const [pokemonList ,setPokemonList] = useState([]);
    const [partnerPokemonList ,setPartnerPokemonList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // eslint-disable-next-line no-undef
    const socket = io.connect(process.env.REACT_APP_API_URL);
    socket.on('user', (username) => {
        if (user !== username) {
            setPartner(username)
        }
    });
    socket.on('partnerPokemon', ({updatedList, username}) => {
        if (username !== user) {
            setPartnerPokemonList(updatedList)
        }
    });

    socket.on('readyTrade', (ready) => {
        if (ready) {
            setShowModal(ready)
            return;
        }
        closeModal();
    });
    useEffect(() => {
        return () => {
            socket.disconnect()
        }
      }, []);

    const searchPokemon = async (query) => {
        const result = await fetchPokemonByName(query)
        if (result.error) return alert('Invalid request to PokemonAPI, please make a proper request with a pokemon name. e.g. sandshrew')
        if (pokemonList.length < 6) {
            const updatedList = [...pokemonList, result];
            setPokemonList(updatedList)   
            socket.emit('userPokemon',updatedList, user); 
        }
    };
    const closeModal = () => {
        setPartner('');
        setUser('');
        setPokemonList([]);
        setPartnerPokemonList([]);
        setShowModal(false);
    }
    const removePokemon = (pokemonInfo) => {
        const updatedList = pokemonList.filter((pokemon) => pokemon !== pokemonInfo);
        setPokemonList(updatedList)   
        socket.emit('userPokemon',updatedList, user); 
    }
    const readyTrade = (boolean) => {
        setShowModal(boolean);
        socket.emit('readyTrade',{ready: boolean})
    }


    return (
        <MainPageDisplay>
            <Header user={user} setUser={setUser} socket={socket} partner={partner}/>
            <section className="trade-station">
                <div className="user">
                    <SearchBar searchPokemon={searchPokemon}/>
                    <section className="card-list">
                        {pokemonList.map((item) => <ItemCard info={item} key={item.id + new Date()}  removePokemon={removePokemon}/>)}
                    </section>
                </div>
                <div className="partner">
                    <p className="partner-status-message">
                        {`Wait for your partner to add some Pokemon`}
                    </p>
                    <section className="card-list">
                        {partnerPokemonList.map((item) => <ItemCard info={item} key={item.id} removePokemon={removePokemon}/>)}
                    </section>
                </div>
            </section>
            <ConfirmButtons readyTrade={readyTrade}/>
            {showModal &&
            <div className={`modal-background ${showModal}`}>
                <TradeModal 
                    closeModal={closeModal} 
                    user={user}
                    partner={partner}
                    pokemonList={pokemonList}
                    partnerPokemonList={partnerPokemonList}
                    setUser={setUser}
                    setPokemonList={setPokemonList}
                    setPartner={setPartner}
                    setPartnerPokemonList={setPartnerPokemonList} 
                    // setTradeInfo={setUser, setPokemonList, setPartnerPokemonList, setPartner}
                    socket={socket}
                />
            </div>}
        </MainPageDisplay>
    );
}

export default MainPage;