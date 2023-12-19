// setting up the piano
const pianoNotes = document.querySelectorAll('.piano-keys .key');
const volumeSlider = document.querySelector('.volume-slider input');
const keyCheckbox = document.querySelector('.keys-checkbox input');


let allKeys = [],
audio = new Audio('tunes/a.wav'); 

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key=${key}]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove('active')
    }, 150);
}
 
pianoNotes.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener('click', () => playTune(key.dataset.key))
})


const showNotes = () => {
    pianoNotes.forEach(key => key.classList.toggle('hide'));
}

const pressedKey = (e) => {
    if(allKeys.includes(e.key))playTune(e.key);
}

keyCheckbox.addEventListener('input', showNotes);
volumeSlider.addEventListener('input', changeVolume);
document.addEventListener('keydown', pressedKey);
