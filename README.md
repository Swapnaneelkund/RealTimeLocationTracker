Real-Time Location Tracking with Node.js, Express, Socket.IO, Leaflet, and Leaflet Routing

This project is a real-time location tracking application built using Node.js, Express, Socket.IO, and Leaflet. The app allows multiple users to share and view their real-time locations on a shared map. Each connected user is represented by a unique marker, which updates dynamically on movement and is removed on disconnect. The application also calculates and displays the shortest route from one user's location to another user's selected target location using Leaflet Routing.
Features

    Real-Time Location Sharing:
        Updates the user's location on the map instantly as they move.
        Real-time location updates are shared with all connected users.

    Unique Markers for Each Device:
        Each device has a unique marker on the map identified by a unique socketID.
        Markers persist across device reconnections.

    Device Disconnection Handling:![Screenshot from 2024-12-31 19-02-51](https://github.com/user-attachments/assets/f7c1047e-8628-4acf-8356-ede63658aa32)
![Screenshot from 2024-12-31 19-02-32](https://github.com/user-attachments/assets/b8757a76-efe2-4939-b4a6-ded9b3a3efee)
![Screenshot from 2024-12-31 19-01-35](https://github.com/user-attachments/assets/0aed6c34-4cd6-4a8a-89de-0d50bb53ec07)
![Screenshot from 2024-12-31 19-01-29](https://github.com/user-attachments/assets/ebba0689-0d6a-4e14-9276-6f6fab5e6456)
![Screenshot from 2024-12-31 18-58-36](https://github.com/user-attachments/assets/e30d3c20-24f2-41ae-8875-06c9f2030653)

        Removes the user's marker when they disconnect from the application.
        Ensures that the map remains accurate and updated.

    WebSocket Communication:
        Real-time communication is powered by Socket.IO to ensure seamless updates between the server and clients.

    Route Calculation:
        Users can select a target location.
        The shortest route from the current user's location to the selected target will be displayed using Leaflet Routing.

    Marker Persistence:
        User markers remain visible even after reconnections.
        The application ensures a smooth user experience with marker persistence across sessions.

Technologies Used

    Node.js: JavaScript runtime for server-side code execution.
    Express: Minimal and flexible Node.js framework for handling HTTP requests and responses.
    Socket.IO: Enables real-time, bi-directional communication between web clients and servers.
    Leaflet: JavaScript library for creating interactive maps.
    Leaflet Routing: Library to calculate and display routes between locations.
    EJS: Template engine to render dynamic HTML content.

Getting Started

Follow these instructions to set up and run the project locally.
Prerequisites

Before you begin, ensure you have the following:

    Node.js and npm should be installed on your machine.
    Devices connected to the same network (for local network testing).

Installation

    Clone the Repository:

git clone https://github.com/Swapnaneelkund/RealTimeLocationTracker.git
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

    Use the Public URL provided by Ngrok.


Code Overview
Server Code (app.js)

The server uses Express to serve the web app and Socket.IO for real-time communication. Key functionality includes:

    Handling Connections and Disconnections:
        Logs each new user connection and removes disconnected users' markers.

    Receiving and Broadcasting Locations:
        Receives user locations and broadcasts them to all connected clients.

    Handling Route Requests:
        Calculates the shortest route between users using Leaflet Routing.
        Broadcasts route information to connected clients.

Frontend Logic (public/js/script.js)

The frontend JavaScript handles:

    Getting User Location:
        Requests and watches the user's location, sending coordinates to the server via Socket.IO.

    Updating Map Markers:
        Updates the map with markers for each connected user, removing markers upon disconnection.

    Route Calculation:
        When a user selects a target, the shortest route from their location to the target is displayed on the map.

Example Usage

    Open the app in multiple devices.
    Move around your device to see the location updates in real-time.
    Select a target device on the map, and the shortest route to it will be displayed using Leaflet Routing.

Troubleshooting

Here are some common issues and solutions:

    Map not displaying or loading:
        Ensure your network connection is active and the Leaflet tile URL is correct.

    Cross-Device Connection Issues:
        Check that your mobile device and computer are on the same network.![Screenshot from 2024-12-31 19-02-51](https://github.com/user-attachments/assets/afcf85a9-8305-4b7b-99c5-d8502169f7a9)
![Screenshot from 2024-12-31 19-02-32](https://github.com/user-attachments/assets/3e2928c2-1030-42a2-9f34-d39f765e5b67)
![Screenshot from 2024-12-31 19-01-35](https://github.com/user-attachments/assets/9a861abb-05ff-4f34-a6ef-51602e6734f6)
![Screenshot from 2024-12-31 19-01-29](https://github.com/user-attachments/assets/774ada7c-3811-4494-b6d3-b6f73c001e5d)
![Screenshot from 2024-12-31 18-58-36](https://github.com/user-attachments/assets/f9afa031-3639-4459-8a15-8c449a1e8a86)

        Use your computer's local IP address in place of localhost.

    Location Permission:
        Verify that the mobile device or desktop browser has allowed location access for the app.

    Route Not Showing:
        Ensure Leaflet Routing is properly configured and the destination target is selected.
