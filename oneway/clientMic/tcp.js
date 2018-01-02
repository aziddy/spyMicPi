
var client = new net.Socket();

client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	var theObject = new Object();
	theObject.type = "id";
	theObject.msg = "4477"; // PI
	client.write(JSON.stringify(theObject));
	//theObject = new Object();
	micInputStream.pipe(client);
	client.pipe(speaker);
	//theObject.type = "startPipe";
	//theObject.msg = "true";
	//client.write(JSON.stringify(theObject));
	//client.pipe(inflate).pipe(speaker);
});


// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
	try{
		var parsed = JSON.parse(data);	
		console.log(parsed.type);

		if(parsed.type == "startPipe"){
			//client.pipe(inflate).pipe(speaker);
		}

		if(parsed.type == "intial"){
			
		}

	}catch(e){
		//console.log(e);
	}
	//console.log('DATA: ' + data);
	
	
});

client.on('error', function(error) {
    console.log(error);
	
	//console.log('DATA: ' + data);
    // Close the client socket completely
    // client.destroy();
	
});

	
// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
