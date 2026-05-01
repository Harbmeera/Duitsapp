import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
getFirestore,
collection,
getDocs,
getDoc,
setDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMKwYhlY6bJptl4gSyvV7c7RH9CmoQePs",
  authDomain: "duits-2b049.firebaseapp.com",
  projectId: "duits-2b049",
  storageBucket: "duits-2b049.firebasestorage.app",
  messagingSenderId: "39754757106",
  appId: "1:39754757106:web:58bf48922798bb7415716b",
  measurementId: "G-FSBERG575E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);







async function loadWords(){

const snap = await getDoc(doc(db,"woorden","lijst"));

if(!snap.exists()){

    for(let i=0;i<woorden.length;i++){
        woorden[i].score = 20;
    }

    await setDoc(doc(db,"woorden","lijst"), {words: woorden});

}else{

    woorden = snap.data().words;

}

}


let positief = [
  "Richtig!",
  "Genau!",
  "Stimmt!",
  "Ganz genau!",
  "Sehr gut!",
  "Super gemacht!",
  "Das ist korrekt!",
  "Du hast recht!",
  "Exakt!",
  "Das ist die richtige Antwort.",
  "Gut aufgepasst!",
  "Das hast du gut erkannt.",
  "Perfekt gelöst!",
  "Na klar, stimmt!",
]

let negatief = [
  "Das ist falsch.",
  "Nicht ganz.",
  "Leider nein.",
  "Das stimmt nicht.",
  "Das ist nicht korrekt.",
  "Nein, das passt nicht.",
  "Das ist ein Fehler.",
  "So ist es nicht.",
  "Das hast du verwechselt.",
  "Nicht richtig.",
  "Das ist nicht die richtige Antwort.",
  "Fast, aber nicht ganz.",
  "Nein, das stimmt so nicht.",
  "Das war knapp daneben.",
  "Leider falsch."
]



function startTEST(questionAmount, kapitels){
let selectedKapitels = kapitels.replace(/ /g, '').split(",")
let selectedWords = [];
let wordLISTBYscore = []
for(let i = 0; i < woorden.length; i++){
  for(let j = 0; j < (woorden[i].score)**2; j++){
    if(selectedKapitels.includes(woorden[i].kapitel) || kapitels === ""){
      wordLISTBYscore.push(woorden[i]);
    }
}
}
for(let i = 0; i < questionAmount; i++){
  let randomIndex = Math.floor(Math.random() * wordLISTBYscore.length);
  if(selectedWords.includes(wordLISTBYscore[randomIndex])){
    i--;
    continue;
  }
  selectedWords.push(wordLISTBYscore[randomIndex]);
  wordLISTBYscore.splice(randomIndex, 1);

}

document.getElementById('body').innerHTML = ""
let index = 0
let antwoordenSTATUS = []
let antwoorden = []
vraagwoord(index)
function vraagwoord(index){
if(index < selectedWords.length){
  console.log(index)
  document.getElementById('body').innerHTML = ""
document.getElementById('body').innerHTML += selectedWords[index].nederlands
document.getElementById('body').innerHTML += '<br><input autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" id="vertaling">'
document.getElementById('body').innerHTML += '<br><button onclick="add(`ß`)">ß</button>'
document.getElementById('body').innerHTML += '<br><button id="check'+index+'">Nachsehen</button>'
document.getElementById('vertaling').focus()
document.getElementById('check'+index).addEventListener("click", check);
document.getElementById('body').addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log(document.getElementById('check'+index))
    document.getElementById('check'+index).click();
  }
});


function check() {
  let antwoord = selectedWords[index].duits
    let geraden = document.getElementById('vertaling').value
    document.getElementById('body').innerHTML = ""
    if(geraden === antwoord){
      document.getElementById('body').innerHTML += "<h2 style='color:green'><b>"+positief[Math.floor(Math.random() * positief.length)]+"<b><h2>"
      document.getElementById('body').innerHTML += "<h2>Antwort: "+antwoord+"<h2>"
      if(woorden[woorden.indexOf(selectedWords[index])].score > 5){
      woorden[woorden.indexOf(selectedWords[index])].score -= 1
      antwoordenSTATUS.push('juist')
      antwoorden.push(geraden)
      }
    }else{
    document.getElementById('body').innerHTML += "<h2 style='color:red'><b>"+negatief[Math.floor(Math.random() * negatief.length)]+"<b><h2>"
    document.getElementById('body').innerHTML += "<h2>Antwort: "+antwoord+"<h2>"
    woorden[woorden.indexOf(selectedWords[index])].score +=1
    antwoordenSTATUS.push('fout')
    antwoorden.push(geraden)
  document.getElementById('body').innerHTML += "<button id='juist"+index+"'>Doch richtig?</button>"
    }
  document.getElementById('body').innerHTML += "<button id='volgende"+index+"'>Nächste</button>"


document.getElementById('volgende'+index).addEventListener("click", volgende)
document.getElementById('body').addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('volgende'+index).click();
  }
}, { once: true })



document.getElementById('juist'+index).addEventListener("click", function () {
  if(woorden[woorden.indexOf(selectedWords[index])].score > 5){
  woorden[woorden.indexOf(selectedWords[index])].score -= 2
  }else{
    woorden[woorden.indexOf(selectedWords[index])].score -= 1
  }
  antwoordenSTATUS[antwoordenSTATUS.length-1] = "juist"
volgende()
})

 function volgende() {
vraagwoord(index+1)
}
    


}
  }else{
 const frequency = (arr, item) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            count++;
        }
    }
    return count;
};
document.getElementById('body').innerHTML = "<h2>"+frequency(antwoordenSTATUS, 'juist') +"/"+selectedWords.length +"<h2>"
document.getElementById('body').innerHTML += "<h2>"+Math.round((frequency(antwoordenSTATUS, 'juist')/(selectedWords.length))*100) + "%<h2>"
document.getElementById('body').innerHTML += "<table id='tabel'></table>"
for(let l = 0; l<selectedWords.length; l++){
document.getElementById('tabel').innerHTML += "<tr><td>"+selectedWords[l].nederlands+"</td><td>"+selectedWords[l].duits+"</td><td style='color:"+(antwoordenSTATUS[l] === "juist"? "green":"red")+"'>"+(antwoorden[l] === ""? "nicht ausgefüllt": antwoorden[l])+"</td></tr>"
}
setDoc(doc(db,"woorden","lijst"), {words: woorden});

  }
}

}


function add(sign){
document.getElementById(`vertaling`).value += sign
document.getElementById('vertaling').focus()
}


window.startTEST = startTEST;
window.add = add;


/*document.getElementById('kapitels').addEventListener("change", () => {

  let xValues = [];
  let yValues = [];

  let kapitels = document.getElementById('kapitels').value;
  let selectedKapitels = kapitels.replace(/ /g, '').split(",");

  for (let i = 0; i < woorden.length; i++) {

    if (selectedKapitels.includes(String(woorden[i].kapitel)) || kapitels === "") {

      if (!xValues[woorden[i].score]) xValues[woorden[i].score] = 0;
      if (!yValues[woorden[i].score]) yValues[woorden[i].score] = 0;

      xValues[woorden[i].score] += 1;
      yValues[woorden[i].score] = woorden[i].score;
    }
  }

  console.log(xValues, yValues);


  window.myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        data: yValues
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      }
    }
  });

});*/

const ctx = document.getElementById('myChart');

let myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  options: {
    plugins: {
      legend: { display: false }
    }
  }
});

document.getElementById('kapitels').addEventListener("change", graph)
  
  
  
  function graph(){

  let counts = {};

  let kapitels = document.getElementById('kapitels').value;
  let selectedKapitels = kapitels.replace(/ /g, '').split(",");

  for (let woord of woorden) {
    if (selectedKapitels.includes(String(woord.kapitel)) || kapitels === "") {
      counts[woord.score] = (counts[woord.score] || 0) + 1;
    }
  }

  let scores = Object.keys(counts).map(Number);

  if (scores.length === 0) return;

  let min = Math.min(...scores);
  let max = Math.max(...scores);

  let labels = [];
  let data = [];

  for (let i = min; i <= max; i++) {
    labels.push(i);
    data.push(counts[i] || 0);
  }

  myChart.data.labels = labels;
  myChart.data.datasets[0].data = data;

  myChart.update();

};

async function init() {
  await loadWords();
  graph();
}

init();
