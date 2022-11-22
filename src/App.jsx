//Components
import { Button2 } from './components/Button';
import { Card } from './components/Card';
//Styles
import './sass/App.scss'
//Icons
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
//Hooks
import { useState, useEffect } from 'react';

function App () {
    const [pokemonId, setPokemonId] = useState(1);
    const [pokemonEvolutions, setPokemonEvolutions] = useState([])
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        getEvolutions(pokemonId)
    },[pokemonId])

    async function getEvolutions(id) {
       const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
       const data =  await response.json()

       let pokemonEvoArray = [] 

       let pokemonLv1 = data.chain.species.name
       let pokemonLv1Img = await getPokemonImages(pokemonLv1)
       pokemonEvoArray.push([pokemonLv1,pokemonLv1Img])

       if(data.chain.evolves_to.length !== 0) {
        let pokemonLv2 = data.chain.evolves_to[0].species.name;
        let pokemonLv2Img = await getPokemonImages(pokemonLv2)
        pokemonEvoArray.push([pokemonLv2,pokemonLv2Img])
        
        if(data.chain.evolves_to[0].evolves_to.length !== 0) {
            let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
            let pokemonLv3Img = await getPokemonImages(pokemonLv3)
            pokemonEvoArray.push([pokemonLv3,pokemonLv3Img])
        }
       }
       setPokemonEvolutions(pokemonEvoArray)
    }

    async function getPokemonImages(name) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json()
        return data.sprites.other['official-artwork'].front_default
    }
    function prevClick() {
        validateButtonDisabled()
        setPokemonId(pokemonId - 1)
    }

    function nextClick() {
        validateButtonDisabled()
        setPokemonId(pokemonId +1)
    }
    function validateButtonDisabled() {
        if (pokemonId === 1) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        
    }
    return(
        <div className='app'>  
            <div className={`card-container card${pokemonEvolutions.length}`}>
                {pokemonEvolutions.map(pokemon => 
                <Card 
                    key={pokemon[0]}
                    name= {pokemon[0]}
                    img= {pokemon[1]}
                />
                )}
            </div>
            <div className='buttons-container'>
                <Button2 
                    icon={<TiArrowLeftOutline />} 
                    handleClick={prevClick}
                    disabled={disabled}
                    />
            
                <Button2 
                    icon={<TiArrowRightOutline />}
                    handleClick={nextClick } 
                    />
            </div>
        </div>

    )}

    export {App}