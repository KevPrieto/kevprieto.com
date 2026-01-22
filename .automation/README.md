# n8n Website Automation System v2 (Hardened)

> **Production-grade automation for website building, debugging, and deployment**

![n8n](https://img.shields.io/badge/n8n-automation-green)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![Claude](https://img.shields.io/badge/Claude-AI-purple)
![Version](https://img.shields.io/badge/version-2.0.0-orange)

## Overview

This system automates the "Antigravity-style" website building workflow:

1. **Read task** from TRACKER.md (with lock protection)
2. **Analyze with Claude** to propose fixes
3. **Apply changes** safely (confidence-gated overwrites)
4. **Deploy preview** via Vercel
5. **Verify quality** (screenshots + Lighthouse + **video geometry**)
6. **Evaluate criteria** and loop or complete (immutable loop)
7. **Update TRACKER.md** with results (unlocks on completion)

### v2 Hardening Features

- 🔒 **Safe Loop** — Separated init/increment prevents reentry bugs
- 🎥 **Video Geometry** — Auto-detects black borders and aspect ratio issues
- 🛡️ **Safe Apply** — Blocks unsafe file overwrites unless confidence is "high"
- 🔐 **Tracker Lock** — Prevents concurrent executions from conflicting
- ⛔ **Kill Switch** — `SYSTEM_ENABLED=false` stops all automation

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    HOSTINGER VPS                        │
│                                                         │
│  ┌─────────┐    ┌─────────┐    ┌──────────────────┐    │
│  │   n8n   │◄──►│  Redis  │    │  Chromium/       │    │
│  │  :5678  │    │  :6379  │    │  Lighthouse      │    │
│  └────┬────┘    └─────────┘    └──────────────────┘    │
│       │                                                 │
│       ▼                                                 │
│  /data/repos     /data/screenshots    /data/logs       │
└───────┼─────────────────────────────────────────────────┘
        │
        ▼
   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
   │ GitHub  │   │ Vercel  │   │ Claude  │   │  Slack  │
   │   API   │   │   API   │   │   API   │   │(notify) │
   └─────────┘   └─────────┘   └─────────┘   └─────────┘
```

## Quick Start

### Prerequisites

- Ubuntu VPS (20.04+, recommended: 2GB+ RAM)
- Domain name (optional, for HTTPS)
- Accounts: GitHub, Vercel, Anthropic (Claude)

### Installation

1. **SSH into your VPS:**
   ```bash
   ssh root@your-server-ip
   ```

2. **Download and run bootstrap script:**
   ```bash
   curl -O https://raw.githubusercontent.com/YOUR_REPO/.automation/bootstrap.sh
   chmod +x bootstrap.sh
   sudo bash bootstrap.sh
   ```

3. **Configure environment:**
   ```bash
   cd /opt/automation
   nano .env  # Fill in your credentials
   ```

4. **Start the system:**
   ```bash
   systemctl start n8n-automation
   ```

5. **Import workflow:**
   - Open `http://YOUR_IP:5678` in browser
   - Login with credentials from `.env`
   - Go to Workflows → Import
   - Upload `n8n-workflow.json`

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | Personal access token (repo scope) | ✅ |
| `CLAUDE_API_KEY` | Anthropic API key | ✅ |
| `VERCEL_TOKEN` | Vercel API token | ✅ |
| `VERCEL_PROJECT_ID` | Target project ID | ✅ |
| `VERCEL_DEPLOY_HOOK_URL` | Deploy hook URL | ✅ |
| `DEFAULT_REPO` | Default repo (owner/name) | ✅ |
| `SLACK_WEBHOOK_URL` | Slack notifications | ❌ |
| `MAX_ITERATIONS` | Max retry attempts (default: 5) | ❌ |

### TRACKER.md Format

The system reads tasks from a `TRACKER.md` file in your repository:

```markdown
# Project Tasks

- [ ] TASK-001: Fix video black borders on mobile
  - [ ] No black borders visible on iPhone viewport
  - [ ] Video maintains aspect ratio
  - [ ] CLS < 0.1 on mobile

- [/] TASK-002: Improve hero performance
  - [x] LCP < 2.5s on 3G
  - [ ] Performance score > 90

- [x] TASK-003: Add dark mode support
  - [x] System preference detection works
  - [x] Toggle persists to localStorage
```

**Status markers:**
- `[ ]` — Pending
- `[/]` — In Progress
- `[x]` — Completed
- `[!]` — Blocked

## Usage

### Trigger via Webhook

```bash
curl -X POST https://your-n8n.com/webhook/automation/trigger \
  -H "Content-Type: application/json" \
  -H "X-Automation-Key: YOUR_KEY" \
  -d '{
    "repo": "owner/repository",
    "task_id": "TASK-001",
    "mode": "single",
    "max_iterations": 5
  }'
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `repo` | string | GitHub repo (owner/name) |
| `task_id` | string | Specific task to run (optional) |
| `mode` | string | `single`, `all-pending`, or `rerun-failed` |
| `max_iterations` | number | Override default max iterations |

### Schedule (Automatic)

Enable scheduled runs by setting `SCHEDULE_ENABLED=true` and uncommenting the Schedule Trigger node in n8n.

Default: Every 4 hours

## Workflow Logic

### The Loop

```
START → Read TRACKER.md → Find pending task
                              ↓
         ┌───────────────────────────────────────┐
         │              MAIN LOOP                 │
         │                                        │
         │  Claude Analysis → Apply Changes       │
         │       ↓                                │
         │  Git Commit → Vercel Deploy           │
         │       ↓                                │
         │  Screenshots → Lighthouse              │
         │       ↓                                │
         │  Evaluate Criteria                     │
         │       ↓                                │
         │  ┌─────────────────────────────────┐  │
         │  │ PASS → Mark Complete → EXIT     │  │
         │  │ FAIL → Loop (if < max)          │  │
         │  │ HUMAN → Notify → Wait           │  │
         │  │ MAX  → Mark Blocked → EXIT      │  │
         │  └─────────────────────────────────┘  │
         │                                        │
         └────────────────────────────────────────┘
```

### Acceptance Criteria

The system automatically evaluates certain criteria:

| Criteria Type | Auto-Evaluated | Example |
|---------------|----------------|---------|
| CLS threshold | ✅ | "CLS < 0.1" |
| Performance score | ✅ | "Performance > 90" |
| Screenshots exist | ✅ | "Desktop + mobile screenshots" |
| Visual quality | ❌ | "No black borders on video" |

Visual quality criteria trigger human review.

### Human Review

When human review is needed:
1. Slack notification with preview URL + screenshots
2. Three action buttons: Approve / Retry / Block
3. Workflow pauses until response
4. Timeout: 24 hours

## Debugging

### View Logs

```bash
# n8n container logs
docker-compose logs -f n8n

# All containers
docker-compose logs -f

# Automation logs
tail -f /opt/automation/logs/errors.jsonl
```

### Check Execution Status

In n8n UI:
1. Go to Executions tab
2. Find your execution
3. Click to see node-by-node results

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Claude parse error | Invalid JSON response | Check Claude prompt, retry |
| Git push failed | Token permissions | Verify GITHUB_TOKEN has push access |
| Vercel timeout | Build taking too long | Increase wait time or check Vercel logs |
| Screenshot failed | Chromium not installed | Run bootstrap.sh or install manually |

### Reset Stuck Execution

```bash
# If a workflow is stuck
docker-compose restart n8n
```

## Extending the System

### Adding New Criteria Types

Edit the `Evaluate Criteria` node in n8n:

```javascript
// Add new criterion type
if (textLower.includes('your-keyword')) {
  return {
    passed: /* your logic */,
    confidence: 'high',
    evidence: 'Explanation'
  };
}
```

### Adding New Verification Steps

1. Add a new Execute Command node
2. Connect after Lighthouse
3. Update Collect Verification Results
4. Add evaluation logic in Evaluate Criteria

### Custom Notifications

Replace the Slack node with:
- Email (SMTP node)
- Discord webhook
- Microsoft Teams
- Custom webhook

## File Structure

```
.automation/
├── n8n-workflow.json      # n8n workflow (import this)
├── docker-compose.yml     # Container orchestration
├── .env.example           # Environment template
├── bootstrap.sh           # VPS setup script
├── README.md              # This file
└── TRACKER.md.example     # Example tracker file
```

## Security Notes

- **Never commit `.env`** — Contains secrets
- **Rotate tokens regularly** — GitHub, Claude, Vercel
- **Use HTTPS** — Set up reverse proxy (nginx/Caddy)
- **Limit webhook access** — Use authentication header
- **Backup n8n data** — Volume: `n8n_automation_data`

## Costs

Approximate costs for active usage:

| Service | Cost | Notes |
|---------|------|-------|
| Claude API | ~$0.10-0.50/task | Depends on iterations |
| Vercel | Free tier | Preview deployments |
| GitHub | Free | Public/private repos |
| VPS | $5-10/month | Hostinger/DigitalOcean |

## License

MIT — Use freely for commercial projects.

---

**Built for the Antigravity workflow** 🚀
