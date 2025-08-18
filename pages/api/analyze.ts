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
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `# Leadership Item Memory Classification Task

You will analyze a leadership questionnaire item to predict whether respondents would primarily use EPISODIC memory (remembering specific events) or SEMANTIC memory (general knowledge) when answering.

## Background:
- **Episodic memory** (high remember ratio): Items that trigger recall of specific events, situations, or experiences with the leader. These items make people think of particular moments or incidents.
- **Semantic memory** (low remember ratio): Items that trigger general impressions, overall evaluations, or trait judgments about the leader. These items make people access their general knowledge or beliefs.

## What the Percentage Means:
The percentage represents the estimated proportion of respondents who would use episodic memory (remembering specific experiences) when answering this item. For example:
- 20% means only 20% of respondents would recall specific incidents; 80% would rely on general impressions
- 70% means 70% of respondents would think of specific events when answering; only 30% would use general judgments
- This is based on research where participants indicated whether they "remembered" (episodic) or "knew" (semantic) their answers

## Training Examples from Research Data:

### STRONGLY SEMANTIC ITEMS (Remember ratio < 0.35):
These items trigger general impressions and trait judgments rather than specific memories.

Item: "Again, regardless of the amount of formal authority your leader has, what are the chances that he/she would 'bail you out', at his/her expense?"
Remember ratio: 0.260 (26% on 0-100 scale)
Scale: LMX-7 
Why semantic: This asks for a general trait evaluation/overall impression

Item: "My supervisor is the kind of person one would like to have as a friend."
Remember ratio: 0.266 (26.6% on 0-100 scale)
Scale: LMX-MDM
Why semantic: This asks for a general trait evaluation/overall impression

Item: "My supervisor does not hesitate to manipulate or deceive employees in order to reach his or her goals"
Remember ratio: 0.292 (29.2% on 0-100 scale)
Scale: Exploitative Leadership
Why semantic: This asks for a general trait evaluation/overall impression

### STRONGLY EPISODIC ITEMS (Remember ratio > 0.60):
These items trigger recall of specific events and experiences.

Item: "My manager encourages me to handle important work decisions on my own"
Remember ratio: 0.634 (63.4% on 0-100 scale)
Scale: Servant leadership
Why episodic: This refers to specific behaviors/events that can be recalled

Item: "My manager gives me the responsibility to make important decisions about my job"
Remember ratio: 0.652 (65.2% on 0-100 scale)
Scale: Servant leadership
Why episodic: This refers to specific behaviors/events that can be recalled

Item: "My manager takes time to talk to me on a personal level"
Remember ratio: 0.711 (71.1% on 0-100 scale)
Scale: Servant leadership
Why episodic: This refers to specific behaviors/events that can be recalled

### MIXED ITEMS (Remember ratio 0.40-0.50):
These items trigger both types of memory processing.

Item: "My manager provides inspiring strategic and organizational goals"
Remember ratio: 0.438 (43.8% on 0-100 scale)
Scale: Conger-Kanungo Scale of Charismatic Leadership
Why mixed: This could trigger either specific memories or general impressions

## Key Patterns to Look For:

1. **Episodic indicators** (higher remember ratio):
   - Specific actions: "gives", "tells", "helps", "takes time"
   - Concrete behaviors: "listens", "provides feedback", "makes decisions"
   - Personal interactions: "talks to me", "cares about my"
   - Observable events: "meetings", "conversations", "situations"

2. **Semantic indicators** (lower remember ratio):
   - Trait evaluations: "trustworthy", "ethical", "competent"
   - General patterns: "always", "never", "typically", "generally"
   - Abstract concepts: "values", "principles", "integrity"
   - Overall judgments: "effective", "good", "respected"

3. **Scale tendencies** from research:
   - LBDQ-XII and MLQ items tend to be more episodic (mean ~51%)
   - LMX and Exploitative items tend to be more semantic (mean ~38%)
   - Servant and Ethical leadership items are mixed (mean ~47%)

## Your Task:

Analyze this leadership questionnaire item in two ways:

1. Memory Type: Rate from 0-100 where:
   - 0-35: Strongly semantic (general impressions)
   - 35-45: Somewhat semantic
   - 45-55: Mixed
   - 55-65: Somewhat episodic
   - 65-100: Strongly episodic (specific experiences)

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