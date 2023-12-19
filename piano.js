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

const changeVolume = (e) => {
    audio.volume = e.target.value;
}

const showNotes = () => {
    pianoNotes.forEach(key => key.classList.toggle('hide'));
}

const pressedKey = (e) => {
    if(allKeys.includes(e.key))playTune(e.key);
}

keyCheckbox.addEventListener('input', showNotes);
volumeSlider.addEventListener('input', changeVolume);
document.addEventListener('keydown', pressedKey);

 
function getMic(){ 
    var captureBtn = document.getElementById('captureBtn'); 
    captureBtn.onclick = function(){   // when the button capture is clicked...
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext()

      navigator.mediaDevices.getUserMedia({audio:true}) // this begins to gather microphone input
          .then(function(stream){
            const source = audioContext.createMediaStreamSource(stream); // the mic input is stored as audio data in a new node called "source"
            const pitchAnalyzer = audioContext.createAnalyser(); // a new node now can display audio time, frequency data, and can create data visualizations
            source.connect(pitchAnalyzer);  //connects source to pitch analyzer and stores data as an object
            let audioData = pitchAnalyzer.fftSize = 512; // passing in 512 bins or number of samples
            const bufferLength = pitchAnalyzer.frequencyBinCount; // contains data values from pitchAnalyzer. 1/2 of fftSize so we get 256 animated bars
            const frequencyData = new Uint8Array(bufferLength); // converts data into special type of array, UInt8Array, something about 8 integers
            let frequencyDataArray = [];
            for (let i = 0; i <= frequencyData[100]; i++) {
              frequencyDataArray.push(frequencyData[i]);
            }
          })
          .catch(function(err) {
            console.error(`you got an error: ${err}`);
          }); 
      };
    };
getMic();