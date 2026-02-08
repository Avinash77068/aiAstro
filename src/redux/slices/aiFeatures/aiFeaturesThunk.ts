import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../../api';

// Career Analysis Thunk
export const analyzeCareerThunk = createAsyncThunk(
  'aiFeatures/analyzeCareer',
  async ({ currentJob, experience }: { currentJob: string; experience: string }) => {
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      const response = await fetch(`${API_BASE_URL}/analyze-career`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentJob, experience }),
      });
      if (!response.ok) throw new Error('API failed');
      // Mock response data
      return {
        score: 88,
        scoreLabel: 'Career Fit',
        title: `${currentJob} (${experience} years)`,
        subtitle: 'High Potential Career',
        aspects: [
          {
            id: 'skills',
            label: 'Skills Assessment',
            description: 'Your skills align well with current market demands. Consider upskilling in emerging technologies.',
          },
          {
            id: 'growth',
            label: 'Career Growth',
            description: 'Strong potential for advancement. Focus on leadership and strategic thinking.',
          },
          {
            id: 'balance',
            label: 'Work-Life Balance',
            description: 'Good balance achieved. Maintain healthy boundaries and prioritize personal well-being.',
          },
        ],
        prediction: `The professional stars are aligned for you. With ${experience} years of experience in ${currentJob}, you have a solid foundation for career advancement. The cosmic energies suggest focusing on continuous learning and networking. Consider exploring opportunities in related fields that leverage your existing expertise.`,
        advice: [
          'Invest in continuous professional development',
          'Build a strong professional network',
          'Set clear career goals and milestones',
          'Seek mentorship and feedback regularly',
        ],
      };
    } catch (error) {
      // Return mock data on API failure for demo
      return {
        score: 88,
        scoreLabel: 'Career Fit',
        title: `${currentJob} (${experience} years)`,
        subtitle: 'High Potential Career',
        aspects: [
          {
            id: 'skills',
            label: 'Skills Assessment',
            description: 'Your skills align well with current market demands. Consider upskilling in emerging technologies.',
          },
          {
            id: 'growth',
            label: 'Career Growth',
            description: 'Strong potential for advancement. Focus on leadership and strategic thinking.',
          },
          {
            id: 'balance',
            label: 'Work-Life Balance',
            description: 'Good balance achieved. Maintain healthy boundaries and prioritize personal well-being.',
          },
        ],
        prediction: `The professional stars are aligned for you. With ${experience} years of experience in ${currentJob}, you have a solid foundation for career advancement. The cosmic energies suggest focusing on continuous learning and networking. Consider exploring opportunities in related fields that leverage your existing expertise.`,
        advice: [
          'Invest in continuous professional development',
          'Build a strong professional network',
          'Set clear career goals and milestones',
          'Seek mentorship and feedback regularly',
        ],
      };
    }
  }
);

// Education Analysis Thunk
export const analyzeEducationThunk = createAsyncThunk(
  'aiFeatures/analyzeEducation',
  async ({ educationLevel, fieldOfInterest, learningGoals }: { educationLevel: string; fieldOfInterest: string; learningGoals: string }) => {
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      const response = await fetch(`${API_BASE_URL}/analyze-education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ educationLevel, fieldOfInterest, learningGoals }),
      });
      if (!response.ok) throw new Error('API failed');
      return {
        score: 90,
        scoreLabel: 'Learning Potential',
        title: `${educationLevel} in ${fieldOfInterest}`,
        subtitle: 'Learning Potential Analysis',
        aspects: [
          {
            id: 'learningStyle',
            label: 'Learning Style',
            description: `You show strong potential in ${fieldOfInterest}. Focus on interactive and practical learning methods.`,
          },
          {
            id: 'careerAlignment',
            label: 'Career Alignment',
            description: `Your goals align well with current market demands in ${fieldOfInterest}. Consider advanced certifications.`,
          },
          {
            id: 'skillDevelopment',
            label: 'Skill Development',
            description: `Build on your ${educationLevel} foundation. Your goals of ${learningGoals.toLowerCase()} are achievable with dedication.`,
          },
        ],
        prediction: `The academic stars are brightly aligned for your educational journey. With your current level of ${educationLevel} and interest in ${fieldOfInterest}, you have excellent prospects for advancement. The cosmic energies suggest embracing lifelong learning and seeking mentorship. Your goals regarding ${learningGoals.toLowerCase()} indicate a committed and focused approach to personal development.`,
        advice: [
          'Set specific, measurable learning objectives',
          'Create a consistent study schedule and stick to it',
          'Seek out mentors and join professional communities',
          'Balance theoretical knowledge with practical application',
        ],
      };
    } catch (error) {
      return {
        score: 90,
        scoreLabel: 'Learning Potential',
        title: `${educationLevel} in ${fieldOfInterest}`,
        subtitle: 'Learning Potential Analysis',
        aspects: [
          {
            id: 'learningStyle',
            label: 'Learning Style',
            description: `You show strong potential in ${fieldOfInterest}. Focus on interactive and practical learning methods.`,
          },
          {
            id: 'careerAlignment',
            label: 'Career Alignment',
            description: `Your goals align well with current market demands in ${fieldOfInterest}. Consider advanced certifications.`,
          },
          {
            id: 'skillDevelopment',
            label: 'Skill Development',
            description: `Build on your ${educationLevel} foundation. Your goals of ${learningGoals.toLowerCase()} are achievable with dedication.`,
          },
        ],
        prediction: `The academic stars are brightly aligned for your educational journey. With your current level of ${educationLevel} and interest in ${fieldOfInterest}, you have excellent prospects for advancement. The cosmic energies suggest embracing lifelong learning and seeking mentorship. Your goals regarding ${learningGoals.toLowerCase()} indicate a committed and focused approach to personal development.`,
        advice: [
          'Set specific, measurable learning objectives',
          'Create a consistent study schedule and stick to it',
          'Seek out mentors and join professional communities',
          'Balance theoretical knowledge with practical application',
        ],
      };
    }
  }
);

// Finance Analysis Thunk
export const analyzeFinanceThunk = createAsyncThunk(
  'aiFeatures/analyzeFinance',
  async ({ monthlyIncome, monthlyExpenses, financialGoals }: { monthlyIncome: string; monthlyExpenses: string; financialGoals: string }) => {
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      const response = await fetch(`${API_BASE_URL}/analyze-finance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ monthlyIncome, monthlyExpenses, financialGoals }),
      });
      if (!response.ok) throw new Error('API failed');
      return {
        score: 82,
        scoreLabel: 'Financial Health',
        title: `Income: $${monthlyIncome} • Expenses: $${monthlyExpenses}`,
        subtitle: 'Financial Stability Analysis',
        aspects: [
          {
            id: 'budget',
            label: 'Budget Management',
            description: 'Your income to expense ratio shows good financial discipline. Continue tracking and optimizing spending.',
          },
          {
            id: 'savings',
            label: 'Savings Rate',
            description: 'With your current expenses, focus on increasing savings through automated transfers and expense reduction.',
          },
          {
            id: 'goal',
            label: 'Goal Achievement',
            description: `Your goals of ${financialGoals.toLowerCase()} are achievable with consistent effort and smart planning.`,
          },
        ],
        prediction: `The financial stars are aligned for growth and stability. With monthly income of $${monthlyIncome} and expenses of $${monthlyExpenses}, you have a solid foundation for wealth building. The cosmic energies suggest focusing on long-term investments and emergency fund creation. Your goals regarding ${financialGoals.toLowerCase()} indicate a proactive approach to financial planning.`,
        advice: [
          'Create and maintain an emergency fund (3-6 months expenses)',
          'Diversify investments across different asset classes',
          'Track expenses regularly and identify areas for savings',
          'Set specific, measurable financial goals with timelines',
        ],
      };
    } catch (error) {
      return {
        score: 82,
        scoreLabel: 'Financial Health',
        title: `Income: $${monthlyIncome} • Expenses: $${monthlyExpenses}`,
        subtitle: 'Financial Stability Analysis',
        aspects: [
          {
            id: 'budget',
            label: 'Budget Management',
            description: 'Your income to expense ratio shows good financial discipline. Continue tracking and optimizing spending.',
          },
          {
            id: 'savings',
            label: 'Savings Rate',
            description: 'With your current expenses, focus on increasing savings through automated transfers and expense reduction.',
          },
          {
            id: 'goal',
            label: 'Goal Achievement',
            description: `Your goals of ${financialGoals.toLowerCase()} are achievable with consistent effort and smart planning.`,
          },
        ],
        prediction: `The financial stars are aligned for growth and stability. With monthly income of $${monthlyIncome} and expenses of $${monthlyExpenses}, you have a solid foundation for wealth building. The cosmic energies suggest focusing on long-term investments and emergency fund creation. Your goals regarding ${financialGoals.toLowerCase()} indicate a proactive approach to financial planning.`,
        advice: [
          'Create and maintain an emergency fund (3-6 months expenses)',
          'Diversify investments across different asset classes',
          'Track expenses regularly and identify areas for savings',
          'Set specific, measurable financial goals with timelines',
        ],
      };
    }
  }
);

// Health Analysis Thunk
export const analyzeHealthThunk = createAsyncThunk(
  'aiFeatures/analyzeHealth',
  async ({ name, dateOfBirth }: { name: string; dateOfBirth: string }) => {
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      const response = await fetch(`${API_BASE_URL}/analyze-health`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, dateOfBirth }),
      });
      if (!response.ok) throw new Error('API failed');
      return {
        score: 85,
        scoreLabel: 'Health Score',
        title: `Health Overview for ${name}`,
        subtitle: 'Excellent overall health indicators',
        aspects: [
          {
            id: 'energy',
            label: 'Physical Energy',
            description: 'Strong physical energy levels detected. Maintain regular exercise routine.',
          },
          {
            id: 'immunity',
            label: 'Immunity',
            description: 'Good immunity system. Continue with balanced nutrition and adequate rest.',
          },
          {
            id: 'mental',
            label: 'Mental Clarity',
            description: 'Excellent mental clarity and focus. Keep up mindfulness practices.',
          },
          {
            id: 'digestive',
            label: 'Digestive Health',
            description: 'Monitor digestive health. Consider dietary adjustments for optimal function.',
          },
        ],
        prediction: `Your birth chart reveals excellent health potential. The cosmic energies support strong physical and mental well-being. Focus on maintaining balance between work and rest, and pay attention to your body's natural rhythms.`,
        advice: [
          'Practice morning yoga for 20 minutes daily',
          'Include more green vegetables and fruits in your diet',
          'Drink at least 8 glasses of water daily',
          'Maintain 7-8 hours of quality sleep',
          'Take short breaks during work to reduce stress',
        ],
      };
    } catch (error) {
      return {
        score: 85,
        scoreLabel: 'Health Score',
        title: `Health Overview for ${name}`,
        subtitle: 'Excellent overall health indicators',
        aspects: [
          {
            id: 'energy',
            label: 'Physical Energy',
            description: 'Strong physical energy levels detected. Maintain regular exercise routine.',
          },
          {
            id: 'immunity',
            label: 'Immunity',
            description: 'Good immunity system. Continue with balanced nutrition and adequate rest.',
          },
          {
            id: 'mental',
            label: 'Mental Clarity',
            description: 'Excellent mental clarity and focus. Keep up mindfulness practices.',
          },
          {
            id: 'digestive',
            label: 'Digestive Health',
            description: 'Monitor digestive health. Consider dietary adjustments for optimal function.',
          },
        ],
        prediction: `Your birth chart reveals excellent health potential. The cosmic energies support strong physical and mental well-being. Focus on maintaining balance between work and rest, and pay attention to your body's natural rhythms.`,
        advice: [
          'Practice morning yoga for 20 minutes daily',
          'Include more green vegetables and fruits in your diet',
          'Drink at least 8 glasses of water daily',
          'Maintain 7-8 hours of quality sleep',
          'Take short breaks during work to reduce stress',
        ],
      };
    }
  }
);

// Kundli Analysis Thunk
export const analyzeKundliThunk = createAsyncThunk(
  'aiFeatures/analyzeKundli',
  async ({ name, dateOfBirth, timeOfBirth, placeOfBirth }: { name: string; dateOfBirth: string; timeOfBirth: string; placeOfBirth: string }) => {
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      const response = await fetch(`${API_BASE_URL}/analyze-kundli`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, dateOfBirth, timeOfBirth, placeOfBirth }),
      });
      if (!response.ok) throw new Error('API failed');
      return {
        score: 92,
        scoreLabel: 'Kundli Strength',
        title: `${name}'s Birth Chart`,
        subtitle: 'Strong planetary alignment detected',
        aspects: [
          {
            id: 'rashi',
            label: 'Rashi (Mesh)',
            description: 'Aries sign indicates natural leadership and courage. You have strong initiative and pioneering spirit.',
          },
          {
            id: 'nakshatra',
            label: 'Nakshatra (Ashwini)',
            description: 'Ashwini nakshatra brings healing abilities and swift action. You have natural healing powers.',
          },
          {
            id: 'lagna',
            label: 'Lagna (Vrishabha)',
            description: 'Taurus ascendant gives you stability, patience, and strong determination.',
          },
          {
            id: 'chandra',
            label: 'Chandra (Karka)',
            description: 'Cancer Moon indicates emotional depth, intuition, and strong family bonds.',
          },
        ],
        prediction: `Your birth chart reveals a strong presence of Mars in your first house, indicating natural leadership qualities and courage. The Moon's position suggests emotional depth and intuitive abilities. Jupiter's favorable aspect brings wisdom and opportunities for growth in your career.`,
        advice: [
          'Wear red or coral colors to enhance Mars energy',
          'Practice meditation during sunrise for better intuition',
          'Visit temples on Tuesdays for spiritual growth',
          'Avoid arguments on Tuesdays and Saturdays',
          'Keep a positive mindset and practice gratitude daily',
        ],
      };
    } catch (error) {
      return {
        score: 92,
        scoreLabel: 'Kundli Strength',
        title: `${name}'s Birth Chart`,
        subtitle: 'Strong planetary alignment detected',
        aspects: [
          {
            id: 'rashi',
            label: 'Rashi (Mesh)',
            description: 'Aries sign indicates natural leadership and courage. You have strong initiative and pioneering spirit.',
          },
          {
            id: 'nakshatra',
            label: 'Nakshatra (Ashwini)',
            description: 'Ashwini nakshatra brings healing abilities and swift action. You have natural healing powers.',
          },
          {
            id: 'lagna',
            label: 'Lagna (Vrishabha)',
            description: 'Taurus ascendant gives you stability, patience, and strong determination.',
          },
          {
            id: 'chandra',
            label: 'Chandra (Karka)',
            description: 'Cancer Moon indicates emotional depth, intuition, and strong family bonds.',
          },
        ],
        prediction: `Your birth chart reveals a strong presence of Mars in your first house, indicating natural leadership qualities and courage. The Moon's position suggests emotional depth and intuitive abilities. Jupiter's favorable aspect brings wisdom and opportunities for growth in your career.`,
        advice: [
          'Wear red or coral colors to enhance Mars energy',
          'Practice meditation during sunrise for better intuition',
          'Visit temples on Tuesdays for spiritual growth',
          'Avoid arguments on Tuesdays and Saturdays',
          'Keep a positive mindset and practice gratitude daily',
        ],
      };
    }
  }
);

// Love Analysis Thunk
export const analyzeLoveThunk = createAsyncThunk(
  'aiFeatures/analyzeLove',
  async ({ userName, partnerName }: { userName: string; partnerName: string }) => {
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      const response = await fetch(`${API_BASE_URL}/analyze-love`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, partnerName }),
      });
      if (!response.ok) throw new Error('API failed');
      return {
        score: 92,
        scoreLabel: 'Love Match',
        title: `${userName} 💕 ${partnerName}`,
        subtitle: 'Soul Connection Detected',
        aspects: [
          {
            id: 'romance',
            label: 'Romance',
            description: 'Your romantic chemistry is exceptional. Expect passionate moments and deep emotional bonds.',
          },
          {
            id: 'communication',
            label: 'Communication',
            description: 'You understand each other\'s thoughts and feelings effortlessly. Great emotional sync.',
          },
          {
            id: 'trust',
            label: 'Trust & Loyalty',
            description: 'Strong foundation of trust. You both value commitment and honesty in the relationship.',
          },
        ],
        prediction: `The cosmic energies suggest a beautiful journey ahead for ${userName} and ${partnerName}. Your souls are aligned, creating a powerful magnetic attraction. This relationship has the potential for deep transformation and growth. The stars indicate harmony in your emotional wavelengths, suggesting a lasting and fulfilling partnership.`,
        advice: [
          'Express your feelings openly and honestly',
          'Spend quality time together regularly',
          'Appreciate the little things in your relationship',
          'Support each other\'s dreams and aspirations',
          'Communicate openly about your needs and desires',
        ],
      };
    } catch (error) {
      return {
        score: 92,
        scoreLabel: 'Love Match',
        title: `${userName} 💕 ${partnerName}`,
        subtitle: 'Soul Connection Detected',
        aspects: [
          {
            id: 'romance',
            label: 'Romance',
            description: 'Your romantic chemistry is exceptional. Expect passionate moments and deep emotional bonds.',
          },
          {
            id: 'communication',
            label: 'Communication',
            description: 'You understand each other\'s thoughts and feelings effortlessly. Great emotional sync.',
          },
          {
            id: 'trust',
            label: 'Trust & Loyalty',
            description: 'Strong foundation of trust. You both value commitment and honesty in the relationship.',
          },
        ],
        prediction: `The cosmic energies suggest a beautiful journey ahead for ${userName} and ${partnerName}. Your souls are aligned, creating a powerful magnetic attraction. This relationship has the potential for deep transformation and growth. The stars indicate harmony in your emotional wavelengths, suggesting a lasting and fulfilling partnership.`,
        advice: [
          'Express your feelings openly and honestly',
          'Spend quality time together regularly',
          'Appreciate the little things in your relationship',
          'Support each other\'s dreams and aspirations',
          'Communicate openly about your needs and desires',
        ],
      };
    }
  }
);

// Matching Analysis Thunk
export const analyzeMatchingThunk = createAsyncThunk(
  'aiFeatures/analyzeMatching',
  async ({ userName, userDOB, partnerName, partnerDOB }: { userName: string; userDOB: string; partnerName: string; partnerDOB: string }) => {
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      const response = await fetch(`${API_BASE_URL}/analyze-matching`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, userDOB, partnerName, partnerDOB }),
      });
      if (!response.ok) throw new Error('API failed');
      return {
        score: 78,
        scoreLabel: 'Compatibility',
        title: `${userName} & ${partnerName}`,
        subtitle: 'Relationship Compatibility Analysis',
        aspects: [
          {
            id: 'emotional',
            label: 'Emotional',
            description: 'Strong emotional connection and understanding between partners.',
          },
          {
            id: 'intellectual',
            label: 'Intellectual',
            description: 'Good mental compatibility and shared interests.',
          },
          {
            id: 'physical',
            label: 'Physical',
            description: 'Harmonious physical and sensual connection.',
          },
          {
            id: 'spiritual',
            label: 'Spiritual',
            description: 'Shared values and life philosophy alignment.',
          },
        ],
        prediction: `Your relationship shows strong emotional and physical compatibility. Both of you share similar values and life goals. The intellectual connection is good, suggesting engaging conversations and mutual understanding. Your spiritual alignment indicates harmony in beliefs and life philosophy.`,
        advice: [
          'Communicate openly about feelings and expectations',
          'Spend quality time together to strengthen the bond',
          'Respect each other\'s individual space and interests',
          'Work together on common goals and dreams',
          'Practice patience and understanding during challenges',
        ],
      };
    } catch (error) {
      return {
        score: 78,
        scoreLabel: 'Compatibility',
        title: `${userName} & ${partnerName}`,
        subtitle: 'Relationship Compatibility Analysis',
        aspects: [
          {
            id: 'emotional',
            label: 'Emotional',
            description: 'Strong emotional connection and understanding between partners.',
          },
          {
            id: 'intellectual',
            label: 'Intellectual',
            description: 'Good mental compatibility and shared interests.',
          },
          {
            id: 'physical',
            label: 'Physical',
            description: 'Harmonious physical and sensual connection.',
          },
          {
            id: 'spiritual',
            label: 'Spiritual',
            description: 'Shared values and life philosophy alignment.',
          },
        ],
        prediction: `Your relationship shows strong emotional and physical compatibility. Both of you share similar values and life goals. The intellectual connection is good, suggesting engaging conversations and mutual understanding. Your spiritual alignment indicates harmony in beliefs and life philosophy.`,
        advice: [
          'Communicate openly about feelings and expectations',
          'Spend quality time together to strengthen the bond',
          'Respect each other\'s individual space and interests',
          'Work together on common goals and dreams',
          'Practice patience and understanding during challenges',
        ],
      };
    }
  }
);

// Mental Health Analysis Thunk
export const analyzeMentalHealthThunk = createAsyncThunk(
  'aiFeatures/analyzeMentalHealth',
  async ({ currentMood, stressLevel, feelings }: { currentMood: string; stressLevel: string; feelings: string }) => {
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      const response = await fetch(`${API_BASE_URL}/analyze-mental-health`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentMood, stressLevel, feelings }),
      });
      if (!response.ok) throw new Error('API failed');
      return {
        score: 75,
        scoreLabel: 'Mental Wellness',
        title: `${currentMood} • Stress: ${stressLevel}/10`,
        subtitle: 'Mental Wellness Analysis',
        aspects: [
          {
            id: 'emotional',
            label: 'Emotional Balance',
            description: 'Your emotions are relatively balanced. Focus on maintaining positive relationships and self-care routines.',
          },
          {
            id: 'stress',
            label: 'Stress Management',
            description: `With a stress level of ${stressLevel}, consider incorporating relaxation techniques and mindfulness practices.`,
          },
          {
            id: 'selfCare',
            label: 'Self-Care',
            description: 'Prioritize activities that bring joy and relaxation. Your feelings indicate a need for more personal time.',
          },
        ],
        prediction: `Your current mental state shows resilience and awareness. The cosmic energies around mental health suggest focusing on mindfulness and positive affirmations. With stress level ${stressLevel}, it's important to establish healthy boundaries and seek support when needed. Your feelings about ${feelings.toLowerCase()} indicate an opportunity for growth and self-compassion.`,
        advice: [
          'Practice daily mindfulness or meditation',
          'Maintain a consistent sleep schedule',
          'Engage in regular physical activity',
          'Reach out to trusted friends or professionals when needed',
          'Journal your thoughts and emotions regularly',
        ],
      };
    } catch (error) {
      return {
        score: 75,
        scoreLabel: 'Mental Wellness',
        title: `${currentMood} • Stress: ${stressLevel}/10`,
        subtitle: 'Mental Wellness Analysis',
        aspects: [
          {
            id: 'emotional',
            label: 'Emotional Balance',
            description: 'Your emotions are relatively balanced. Focus on maintaining positive relationships and self-care routines.',
          },
          {
            id: 'stress',
            label: 'Stress Management',
            description: `With a stress level of ${stressLevel}, consider incorporating relaxation techniques and mindfulness practices.`,
          },
          {
            id: 'selfCare',
            label: 'Self-Care',
            description: 'Prioritize activities that bring joy and relaxation. Your feelings indicate a need for more personal time.',
          },
        ],
        prediction: `Your current mental state shows resilience and awareness. The cosmic energies around mental health suggest focusing on mindfulness and positive affirmations. With stress level ${stressLevel}, it's important to establish healthy boundaries and seek support when needed. Your feelings about ${feelings.toLowerCase()} indicate an opportunity for growth and self-compassion.`,
        advice: [
          'Practice daily mindfulness or meditation',
          'Maintain a consistent sleep schedule',
          'Engage in regular physical activity',
          'Reach out to trusted friends or professionals when needed',
          'Journal your thoughts and emotions regularly',
        ],
      };
    }
  }
);
