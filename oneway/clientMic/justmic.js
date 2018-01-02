var mic = require('mic');
var fs = require('fs');

var Speaker = require('speaker');
 
// Create the Speaker instance 
var speaker = new Speaker({
  channels: 1,          // 2 channels 
  bitDepth: 16,         // 16-bit samples 
  sampleRate: 16000     // 44,100 Hz sample rate 
});
 
// PCM data from stdin gets piped into the speaker 
//process.stdin.pipe(speaker);
 
var micInstance = mic({ 'rate': '16000', 'channels': '1', 'debug': true, 'exitOnSilence': 6 });
var micInputStream = micInstance.getAudioStream();
 
//var outputFileStream = fs.WriteStream('output.raw');
 
micInputStream.pipe(speaker);
 
micInputStream.on('data', function(data) {
    console.log("Recieved Input Stream: " + data.length);
});
 
micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: " + err);
});
 
micInputStream.on('startComplete', function() {
        console.log("Got SIGNAL startComplete");
       /* setTimeout(function() {
                micInstance.pause();
            }, 5000);*/
    });
    
micInputStream.on('stopComplete', function() {
        console.log("Got SIGNAL stopComplete");
    });
    
micInputStream.on('pauseComplete', function() {
        console.log("Got SIGNAL pauseComplete");
        setTimeout(function() {
                micInstance.resume();
            }, 5000);
    });
 
micInputStream.on('resumeComplete', function() {
        console.log("Got SIGNAL resumeComplete");
        setTimeout(function() {
                micInstance.stop();
            }, 5000);
    });
 
micInputStream.on('silence', function() {
        console.log("Got SIGNAL silence");
    });
 
micInputStream.on('processExitComplete', function() {
        console.log("Got SIGNAL processExitComplete");
    });
 
micInstance.start();
