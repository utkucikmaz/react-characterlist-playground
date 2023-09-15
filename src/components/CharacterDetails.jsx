import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CharacterDetails() {
    const { characterId } = useParams();
    const [characterDetail, setCharacterDetail] = useState(null);

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

    const renderCharacterDetails = () => {
        return (
            <>
                <h1>{characterDetail.name}</h1>
                <h2>{characterDetail.occupation}</h2>
                <h2>{characterDetail.weapon}</h2>
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
