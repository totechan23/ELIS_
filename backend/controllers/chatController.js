const Chat = require('../models/Chat');
const asyncHandler = require('../utils/asyncHandler');
const {
  generateSimpleExplanation,
  streamSimpleExplanation
} = require('../services/aiService');

const createChat = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400);
    throw new Error('A non-empty message is required.');
  }

  const aiResponse = await generateSimpleExplanation(message.trim());

  const chat = await Chat.create({
    user: req.user._id,
    message: message.trim(),
    response: aiResponse
  });

  res.status(201).json({
    success: true,
    data: {
      id: chat._id,
      message: chat.message,
      response: chat.response,
      createdAt: chat.createdAt
    }
  });
});

const streamChat = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400);
    throw new Error('A non-empty message is required.');
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await streamSimpleExplanation(message.trim());
  let fullResponse = '';

  for await (const chunk of stream) {
    const token = chunk.choices?.[0]?.delta?.content;
    if (token) {
      fullResponse += token;
      res.write(`data: ${JSON.stringify({ token })}\n\n`);
    }
  }

  await Chat.create({
    user: req.user._id,
    message: message.trim(),
    response: fullResponse.trim()
  });

  res.write('data: [DONE]\n\n');
  res.end();
});

const getChatHistory = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 100);

  const chats = await Chat.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  res.json({
    success: true,
    count: chats.length,
    data: chats
  });
});

module.exports = { createChat, streamChat, getChatHistory };
