let port;

/**
 * Connects to the serial port.
 */
function connect() {
    if (port) {
        console.log(port + ' disconnected.');
        port.disconnect();
        $("#connect").html('Connect');
        port = null;
    }
    else {
        serial.requestPort().then(selectedPort => {
            port = selectedPort;
            port.connect().then(() => {
                console.log(port + ' connected.');
                $("#connect").html('Disconnect');
                port.onReceive = data => {
                    let textDecoder = new TextDecoder();
                    alert(textDecoder.decode(data));
                }

                port.onReceiveError = error => {
                    console.error('Receive error: ' + error);
                };
            }, error => {
                console.error('Connection error: ' + error);
            });
        }).catch(error => {
            console.error('Connection error: ' + error);
        });
    }
}

// function postMessage() {
//     // Send a POST request to the backend with the message '1'
//     fetch('/data', {
//         method: 'POST',
//         body: JSON.stringify({ message: '1' }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Message sent successfully');
//         } else {
//             console.error('Failed to send message');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

$("#test").click(() => {
    // Send a POST request to the backend with the message '1'
    fetch('/data', {
        method: 'POST',
        body: JSON.stringify({ message: '1' }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Message sent successfully');
        } else {
            console.error('Failed to send message');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
