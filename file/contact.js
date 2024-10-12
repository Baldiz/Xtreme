// Funzione per separare un testo in righe
// Codice sotto ispirato dal plugin SplitType
function createWord(content, containerSelector, newWordClass, charClass) {

    // Recupero il contenitore
    const container = document.querySelector(containerSelector);
    // Pulizia del contenuto precedente del contenitore
    container.innerHTML = '';

    // Divido il contenuto in un array di parole
    const wordArray = content.split(' ');

    // Creazione di un div per contenere tutte le parole
    const wordContainer = document.createElement('div');
    wordContainer.className = 'word-container'; // Aggiungi una classe per lo stile
    wordContainer.style.display = 'flex';
    wordContainer.style.gap = '30px';

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
            charDiv.className = charClass;
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

// Recupero il titolo ABOUT
const titoloContact = document.querySelector('.titolo_contact').textContent;
createWord(titoloContact, '.titolo_contact', 'word1', 'char13')

// Animazione per singolo carattere titolo CONTACT
gsap.fromTo('.char13', {
    y: 300
},
{
    delay: 2,
    duration: 0.6,
    y: 0,
    stagger: 0.1,
    ease: "power3.out",
})