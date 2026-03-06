document.addEventListener("DOMContentLoaded", () => {

const result = document.getElementById("result");
const urlText = document.getElementById("url");
const scanButton = document.getElementById("check");

async function checkURL(url){

    try{

        const response = await fetch("http://127.0.0.1:5000/predict",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({url})
        });

        const data = await response.json();

        if(data.prediction === 1){

            result.textContent = "PHISHING WEBSITE";
            result.className = "phishing";

        }else{

            result.textContent = "SAFE WEBSITE";
            result.className = "safe";

        }

    }catch(error){

        result.textContent = "API ERROR";
        result.className = "";

    }

}

scanButton.addEventListener("click", async ()=>{

    let tabs = await chrome.tabs.query({
        active:true,
        currentWindow:true
    });

    let url = tabs[0].url;

    let domain = new URL(url).hostname;
    urlText.textContent = domain;

    if(url.startsWith("chrome://") || url.startsWith("brave://")){
        result.textContent = "Cannot scan browser internal pages";
        result.className = "";
        return;
    }

    result.textContent = "Scanning...";
    result.className = "";

    checkURL(url);

});

});