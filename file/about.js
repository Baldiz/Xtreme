// Impostare lo scroll a 0 al caricamento di pagina
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
  });
  
// Codice sotto ispirato dal plugin SplitType
function createMenuLink(content, containerSelector, lineClass, wordClass, charClass) {
    // Creazione dei div line e word
    const lineDiv = document.createElement('div');
    lineDiv.className = lineClass;
    lineDiv.style.display = 'block';
    lineDiv.style.textAlign = 'center';
    lineDiv.style.width = '100%';

    const wordDiv = document.createElement('div');
    wordDiv.className = wordClass;
    wordDiv.style.display = 'inline-flex';
    wordDiv.style.margin = '0';

    // Aggiungi il div word al div line
    lineDiv.appendChild(wordDiv);

    // Recupero il contenitore
    const container = document.querySelector(containerSelector);
    // Pulizia del contenuto precedente del contenitore
    container.innerHTML = '';

    // Ciclo attraverso ogni lettera della stringa content
    for(let i = 0; i < content.length; i++) {
        // Creazione di un div per ogni carattere
        const charDiv = document.createElement('div');
        charDiv.className = charClass;
        charDiv.style.display = 'inline-block';
        charDiv.innerText = content[i];

        // Aggiungi il div char al div word
        wordDiv.appendChild(charDiv);
    }

    // Aggiungi il div line al contenitore
    container.appendChild(lineDiv);
}
// Recupero il titolo ABOUT
const titoloAbout = document.querySelector('.titolo_about').textContent;
createMenuLink(titoloAbout, '.titolo_about', 'line', 'word', 'char11')

// Animazione per singolo carattere titolo ABOUT
gsap.fromTo('.char11', {
    y: 400
},
{
    delay: 0.1,
    duration: 0.6,
    y: 0,
    stagger: 0.1,
    ease: "power3.out",
})

// Creo animazione ScrollTrigger per fissare logo durante lo scroll
gsap.registerPlugin(ScrollTrigger);

// Prima parte di animazione per far scorrere .div_pin_logo lungo tutta la lunghezza di .container_logo_about usando come trigger di inizio e fine animazione .container_logo_about
gsap.to('.div_pin_logo', {
    scrollTrigger: {
        top: '50%',
        trigger: '.container_logo_about',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 4,
        pin: '.div_pin_logo',
        pinSpacing: false,
        markers: false,
        toggleActions: 'restart none reverse none'
    },
})

// Seconda parte di animazione per far scorrere .logo-quadrato lungo tutta la lunghezza di .div_pin_logo usando come trigger di inizio e fine animazione .container_testo_logo
gsap.to('.logo-quadrato', {
    y: '190%',
    scrollTrigger: {
        trigger: '.container_testo_logo',
        start: 'top 70%',
        end: 'bottom 90%',
        scrub: 1,
        markers: false,
        toggleActions: 'restart none reverse none'
    },
})

// Terza parte di animazione per creare animazione del logo ma allo scroll quindi .cerchio-interno scorre all'interno di .logo-quadrato
gsap.to('.cerchio-interno-about', {
    y: '178px',
    x: '-395px',
    ease: 'linear',
    scrollTrigger: {
        trigger: '.container_testo_logo',
        start: 'top 70%',
        end: 'bottom 90%',
        scrub: 1,
        markers: false,
        toggleActions: 'restart none reverse none'
    },
})

// Animazione container servizi
// Il .batch è come lo stagger per lo ScrollTrigger, doc qui https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.batch()/
ScrollTrigger.batch(".container_servizio", {
    onEnter: batch => gsap.to(batch, {
        transform: 'translate(0, 0)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
    }),
    trigger: '.container_servizio',
    start: 'top 90%',
    end: 'bottom 90%',
    markers: false,
    toggleActions: 'play none none none'
});

// Funzione per separare un testo in righe
// Codice sotto ispirato dal plugin SplitType
function createWord(content, containerSelector, newWordClass) {

    // Recupero il contenitore
    const container = document.querySelector(containerSelector);
    // Pulizia del contenuto precedente del contenitore
    container.innerHTML = '';

    // Divido il contenuto in un array di parole
    const wordArray = content.split(' ');

    // Creazione di un div per contenere tutte le parole
    const wordContainer = document.createElement('div');
    wordContainer.className = 'word-container'; // Aggiungi una classe per lo stile

    // Ciclo attraverso ogni parola dell'array
    for(let i = 0; i < wordArray.length; i++) {
        // Creazione di un div per ogni parola
        const newWord = document.createElement('div');
        newWord.className = newWordClass;
        newWord.style.display = 'inline-block';
        newWord.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'

        // Salvo ogni nuova parola in una variabile
        const newWordText = wordArray[i];
        // Divido il contenuto di ogni parole in un array di singoli caratteri
        const newWordArray = newWordText.split('')

        ///////////
        // Ciclo attraverso ogni carattere della singola parola 
        for(let i = 0; i < newWordArray.length; i++) {
            // Creazione di un div per ogni carattere
            const charDiv = document.createElement('div');
            charDiv.className = 'char12';
            charDiv.style.display = 'inline-block';
            // Inserisco dentro al div appena creato un carattere, così per tutti i caratteri
            charDiv.innerText = newWordArray[i];
    
            // Aggiungo il div char al div newWord
            newWord.appendChild(charDiv);
        }
    
        // Aggiungo il div della parola al contenitore
        wordContainer.appendChild(newWord);
    }

    // Aggiungo il contenitore di parole al contenitore principale
    container.appendChild(wordContainer);    
}

// function createWord(content, containerSelector, newWordClass) {

//     let containerTesto = document.querySelector('.text_about')
//     let testo = containerTesto.textContent || containerTesto.innerText;
//     let larghezzaContenitore = containerTesto.offsetWidth;
//     let parole = testo.split(' ');

//     let righe = [];
//     let rigaAttuale = '';
//     parole.forEach(parola => {
//         let testRiga = rigaAttuale + parola + ' ';
//         if (containerTesto.getBoundingClientRect().width >= larghezzaContenitore && rigaAttuale !== '') {
//         righe.push(rigaAttuale.trim());
//         rigaAttuale = '';
//         }
//         rigaAttuale += parola + ' ';
//     });

//     if (rigaAttuale !== '') {
//         righe.push(rigaAttuale.trim());
//     }

//     console.log(righe);

//     // Recupero il contenitore
//     const container = document.querySelector(containerSelector);
//     // Pulizia del contenuto precedente del contenitore
//     container.innerHTML = '';

//     // Divido il contenuto in un array di righe
//     const wordArray = content.split('\n');
//     console.log(wordArray)

//     // Creazione di un div per contenere tutte le parole
//     const wordContainer = document.createElement('div');
//     wordContainer.className = 'word-container'; // Aggiungi una classe per lo stile

//     // Ciclo attraverso ogni parola dell'array
//     for(let i = 0; i < wordArray.length; i++) {
//         // Creazione di un div per ogni parola
//         const newWord = document.createElement('div');
//         newWord.className = newWordClass;
//         newWord.style.display = 'inline-block';
//         newWord.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'

//         // Salvo ogni nuova parola in una variabile
//         const newWordText = wordArray[i];
//         // Divido il contenuto di ogni parole in un array di singoli caratteri
//         const newWordArray = newWordText.split('\n')

//         ///////////
//         // Ciclo attraverso ogni carattere della singola parola 
//         for(let i = 0; i < newWordArray.length; i++) {
//             // Creazione di un div per ogni carattere
//             const charDiv = document.createElement('div');
//             charDiv.className = 'char12';
//             charDiv.style.display = 'inline-block';
//             charDiv.style.marginRight = '5px';
//             // Inserisco dentro al div appena creato un carattere, così per tutti i caratteri
//             charDiv.innerText = newWordArray[i];
    
//             // Aggiungo il div char al div newWord
//             newWord.appendChild(charDiv);
//         }
    
//         // Aggiungo il div della parola al contenitore
//         wordContainer.appendChild(newWord);
//     }

//     // Aggiungo il contenitore di parole al contenitore principale
//     container.appendChild(wordContainer);    
// }


// Recupero il titolo ABOUT
const testoAbout = document.querySelector('.text_about').textContent;
createWord(testoAbout, '.text_about', 'newLine')

// Animazione caratteri e parole testo ABOUT
gsap.fromTo('.char12', {
    y: 100
},
{
    scrollTrigger: {
        trigger:'.hero_about',
        start: 'bottom 70%',
        end: 'bottom top',
        markers: false,
        toggleActions: 'play pause resume reverse'
    },
    delay: 0.1,
    duration: 1,
    y: 0,
    // stagger: 0.1,
    ease: "power3.out",
})