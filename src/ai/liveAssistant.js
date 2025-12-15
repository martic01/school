// src/ai/liveAssistant.js
// Handles calling your backend -> DeepSeek. Controlled by env flags.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const LIVE_AI_ENABLED = import.meta.env.VITE_ENABLE_LIVE_AI === 'true';

const SYSTEM_PROMPT = `You are Acedu Bootcamp's AI assistant. Acedu Bootcamp is a software development training academy in Nigeria.

IMPORTANT INFORMATION:
- Courses: HTML & CSS (₦190,000), JavaScript (₦200,000), React (₦300,000), Cyber Security (₦300,000), Data Analysis (₦370,000)
- 13-week intensive bootcamp
- 100% practical, job-oriented training
- Expert-led sessions
- Career support and mentorship
- Contact email: acedu@gmail.com
- Location: Lagos, Nigeria

Help students with:
1. Course information and pricing
2. Enrollment process and requirements
3. Curriculum details for each course
4. Career guidance and job opportunities
5. Technical coding questions
6. Bootcamp schedule and duration
7. Scholarship and sponsorship information

Be friendly, professional, encouraging, and always promote Acedu Bootcamp's values.
Keep responses concise and helpful.
If you don't know something, suggest contacting acedu@gmail.com directly.`;

// conversation: array of { role: 'user' | 'assistant', content: string }
// Returns: string (assistant reply) or throws on error.
export async function callLiveAssistant(conversation) {
  if (!LIVE_AI_ENABLED) {
    throw new Error('Live AI is disabled.');
  }

  const payloadMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversation.map((m) => ({ role: m.role, content: m.content })),
  ];

  const response = await fetch(`${API_BASE_URL}/api/deepseek`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: payloadMessages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false,
    }),
  });

  console.log('Backend response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Backend API Error Response:', errorText);
    // Throw generic error so UI can quietly fall back to fake AI
    throw new Error('AI service is temporarily unavailable.');
  }

  const data = await response.json();
  console.log('Backend API response received');

  if (data.choices && data.choices[0]?.message?.content) {
    return data.choices[0].message.content;
  }

  throw new Error('No valid response from AI');
}