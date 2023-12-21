const referenceNoteFrequency = 440; //A4 the standard pitch
const referenceNoteName = 'A4';
const A = Math.pow(2, (1/12)); // constant of the formula

function calcFreq(refFreq, steps) {
    let result = refFreq * Math.pow(A, steps);
    return +(result).toFixed(4); // the + changes the string to a number
}

console.log(calcFreq(referenceNoteFrequency, -1));

//_____________________________________________________________________________________________//

const noteNameArray = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let startNote = 'D2';
let endNote = 'A6';

function createArrayOfNoteFrequencies(startNote, endNote) {
    let singerArray = [];
    let frequencyArray = [];

    let startOctave = parseInt(startNote.slice(-1));
    let endOctave = parseInt(endNote.slice(-1));
    // start octave should be a smaller value than end octave
    if (startOctave > endOctave) {
        return;
    }
    
    let startNoteName = startNote.slice(0, -1);
    let endNoteName = endNote.slice(0, -1);
    let noteNameArrayStartIndex = noteNameArray.indexOf(startNoteName);
    let noteNameArrayEndIndex = noteNameArray.indexOf(endNoteName);

    for (let octave = startOctave; octave <= endOctave; octave++) {
        if (octave === startOctave) {  //to start off the singerArray
            for (let i = noteNameArrayStartIndex; i <= noteNameArray.length; i++) {
                singerArray.push(noteNameArray[i] + octave);
            }
        } else if (octave === endOctave) {  //once it reaches the endOctave 
            for (let i = 0; i <= noteNameArrayEndIndex; i++){
                singerArray.push(noteNameArray[i] + octave);
            }
        } else {  //gathering the in between values
            noteNameArray.forEach((noteName) => {;
                singerArray.push(noteName + octave)
            });
        }
    }

    console.log(startOctave, endOctave);
    console.log(startNoteName, endNoteName);
    console.log(noteNameArrayStartIndex, noteNameArrayEndIndex);
    console.log(singerArray);
    
    // find frequencies for every note in array 
    let referenceNotePosition = singerArray.indexOf(referenceNoteName);
    let firstValue = -Math.abs(referenceNotePosition);
    console.log(referenceNotePosition, singerArray[referenceNotePosition], firstValue);
    let singerArrayIndex = 0;

    for (let i = firstValue; i < singerArray.length - referenceNotePosition; i++){
        frequencyArray.push(
            {
                'noteName': singerArray[singerArrayIndex],
                'frequency': calcFreq(referenceNoteFrequency, i)
            }
        );
        singerArrayIndex++;
    };
    console.log(frequencyArray);
    return frequencyArray;
}

createArrayOfNoteFrequencies('F#3', 'B7');

//_____________________________________________________________________________________________//

// for microphone to gather frequency 
function detectFrequency (){
    const audioContext = new AudioContext();

    navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
            const source = audioContext.createMediaStreamSource(stream);

            const pitchAnalyzer = audioContext.createAnalyser();
            pitchAnalyzer.fftSize = 2048;

            source.connect(pitchAnalyzer);

            const bufferLength = pitchAnalyzer.frequencyBinCount;
            const frequencyData = new Uint8Array(bufferLength);

            function getPitchFrequency(){ 
                requestAnimationFrame(getPitchFrequency);
                pitchAnalyzer.getByteFrequencyData(frequencyData);
                const maxFrequency = Math.max(...frequencyData);
                console.log(maxFrequency);
            }

            getPitchFrequency();
        })
        .catch(error => {
            console.error(error);
        })
}

