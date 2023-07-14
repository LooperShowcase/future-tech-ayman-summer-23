//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
let open_response;

let chat = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "hi,how can i help you" },
];

async function chatuseradd(feeling, question) {
  chat.push({
    role: "user",
    content: "my happiness from 0-10 is " + feeling + " my input is " + question,
  });
}
async function chatassistantadd(res) {
  chat.push({ role: "assistant", content: res });
}
async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-LLDtZIQbt300rIyi";
  let part3 = "Bm5LT3BlbkFJwntYQJzMl3xlkgLt63pM";

  let allParts = part1 + part2 + part3;
  let data = {
    model: "gpt-3.5-turbo",
    messages: chat,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;
      chatassistantadd(message);
      const speech = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(speech);
      return message;
    }
  } catch (error) {
    console.log(error);
  }
}
