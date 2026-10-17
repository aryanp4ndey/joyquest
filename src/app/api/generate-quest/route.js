import { NextResponse } from 'next/server';

const DEFAULT_OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '';

const OPENROUTER_MODELS = [
  'google/gemini-2.0-flash-001',
  'meta-llama/llama-3.3-70b-instruct:free',
  'nvidia/nemotron-3.5-lightning:free',
  'liquid/lfm-2.5-2.6b:free',
];

export async function POST(req) {
  try {
    const body = await req.json();
    const { mood = 'happy', timeOption = { minutes: 5, label: '5 min' }, category = 'reflection', apiKey } = body;

    const key = (apiKey && apiKey.trim()) || DEFAULT_OPENROUTER_KEY;
    if (!key) {
      return NextResponse.json({ success: false, error: 'No API key provided' }, { status: 400 });
    }

    const prompt = `You are an expert mindful wellbeing coach for JoyQuest.
Create ONE inspiring, positive, and small mindful quest.
- User Mood: ${mood}
- Available Duration: ${timeOption.minutes || 5} minutes (${timeOption.label || '5 min'})
- Focus Category: ${category}

Requirements:
- Must be easy to complete right now within ${timeOption.minutes || 5} minutes.
- Focus on micro-moments of joy, intentional breathing, presence, gratitude, or creative calm.
- Safe, uplifting, and clear.

Respond ONLY with valid JSON in this exact structure:
{
  "title": "Inspiring Title (3-5 words)",
  "description": "One vivid sentence encouraging the user (under 120 chars)",
  "steps": [
    "Step 1: specific actionable instruction",
    "Step 2: specific actionable instruction",
    "Step 3: specific actionable instruction",
    "Step 4: specific actionable instruction"
  ],
  "reward": "Two-word badge name",
  "points": 20
}`;

    let lastError = null;

    for (const model of OPENROUTER_MODELS) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://joyquest.app',
            'X-Title': 'JoyQuest AI',
          },
          signal: AbortSignal.timeout(3000),
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'system',
                content: 'You are a mindful quest generator. Output only valid JSON matching the user schema.',
              },
              { role: 'user', content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 450,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          lastError = `${model}: ${response.status} - ${errText}`;
          continue;
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (!content) continue;

        // Clean any markdown fences
        const cleaned = content.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        if (parsed.title && parsed.description && Array.isArray(parsed.steps) && parsed.steps.length >= 2) {
          return NextResponse.json({
            success: true,
            quest: {
              ...parsed,
              category,
              points: Math.min(Math.max(parsed.points || 15, 10), 30),
              aiGenerated: true,
              model,
            },
          });
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    return NextResponse.json(
      { success: false, error: 'All OpenRouter models failed', details: lastError },
      { status: 502 }
    );
  } catch (err) {
    console.error('Quest generation route error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
