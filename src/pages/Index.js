import React from "react";
import getDeviceStatus from "../functions/getDeviceStatus";
import styles from "../styles/index.module.css";
import { useNavigate } from "react-router-dom";

function Index() {
  const [inputValue, setInputValue] = React.useState("");
  const [estatus, setEstatus] = React.useState(undefined);
  const navigate = useNavigate();
  const login = () => {
    navigate("/admin");
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.header}>
        <h1>FIX MY PHONE</h1>
        <button className={styles.btnSession} onClick={login}>
          Iniciar sesión
        </button>
      </div>
      <h2 className={styles.title}>Buscar estado de su equipo:</h2>
      <div className={styles.buttonSearch}>
        <input
          type="text"
          placeholder="Ingresa cedula o factura"
          id="search-status"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={styles.btn}
          onClick={() => getDeviceStatus(inputValue).then(setEstatus)}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>

      {estatus === null && (
        <h3 className={styles.messageError}>
          No se encontró el dispositivo, pruebe con otra factura o id.
        </h3>
      )}
      {(estatus !== null) & (estatus !== undefined) ? (
        <h3 className={styles.message}>
          {" "}
          El dispositivo <strong>{estatus.equipo}</strong> de{" "}
          <strong> {estatus.propietario}</strong>, se encuentra en la fase:{" "}
          <strong>{estatus.estado}</strong>
        </h3>
      ) : null}
    </div>
  );
}

export default Index;
