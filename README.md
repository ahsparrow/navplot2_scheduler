Trigger the NavPlot build and generate Discord notifications for NavPlot build failures.

## Setup

1. Create Cloudflare queue called navplot-queue

2. Subscribe queue to build.failed and build.cancelled events from navplot2 worker

3. Create Cloudflare worker linked to the repository

4. Create DISCORD_WEB_HOOK secret for Discord notification channel
