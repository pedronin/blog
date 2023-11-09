import React from "react";
import Button, { EButtonColor } from "../components/Button";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <h1>
        <span>🙄</span>
        <br />
        Ничего не найдено
      </h1>
      <Link to={"/"}>
        <Button color={EButtonColor.BLUE}>На главную</Button>
      </Link>
    </div>
  );
};

export default NotFound;
