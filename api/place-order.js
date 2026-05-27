export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { quantity, name, phone, address, notes } = req.body;

    // Basic validation
    if (!quantity || !name || !phone || !address) {
        return res.status(400).json({ error: 'Missing required fields (quantity, name, phone, address)' });
    }

    // Build the Telegram message template
    const textMessage = `🍄 *NEW MUSHROOM PRE-ORDER* 🍄\n\n` +
                        `👤 *Name:* ${name}\n` +
                        `📞 *Phone/WhatsApp:* ${phone}\n` +
                        `📦 *Quantity:* ${quantity}\n` +
                        `📍 *Address:* ${address}\n` +
                        (notes ? `📝 *Notes:* ${notes}\n` : '') +
                        `\n⚡ _Processed securely via ephemeral Vercel Serverless Pipeline._`;

    // Securely pull credentials from environment variables
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Environment variables TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID are not set.');
        // Return 500 but give a helpful console log for deployment debugging
        return res.status(500).json({ 
            error: 'Backend Configuration Error. Telegram Bot Token or Chat ID is not configured.' 
        });
    }

    try {
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: textMessage,
                parse_mode: 'Markdown'
            })
        });

        if (response.ok) {
            // Data successfully sent. 
            return res.status(200).json({ success: true });
        } else {
            const errData = await response.text();
            console.error('Telegram API error response:', errData);
            return res.status(500).json({ error: 'Failed to dispatch notification to Telegram pipeline.' });
        }
    } catch (error) {
        console.error('Connection error in Telegram dispatch:', error);
        return res.status(500).json({ error: 'Internal backend serverless pipeline error.' });
    }
}
