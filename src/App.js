import React, {useState} from "react";
import axios, {Axios} from "axios";
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
    const [searchText, setSearchText] = useState("");
    const [playerDataLol, setPlayerDataLol] = useState({});
    const [playerTop3, setPlayertop3] = useState({});
    const API_KEY = "RGAPI-3931cc47-b39e-4e48-8963-2b50feae4609";

    function searchForPlayerbyName(event) {
        // Serveur de l'API
        var APICallString = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY;
        // Utilisation de AXIOS
        axios.get(APICallString).then(function (response) {
            setPlayerDataLol(response.data);

        }).catch(function (error) {
            console.log(error)
        });
    }

    function searchTop3Champs(event) {
        var APICallChamp = "https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + playerDataLol.id + "/top?count=3&api_key=" + API_KEY;

        axios.get(APICallChamp).then(function (response) {
            setPlayertop3(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="App">

            <div className="container">
                <h5>LeagueOfLegends Player Searcher</h5>
                <input type="text" onChange={e => setSearchText(e.target.value)}></input>
                <button onClick={e => searchForPlayerbyName(e)}>Search for player</button>
            </div>
            <div>
                {JSON.stringify(playerDataLol) != '{}' ?
                    <>
                        <p> {playerDataLol.name} </p>
                        <p> Niveau : {playerDataLol.summonerLevel} </p>
                        <img width="100" height="100"
                             src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/" + playerDataLol.profileIconId + ".png"}/>
                    </>
                    :
                    <> <p> Y'a pas de joueur avec ce nom </p> </>
                }
            </div>
            <div>
                <button onClick={e => searchTop3Champs(e)}>Top 3 champions</button>
            </div>
            <div>
                {JSON.stringify(playerTop3) != '{}' ?
                    <>
                        <p>{playerTop3[0].championId}</p>
                        <p>{playerTop3[1].championId}</p>
                        <p>{playerTop3[2].championId}</p>
                    </>
                    :
                    <> <p>Pas encore de joueur sélectionné</p> </>
                }
            </div>
        </div>
    );
}

export default App;
