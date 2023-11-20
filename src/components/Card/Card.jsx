import Styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import pathName from "../../helpers/PATHNAME.routes";
const Card = (props) => {
  const { name, image, types, id } = props; // Recibe los datos por props
  const navigate = useNavigate();

  const typesRender = () => {
    return (
      // Renderiza los tipos
      <div className={Styles.typesContainer}>
        {types.map((type, key) => {
          return (
            <img
              className={Styles.imgType}
              key={key}
              src={`./src/assets/pokemonTypesImage/${type}.png`}
              alt={`${type}`}
            />
          );
        })}
      </div>
    );
  };

  const handleClick = () => {
    navigate(`${pathName.DETAIL}/${id}`);
  };

  const cardRender = () => {
    if (name && image && types) {
      return (
        <div onClick={handleClick} className={Styles.container} key={id}>
          <h1 className={Styles.name}>{name}</h1>
          <img
            src={image}
            alt="Imagen pokemon"
            className={Styles.pokemonImage}
          />
          {typesRender()}
        </div>
      );
    }
  };

  return <>{cardRender()}</>;
};

export default Card;
