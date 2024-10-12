// Animazione preloader
// Blocco lo scroll di default durante l'animazione
document.body.classList.add('body-menu')

// Funzione per togliere il preloader
function finishedLoading() {
    const preloader = document.querySelector('.preloader')

    preloader.style.top = '-100%'
    preloader.style.boxShadow = 'none'
    document.body.classList.remove('body-menu')
}

// Al caricamento, aspetta e attiva funzione per togliere preloader
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        finishedLoading()
    }, 800)
})

////////////// Animazione Header //////////////
// Recupero l'header da HTML
const header = document.querySelector('header');
// Recupero inner header
const innerHeader = document.querySelector('.inner-header')
//Recupero il logo
const logo = document.querySelector('.nav-logo')

// Classi attive al caricamento di pagina
// Commentate perchè pare che non servano
// header.classList.add('header-top');
// innerHeader.classList.add('inner-header-top');
// logo.classList.add('nav-logo-top')

// Cambio classi allo scroll
window.addEventListener('scroll', () => {
    let scroll = window.scrollY
    if(scroll > 80){
        header.classList.add('header-bot');
        header.classList.remove('header-top');
        innerHeader.classList.add('inner-header-bot');
        innerHeader.classList.remove('inner-header-top');
        logo.classList.add('nav-logo-bot')
        logo.classList.remove('nav-logo-top')
    } else {
        header.classList.remove('header-bot');
        header.classList.add('header-top');
        innerHeader.classList.remove('inner-header-bot');
        innerHeader.classList.add('inner-header-top');
        logo.classList.remove('nav-logo-bot')
        logo.classList.add('nav-logo-top');
    }
})

// Mi salvo il valore dello scroll in una variabile
let scrollSalvato = window.scrollY;

// Creo la funzione che confronta l'ultimo valore dello scroll salvato nella variabile prima che entri nella funzione
// Con il valore dello scroll letto istantaneamente
// Se il valore salvato è più alto, scroll up
// Se il valore salvato è più basso, scroll down
window.addEventListener('scroll', () => {
    let scrollIstant = window.scrollY;
    if( scrollSalvato > scrollIstant){
        // scroll up
        header.classList.remove('header-scroll-down')
        header.classList.add('header-scroll-up')
    } else {
        // Scroll down
        header.classList.remove('header-scroll-up')
        header.classList.add('header-scroll-down')
    }
    scrollSalvato = scrollIstant;
})

//////////// Menu ////////////
// Recupero il link per aprire il menu
const menuLink = document.querySelector('.menu-link');
const menu = document.querySelector('.container-menu');

// Funzione per aprire e chiudere il menu bloccando anche lo scroll
menuLink.addEventListener('click', () => {
    // Classe che blocca lo scroll
    document.body.classList.toggle('body-menu')

    let scroll = window.scrollY
    if(scroll > 80){
        header.classList.toggle('header-bot');
        header.classList.toggle('header-top');
        innerHeader.classList.toggle('inner-header-bot');
        innerHeader.classList.toggle('inner-header-top');
        logo.classList.toggle('nav-logo-bot')
        logo.classList.toggle('nav-logo-top')
    } else {
        header.classList.remove('header-bot');
        header.classList.add('header-top');
        innerHeader.classList.remove('inner-header-bot');
        innerHeader.classList.add('inner-header-top');
        logo.classList.remove('nav-logo-bot')
        logo.classList.add('nav-logo-top');
    }

    if(document.body.classList.contains('body-menu')){
        tlAperturaMenu.restart()
    } else {
        tlChiusuraMenu.restart()
    }
})

// Recupero i link del menu
const linkInterniMenu = document.querySelectorAll('.mli');

// Funzioni forEach per aggiungere e togliere la classe dai link per cambiare colore all'hover
// Mouse Over
linkInterniMenu.forEach((link) => {
    link.addEventListener('mouseover', () => {

        linkInterniMenu.forEach((link) => {
            link.classList.add('menu-link-interno-hover')
        })

        link.classList.remove('menu-link-interno-hover')
    })
})
// Mouse Out
linkInterniMenu.forEach((link) => {
    link.addEventListener('mouseout', () => {

        linkInterniMenu.forEach((link) => {
            link.classList.remove('menu-link-interno-hover')
        })

    })
})

// Codice sotto ispirato dal codice html creato da SplitType
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

// Utilizzo della funzione per creare la prima voce di menu
const contentLink1 = document.querySelector('.split-1').textContent;
createMenuLink(contentLink1, '.split-1', 'line', 'word', 'char1');
// Utilizzo della funzione per creare la seconda voce di menu
const contentLink2 = document.querySelector('.split-2').textContent;
createMenuLink(contentLink2, '.split-2', 'line', 'word', 'char2');
// Utilizzo della funzione per creare la terza voce di menu
const contentLink3 = document.querySelector('.split-3').textContent;
createMenuLink(contentLink3, '.split-3', 'line', 'word', 'char3');
// Utilizzo della funzione per creare la quarta voce di menu
const contentLink4 = document.querySelector('.split-4').textContent;
createMenuLink(contentLink4, '.split-4', 'line', 'word', 'char4');

//////////// Creo le timeline ////////////
const tlAperturaMenu = gsap.timeline();
const tlChiusuraMenu = gsap.timeline();
// La metto in pausa al caricamento della pagina
tlChiusuraMenu.pause();
tlAperturaMenu.pause();

///////////// Timeline Chiusura Menu ////////////
// Animazione link fondo pagina responsive
// Passaggi per creare un animazione responsive
// Mi salvo in una variabile la funzione per creare e controllare le media queries
let mm = gsap.matchMedia()

// Alla variabile appena creata aggiungo (.add) una o più media queries
// Dopo la media query aggiungo una arrow function e all'interno aggiungo l'animazione, anche se in timeline come sotto
mm.add("(max-width: 900px)", () => {
    // Animazione link a fondo pagina
    // const tlChiusuraMenu = gsap.timeline();
    tlChiusuraMenu.fromTo('.link-menu', {
        x: 0
    },
    {
        duration: 0.4,
        x: 900
    
    })    
})

mm.add("(min-width: 901px)", () => {
    // Animazione link a fondo pagina
    // const tlAperturaMenu = gsap.timeline();
    tlChiusuraMenu.fromTo('.link-menu', {
        y: 0,
        opacity: 1
    },
    {
        duration: 0.3,
        y: 120,
        opacity: 0
    })
})  

// Animazione bordi blu
tlChiusuraMenu.fromTo('.border-blu', {
    x: 0,
},
{
    duration: 0.4,
    stagger: -0.15,
    ease: "slow(0.1,0.1,false)",
    x: '3000px'
}, "-=0.5")
// Animazione per singolo carattere voce menu 4
tlChiusuraMenu.fromTo('.char4', {
    y: 0,
},
{
    duration: 0.2,
    y: "-170px",
    stagger: -0.1,
    ease: "power3.in",
}, "-=0.9")
// Animazione per singolo carattere voce menu 3
tlChiusuraMenu.fromTo('.char3', {
    y: 0,
},
{
    duration: 0.2,
    y: "-170px",
    stagger: -0.1,
    ease: "power3.in",
}, "-=0.9")
// Animazione per singolo carattere voce menu 2
tlChiusuraMenu.fromTo('.char2', {
    y: 0,
},
{
    duration: 0.2,
    y: "-170px",
    stagger: -0.1,
    ease: "power3.in",
}, "-=0.9")
// Animazione per singolo carattere voce menu 1
tlChiusuraMenu.fromTo('.char1', {
    y: 0,
},
{
    duration: 0.2,
    y: "-170px",
    stagger: -0.1,
    ease: "power3.in",
}, "-=0.9")
// Animazione chiusura menu blu
tlChiusuraMenu.fromTo('.menu', {
    clipPath: "circle(100%)",
},
{
    duration: 0.1,
    position: "fixed",
    clipPath: "circle(0px at calc(100% - 136px) 73px)",
    ease: "linear",
    
}, "-=0.4")
// Animazione chiusra container menu bianco
tlChiusuraMenu.fromTo('.container-menu', {
    clipPath: "circle(100%)",
},
{
    duration: 0.1,
    position: "fixed",
    clipPath: "circle(0px at calc(100% - 136px) 73px)",
    ease: "linear",
    
}, "-=0.3")

///////////// Timeline Apertura Menu ////////////
// Animazione apertura container menu bianco
tlAperturaMenu.fromTo('.container-menu', {
    clipPath: "circle(0px at calc(100% - 136px) 73px)",
},
{
    duration: 0.1,
    position: "fixed",
    clipPath: "circle(100%)",
    ease: "linear",
    
})
// Animazione apertura menu blu
tlAperturaMenu.fromTo('.menu', {
    clipPath: "circle(0px at calc(100% - 136px) 73px)",
},
{
    duration: 0.1,
    position: "fixed",
    clipPath: "circle(100%)",
    ease: "linear",
    
})
// Animazione per singolo carattere voce menu 1
tlAperturaMenu.fromTo('.char1', {
    y: '170px'
},
{
    duration: 0.2,
    y: 0,
    stagger: 0.1,
    ease: "power3.out",

}, "+=0.3")
// Animazione per singolo carattere voce menu 2
tlAperturaMenu.fromTo('.char2', {
    y: '170px'
},
{
    duration: 0.2,
    y: 0,
    stagger: 0.1,
    ease: "power3.out",

}, "-=0.5")
// Animazione per singolo carattere voce menu 3
tlAperturaMenu.fromTo('.char3', {
    y: '170px'
},
{
    duration: 0.2,
    y: 0,
    stagger: 0.1,
    ease: "power3.out",

}, "-=0.5")
// Animazione per singolo carattere voce menu 4
tlAperturaMenu.fromTo('.char4', {
    y: '170px'
},
{
    duration: 0.2,
    y: 0,
    stagger: 0.1,
    ease: "power3.out",

}, "-=0.5")
// Animazione bordi blu
tlAperturaMenu.fromTo('.border-blu', {
    x: '-3000px'
},
{
    duration: 0.4,
    x: 0,
    stagger: 0.1,
    ease: "slow(0.1,0.1,false)"
    
}, "-=0.8")

// Animazione link fondo pagina responsive
mm.add("(max-width: 900px)", () => {
    // const tlAperturaMenu = gsap.timeline();
    // Animazione link a fondo pagina
    tlAperturaMenu.fromTo('.link-menu', {
        x: -900,
    },
    {
        duration: 0.3,
        x: 0
    }, "-=0.8")
})

mm.add("(min-width: 900px)", () => {
    // const tlAperturaMenu = gsap.timeline();
    // Animazione link a fondo pagina
    tlAperturaMenu.fromTo('.link-menu', {
        y: 120,
        opacity: 0
    },
    {
        duration: 0.3,
        y: 0,
        opacity: 1
    }, "-=0.8")
})  

////////////// Anno Copyright //////////////
// Recupero elemento da HTML dove inserire anno
const annoCopyright = document.querySelector('.anno_copyright');
// Recupero l'anno e lo salvo nella variabile anno
const data = new Date;
const anno = data.getFullYear()
// Inserisco la variabile anno nell'elemento HTML recuperato prima
annoCopyright.textContent = anno

////////////// Animazione logo footer//////////////
// Recupero gli elementi del logo
const cerchioInterno = document.querySelector('.cerchio-interno')
const logoAnimato = document.querySelector('.footer-logo-animato-quadrato')
// Imposto la posizione iniziale del cerchio interno
cerchioInterno.style.top = '-10px'
cerchioInterno.style.left = '55px'

logoAnimato.onmouseover = () => {
    cerchioInterno.style.top = '50px';
    cerchioInterno.style.left = '-95px'
}

logoAnimato.onmouseout = () => {
    cerchioInterno.style.top = '-10px';
    cerchioInterno.style.left = '55px' 
}