/* eslint-disable no-unused-vars */
import React, {useState, useEffect,useCallback,useMemo}from 'react';
import io from 'socket.io-client';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import TradeModal from '../components/TradeModal';
import { MainPageDisplay } from './styles/MainPageDisplay';
import ConfirmButtons from '../components/ConfirmButtons';

function MainPage() {
    const [user ,setUser] = useState();
    const [partner ,setPartner] = useState();
    const [pokemonList ,setPokemonList] = useState();
    const [partnerPokemonList ,setPartnerPokemonList] = useState();
    const [showModal, setShowModal] = useState(false);
    // eslint-disable-next-line no-undef
    const socket = useMemo(()=>{ return io.connect(process.env.REACT_APP_API_URL)},[]);
    const roomid = 123;


    const handlerAddUser = (user)=>
    {
        socket.emit('join', ({roomid,user}));
        setUser(user)
    }
    const handlerAddPokemonToList = (pokemon) => {
        const updatedList = pokemonList ? [...pokemonList, pokemon] : [pokemon]
        setPokemonList(updatedList)
        socket.emit("updateList",{roomid,updatedList})
    }
    socket.on("new_user",({user})=>{
        setPartner(user)
    }) 
    socket.on("updateList",(({updatedList})=>{
        setPartnerPokemonList(updatedList)
    }));

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
        socket.emit("updateList",{roomid,updatedList})
    }
    const readyTrade = (boolean) => {
        setShowModal(boolean);
        socket.emit('readyTrade',{ready: boolean, roomid})
    }


    return (
        <MainPageDisplay>
            <Header user={user} setUser={handlerAddUser} partner={partner}/>
            <section className="trade-station">
                <div className="user">
                    <SearchBar  onSubmit={handlerAddPokemonToList} pokemonList={pokemonList} />
                    <section className="card-list">
                        {pokemonList && pokemonList.map((item) => <ItemCard info={item} key={item.id + new Date()}  removePokemon={removePokemon}/>)}
                    </section>
                </div>
                <div className="partner">
                    <p className="partner-status-message">
                        {`Wait for your partner to add some Pokemon`}
                    </p>
                    <section className="card-list">
                        {partnerPokemonList && partnerPokemonList.map((item) => <ItemCard info={item} key={item.id+ new Date()} removePokemon={removePokemon}/>)}
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
                    // setUser={setUser}
                    // setPokemonList={setPokemonList}
                    // setPartner={setPartner}
                    // setPartnerPokemonList={setPartnerPokemonList} 
                    // setTradeInfo={setUser, setPokemonList, setPartnerPokemonList, setPartner}
                    socket={socket}
                />
            </div>}
        </MainPageDisplay>
    );
}

export default MainPage;