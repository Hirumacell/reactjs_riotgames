import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';

function App() {
    const [searchText, setSearchText] = useState("");
    const [champions, setChampions] = useState([]);
    const [summonerName, setSummonerName] = useState();
    const [playerDataLol, setPlayerDataLol] = useState();
    const [playerTop3, setPlayertop3] = useState([]);

    const API_KEY = process.env.REACT_APP_TOKEN;

    useEffect(() => {
        const ChampsURL = "https://raw.githubusercontent.com/ngryman/lol-champions/master/champions.json";

        axios.get(ChampsURL).then(function (response) {
            setChampions(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (summonerName) {
            const APICallString = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY;
            axios.get(APICallString).then(function (response) {
                setPlayerDataLol(response.data);
            }).catch(function (error) {
                console.log(error)
            });
        }
    }, [summonerName, searchText]);

    useEffect(() => {
        if (playerDataLol) {
            const APICallChamp = "https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + playerDataLol.id + "/top?count=3&api_key=" + API_KEY;

            axios.get(APICallChamp).then(function (response) {
                setPlayertop3(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [playerDataLol]);

    function handleSubmit() {
        setSummonerName(searchText);
    }

    return (
        <div className="App">
            <div className="container">
                <h2>LeagueOfLegends recherche des joueurs</h2>
                <input type="text" onChange={e => setSearchText(e.target.value)}></input>
                <button onClick={handleSubmit}>OK</button>
            </div>
            <div>
                {!!playerDataLol ?
                    <>
                        <p> {playerDataLol.name} </p>
                        <p> Niveau : {playerDataLol.summonerLevel} </p>
                        <img width="100" height="100"
                             src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/" + playerDataLol.profileIconId + ".png"}/>
                    </>
                    :
                    <> <p> Y'a pas de joueur avec ce nom </p> </>
                }
                <h2>Top 3 champions</h2>
                <div className="card-wrapper">
                    {playerTop3.map((playerTop) => {
                        const champion = champions.find(champ => parseInt(champ.key) === playerTop.championId);
                        return <div className="carde" key={playerTop.championId}>
                            <p className="name"><b>{champion.name}</b></p>
                            <img width="150" height="150" src={champion.icon}/>
                            <p className="point">{playerTop.championPoints} points</p>
                        </div>}
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
