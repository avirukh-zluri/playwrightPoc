# Use official Playwright image with Node.js
FROM mcr.microsoft.com/playwright:v1.48.1-jammy

# Set non-interactive installation mode
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Install noVNC and other required packages
RUN apt-get update && apt-get install -y \
    x11vnc \
    xvfb \
    fluxbox \
    novnc \
    supervisor \
    tzdata \
    net-tools \
    && ln -fs /usr/share/zoneinfo/UTC /etc/localtime \
    && dpkg-reconfigure -f noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/*

# Set display
ENV DISPLAY=:99

# Set working directory
WORKDIR /tests

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Setup VNC and supervisor configurations
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY start-vnc.sh /usr/local/bin/start-vnc.sh
RUN chmod +x /usr/local/bin/start-vnc.sh

# Create required directories
RUN mkdir -p /var/log/supervisor

# Copy test files
COPY . .

# Expose noVNC port
EXPOSE 6080

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

