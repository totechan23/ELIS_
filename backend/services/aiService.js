const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT =
  'Explain in very simple terms like teaching a beginner. Use examples.';

const generateSimpleExplanation = async (message) => {
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    temperature: 0.6,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message }
    ]
  });

  return completion.choices?.[0]?.message?.content?.trim() ||
    'I could not generate a response right now.';
};

const streamSimpleExplanation = async (message) => {
  return client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    temperature: 0.6,
    stream: true,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message }
    ]
  });
};

module.exports = { generateSimpleExplanation, streamSimpleExplanation };
