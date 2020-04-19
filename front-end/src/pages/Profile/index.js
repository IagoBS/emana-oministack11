import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import "./styles.css";
import api from "../../services/api";
export default function Profile() {

    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem("ongId");
    const ongName = localStorage.getItem("ongName");
    const history = useHistory();

    useEffect(() => {
        api
            .get("profiles", {
                headers: {
                    Authorization: ongId,
                },
            })
            .then((response) => {
                setIncidents(response.data);
            });
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {

            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                },
            });

            setIncidents(incidents.filter((incident) => incident.id !== id));

        } catch (err) {
            alert("Erro ao deletar incidente");
        }

    }

    async function handleLogout(e) {
        localStorage.clear();
        history.push("/");
    }

    return ( <
        div className = "profile-container" >
        <
        header >
        <
        img src = { logoImg }
        alt = "GEEC"
        height = "50px"
        width = "50px" / >
        <
        span > Bem vindo { ongName } < /span>{" "} <
        Link to = "/newIncident"
        className = "button" > { " " }
        Cadastrar novo caso { " " } <
        /Link> <
        button type = "button"
        onClick = {
            () => handleLogout()
        } >
        <
        FiPower size = { 18 }
        color = "#809FFF" / >
        <
        /button>{" "} < /
        header > { " " } <
        h1 > Casos cadastrados < /h1>{" "} <
        ul > {
            incidents.map((incident) => ( <
                li key = { incident.id } >
                <
                strong > Caso: < /strong> <p> {incident.title} </p > { " " } <
                strong > Descrição < /strong> <p> {incident.descripition} </p > { " " } <
                strong > Valor < /strong>{" "} <
                p > { " " } {
                    Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(incident.value)
                } { " " } <
                /p>{" "} <
                button onClick = {
                    () => handleDeleteIncident(incident.id)
                }
                type = "submit" >
                <
                FiTrash2 size = { 20 }
                color = "#809FFF" / >
                <
                /button> < /
                li >
            ))
        } <
        /ul> < /
        div >
    );
}