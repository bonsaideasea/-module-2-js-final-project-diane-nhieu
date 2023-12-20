// connecting keys to sound by mouse or pad clicks
const pianoNotes = document.querySelectorAll('.piano-keys .key');
let audio = new Audio('tunes/a.wav'); 

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; 
    audio.play(); 

    const clickedKey = document.querySelector(`[data-key=${key}]`); 
    clickedKey.classList.add("active"); 
    setTimeout(() => {
        clickedKey.classList.remove('active')
    }, 300);
}

let allKeys = []; 
pianoNotes.forEach(key => {  
    allKeys.push(key.dataset.key);
    key.addEventListener('click', () => playTune(key.dataset.key)) 
})


// connecting keys to sound by keyboard 
const pressedKey = (e) => {
    if(allKeys.includes(e.key))playTune(e.key);
}
document.addEventListener('keydown', pressedKey); 


// controlling the volume 
const volumeSlider = document.querySelector('.volume-slider input');
const changeVolume = (e) => {
    audio.volume = e.target.value;
}
volumeSlider.addEventListener('input', changeVolume);


// hide or show notes associate with each key
const noteToggle = document.querySelector('.notes-toggle input');
const showNotes = () => {
    pianoNotes.forEach(key => key.classList.toggle('hide'));
}
noteToggle.addEventListener('input', showNotes);
