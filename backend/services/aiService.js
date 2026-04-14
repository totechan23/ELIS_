const OpenAI = require('openai');

const SYSTEM_PROMPT =
  'Explain in very simple terms like teaching a beginner. Use examples.';

const getClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    const error = new Error('OPENAI_API_KEY is not configured.');
    error.statusCode = 500;
    throw error;
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
};

const generateSimpleExplanation = async (message) => {
  const client = getClient();
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
  const client = getClient();
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
