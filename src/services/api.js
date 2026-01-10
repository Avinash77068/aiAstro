// API service for the Astro AI app
import { consultAstrologers, astrologers } from '../data/data';

// Mock API endpoints - replace with actual API calls
const API_BASE_URL = 'https://api.astroai.com/v1';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get all astrologers for consultation
export const getConsultAstrologers = async (filters = {}) => {
  await delay(1000); // Simulate API call
  
  // In real app, this would be: 
  // const response = await fetch(`${API_BASE_URL}/astrologers?filters=${JSON.stringify(filters)}`);
  // return response.json();
  
  // For now, return mock data
  return {
    success: true,
    data: consultAstrologers,
    message: 'Astrologers fetched successfully'
  };
};

// Get AI astrologers
export const getAiAstrologers = async () => {
  await delay(800);
  
  return {
    success: true,
    data: astrologers,
    message: 'AI astrologers fetched successfully'
  };
};

// Get astrologer details by ID
export const getAstrologerById = async (id) => {
  await delay(500);
  
  const allAstrologers = [...consultAstrologers, ...astrologers];
  const astrologer = allAstrologers.find(a => a.id === id) || allAstrologers[id];
  
  return {
    success: true,
    data: astrologer,
    message: 'Astrologer details fetched successfully'
  };
};

// Start chat session
export const startChatSession = async (astrologerId, userId) => {
  await delay(1500);
  
  return {
    success: true,
    data: {
      sessionId: `session_${Date.now()}`,
      astrologerId,
      userId,
      startTime: new Date().toISOString(),
      status: 'active'
    },
    message: 'Chat session started successfully'
  };
};

// Start call session
export const startCallSession = async (astrologerId, userId) => {
  await delay(1500);
  
  return {
    success: true,
    data: {
      sessionId: `call_${Date.now()}`,
      astrologerId,
      userId,
      startTime: new Date().toISOString(),
      status: 'connected',
      duration: 0
    },
    message: 'Call connected successfully'
  };
};

// End session
export const endSession = async (sessionId) => {
  await delay(300);
  
  return {
    success: true,
    data: {
      sessionId,
      endTime: new Date().toISOString(),
      status: 'ended'
    },
    message: 'Session ended successfully'
  };
};

// Get user chat history
export const getChatHistory = async (userId) => {
  await delay(800);
  
  return {
    success: true,
      data: [{
        sessionId: `session_${Date.now()}`,
        astrologerId: 1,
        userId: userId,
        startTime: new Date().toISOString(),
        status: 'active'
    }], // Empty for now
    message: 'Chat history fetched successfully'
  };
};

// Send message in chat
export const sendMessage = async (sessionId, message, senderId) => {
  await delay(200);
  
  return {
    success: true,
    data: {
      messageId: `msg_${Date.now()}`,
      sessionId,
      message,
      senderId,
      timestamp: new Date().toISOString()
    },
    message: 'Message sent successfully'
  };
};

// Get user profile
export const getUserProfile = async (userId) => {
  await delay(600);
  
  return {
    success: true,
    data: {
      id: userId,
      name: '918334904005',
      plan: 'Basic',
      walletBalance: 150,
      totalConsultations: 12,
      lastConsultation: new Date(Date.now() - 86400000).toISOString() // Yesterday
    },
    message: 'User profile fetched successfully'
  };
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  await delay(800);
  
  return {
    success: true,
    data: { ...profileData, id: userId },
    message: 'Profile updated successfully'
  };
};

// Get wallet balance
export const getWalletBalance = async (userId) => {
  await delay(400);
  
  return {
    success: true,
    data: {
      balance: 150,
      currency: 'INR',
      lastUpdated: new Date().toISOString()
    },
    message: 'Wallet balance fetched successfully'
  };
};

// Add money to wallet
export const addMoneyToWallet = async (userId, amount) => {
  await delay(1200);
  
  return {
    success: true,
    data: {
      transactionId: `txn_${Date.now()}`,
      amount,
      newBalance: 150 + amount,
      timestamp: new Date().toISOString()
    },
    message: 'Money added to wallet successfully'
  };
};

// Get notifications
export const getNotifications = async (userId) => {
  await delay(600);
  
  return {
    success: true,
    data: [
      {
        id: 1,
        title: 'Chat session ended',
        message: 'Your chat with Mr. Krishnam has ended',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false
      },
      {
        id: 2,
        title: 'New astrologer available',
        message: 'Rrupa is now available for consultation',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false
      }
    ],
    message: 'Notifications fetched successfully'
  };
};

// Mark notification as read
export const markNotificationRead = async (notificationId) => {
  await delay(200);
  
  return {
    success: true,
    data: { notificationId, read: true },
    message: 'Notification marked as read'
  };
};
