require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { instagramGetUrl } = require('instagram-url-direct');
const axios = require('axios');

// 1. Get token from .env file
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token || token === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
  console.error('❌ Please provide a valid TELEGRAM_BOT_TOKEN in the .env file');
  process.exit(1);
}

// 2. Create a bot that uses 'polling' to fetch new updates
process.env.NTBA_FIX_350 = true; // Fix deprecation warning about file uploads
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Bot is running and waiting for messages...');

// 3. Listen for any kind of message
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';

  // Handle /start command
  if (text === '/start') {
    return bot.sendMessage(
      chatId,
      '👋 *Welcome to the InstaReel Downloader Bot!*\n\nSend me any Instagram Reel or Post link, and I will download the video for you.',
      { parse_mode: 'Markdown' }
    );
  }

  // 4. Check if text contains an Instagram link
  const instaRegex = /https:\/\/(www\.)?instagram\.com\/(reel|p)\/[a-zA-Z0-9_\-]+/;
  const match = text.match(instaRegex);

  if (match) {
    const instaLink = match[0];
    const processingMsg = await bot.sendMessage(chatId, 'Processing your Instagram link... ⏳');

    try {
      // 5. Use instagramGetUrl to safely extract the media URL
      const data = await instagramGetUrl(instaLink);

      // Ensure we received a valid media URL endpoint
      if (data && data.url_list && data.url_list.length > 0) {
        const videoUrl = data.url_list[0];

        // 5.5 Download the video into a memory buffer first to bypass Telegram's 20MB URL limit
        const videoResponse = await axios({
          method: 'GET',
          url: videoUrl,
          responseType: 'arraybuffer'
        });
        const videoBuffer = Buffer.from(videoResponse.data);

        // 6. Send the video directly back to the user
        await bot.sendVideo(chatId, videoBuffer, {
          reply_to_message_id: msg.message_id
        }, {
          filename: 'instagram_reel.mp4',
          contentType: 'video/mp4'
        });

        // Clean up the "Processing..." message
        await bot.deleteMessage(chatId, processingMsg.message_id);

      } else {
        throw new Error('Video URL not found in the response.');
      }

    } catch (error) {
      console.error('Error fetching reel:', error.message);

      // Notify the user if something went wrong
      await bot.editMessageText('❌ Sorry, I failed to download this reel. It might be private, deleted, or temporarily inaccessible.', {
        chat_id: chatId,
        message_id: processingMsg.message_id
      });
    }
  } else if (!text.startsWith('/')) {
    // If it's a regular message but not an Instagram link
    bot.sendMessage(chatId, 'Please send a valid Instagram Reel link. 🔗');
  }
});

// Error handling to prevent bot crashes
bot.on('polling_error', (error) => {
  console.log('Polling Error:', error.message);
});
