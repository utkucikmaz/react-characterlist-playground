import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const baseURL = "https://ih-crud-api.herokuapp.com";

    const [characterList, setCharacterList] = useState(null);

    useEffect(() => {
        axios
            .get(baseURL + "/characters")
            .then((response) => {
                setCharacterList(response.data);
            })
            .catch((e) => {
                "Error:", e;
            });
    }, []);
    const deleteChar = (charId) => {
        const newList = characterList.filter((e) => {
            return e.id !== charId;
        });
        setCharacterList(newList);
    };
    const renderList = () => {
        return (
            <>
                {characterList.map((element, index) => {
                    return (
                        <div key={index}>
                            <br />
                            <h2>Name: {element.name}</h2>
                            <h3>Weapon: {element.weapon}</h3>
                            <br />
                            <button
                                onClick={() => {
                                    deleteChar(element.id);
                                }}
                            >
                                Delete
                            </button>
                            <hr />
                        </div>
                    );
                })}
            </>
        );
    };
    return (
        <>
            {characterList && (
                <h1>Number of the chracters API: {characterList.length}</h1>
            )}
            {characterList === null ? <p>Loading...</p> : renderList()}
        </>
    );
}

export default App;
