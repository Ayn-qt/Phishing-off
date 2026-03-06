document.getElementById("check").addEventListener("click", async () => {

let tabs = await chrome.tabs.query({active:true,currentWindow:true});
let url = tabs[0].url;

document.getElementById("url").innerText = "URL: " + url;

let response = await fetch("http://127.0.0.1:5000/predict",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({url:url})
});

let data = await response.json();

if(data.prediction === 1){

document.getElementById("result").innerText = "Phishing Website Detected";

}else{

document.getElementById("result").innerText = "Safe Website";

}

});