const baseURL = "https://www.thebluealliance.com/api/v3";
document.getElementById("frm1").onsubmit = (e) => {
    e.preventDefault();
    const APIKey = document.getElementById("APIKey").value;
    const gYear = document.getElementById("gYear").value;
    const output = document.getElementById("result");
    const teamID = document.getElementById("tNumber").value;
    fetch(`${baseURL}/team/${teamID}/matches/${gYear}`,{
        method: "GET",
        headers: {
            ["X-TBA-Auth-Key"]: APIKey
        }
    }).then(k=> {
        k.json().then(p=>{
            output.value = JSON.stringify(p.map(f=>{
                return {
                    eventKey: f['event_key'],
                    redScore: f['alliances']['red']['score'],
                    blueScore: f['alliances']['blue']['score']
                }
            }));
        })
    }).catch(ex=>{
        console.log(ex)
    })
    
}
