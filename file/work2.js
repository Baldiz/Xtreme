gsap.registerPlugin(ScrollTrigger);

let mmPillsbury = gsap.matchMedia()

////////////// Video Player //////////////
const playPauseBtn = document.querySelector('.play_pause_btn');
const miniPlayerBtn = document.querySelector('.mini_player_btn');
const theaterBtn = document.querySelector('.theater_btn');
const fullScreenBtn = document.querySelector('.full_screen_btn');
const muteBtn = document.querySelector('.mute_btn');
const volumeSlider = document.querySelector('.volume_slider');
const currentTimeElem = document.querySelector('.current_time');
const totalTimeElem = document.querySelector('.total-time');
const captionsBtn = document.querySelector('.captions_btn');
const speedBtn = document.querySelector('.speed_btn');
const previewImg = document.querySelector('.preview-img');
const thumbnailImg = document.querySelector('.thumbnail-img');
const timelineContainer = document.querySelector('.timeline_container');
const video = document.querySelector('video');
const containerVideo = document.querySelector('.container_video_works')

document.addEventListener('keydown', e => {
    const tagName = document.activeElement.tagName.toLowerCase()

    if(tagName === 'input') return

    switch (e.key.toLowerCase()){
        case ' ':
            if(tagName === 'button') return
        case 'k':
            togglePlay()
            break
        case 'f':
            toggleFullScreenMode()
            break
        case 't':
            toggleTheaterMode()
            break
        case 'i':
            toggleMiniPlayerrMode()
            break
        case 'm':
            toogleMute()
            break
        case 'arrowleft':
        case 'j':
            skip(-5)
            break
        case 'arrowright':
        case 'l':
            skip(5)
            break
        case 'c':
            toggleCaptions()
            break
    }
})

// Timeline
timelineContainer.addEventListener('mousemove', handleTimelineUpdate)
timelineContainer.addEventListener('mousedown', toggleScrubbing)
document.addEventListener('mouseup', e => {
    if(isScrubbing) toggleScrubbing(e)
})
document.addEventListener('mousemove', e => {
    if(isScrubbing) handleTimelineUpdate(e)
})

let isScrubbing = false
let wasPaused
function toggleScrubbing(e){
    const rect = timelineContainer.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width

    isScrubbing = (e.buttons & 1) === 1
    containerVideo.classList.toggle('scrubbing', isScrubbing)

    if(isScrubbing){
        wasPaused = video.paused
        video.pause()
    } else {
        video.currentTime = percent * video.duration
        if(!wasPaused) video.play()
    }

    handleTimelineUpdate(e)
}

function handleTimelineUpdate(e){
    const rect = timelineContainer.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    // const previewImgNumber = Math.max(1, Math.floor((percent * video.duration) / 10))
    // const previewImgSrc = `asset/previreImg/preview${previewImgNumber}.jpg`
    // previewImg.src = previewImgSrc
    timelineContainer.style.setProperty('--preview-progress', percent)

    if(isScrubbing){
        e.preventDefault()
        // thumbnailImg.src = previewImgSrc
        // timelineContainer.style.setProperty('--progress-position', percent)
    }
}

// Play/Pause
playPauseBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)

function togglePlay() {
    video.paused ? video.play() : video.pause()
}

video.addEventListener('pause', () => {
    containerVideo.classList.add('paused')
})

video.addEventListener('play', () => {
    containerVideo.classList.remove('paused')
})

// Volume
muteBtn.addEventListener('click', toogleMute)
volumeSlider.addEventListener('input', e => {
    video.volume = e.target.value
    video.muted = e.target.value === 0
})

function toogleMute(){
    video.muted = !video.muted
}

let volumeLevel
volumeLevel = 'muted'
containerVideo.dataset.volumeLevel = volumeLevel

video.addEventListener('volumechange', () => {
    volumeSlider.value = video.volume
    if(video.muted || video.volume === 0){
        volumeSlider.value = 0
        volumeLevel = 'muted'
    } else if (video.volume >= 0.5){
        volumeLevel = 'high'
    } else {
        volumeLevel = 'low'
    }

    containerVideo.dataset.volumeLevel = volumeLevel
})

// Duration
video.addEventListener('timeupdate', () => {
    currentTimeElem.textContent = formatDuration(video.currentTime)
    const percent = video.currentTime / video.duration
    timelineContainer.style.setProperty('--progress-position', percent)
})

video.addEventListener('timeupdate', () => {
    totalTimeElem.textContent = formatDuration(video.duration)
})

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2,})
function formatDuration(time){
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
    if (hours === 0){
        return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    } else {
        return `${hours}: ${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
    }
}

function skip(duration){
    video.currentTime += duration
}

// Captions
// const captions = video.textTracks[0]
// captions.mode = 'hidden'

// captionsBtn.addEventListener('click', toggleCaptions)

// function toggleCaptions() {
//     const isHidden = captions.mode === 'hidden'
//     captions.mode = isHidden ? 'showing' : 'hidden'
//     containerVideo.classList.toggle('captions', isHidden)
// }

// Speed
speedBtn.addEventListener('click', changePlayBackSpeed)

function changePlayBackSpeed() {
    let newPlayBackRate = video.playbackRate + 0.25
    if(newPlayBackRate > 2) newPlayBackRate = 0.25
    video.playbackRate = newPlayBackRate
    speedBtn.textContent = `${video.playbackRate}x`
}

// View Modes
miniPlayerBtn.addEventListener('click', toggleMiniPlayerrMode)
theaterBtn.addEventListener('click', toggleTheaterMode)
fullScreenBtn.addEventListener('click', toggleFullScreenMode)

function toggleMiniPlayerrMode(){
    if(containerVideo.classList.contains('mini-player')){
        document.exitPictureInPicture()
    } else {
        video.requestPictureInPicture()
    }

    containerVideo.classList.remove('theater')
    containerVideo.classList.remove('full_screen')
}

containerVideo.addEventListener('enterpictureinpicture', () => {
    containerVideo.classList.add('mini-player')
})

containerVideo.addEventListener('leavepictureinpicture', () => {
    containerVideo.classList.remove('mini-player')
})

function toggleTheaterMode(){
    containerVideo.classList.toggle('theater')    
}

function toggleFullScreenMode(){
    if(document.fullscreenElement == null){
        containerVideo.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

document.addEventListener('fullscreenchange', () => {
    containerVideo.classList.toggle('full_screen', document.fullscreenElement)    
})

////////////// Slider //////////////
const wrapper = document.querySelector('.wrapper')
const firstImg = wrapper.querySelectorAll('img')[0]
const arrow = document.querySelectorAll('.fa-solid')
const arowContainer = document.querySelector('.arrow-carousel-container')

let isDragStart = false, prevPageX, prevScrollLeft

const showHideIcons = () => {
    if(wrapper.scrollLeft == 0){
        arrow[0].style.opacity = 0.5
    } else {
        arrow[0].style.opacity = 1
    }
    
    let scrollWidth = wrapper.scrollWidth - wrapper.clientWidth
    if(wrapper.scrollLeft == scrollWidth){
        arrow[1].style.opacity = 0.5
    } else {
        arrow[1].style.opacity = 1
    }
}

arrow.forEach(icon  => {
    icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 16
        if(icon.id == 'left'){
            wrapper.scrollLeft += -firstImgWidth
        } else {
            wrapper.scrollLeft += firstImgWidth
        }
    })
})

setInterval(() => showHideIcons(), 500)

const dragStart = (e) => {
    isDragStart = true
    prevPageX = e.pageX || e.touches[0].pageX
    prevScrollLeft = wrapper.scrollLeft
}

function dragging  (e) {
    if(!isDragStart) return;
    e.preventDefault()
    wrapper.classList.add('dragging')
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
    wrapper.scrollLeft = prevScrollLeft - positionDiff
    showHideIcons()
}

const dragStop = () => {
    isDragStart = false
    wrapper.classList.remove('dragging')
}

wrapper.addEventListener('mousedown', dragStart)
wrapper.addEventListener('touchstart', dragStart)
wrapper.addEventListener('mousemove', dragging)
wrapper.addEventListener('touchmove', dragging)
wrapper.addEventListener('mouseup', dragStop)
wrapper.addEventListener('mouseleave', dragStop)
wrapper.addEventListener('touchend', dragStop)

// Funzione per separare un testo in righe
// Codice sotto ispirato dal plugin SplitType
function createWord(content, containerSelector, newWordClass, newCharClass) {

    // Recupero il contenitore
    const container = document.querySelector(containerSelector);
    // Pulizia del contenuto precedente del contenitore
    container.innerHTML = '';

    // Divido il contenuto in un array di parole
    const wordArray = content.split(' ');

    // Creazione di un div per contenere tutte le parole
    const wordContainer = document.createElement('div');
    wordContainer.className = 'word-container-works'; // Aggiungi una classe per lo stile

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
            charDiv.className = newCharClass;
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

// Recupero il testo Overview
const overviewText = document.querySelector('.overview_text').textContent;
createWord(overviewText, '.overview_text', 'word1', 'char14')

/////////////// Codice JS Responsive ///////////////
mmPillsbury.add("(min-width: 1300px)", () => {
    // Animazione container servizi
    gsap.to(".container_servizio", {
        transform: 'translate(0, 0)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_service',
            start: 'top 50%',
            end: 'bottom 90%',
            markers: false,
            toggleActions: 'play none none none'    
        },
    });

    // Animazione testo servizio sopra a immagini
    gsap.to(".container_servizio_works", {
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 50%',
            end: 'bottom 90%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione immagini servizio
    gsap.to('.primaColonna_primaImg', {
        y: -100,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    gsap.to('.primaColonna_secondaImg', {
        y: -100,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    gsap.from('.secondaColonna_secondaImg', {
        y: 400,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    // Animazione caratteri e parole testo Overview
    gsap.fromTo('.char14', {
        y: 100
    },
    {
        scrollTrigger: {
            trigger:'.container_overview',
            start: 'top 60%',
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

    // Animazione titolo Slider
    gsap.from(".container_slider_servizio", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'top 60%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione Slider
    gsap.from(".wrapper", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'end 60%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

})

mmPillsbury.add("(min-width: 1101px) and (max-width: 1300px)", () => {
    // Animazione container servizi
    gsap.to(".container_servizio", {
        transform: 'translate(0, 0)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_service',
            start: 'top 70%',
            end: 'bottom 90%',
            markers: false,
            toggleActions: 'play none none none'    
        },
    });

    // Animazione testo servizio sopra a immagini
    gsap.to(".container_servizio_works", {
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 50%',
            end: 'bottom 90%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione immagini servizio
    gsap.to('.primaColonna_primaImg', {
        y: -150,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    gsap.to('.primaColonna_secondaImg', {
        y: -100,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    gsap.from('.secondaColonna_secondaImg', {
        y: 200,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    // Animazione caratteri e parole testo Overview
    gsap.fromTo('.char14', {
        y: 100
    },
    {
        scrollTrigger: {
            trigger:'.container_overview',
            start: 'top 70%',
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

    // Animazione titolo Slider
    gsap.from(".container_slider_servizio", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'top 70%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione Slider
    gsap.from(".wrapper", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'end 70%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });    
})

mmPillsbury.add("(min-width: 768px) and (max-width: 1100px)", () => {
    // Animazione container servizi
    gsap.to(".container_servizio", {
        transform: 'translate(0, 0)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_service',
            start: 'top 70%',
            end: 'bottom 90%',
            markers: false,
            toggleActions: 'play none none none'    
        },
    });

    // Animazione testo servizio sopra a immagini
    gsap.to(".container_servizio_works", {
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 50%',
            end: 'bottom 90%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione immagini servizio
    gsap.to('.primaColonna_primaImg', {
        y: -100,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    gsap.to('.primaColonna_secondaImg', {
        y: -100,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    gsap.from('.secondaColonna_secondaImg', {
        y: 200,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    // Animazione caratteri e parole testo Overview
    gsap.fromTo('.char14', {
        y: 100
    },
    {
        scrollTrigger: {
            trigger:'.container_overview',
            start: 'top 70%',
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

    // Animazione titolo Slider
    gsap.from(".container_slider_servizio", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'top 85%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione Slider
    gsap.from(".wrapper", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'end 85%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });    
})

mmPillsbury.add("(min-width: 481px) and (max-width: 767px)", () => {
    // Animazione container servizi
    gsap.to(".container_servizio", {
        transform: 'translate(0, 0)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_service',
            start: 'top 70%',
            end: 'bottom 90%',
            markers: false,
            toggleActions: 'play none none none'    
        },
    });

    // Animazione testo servizio sopra a immagini
    gsap.to(".container_servizio_works", {
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 70%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione immagini servizio
    gsap.to('.secondaColonna_primaImg', {
        y: -100,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    gsap.from('.secondaColonna_secondaImg', {
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    // Animazione caratteri e parole testo Overview
    gsap.fromTo('.char14', {
        y: 100
    },
    {
        scrollTrigger: {
            trigger:'.container_overview',
            start: 'top 70%',
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

    // Animazione titolo Slider
    gsap.from(".container_slider_servizio", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'top 85%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione Slider
    gsap.from(".wrapper", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'end 85%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });    
})

mmPillsbury.add("(max-width: 480px)", () => {
    // Animazione container servizi
    gsap.to(".container_servizio", {
        transform: 'translate(0, 0)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_service',
            start: 'top 70%',
            end: 'bottom 90%',
            markers: false,
            toggleActions: 'play none none none'    
        },
    });

    // Animazione testo servizio sopra a immagini
    gsap.to(".container_servizio_works", {
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: '1',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 70%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione immagini servizio
    gsap.to('.secondaColonna_primaImg', {
        y: -100,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    gsap.from('.secondaColonna_secondaImg', {
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: '.flex_photo_gallery',
            start: 'top 100%',
            end: 'bottom 0%',
            markers: false,
            scrub: true
        },
    })

    // Animazione caratteri e parole testo Overview
    gsap.fromTo('.char14', {
        y: 100
    },
    {
        scrollTrigger: {
            trigger:'.container_overview',
            start: 'top 70%',
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

    // Animazione titolo Slider
    gsap.from(".container_slider_servizio", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'top 85%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });

    // Animazione Slider
    gsap.from(".wrapper", {
        y: 200,
        opacity: '0',
        duration: 1,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: '.container_slider_servizio',
            start: 'end 85%',
            end: 'bottom 10%',
            markers: false,
            toggleActions: 'play none none none'
        },
    });    
})