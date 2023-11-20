import FormStats from "../../components/FormStats/FormStats";
import FormTypes from "../../components/FormTypes/FormTypes";
import FormComplete from "../../components/FormComplete/FormComplete";
import { formState } from "./consts";
import { useState } from "react";
import axios from "axios";
import URL from "../../helpers/URL";
import BackToLanding from "../../components/BackToLanding/BackToLanding";
import Styles from "./create.module.css";

let aux = true;

const Create = () => {
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  }); // Crea un estado local para el pokemon

  const [form, setForm] = useState(formState.incomplete); // Crea un estado local para el estado del Formulario

  const formRender = () => {
    if (form === formState.incomplete) {
      return <FormStats submit={setPokemon} setForm={setForm} />;
    } else if (form === formState.statsComplete) {
      return (
        <FormTypes submit={setPokemon} pokemon={pokemon} setForm={setForm} /> // Segun el estado del formulario renderiza un componente diferente
      );
    } else {
      if (aux) {
        aux = false;
        axios
          .post(`${URL.BaseUrl}${URL.Pokemons}`, pokemon)
          .then(() => {
            setForm(formState.created); // Si se crea bien setea el estado en CREATED
          })
          .catch((error) => {
            setForm(error.message); // Si ocurre algun error setea el error en el estado
          });
      }
      return <FormComplete result={form} setForm={setForm} />; // Renderiza el componente FormComplete
    }
  };

  return (
    <div className={Styles.container}>
      <BackToLanding />
      {formRender()}
    </div>
  );
};

export default Create;
