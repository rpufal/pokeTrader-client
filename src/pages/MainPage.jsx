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
    const [tradeInfo, setTradeInfo] = useState({
        user: '', 
        partner: '', 
        pokemonList: [],
        partnerPokemonList: []
        });
    const [showModal, setShowModal] = useState(false);
    
    const socket = io.connect('http://localhost:3001');
    const room = 'trade'
    socket.emit('join-room', room)
    socket.on('user', (user) => {
        if (tradeInfo.partner === '') {
            setTradeInfo({...tradeInfo, partner: user})
        }
    });
    socket.on('partnerPokemon', (updatedList) => {
        console.log(updatedList)
        setTradeInfo({...tradeInfo, partnerPokemonList: updatedList})
    });

    socket.on('readyTrade', (ready) => setShowModal(ready));
    useEffect(() => {
        return () => {
            socket.disconnect()
        }
      }, []);

    const searchPokemon = async (query) => {
        const result = await fetchPokemonByName(query)
        if (result.error) return alert('Invalid request to PokemonAPI, please make a proper request with a pokemon name. e.g. sandshrew')
        if (tradeInfo.pokemonList.length < 6) {
            const updatedList = [...tradeInfo.pokemonList, result];
            setTradeInfo({...tradeInfo, pokemonList: updatedList})   
            socket.emit('userPokemon',updatedList,room); 
        }
    };

    const removePokemon = (pokemonInfo) => {
        const updatedList = tradeInfo.pokemonList.filter((pokemon) => pokemon !== pokemonInfo);
        setTradeInfo({...tradeInfo, pokemonList: updatedList})   
        socket.emit('userPokemon',updatedList,room); 
    }
    const readyTrade = (boolean) => {
        setShowModal(boolean);
        socket.emit('readyTrade',{ready: boolean}, room)
    }


    return (
        <MainPageDisplay>
            <Header tradeInfo={tradeInfo} setTradeInfo={setTradeInfo} socket={socket}/>
            <section className="trade-station">
                <div className="user">
                    <SearchBar searchPokemon={searchPokemon}/>
                    <section className="card-list">
                        {tradeInfo.pokemonList.map((item) => <ItemCard info={item} key={item.id + new Date()}  removePokemon={removePokemon}/>)}
                    </section>
                </div>
                <div className="partner">
                    <p className="partner-status-message">
                        {`Wait for your partner to add some Pokemon`}
                    </p>
                    <section className="card-list">
                        {tradeInfo.partnerPokemonList.map((item) => <ItemCard info={item} key={item.id} removePokemon={removePokemon}/>)}
                    </section>
                </div>
            </section>
            <ConfirmButtons readyTrade={readyTrade} tradeInfo={tradeInfo}/>
            {showModal &&
            <div className={`modal-background ${showModal}`}>
                <TradeModal 
                    setShowModal={setShowModal} 
                    tradeInfo={tradeInfo} 
                    setTradeInfo={setTradeInfo}
                    socket={socket}
                />
            </div>}
        </MainPageDisplay>
    );
}

export default MainPage;