import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = { name, email, telephone, city, uf };
    try {
      const response = await api.post('ongs', data);
      alert(`Seu cadastro foi realizado com sucesso ${response.data.id}`);
      history.push('/')
      
    } catch(err) {
      alert('Erro no cadastro tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="GEEC" height="200px" width="200px" />
          <h1> Cadastro </h1>
          <p>
            Faça seu cadastro, entre na platadorma e ajude os casos das suas
            ongs
          </p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#809FFF" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ong"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email da ong"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit" >
            
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
