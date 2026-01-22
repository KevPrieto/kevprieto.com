#!/bin/bash
set -e

echo "🔧 n8n executeCommand Fix Script"
echo "=================================="
echo ""

# Go to n8n directory
cd /opt/n8n/stack

echo "📍 Current directory: $(pwd)"
echo ""

# Backup original file
echo "💾 Creating backup..."
cp docker-compose.yml docker-compose.yml.backup.$(date +%Y%m%d-%H%M%S)
echo "✅ Backup created"
echo ""

# Check if variables already exist
if grep -q "N8N_BLOCK_ENV_ACCESS_IN_NODE" docker-compose.yml; then
    echo "⚠️  Variables already present in docker-compose.yml"
    echo "Skipping modification..."
else
    echo "📝 Adding executeCommand enablement variables..."

    # Find the line with EXECUTIONS_DATA_MAX_AGE and add after it
    sed -i '/EXECUTIONS_DATA_MAX_AGE/a\
\
      # Enable risky nodes (required for executeCommand node)\
      - N8N_COMMUNITY_PACKAGES_ENABLED=true\
      - N8N_BLOCK_ENV_ACCESS_IN_NODE=false\
      - EXECUTIONS_PROCESS=main' docker-compose.yml

    echo "✅ Variables added"
fi

echo ""
echo "🔄 Restarting n8n container..."
docker-compose down
docker-compose up -d

echo ""
echo "⏳ Waiting for n8n to start (30 seconds)..."
sleep 30

echo ""
echo "📊 Container status:"
docker ps | grep n8n

echo ""
echo "📜 Recent logs:"
docker-compose logs --tail 20 n8n

echo ""
echo "✅ Done! Check if n8n is running at https://automation.kevprieto.com"
echo ""
echo "To view live logs: docker-compose logs -f n8n"
