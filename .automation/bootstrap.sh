#!/bin/bash
# ============================================
# n8n Automation System - Bootstrap Script
# ============================================
# This script sets up the automation system on a fresh Ubuntu VPS
# Run as root or with sudo
#
# Usage: sudo bash bootstrap.sh
# ============================================

set -e

echo "============================================"
echo "n8n Automation System - Bootstrap"
echo "============================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    log_error "Please run as root (sudo bash bootstrap.sh)"
    exit 1
fi

# ============================================
# 1. System Updates
# ============================================
log_info "Updating system packages..."
apt-get update
apt-get upgrade -y

# ============================================
# 2. Install Docker
# ============================================
log_info "Installing Docker..."

# Remove old versions if present
apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# Install prerequisites
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start Docker
systemctl enable docker
systemctl start docker

log_info "Docker installed successfully"
docker --version

# ============================================
# 3. Install Docker Compose (standalone)
# ============================================
log_info "Installing Docker Compose..."

DOCKER_COMPOSE_VERSION="v2.24.0"
curl -SL "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

log_info "Docker Compose installed successfully"
docker-compose --version

# ============================================
# 4. Create Directory Structure
# ============================================
log_info "Creating directory structure..."

AUTOMATION_DIR="/opt/automation"
mkdir -p "${AUTOMATION_DIR}"
mkdir -p "${AUTOMATION_DIR}/n8n"
mkdir -p "${AUTOMATION_DIR}/repos"
mkdir -p "${AUTOMATION_DIR}/screenshots"
mkdir -p "${AUTOMATION_DIR}/lighthouse"
mkdir -p "${AUTOMATION_DIR}/logs"

# Set permissions
chown -R 1000:1000 "${AUTOMATION_DIR}"

log_info "Directories created at ${AUTOMATION_DIR}"

# ============================================
# 5. Install Git
# ============================================
log_info "Installing Git..."
apt-get install -y git

# Configure git
git config --global init.defaultBranch main
git config --global user.email "automation@localhost"
git config --global user.name "n8n Automation"

# ============================================
# 6. Install Node.js (for Lighthouse)
# ============================================
log_info "Installing Node.js..."

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

log_info "Node.js installed"
node --version
npm --version

# ============================================
# 7. Install Chromium and Lighthouse
# ============================================
log_info "Installing Chromium and Lighthouse..."

apt-get install -y chromium-browser

npm install -g lighthouse

log_info "Chromium and Lighthouse installed"
chromium-browser --version || chromium --version
lighthouse --version

# ============================================
# 8. Create Docker Compose File
# ============================================
log_info "Creating docker-compose.yml..."

cat > "${AUTOMATION_DIR}/docker-compose.yml" << 'EOF'
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=${N8N_BASIC_AUTH_ACTIVE:-true}
      - N8N_BASIC_AUTH_USER=${N8N_BASIC_AUTH_USER:-admin}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_BASIC_AUTH_PASSWORD}
      - N8N_HOST=${N8N_HOST:-0.0.0.0}
      - N8N_PORT=5678
      - N8N_PROTOCOL=${N8N_PROTOCOL:-http}
      - WEBHOOK_URL=${WEBHOOK_URL:-http://localhost:5678}
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - GENERIC_TIMEZONE=UTC
      - NODE_ENV=production
      # Pass automation environment variables
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - CLAUDE_API_KEY=${CLAUDE_API_KEY}
      - VERCEL_TOKEN=${VERCEL_TOKEN}
      - VERCEL_PROJECT_ID=${VERCEL_PROJECT_ID}
      - VERCEL_DEPLOY_HOOK_URL=${VERCEL_DEPLOY_HOOK_URL}
      - SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL}
      - DEFAULT_REPO=${DEFAULT_REPO}
    volumes:
      - n8n_data:/home/node/.n8n
      - ${AUTOMATION_DIR:-/opt/automation}/repos:/data/repos
      - ${AUTOMATION_DIR:-/opt/automation}/screenshots:/data/screenshots
      - ${AUTOMATION_DIR:-/opt/automation}/lighthouse:/data/lighthouse
      - ${AUTOMATION_DIR:-/opt/automation}/logs:/data/logs
    networks:
      - automation-net
    depends_on:
      - redis
    healthcheck:
      test: ["CMD", "wget", "-q", "-O", "-", "http://localhost:5678/healthz"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    container_name: redis
    restart: always
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - automation-net
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

volumes:
  n8n_data:
  redis_data:

networks:
  automation-net:
    driver: bridge
EOF

log_info "docker-compose.yml created"

# ============================================
# 9. Create .env Template
# ============================================
log_info "Creating .env template..."

cat > "${AUTOMATION_DIR}/.env.example" << 'EOF'
# n8n Automation System - Environment Variables
# Copy to .env and fill in your values

# === GitHub ===
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DEFAULT_REPO=owner/repository

# === Claude API ===
CLAUDE_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# === Vercel ===
VERCEL_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VERCEL_PROJECT_ID=prj_xxxxxxxxxxxxxxxxxxxxxxxx
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/xxx

# === Slack (Optional) ===
SLACK_WEBHOOK_URL=

# === n8n Auth ===
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=CHANGE_THIS_PASSWORD

# === n8n Config ===
N8N_HOST=0.0.0.0
N8N_PROTOCOL=https
WEBHOOK_URL=https://automation.yourdomain.com
N8N_ENCRYPTION_KEY=

# === Paths ===
AUTOMATION_DIR=/opt/automation
EOF

if [ ! -f "${AUTOMATION_DIR}/.env" ]; then
    cp "${AUTOMATION_DIR}/.env.example" "${AUTOMATION_DIR}/.env"
    log_warn "Created .env file - PLEASE EDIT IT with your credentials"
fi

# ============================================
# 10. Create Systemd Service
# ============================================
log_info "Creating systemd service..."

cat > /etc/systemd/system/n8n-automation.service << EOF
[Unit]
Description=n8n Automation System
Requires=docker.service
After=docker.service

[Service]
Type=simple
WorkingDirectory=${AUTOMATION_DIR}
ExecStart=/usr/local/bin/docker-compose up
ExecStop=/usr/local/bin/docker-compose down
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable n8n-automation

log_info "Systemd service created (n8n-automation)"

# ============================================
# 11. Configure Firewall (if UFW is active)
# ============================================
if command -v ufw &> /dev/null; then
    log_info "Configuring firewall..."
    ufw allow 5678/tcp comment 'n8n'
    ufw allow 22/tcp comment 'SSH'
    log_info "Firewall configured"
fi

# ============================================
# 12. Generate Encryption Key
# ============================================
log_info "Generating encryption key..."

ENCRYPTION_KEY=$(openssl rand -hex 16)
log_info "Generated encryption key (save this!): ${ENCRYPTION_KEY}"

# Update .env with encryption key
sed -i "s/N8N_ENCRYPTION_KEY=.*/N8N_ENCRYPTION_KEY=${ENCRYPTION_KEY}/" "${AUTOMATION_DIR}/.env"

# ============================================
# Summary
# ============================================
echo ""
echo "============================================"
echo "Bootstrap Complete!"
echo "============================================"
echo ""
log_info "Installation directory: ${AUTOMATION_DIR}"
echo ""
echo "Next steps:"
echo "  1. Edit ${AUTOMATION_DIR}/.env with your credentials"
echo "  2. Start the system: systemctl start n8n-automation"
echo "  3. Access n8n at: http://YOUR_SERVER_IP:5678"
echo "  4. Import the workflow from n8n-workflow.json"
echo ""
echo "Commands:"
echo "  Start:   systemctl start n8n-automation"
echo "  Stop:    systemctl stop n8n-automation"
echo "  Status:  systemctl status n8n-automation"
echo "  Logs:    docker-compose -f ${AUTOMATION_DIR}/docker-compose.yml logs -f"
echo ""
log_warn "IMPORTANT: Update the .env file before starting!"
echo ""
