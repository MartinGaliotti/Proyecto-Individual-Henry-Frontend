import { useSelector } from "react-redux";
import Styles from "./Cards.module.css";
import Card from "../Card/Card";

const Cards = () => {
  const characters = useSelector((state) => state.shownCharacters); // Trae los personajes que se deben mostrar del estado global de Redux

  const cardsRender = () => {
    // Recorre los personajes y renderiza las Cards de cada uno

    return characters.map((character) => {
      const { name, image, types, id } = character;
      return (
        <Card
          className={Styles.card}
          key={id}
          id={id}
          name={name}
          image={image}
          types={types}
        />
      );
    });
  };

  return <div className={Styles.container}>{cardsRender()}</div>;
};

export default Cards;
