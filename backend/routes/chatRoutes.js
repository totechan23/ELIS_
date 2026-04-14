const express = require('express');
const {
  createChat,
  streamChat,
  getChatHistory
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { chatLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.use(protect);
router.use(chatLimiter);

router.post('/', createChat);
router.post('/stream', streamChat);
router.get('/history', getChatHistory);

module.exports = router;
