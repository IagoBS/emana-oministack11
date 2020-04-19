import React, { useState } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [descripition, setDescripition] = useState("");
  const [value, setValue] = useState("");
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = { title, descripition, value };
    try {
       await api.post("incidents", data, {
         headers: {
          Authorization: ongId,
         }
       });
      alert("Incidente cadastrado com sucesso obrigado pela ajdua.");
      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar incidente tente novamente");
    }
  }

  return (
    <div className="news-container">
      <div className="content">

        <section>
          <img src={logoImg} alt="GEEC" height="200px" width="200px" />
          <h1> Cadastrar novo caso </h1>{" "}
          <p>Cadastrar novo caso para farezem a adoação para ong </p>{" "}
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#809FFF" />
            Voltar{" "}
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={descripition}
            onChange={(e) => setDescripition(e.target.value)}
          >
          
          </textarea>
          <input
            type="text"
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="button"> Cadastrar </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
