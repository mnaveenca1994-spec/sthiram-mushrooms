# 🍄 Sthiram Lifestyle Clinic - Mushroom Pre-Booking App

A highly aesthetic, premium, and secure pre-booking landing page for Sthiram Lifestyle Clinic's **Pure Sun-Dried Mushrooms**. This application is structured to be deployed for free on **Vercel** with a zero-retention serverless backend pipeline that securely dispatches booking requests straight to a **Telegram Channel/Group or DM** via a Telegram Bot.

---

## 🎨 Design Aesthetics
- **Organic Earthy Palette**: Deep Forest Green (`#1E3F20`), Sage Moss, Warm Sand, and Accent Gold.
- **Premium Typography**: Google Fonts `Playfair Display` (Serif headings) and `Inter` (Sans body).
- **Modern Polish**: Responsive layout, glassmorphic order calculator card, micro-interactions, input focus transitions, and subtle loading animations.

---

## 🔒 Security & Privacy by Design
This app does not require databases or permanent external storage. 
1. The customer enters details in their browser.
2. The form submits securely to a Vercel Serverless Function (`/api/place-order`).
3. The serverless function compiles the details, posts them instantly to the Telegram Bot API, and **immediately flushes all data from memory**.
4. Zero customer data is retained in a public database.

---

## 🚀 How to Deploy in Public (Step-by-Step)

To run this in public, you will need a free Vercel account and a Telegram Bot. Follow these simple steps:

### Part 1: Get Telegram Bot Credentials (Free & Takes 1 Min)
1. **Create the Bot**:
   - Open Telegram and search for `@BotFather` (the official bot creator).
   - Send `/newbot` and follow the prompts to name your bot (e.g., `Sthiram Order Bot`).
   - Copy the **HTTP API Token** provided (it looks like `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`). This is your `TELEGRAM_BOT_TOKEN`.
2. **Get your Chat ID** (Where notifications should arrive):
   - You can receive notifications in a **Private Chat** or a **Group/Channel**.
   - **For Private Chat**: 
     - Search for `@userinfobot` on Telegram and send it a message. It will reply with your `Id` (a 9 or 10-digit number like `876543210`). This is your `TELEGRAM_CHAT_ID`.
     - *Important*: Open your newly created bot and click **Start / Send Message** so it has permission to message you.
   - **For a Group/Channel**:
     - Add your new bot as an **Administrator** to the group/channel.
     - Send a test message in that group.
     - Visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates` in your browser.
     - Look for `"chat":{"id": -100xxxxxxxxx}`. The negative number (including the minus sign) is your `TELEGRAM_CHAT_ID`.

---

### Part 2: Publish Your Code to GitHub
1. Open Git Bash or a terminal inside the project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Sthiram Mushrooms App"
   ```
2. Create a new repository on [GitHub](https://github.com) (you can make it private or public).
3. Follow the instructions on GitHub to push your local code:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

---

### Part 3: Deploy to Vercel (100% Free Hosting)
1. Sign up or log into [Vercel](https://vercel.com) using your GitHub account.
2. Click **Add New** > **Project**.
3. Import the repository you just pushed to GitHub.
4. Expand the **Environment Variables** section and add the two variables you collected in Part 1:
   - **Key**: `TELEGRAM_BOT_TOKEN` | **Value**: `<Your Bot Token>`
   - **Key**: `TELEGRAM_CHAT_ID` | **Value**: `<Your Chat ID>`
5. Click **Deploy**!
6. Vercel will build and launch your site in seconds and provide you with a **public `.vercel.app` URL** (e.g., `sthiram-mushrooms.vercel.app`) that you can customize or map to your own custom domain.

*Test it out by filling the form on your new public URL and watch the order notification instantly pop up on Telegram!*
