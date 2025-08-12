import { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { inputItem } = req.body;

  if (!inputItem) {
    return res.status(400).json({ error: 'Input item is required' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 600,
      messages: [
        {
          role: 'user',
          content: `Analyze this leadership questionnaire item in two ways:

1. Memory Type: Rate from 0-100 where 0=semantic memory (general impressions) and 100=episodic memory (specific experiences)

2. Leadership Construct: Identify which leadership theory/construct this item likely measures from these options:
- Transformational (inspiring, visionary, innovative)
- Transactional (rewards, punishments, exchanges)
- Authentic (genuine, self-aware, transparent)
- Servant (serving others, empowering, humble)
- Ethical (moral, fair, principled)
- Charismatic (charming, influential, magnetic)
- Participative/Democratic (inclusive, collaborative)
- Autocratic (controlling, directive)
- Laissez-faire (hands-off, passive)
- Toxic/Abusive (harmful, manipulative, destructive)
- Task-oriented (focused on goals, efficiency)
- Relationship-oriented (focused on people, support)

Item to analyze: "${inputItem}"

Return ONLY this JSON structure:
{"percentage":20,"classification":"Judgment-based","explanation":"Brief explanation","improvements":["suggestion 1","suggestion 2","suggestion 3"],"rewrittenExample":"Improved version","leadershipConstruct":"Transformational","constructConfidence":"High","constructExplanation":"This item measures inspirational motivation, a key component of transformational leadership"}`
        }
      ]
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Extract JSON from the response
    let jsonStr = responseText.replace(/```(?:json)?\s*/gi, '').trim();
    if (jsonStr.includes('{')) {
      const start = jsonStr.indexOf('{');
      const end = jsonStr.lastIndexOf('}') + 1;
      jsonStr = jsonStr.substring(start, end);
    }

    const result = JSON.parse(jsonStr);
    
    // Ensure required fields
    result.percentage = Number(result.percentage) || 50;
    
    if (!result.classification) {
      if (result.percentage <= 30) result.classification = "Judgment-based";
      else if (result.percentage <= 70) result.classification = "Mixed";
      else result.classification = "Memory-based";
    }
    
    if (!Array.isArray(result.improvements)) {
      result.improvements = result.improvements ? [result.improvements] : [
        "Add specific time markers",
        "Include observable behaviors",
        "Describe concrete situations"
      ];
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    res.status(500).json({ 
      error: 'Failed to analyze item', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}