import style from "../Button/Button.module.css";
import PropTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <div className={style.container}>
      <button className={style.button} type="button" onClick={onClick}>
        {" "}
        LoadMore
      </button>
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
