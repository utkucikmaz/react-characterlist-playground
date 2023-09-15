import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CharacterDetails(props) {
    const { characterId } = useParams();
    const [characterDetail, setCharacterDetail] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/characters/${characterId}`)
            .then((response) => {
                setCharacterDetail(response.data);
            })
            .catch((e) => {
                console.log("error getting characters", e);
            });
    }, []);

    const deleteCharacter = () => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/characters/${characterId}`)
            .then((response) => {
                props.callbackToUpdateCharacters();
                navigate("/");
            })
            .catch((e) => {
                "Error deleting a character", e;
            });
    };

    const renderCharacterDetails = () => {
        return (
            <>
                <h1>{characterDetail.name}</h1>
                <h2>{characterDetail.occupation}</h2>
                <h2>{characterDetail.weapon}</h2>
                <button onClick={deleteCharacter}>Delete</button>
            </>
        );
    };
    return (
        <section>
            {characterDetail === null ? (
                <p>Loading</p>
            ) : (
                renderCharacterDetails()
            )}
        </section>
    );
}
