
//Create a simple server using the core ‘node:http’ module that can handle multiple concurrent requests. 

//Each request should respond with a message after a random delay (simulating some asynchronous operation) without blocking the server.


//The server should be configured to handle CORS.
//Provide a GET route that when hit, returns information about the user’s CPU and OS (any information you’d like to return).



// Importing the 'createServer' function from the 'node:http' module and the os to get the information
import { createServer } from 'node:http';
import os from 'os';

// Retrieving the CPU model of the first CPU core and the operating system type
const os_model = os.cpus()[0].model;
const os_type = os.type();

// Defining the port number that the server will listen on.
const port = 3000;

// Creating an HTTP server using 'createServer'
const server = createServer(async (req, res) => {
  // Defining CORS headers to allow cross-origin requests
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": false
  };

  // Handling preflight requests for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  // Handling GET requests to the root URL '/'
  if (req.method === 'GET' && req.url === '/') {

    // Generating a random delay time between 2000 and 5000 milliseconds
    const delayTime = Math.floor(Math.random() * (5000 - 2000) + 2000);

    // Introducing a delay using a Promise and setTimeout to simulate asynchronous operation
    await new Promise(resolve => setTimeout(resolve, delayTime));

    // Sending the response with CPU model and OS type information
    res.writeHead(200, headers, { 'Content-Type': 'text/plain' });
    res.end(`os model: ${os_model} \n os_type: ${os_type}`);
  } else {

    // Responding with 404 for requests to unknown routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

// Starting the server and listening on the specified port
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

