Real-Time Location Tracking with Node.js, Express, Socket.IO, and Leaflet

This project is a real-time location tracking application built using Node.js, Express, Socket.IO, and Leaflet. The app allows multiple users to share and view their real-time locations on a shared map. Each connected user is represented by a unique marker, which updates dynamically on movement and is removed on disconnect.
Features

    Real-Time Location Sharing: Updates the user's location on the map instantly as they move.
    Unique Markers for Each Device: Each device has a unique marker on the map identified by a unique socketID.
    Device Disconnection Handling: Removes the user's marker when they disconnect from the application.
    WebSocket Communication: Real-time communication is powered by Socket.IO to ensure seamless updates.

Technologies Used

    Node.js: JavaScript runtime for server-side code execution.
    Express: Minimal and flexible Node.js framework for handling HTTP requests and responses.
    Socket.IO: Enables real-time, bi-directional communication between web clients and servers.
    Leaflet: JavaScript library for creating interactive maps.
    EJS: Template engine to render dynamic HTML content.

Getting Started

Follow these instructions to set up and run the project locally.
Prerequisites

    Node.js and npm should be installed on your machine.
    Ensure that all devices are connected to the same network (for local network testing).

Installation

    Clone the Repository:

git clone https://github.com/yourusername/location-tracker.git
cd location-tracker

Install Dependencies:

    npm install

Configuration

    Server Setup:
        The server is configured to use Socket.IO with CORS enabled to allow connections from any origin for testing purposes.

    Accessing via Local Network:
        For testing on multiple devices, use your local IP address instead of localhost. Example: http://192.168.x.x:3000.

Running the Server

    Start the Server:

    node app.js

    Access the App:
        On Your Computer: Open http://localhost:3000.
        On Mobile Devices or Other Computers: Use your computer's IP address in the URL, e.g., http://192.168.x.x:3000.

Exposing the Server Online (Optional)

To test the application remotely, use Ngrok to expose your local server online:

    Install Ngrok:

npm install -g ngrok

Start an HTTP Tunnel:

    ngrok http 3000

    Use the Public URL Provided by Ngrok.

Project Structure

location-tracker/
├── public/
│   ├── stylesheet/
│   │   └── style.css          # CSS for the frontend
│   └── js/
│       └── script.js          # Frontend JavaScript logic
├── views/
│   └── index.ejs              # Main HTML template
├── app.js                  # Express and Socket.IO server code
├── README.md                  # Project documentation
├── package-lock.json
└── package.json               # Dependencies and project metadata
_________
Code Overview
Server Code (app.js)

The server uses Express to serve the web app and Socket.IO for real-time communication. Key functionality includes:

   1) Handling Connections and Disconnections: Logs each new user connection and removes      disconnected users' markers.
   2) Receiving and Broadcasting Locations: Receives user locations and broadcasts them to all connected clients.

__________
Frontend Logic (public/js/script.js)

The frontend JavaScript handles:

   1) Getting User Location: Requests and watches the user's location, sending coordinates to the server via Socket.IO.
   2) Updating Map Markers: Updates the map with markers for each connected user, removing markers upon disconnection.    
___________
Troubleshooting

    1) Map not displaying or loading: Ensure your network connection is active and the Leaflet tile URL is correct.
    2) Cross-Device Connection Issues: Check that your mobile device and computer are on the same network, and use your computer's local IP address in place of localhost.
    3)Location Permission: Verify that the mobile device or desktop browser has allowed location access for the app.   