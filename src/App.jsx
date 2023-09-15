import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Contact from "./components/Contact";
import About from "./components/About";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";

function App() {
    const [characterList, setCharacterList] = useState(null);

    useEffect(() => {
        getCharactersFromApi();
    }, []);

    const getCharactersFromApi = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/characters`)
            .then((response) => {
                setCharacterList(response.data);
            })
            .catch((e) => {
                console.log("error getting characters from the API....", e);
            });
    };

    const renderList = () => {
        if (characterList === null) {
            return <p>loading....</p>;
        }

        return characterList.map((characterObj, index) => {
            return (
                <div key={index} className="card">
                    <br />
                    <h3>{characterObj.name}</h3>
                    <p>{characterObj.occupation}</p>
                    <NavLink to={"/characters/" + characterObj.id}>
                        Details
                    </NavLink>
                    <br />
                    <br />
                </div>
            );
        });
    };
    return (
        <>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/contact">Contact</NavLink> |
                <NavLink to="/about">About</NavLink>
            </nav>

            <Routes>
                <Route path="/" element={renderList()} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/characters/:characterId"
                    element={
                        <CharacterDetails
                            callbackToUpdateCharacters={getCharactersFromApi}
                        />
                    }
                />
                <Route
                    path="*"
                    element={<p>There is no page under this Route</p>}
                />
            </Routes>
        </>
    );
}

export default App;
