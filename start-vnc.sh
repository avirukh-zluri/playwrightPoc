#!/bin/bash

# Start Xvfb
Xvfb :99 -screen 0 1920x1080x24 &

# Wait for Xvfb to start
sleep 2

# Start window manager
fluxbox &

# Start VNC server
x11vnc -display :99 -nopw -forever -shared &

# Start noVNC
/usr/share/novnc/utils/launch.sh --vnc localhost:5900 --listen 6080 &

# Wait for services to start
sleep 5

# Keep the script running
tail -f /dev/null