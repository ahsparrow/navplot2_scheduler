/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"` to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// Trigger happens 10 minutes before the hour
const HOURS = [0, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17];

export default {
  async scheduled(event, env, ctx) {
    console.log('Scheduled request');

    // Get UK local hour
    const date = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
    const hour = new Date(date).getHours();

    if (HOURS.includes(hour)) {
      // Trigger the NavPlot build
      let resp = await fetch(
        'https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/d40fbe15-82c8-4f6f-ba9b-2df8821832dd',
        {method: "POST"}
      );
      let wasSuccessful = resp.ok ? 'success' : 'fail';

      console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
    }
  },

  async queue(batch, env, ctx) {
	console.log('queue()');

    for (const msg of batch.messages) {
      console.log(msg.body);

      await fetch('https://ntfy.sh/navplot_alerts', {
        method: 'POST',
        body: 'cloudflare test',
        headers: {
          'Authorization': 'Bearer tk_ayma125n5opy66x9mhi23dw63xkcg'
        }
      })
      .then(response => console.log("hello")
    }
  },
};
