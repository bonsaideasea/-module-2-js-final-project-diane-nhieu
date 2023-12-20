const recordBtn = document.getElementById('captureBtn');

function getMic(){ 
    recordBtn.onclick = function(){   // when the button capture is clicked...
      recordBtn.classList.add("active");
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext()

      navigator.mediaDevices.getUserMedia({audio:true}) // this begins to gather microphone input
          .then(function(stream){
            const source = audioContext.createMediaStreamSource(stream); // the mic input is stored as audio data in a new node called "source"
            const pitchAnalyzer = audioContext.createAnalyser(); // a new node now can display audio time, frequency data, and can create data visualizations
            source.connect(pitchAnalyzer);  //connects source to pitch analyzer and stores data as an object
            pitchAnalyzer.connect(audioContext.destination);
            let audioData = pitchAnalyzer.fftSize = 512; // passing in 512 bins or number of samples
            const bufferLength = pitchAnalyzer.frequencyBinCount; // contains data values from pitchAnalyzer. 1/2 of fftSize so we get 256 animated bars
            const frequencyData = new Uint8Array(bufferLength); // converts data into special type of array, UInt8Array, something about 8 integers 
            let frequencyDataArray = [];
            for (let i = 0; i <= frequencyData[100]; i++) {
              frequencyDataArray.push(frequencyData[i]);
            }

            function getPitchFrequency() {
                requestAnimationFrame(getPitchFrequency); //starts animating this function which gets pitch frequency
                pitchAnalyzer.getByteFrequencyData(frequencyData); // places frequency data into pitchAnalyzer node to display out 256 bars. think #/256.
                const maxFrequency = Math.max(...frequencyData);
                console.log(maxFrequency);
              }
            getPitchFrequency('');
            })
          .catch(function(err) {
            console.error(`you got an error: ${err}`);
          });
     };  
};
getMic();

