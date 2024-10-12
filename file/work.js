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

// Recupero titolo WORK
const workH1 = document.querySelector('.work_h1').textContent;
createMenuLink(workH1, '.work_h1', 'line', 'word', 'char10');

// Animazione per singolo carattere titolo WORK
gsap.fromTo('.char10', {
    y: 400
},
{
    delay: 0.1,
    duration: 0.6,
    y: 0,
    stagger: 0.1,
    ease: "power3.out",
})

// Animazione Hover Sezione Video
// Recupero tutti i componenti che mi servono
// Container video
const videoHover1 = document.querySelector('.video_hover1');
const videoHover2 = document.querySelector('.video_hover2');
const videoHover3 = document.querySelector('.video_hover3');
const video1 = document.querySelector('.video_workPage1');
const video2 = document.querySelector('.video_workPage2');
const video3 = document.querySelector('.video_workPage3');
const testo1 = document.querySelectorAll('.info_video_testo1');
const testo2 = document.querySelectorAll('.info_video_testo2');
const testo3 = document.querySelectorAll('.info_video_testo3');
const titoloVideo1 = document.querySelectorAll('.video_info_h3_1');
const titoloVideo2 = document.querySelectorAll('.video_info_h3_2');
const titoloVideo3 = document.querySelectorAll('.video_info_h3_3');
const pointer1 = document.querySelector('.container_arrow1');
const pointer2 = document.querySelector('.container_arrow2');
const pointer3 = document.querySelector('.container_arrow3');
const frecciaVideo1 = document.querySelector('.video_info_arrow1');
const frecciaVideo2 = document.querySelector('.video_info_arrow2');
const frecciaVideo3 = document.querySelector('.video_info_arrow3');
const infoVideoLeft1 = document.querySelector('.info_video_left1');
const infoVideoLeft2 = document.querySelector('.info_video_left2');
const infoVideoLeft3 = document.querySelector('.info_video_left3');

////////// Imposto posizione iniziale video 1 //////////
video1.style.transform = 'translateY(100%)'

////////// Imposto posizione iniziale video 2 //////////
video2.style.transform = 'translateY(100%)'

////////// Imposto posizione iniziale video 3 //////////
video3.style.transform = 'translateY(100%)'

////////// Media Query in JS per controllo animazioni //////////
// Creo una media query per schermi di grandezza minima di 1101px
const mediaQuery = window.matchMedia('(min-width: 1101px)');

// Creo una funzione che contolli se la media query è verificata oppure no
function handleWindowWidthChange(mdq) {
    // Se la media query è vera
    if (mdq.matches){
        ////////// Animazioni ed eventi video 1 //////////
        videoHover1.style.display = 'block'
        videoHover1.addEventListener('mouseover', () => {
    
            testo1.forEach((text) => {
                text.classList.add('text_difference');
            })
            
            titoloVideo1.forEach((title) => {
                title.classList.add('text_difference')
            })
            
            infoVideoLeft1.classList.add('text_difference');
            pointer1.classList.add('text_difference');
            // frecciaVideo1.classList.add('text_difference');
            frecciaVideo1.classList.add('video_info_arrow_open');
        
            //// Codice per animare la freccia col movimento del mouse
            // Recuperato la funzione da qui https://www.cassie.codes/posts/making-a-lil-me-part-1/
            (function () {
                const safeToAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
                if (!safeToAnimate) return;
                
                // Get the elements that we need
                // const pointer1 = document.querySelector('.container_arrow1')
                
                let xPosition;
                let yPosition;
              
                let storedXPosition;
                let storedYPosition;
              
                // Set up our coordinate mapping with GSAP utils!
                let mapWidth;
                let mapHeight;
                function setMaps() {
                  mapWidth = gsap.utils.mapRange(0, innerWidth, -50, 50);
                  mapHeight = gsap.utils.mapRange(0, innerHeight, -50, 50);
                }
                window.addEventListener('resize', setMaps);
                setMaps();
              
                function movePointer() {
                  // only recalculating if the value changes
                  if (storedXPosition === xPosition && storedYPosition === yPosition) return;
              
                  gsap.to(pointer1, {
                    xPercent: xPosition,
                    yPercent: yPosition,
                    // ease: 'none',
                    // ease: 'power4.out',
                    // ease: 'power4.in'
                    ease: 'linear'
                  })
              
                  // update the stored positions with the current positions
                  storedXPosition = xPosition;
                  storedYPosition = yPosition;
                }
                // gsap's RAF, falls back to set timeout
                gsap.ticker.add(movePointer);
              
                // updating the mouse coordinates
                function updateMouseCoords(event) {
                  xPosition = mapWidth(event.clientX);
                  yPosition = mapHeight(event.clientY);
                }
                window.addEventListener("mousemove", updateMouseCoords);
            })();
        
            gsap.fromTo(video1, {
                y: '100%'
            },
            {
                duration: 0.7,
                y: '0%',
                ease: "power4.out",    
            })
        
            gsap.fromTo(infoVideoLeft1, {
                x: 0
            },
            {
                duration: 0.5,
                x: 40,
                ease: 'power4.out'
            })
        })
        
        videoHover1.addEventListener('mouseleave', () => {
            
            testo1.forEach((text) => {
                text.classList.remove('text_difference');
            })
            
            titoloVideo1.forEach((title) => {
                title.classList.remove('text_difference')
            })
            
            frecciaVideo1.classList.remove('text_difference');
            frecciaVideo1.classList.remove('video_info_arrow_open');
        
            gsap.fromTo(video1, {
                y: '0%'
            },
            {
                duration: 0.7,
                y: '100%',
                ease: "power3.out",    
            })
        
            gsap.fromTo(infoVideoLeft1, {
                x: 40
            },
            {
                duration: 0.5,
                x: 0,
                ease: 'power4.out'
            })
        })

        ////////// Animazioni ed eventi video 2 //////////
        videoHover2.style.display = 'block'
        videoHover2.addEventListener('mouseover', () => {
    
            testo2.forEach((text) => {
                text.classList.add('text_difference');
            })
            
            titoloVideo2.forEach((title) => {
                title.classList.add('text_difference')
            })
            
            infoVideoLeft2.classList.add('text_difference');
            pointer2.classList.add('text_difference');
            // frecciaVideo3.classList.add('text_difference');
            frecciaVideo2.classList.add('video_info_arrow_open');
        
            //// Codice per animare la freccia col movimento del mouse
            (function () {
                const safeToAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
               if (!safeToAnimate) return;
                
                // Get the elements that we need
                // const pointer3 = document.querySelector('.container_arrow1')
                
                let xPosition;
                let yPosition;
              
                let storedXPosition;
                let storedYPosition;
              
                // Set up our coordinate mapping with GSAP utils!
                let mapWidth;
                let mapHeight;
                function setMaps() {
                  mapWidth = gsap.utils.mapRange(0, innerWidth, -50, 50);
                  mapHeight = gsap.utils.mapRange(0, innerHeight, -50, 50);
                }
                window.addEventListener('resize', setMaps);
                setMaps();
              
                function movePointer() {
                  // only recalculating if the value changes
                  if (storedXPosition === xPosition && storedYPosition === yPosition) return;
              
                  gsap.to(pointer2, {
                    xPercent: xPosition,
                    yPercent: yPosition,
                    // ease: 'none',
                    // ease: 'power4.out',
                    // ease: 'power4.in'
                    ease: 'linear'
                  })
              
                  // update the stored positions with the current positions
                  storedXPosition = xPosition;
                  storedYPosition = yPosition;
                }
                // gsap's RAF, falls back to set timeout
                gsap.ticker.add(movePointer);
              
                // updating the mouse coordinates
                function updateMouseCoords(event) {
                  xPosition = mapWidth(event.clientX);
                  yPosition = mapHeight(event.clientY);
                }
                window.addEventListener("mousemove", updateMouseCoords);
            })();
        
            gsap.fromTo(video2, {
                y: '100%'
            },
            {
                duration: 0.7,
                y: '0%',
                ease: "power4.out",    
            })
        
            gsap.fromTo(infoVideoLeft2, {
                x: 0
            },
            {
                duration: 0.5,
                x: 40,
                ease: 'power4.out'
            })
        })
        
        videoHover2.addEventListener('mouseleave', () => {
            
            testo2.forEach((text) => {
                text.classList.remove('text_difference');
            })
            
            titoloVideo2.forEach((title) => {
                title.classList.remove('text_difference')
            })
            
            frecciaVideo2.classList.remove('text_difference');
            frecciaVideo2.classList.remove('video_info_arrow_open');
        
            gsap.fromTo(video2, {
                y: '0%'
            },
            {
                duration: 0.7,
                y: '100%',
                ease: "power3.out",    
            })
        
            gsap.fromTo(infoVideoLeft2, {
                x: 40
            },
            {
                duration: 0.5,
                x: 0,
                ease: 'power4.out'
            })
        })
        
        ////////// Animazioni ed eventi video 3 //////////
        videoHover3.style.display = 'block'
        videoHover3.addEventListener('mouseover', () => {
    
            testo3.forEach((text) => {
                text.classList.add('text_difference');
            })
            
            titoloVideo3.forEach((title) => {
                title.classList.add('text_difference')
            })
            
            infoVideoLeft3.classList.add('text_difference');
            pointer3.classList.add('text_difference');
            // frecciaVideo3.classList.add('text_difference');
            frecciaVideo3.classList.add('video_info_arrow_open');
        
            //// Codice per animare la freccia col movimento del mouse
            (function () {
                const safeToAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
               if (!safeToAnimate) return;
                
                // Get the elements that we need
                // const pointer3 = document.querySelector('.container_arrow1')
                
                let xPosition;
                let yPosition;
              
                let storedXPosition;
                let storedYPosition;
              
                // Set up our coordinate mapping with GSAP utils!
                let mapWidth;
                let mapHeight;
                function setMaps() {
                  mapWidth = gsap.utils.mapRange(0, innerWidth, -50, 50);
                  mapHeight = gsap.utils.mapRange(0, innerHeight, -50, 50);
                }
                window.addEventListener('resize', setMaps);
                setMaps();
              
                function movePointer() {
                  // only recalculating if the value changes
                  if (storedXPosition === xPosition && storedYPosition === yPosition) return;
              
                  gsap.to(pointer3, {
                    xPercent: xPosition,
                    yPercent: yPosition,
                    // ease: 'none',
                    // ease: 'power4.out',
                    // ease: 'power4.in'
                    ease: 'linear'
                  })
              
                  // update the stored positions with the current positions
                  storedXPosition = xPosition;
                  storedYPosition = yPosition;
                }
                // gsap's RAF, falls back to set timeout
                gsap.ticker.add(movePointer);
              
                // updating the mouse coordinates
                function updateMouseCoords(event) {
                  xPosition = mapWidth(event.clientX);
                  yPosition = mapHeight(event.clientY);
                }
                window.addEventListener("mousemove", updateMouseCoords);
            })();
        
            gsap.fromTo(video3, {
                y: '100%'
            },
            {
                duration: 0.7,
                y: '0%',
                ease: "power4.out",    
            })
        
            gsap.fromTo(infoVideoLeft3, {
                x: 0
            },
            {
                duration: 0.5,
                x: 40,
                ease: 'power4.out'
            })
        })
        
        videoHover3.addEventListener('mouseleave', () => {
            
            testo3.forEach((text) => {
                text.classList.remove('text_difference');
            })
            
            titoloVideo3.forEach((title) => {
                title.classList.remove('text_difference')
            })
            
            frecciaVideo3.classList.remove('text_difference');
            frecciaVideo3.classList.remove('video_info_arrow_open');
        
            gsap.fromTo(video3, {
                y: '0%'
            },
            {
                duration: 0.7,
                y: '100%',
                ease: "power3.out",    
            })
        
            gsap.fromTo(infoVideoLeft3, {
                x: 40
            },
            {
                duration: 0.5,
                x: 0,
                ease: 'power4.out'
            })
        })
    }
    // Se la media query non è rispettata => nessuna animazione
    else {
        videoHover1.style.display = 'none'
        videoHover2.style.display = 'none'
        videoHover3.style.display = 'none'
    }
}

// Aggiungo un eventListner alla media query per catturare i cambi di grandezza nel tempo e non solo la prima volta al caricamento di pagina
mediaQuery.addEventListener('change', handleWindowWidthChange);

// Richiamo la funzione una volta al caricamento di pagina per fargli controllare subito la larghezza dello schermo
handleWindowWidthChange(mediaQuery);