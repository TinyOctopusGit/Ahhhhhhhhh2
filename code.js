const baseURL = "https://www.thebluealliance.com/api/v3";
document.getElementById("frm1").onsubmit = (e) => {
    e.preventDefault();
    const APIKey = document.getElementById("APIKey").value;
    const gYear = document.getElementById("gYear").value;
    const output = document.getElementById("result");
    const teamID = "frc"+document.getElementById("tNumber").value;
    const showWin = document.getElementById("win").checked;
    const showLose = document.getElementById("lose").checked;
    const showTie = document.getElementById("tie").checked;

    document.getElementById("result").innerHTML = "";

    fetch(`${baseURL}/team/${teamID}/matches/${gYear}`,{
        method: "GET",
        headers: {
            ["X-TBA-Auth-Key"]: APIKey
        }
    }).then(k=> {
        k.json().then(p=>{
            output.value = JSON.stringify(p.map(f=>{

                const url = ("https://www.thebluealliance.com/match/"+f['key']);
                const match_number = f['match_number']
                const allianceWinner = f['winning_alliance'];
                var allianceLoser = "red";
                const comp_level = f['comp_level'];
                var compType = "Match";

                //Find Alliance Loser
                if (allianceWinner == "red") {
                    allianceLoser = "blue";
                } else if(allianceWinner == "blue") {
                    allianceLoser = "red";
                } else {
                    allianceLoser = "Tie";
                }

                //Get Match Type
                if (comp_level == "f") {
                    compType = "Final";
                }
                else if (comp_level == "qm") {
                    compType = "Qualifying";
                }
                else if (comp_level == "sf") {
                    compType = "SemiFinal";
                }

                try {
                    const score = f['alliances'][allianceWinner]['score'] + "-" +f['alliances'][allianceLoser]['score'];

                    if (showWin) {
                        //If TeamID is found in allianceWinner path then:
                        if (Boolean(f['alliances'][allianceWinner]['team_keys'].find(b=>b===teamID))) {
                            document.getElementById("result").innerHTML += 
                                "<a href="+url+" target='_blank'>Win: "+compType+" "+match_number+": "+allianceWinner+" wins! "+score+"</a>" + "<br>";
                            console.log("Win");
                        }
                    }

                    if (showLose) {
                        //If TeamID is found in allianceLoser path then:
                        if(Boolean(f['alliances'][allianceLoser]['team_keys'].find(b=>b===teamID))) {
                            document.getElementById("result").innerHTML += 
                                "<a href="+url+" target='_blank'>Loss: "+compType+" "+match_number+": "+allianceWinner+" wins! "+score+"</a>" + "<br>";
                        }
                    }

                } catch (error) {

                    if (showTie) {
                        score = f['alliances']['blue']['score'] + "-" +f['alliances']['red']['score']
                        document.getElementById("result").innerHTML += 
                        "<a href="+url+" target='_blank'>Tie: "+compType+" "+match_number+": "+""+score+"</a>" + "<br>";
                    }
                }
            }));
        })
    }).catch(ex=>{
        console.log(ex)
    })
    
}
