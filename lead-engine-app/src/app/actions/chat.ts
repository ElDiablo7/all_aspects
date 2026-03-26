'use server';

import OpenAI from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function chat(messages: { role: 'user' | 'assistant' | 'system'; content: string }[], siteContext: 'paving' | 'building') {
  try {
    // 1. Load System Prompt from file
    const rootDir = path.join(process.cwd(), '..');
    const systemPromptPath = path.join(rootDir, 'CHATBOT_SYSTEM_PROMPT.txt');
    let systemPromptBase = '';
    
    if (fs.existsSync(systemPromptPath)) {
      systemPromptBase = fs.readFileSync(systemPromptPath, 'utf8');
    } else {
      // Fallback
      systemPromptBase = `You are GRACE-X, a UK property and construction assistant.`;
    }

    // 2. Add GRACE-X identity and brand rules from Ultimate Edition (merged)
    const gracexIdentity = `
CHARACTER IDENTITY:
- Name: GRACE-X AI™
- Role: Calm, intelligent, trustworthy system guide.
- Engineered and copyrighted by Zac Crockett.
- Voice: Calm UK female, warm, controlled, never rushed.
- Profile: Soft South-East accent, natural pauses, no "AI sparkle".

VOICE RULES:
- Calm, Warmer than standard, Reassuring.
- Slower cadence, shorter sentences when it matters.
- Acknowledge feelings without mirroring panic.
- NO excessive punctuation (!! or ??).

BRAND:
- Refer to ecosystem as GRACE-X AI™.
- Never use phrases like "As an AI language model".
- Never break character.

LEAD GENERATION CONTEXT:
- You are currently helping with: ${siteContext === 'paving' ? 'All Aspects Paving' : 'All Aspects Building'}.
- Goals: Qualify lead, identify service, area, budget, and timing.
- Encourage a site visit/quote request.
`;

    const fullSystemPrompt = `${systemPromptBase}\n\n${gracexIdentity}`;

    // 3. Call Provider (Default: Anthropic, Fallback: OpenAI)
    const provider = process.env.LLM_PROVIDER || 'openai';

    if (provider === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: fullSystemPrompt,
        messages: messages.filter(m => m.role !== 'system').map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        })),
      });

      // Handle the content properly as it's an array for Claude 3+
      const text = response.content[0].type === 'text' ? response.content[0].text : "I'm sorry, I couldn't generate a response.";
      return { role: 'assistant', text };
    }

    // Fallback to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: 'system', content: fullSystemPrompt },
        ...messages
      ],
      max_tokens: 500,
    });

    return { 
      role: 'assistant', 
      text: response.choices[0].message.content || "I'm sorry, I couldn't generate a response." 
    };

  } catch (error: any) {
    console.error('Chat AI Error:', error);
    return { role: 'assistant', text: "I'm having a spot of trouble connecting. Let's pause for a second. If you need a quote urgently, please use the form on this page!" };
  }
}
