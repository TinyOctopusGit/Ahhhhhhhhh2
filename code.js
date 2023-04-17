const baseURL = "https://www.thebluealliance.com/api/v3";
document.getElementById("frm1").onsubmit = (e) => {
    e.preventDefault();
    const APIKey = document.getElementById("APIKey").value;
    const gYear = document.getElementById("gYear").value;
    const output = document.getElementById("result");
    fetch({
        method: "GET",
        url:`${baseURL}/events/${gYear}`,
        headers: {
            ["X-TBA-Auth-Key"]: APIKey
        }
    }).then(k=> {
        alert("SUCCESS")
        k.text().then(p=>{
            alert("DONE")
            output.value = p;
        })
    }).catch(ex=>{
        console.log(ex)
    })
    
}