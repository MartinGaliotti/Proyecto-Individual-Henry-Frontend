import Styles from "./ToCreate.module.css";
import { useNavigate } from "react-router-dom";
import pathName from "../../helpers/PATHNAME.routes";

const ToCreate = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathName.CREATE);
  };

  return (
    <div className={Styles.container}>
      <button className={Styles.button} onClick={handleClick}></button>
    </div>
  );
};

export default ToCreate;
