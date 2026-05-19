const API_KEY = "sk-your-key-here"; // ⚠️ Exposed — you said that's fine

async function sendMessage(message, history) {
    // History format example: [ { role: "system", content: "You are a helpful assistant." }, { role: "user", content: userMessage }, { role: "assistant", content: reply } ]
    if (!userMessage) return;

    history.push({ role: "user", content: message });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: history
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    history.push({ role: "assistant", content: reply });
    display("GPT: " + reply);
}