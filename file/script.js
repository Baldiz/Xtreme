// Codice sotto ispirato dal codice html creato da SplitType
function createMenuLink(
  content,
  containerSelector,
  lineClass,
  wordClass,
  charClass
) {
  // Creazione dei div line e word
  const lineDiv = document.createElement("div");
  lineDiv.className = lineClass;
  lineDiv.style.display = "block";
  lineDiv.style.textAlign = "center";
  lineDiv.style.width = "100%";

  const wordDiv = document.createElement("div");
  wordDiv.className = wordClass;
  wordDiv.style.display = "inline-flex";
  wordDiv.style.margin = "0";

  // Aggiungi il div word al div line
  lineDiv.appendChild(wordDiv);

  // Recupero il contenitore
  const container = document.querySelector(containerSelector);
  // Pulizia del contenuto precedente del contenitore
  container.innerHTML = "";

  // Ciclo attraverso ogni lettera della stringa content
  for (let i = 0; i < content.length; i++) {
    // Creazione di un div per ogni carattere
    const charDiv = document.createElement("div");
    charDiv.className = charClass;
    charDiv.style.display = "inline-block";
    charDiv.innerText = content[i];

    // Aggiungi il div char al div word
    wordDiv.appendChild(charDiv);
  }

  // Aggiungi il div line al contenitore
  container.appendChild(lineDiv);
}

// Utilizzo della funzione per creare il titolo servizi
const ts1 = document.querySelector(".ts1").textContent;
createMenuLink(ts1, ".ts1", "line", "word", "char5");
// Utilizzo della funzione per creare il titolo servizi
const ts2 = document.querySelector(".ts2").textContent;
createMenuLink(ts2, ".ts2", "line", "word", "char6");
// Utilizzo della funzione per creare il titolo servizi
const ts3 = document.querySelector(".ts3").textContent;
createMenuLink(ts3, ".ts3", "line", "word", "char7");
// Utilizzo della funzione per creare il titolo work
const wt1 = document.querySelector(".wt1").textContent;
createMenuLink(wt1, ".wt1", "line", "word", "char8");
// Utilizzo della funzione per creare il titolo work
const wt2 = document.querySelector(".wt2").textContent;
createMenuLink(wt2, ".wt2", "line", "word", "char9");

// ////////////// Funzione sopra creata dal codice commentato qui sotto
// // Creazione dei div line e word
// const lineDiv2 = document.createElement('div');
// lineDiv2.className = 'line';
// lineDiv2.style.display = 'block';
// lineDiv2.style.textAlign = 'center';
// lineDiv2.style.width = '100%';

// const wordDiv2 = document.createElement('div');
// wordDiv2.className = 'word';
// wordDiv2.style.display = 'inline-flex';
// wordDiv2.style.margin = '0';

// // Aggiungi il div word al div line
// lineDiv2.appendChild(wordDiv2);

// // Recupero la seconda voce di menu
// const link2 = document.querySelector('.split-2');
// // Recupero il contenuto della prima voce di menu
// const contentLink2 = link2.textContent
// console.log(contentLink2.split(''))
// // Splitto la voce di menu un un array di singoli caratteri
// contentLink2.split('')

// // Pulizia del contenuto precedente di link2
// link2.innerHTML = '';

// // Ciclo attraverso ogni lettera della stringa contentLink2
// for(let i = 0; i < contentLink2.length; i++) {
//     // Creazione di un div per ogni carattere
//     const char2Div = document.createElement('div');
//     char2Div.className = 'char2';
//     char2Div.style.display = 'inline-block';
//     char2Div.innerText = contentLink2[i];

//     // Aggiungi il div char2 al div word
//     wordDiv2.appendChild(char2Div);
// }

// // Aggiungi il div line al contenitore link2
// link2.appendChild(lineDiv2);

////////////// Animazione Hover Works //////////////
// Recupero tutti gli elementi che mi servono
const work1 = document.querySelector(".work-1");
const containerHover1 = document.querySelector(".container-hover1");
const workHover1 = document.querySelector(".work_hover-1");
const video1 = document.querySelector(".video_work1");
const work2 = document.querySelector(".work-2");
const containerHover2 = document.querySelector(".container-hover2");
const workHover2 = document.querySelector(".work_hover-2");
const video2 = document.querySelector(".video_work2");
const work3 = document.querySelector(".work-3");
const containerHover3 = document.querySelector(".container-hover3");
const workHover3 = document.querySelector(".work_hover-3");
const video3 = document.querySelector(".video_work3");

// Salvo tutte le width e le height dei div work-1 work-2 e work-3 per impostarle anche all'hover
const videoHeight1 = video1.offsetHeight;
const videoWidth1 = video1.offsetWidth;
const videoHeight2 = video2.offsetHeight;
const videoWidth2 = video2.offsetWidth;
const videoHeight3 = video3.offsetHeight;
const videoWidth3 = video3.offsetWidth;

// Funzioni di modifica all'hover
// Video 1
containerHover1.onmouseover = () => {
  workHover1.style.transform = "scale(1)";
  video1.play();
  work1.style.height = videoHeight1 + "px";
  work1.style.width = videoWidth1 + "px";
  video1.style.borderRadius = "5%";
};
// Video 2
containerHover2.onmouseover = () => {
  workHover2.style.transform = "scale(1)";
  video2.play();
  work2.style.height = videoHeight2 + "px";
  work2.style.width = videoWidth2 + "px";
  video2.style.borderRadius = "5%";
};
// Video 3
containerHover3.onmouseover = () => {
  workHover3.style.transform = "scale(1)";
  video3.play();
  work3.style.height = videoHeight3 + "px";
  work3.style.width = videoWidth3 + "px";
  video3.style.borderRadius = "5%";
};

// Funzioni di uscita dall'hover
// Video 1
containerHover1.onmouseout = () => {
  workHover1.style.transform = "scale(0)";
  video1.load();
  video1.style.borderRadius = "0%";
};
// Video 2
containerHover2.onmouseout = () => {
  workHover2.style.transform = "scale(0)";
  video2.load();
  video2.style.borderRadius = "0%";
};
// Video 3
containerHover3.onmouseout = () => {
  workHover3.style.transform = "scale(0)";
  video3.load();
  video3.style.borderRadius = "0%";
};

//////////// Animazione Titolo Servizi ////////////
// Importo e registro plugin
gsap.registerPlugin(ScrollTrigger);

gsap.from(".char5", {
  duration: 0.5,
  stagger: 0.05,
  y: "270px",
  scrollTrigger: {
    trigger: ".titolo-servizi",
    start: "top 70%",
    toggleActions: "restart none none reverse",
    end: "top 100%",
    markers: false,
  },
});
gsap.from(".char6", {
  duration: 0.5,
  stagger: 0.05,
  y: "170px",
  scrollTrigger: {
    trigger: ".titolo-servizi",
    start: "top 70%",
    toggleActions: "restart none none reverse",
    end: "top 100%",
    markers: false,
  },
});
gsap.from(".char7", {
  duration: 0.5,
  stagger: 0.05,
  y: "170px",
  scrollTrigger: {
    trigger: ".titolo-servizi",
    start: "top 70%",
    toggleActions: "restart none none reverse",
    end: "top 100%",
    markers: false,
  },
});

//////////// Animazione Titolo Work ////////////
gsap.from(".char8", {
  duration: 0.5,
  stagger: 0.05,
  y: "270px",
  scrollTrigger: {
    trigger: ".col-70",
    start: "top 70%",
    toggleActions: "restart none none reverse",
    end: "top 100%",
    markers: false,
  },
});
gsap.from(".char9", {
  duration: 0.5,
  stagger: 0.05,
  y: "270px",
  scrollTrigger: {
    trigger: ".col-70",
    start: "top 70%",
    toggleActions: "restart none none reverse",
    end: "top 100%",
    markers: false,
  },
});
