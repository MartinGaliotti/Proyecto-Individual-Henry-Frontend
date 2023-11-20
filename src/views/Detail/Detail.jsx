import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import URL from "../../helpers/URL";
import Styles from "./Detail.module.css";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import BackToLanding from "../../components/BackToLanding/BackToLanding";

const Detail = (props) => {
  const [pokemon, setPokemon] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams(); // Obtiene el id del pokemon mediante los params de la url actual

  const getCharacter = async () => {
    try {
      const response = await axios.get(`${URL.BaseUrl}${URL.Pokemons}/${id}`); // Pide el pokemon usando el id al back
      const { data } = response;
      setPokemon(data); // Si lo encontro lo guarda en el estado local
    } catch (error) {
      const { message } = error;
      setError(message); // Sino guarda el error
    }
  };

  useEffect(() => {
    getCharacter(); // Cuando se inicia el componente ejecuta la función
  }, [id]);

  const statsRender = () => {
    // Renderiza las estadisticas que disponga el pokemon
    return (
      <ul className={Styles.statsList}>
        {/*  */}
        <li className={Styles.stat}>
          <label htmlFor="hp" className={Styles.textStat}>
            Vida: {pokemon.hp}
          </label>
          <input
            readOnly
            value={pokemon.hp}
            max="255"
            min="1"
            step="1"
            type="range"
            name="hp"
            className={Styles.input}
          />
        </li>
        {/*  */}
        <li className={Styles.stat}>
          <label htmlFor="attack" className={Styles.textStat}>
            Ataque:{pokemon.attack}
          </label>
          <input
            value={pokemon.attack}
            readOnly
            max="255"
            min="1"
            type="range"
            name="attack"
            className={Styles.input}
          />
        </li>
        {/*  */}
        <li className={Styles.stat}>
          <label htmlFor="defense" className={Styles.textStat}>
            Defensa:{pokemon.defense}
          </label>
          <input
            value={pokemon.defense}
            readOnly
            max="255"
            min="1"
            step="1"
            type="range"
            name="defense"
            className={Styles.input}
          />
        </li>
        {/*  */}
        {pokemon.speed !== 0 && (
          <li className={Styles.stat}>
            <label htmlFor="speed" className={Styles.textStat}>
              Velocidad:{pokemon.speed}
            </label>
            <input
              value={pokemon.speed}
              readOnly
              max="150"
              min="0"
              step="1"
              type="range"
              name="speed"
              className={Styles.input}
            />
          </li>
        )}
        {/*  */}
        {pokemon.height !== 0 && (
          <li className={Styles.stat}>
            <label htmlFor="height" className={Styles.textStat}>
              Altura:{pokemon.height}
            </label>
            <input
              value={pokemon.height}
              readOnly
              max="50"
              min="0"
              step="0.1"
              type="range"
              name="height"
              className={Styles.input}
            />
          </li>
        )}
        {/*  */}
        {pokemon.weight !== 0 && (
          <li className={Styles.stat}>
            <label htmlFor="weight" className={Styles.textStat}>
              Peso:{pokemon.weight}
            </label>
            <input
              value={pokemon.weight}
              readOnly
              max="1000"
              min="0"
              step="1"
              type="range"
              name="weight"
              className={Styles.input}
            />
            {/*  */}
          </li>
        )}
      </ul>
    );
  };

  const pokemonRender = () => {
    // Renderiza los datos del pokemon
    if (pokemon.image) {
      return (
        <div className={Styles.pokemonContainer}>
          <h2 className={Styles.id}>{pokemon.id}</h2>
          <h1 className={Styles.name}>{pokemon.name.toUpperCase()}</h1>
          <div className={Styles.imageContainer}>
            <img src={pokemon.image} alt="POKEMON" className={Styles.image} />
            {statsRender()}
          </div>
          <h4 className={Styles.typesTitle}>TIPOS</h4>
          <ul className={Styles.types}>
            {pokemon.types.map((type, id) => {
              return (
                <li key={id} className={Styles.type}>
                  <label>{type}</label>
                  <img
                    className={Styles.typeImage}
                    src={`../src/assets/pokemonTypesImage/${type}.png`}
                    alt={type}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else if (error) {
      return (
        <Error
          text={`El pokemon no se puede mostrar debido a: `} // Si hay algun error, renderiza el componente Error
          error={error}
        />
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <div className={Styles.container}>
      <BackToLanding className={Styles.back} />
      {pokemonRender()}
    </div>
  );
};

export default Detail;
