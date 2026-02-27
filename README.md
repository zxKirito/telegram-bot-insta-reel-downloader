# 📱 Instagram Reel Downloader Telegram Bot

A lightweight, fast, and reliable Telegram bot built with Node.js that allows users to download Instagram Reels and videos simply by sending a link to the bot. 

By utilizing the `instagram-url-direct` library, this bot securely fetches the direct video URLs and safely buffers them before uploading to Telegram, smoothly bypassing Telegram's 20MB strict URL-upload size limit.

## ✨ Features

- **Easy to use:** Just paste an Instagram Reel or Post link, and the bot will reply with the video.
- **Bypasses Limits:** Downloads the video into a memory buffer first, allowing the bot to send videos up to 50MB (Telegram's native bot file upload limit) instead of the restricting 20MB URL limit.
- **Robust:** Works with single Instagram videos and Reels.
- **No API keys needed for Instagram:** Bypasses the need for official, restrictive Instagram API credentials.

## 🚀 Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) (v16.x or higher is recommended).
- You have a Telegram Bot Token. You can get one by talking to [@BotFather](https://t.me/botfather) on Telegram.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/reel-downloader.git
   cd reel-downloader
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Configure the Environment Variables:**
   Rename the `.env.example` file to `.env` (or create a new `.env` file) and add your Telegram bot token:
   ```env
   TELEGRAM_BOT_TOKEN=your_actual_telegram_bot_token_here
   ```

4. **Run the bot:**
   ```bash
   npm start
   ```

   You should see `🤖 Bot is running and waiting for messages...` in your console.

## 📖 Usage

1. Open Telegram and search for your bot.
2. Send the `/start` command.
3. Paste any valid Instagram Reel or Video link (e.g., `https://www.instagram.com/reel/XXXXXXX/`).
4. Wait a few seconds while the bot processes and downloads the video.
5. Enjoy your saved video!

## 📦 Dependencies

- [`node-telegram-bot-api`](https://github.com/yagop/node-telegram-bot-api) - Telegram Bot API wrapper for Node.js
- [`instagram-url-direct`](https://www.npmjs.com/package/instagram-url-direct) - Direct URL extractor for Instagram media
- [`axios`](https://axios-http.com/) - Promise-based HTTP client
- [`dotenv`](https://github.com/motdotla/dotenv) - Zero-dependency module that loads environment variables

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check out the [issues page](https://github.com/your-username/reel-downloader/issues).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
