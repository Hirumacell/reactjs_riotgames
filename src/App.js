import React, {useState} from "react";
import axios from "axios";
import './App.css';

function App() {
    const [searchText, setSearchText] = useState("");
    const [playerDataLol, setPlayerDataLol] = useState({});
    const [playerTop3, setPlayertop3] = useState({});
    const [Champ, setChamp] = useState({});
    const API_KEY = "RGAPI-9ec1493a-4d91-424b-81fc-701b5bc292e8";

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

    const [champion1, setChampion1] = useState("");
    const [champion2, setChampion2] = useState("");
    const [champion3, setChampion3] = useState("");

    function SearchTop3Champs(event) {
        function Search3() {
            var APICallChamp = "https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + playerDataLol.id + "/top?count=3&api_key=" + API_KEY;

            axios.get(APICallChamp).then(function (response1) {
                setPlayertop3(response1.data);
            }).catch(function (error1) {
                console.log(error1);
            });
        }

        function SearchChamps() {
            var ChampsURL = "https://raw.githubusercontent.com/ngryman/lol-champions/master/champions.json";

            axios.get(ChampsURL).then(function (response2) {
                setChamp(response2.data);
            }).catch(function (error2) {
                console.log(error2);
            });
        }

        Search3();
        SearchChamps();

        console.log(Champ);
        console.log(playerTop3);

        for (let i = 0; i < 153; i++) {
            if (parseInt(Champ[i].key) == parseInt(playerTop3[0].championId)) {
                setChampion1(Champ[i].name);
                console.log(Champ[i].name);
            }
            if (parseInt(Champ[i].key) == parseInt(playerTop3[1].championId)) {
                setChampion2(Champ[i].name);
                console.log(Champ[i].name);
            }
            if (parseInt(Champ[i].key) == parseInt(playerTop3[2].championId)) {
                setChampion3(Champ[i].name);
                console.log(Champ[i].name);
            }
        }
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
                <button onClick={e => SearchTop3Champs(e)}>Top 3 champions</button>
            </div>
            <div>
                {JSON.stringify(playerTop3) != '{}' ?
                    <>
                        <p>Top 1 : {champion1} avec {playerTop3[0].championPoints} points</p>
                        <img width="100" height="100"
                             src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/" + champion1 + ".png"}/>
                        <p>Top 2 : {champion2} avec {playerTop3[1].championPoints} points</p>
                        <img width="100" height="100"
                             src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/" + champion2 + ".png"}/>
                        <p>Top 3 : {champion3} avec {playerTop3[2].championPoints} points</p>
                        <img width="100" height="100"
                             src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/" + champion3 + ".png"}/>
                    </>
                    :
                    <> <p>Pas encore de joueur sélectionné</p> </>
                }
            </div>
        </div>
    );
}

export default App;
