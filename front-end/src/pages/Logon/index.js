import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import herosImg from "../../assets/heros.png";
import api from "../../services/api";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();
  async function handleLogin(e) {
    e.preventDefault();

    const data = { id };
    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push('/profile')

    } catch (err) {
      alert("Falha ao fazer login, tente novamento");
    }
  }

  return (
    <div className="logo-container">
      <section className="form">
        <img src={logoImg} alt="GEEC" height="200px" width="200px" />
        <form onSubmit={handleLogin}>
          <h1> Faça seu Logon </h1>{" "}
          <input
            type="text"
            placeholder="Seu ID da ong"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#809FFF" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={herosImg} alt="Imagem logo" />
    </div>
  );
}
