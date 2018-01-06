var net = require('net');
var zlib = require('zlib');

var inflate = new zlib.Inflate();

var HOST = '198.50.245.94';
var PORT = 7455;


//var HOST = '127.0.0.1';
//var PORT = 6970;

var Speaker = require('speaker');
 
// Create the Speaker instance 
var speaker = new Speaker({
	channels: 1,          // 2 channels 
	bitDepth: 16,         // 16-bit samples 
	sampleRate: 16000     // 44,100 Hz sample rate 
});


var client = new net.Socket();

client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	var theObject = new Object();
	theObject.type = "id";
	theObject.msg = "5862";
	client.write(JSON.stringify(theObject));
	theObject = new Object();
	client.pipe(speaker);

});



client.on('data', function(data) {
	
	//console.log('DATA: ' + data);

	
    // client.destroy();
	
});

	
client.on('error', function(error) {
    console.log(error);
    // client.destroy();
	
});



// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

