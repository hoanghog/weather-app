import OpenAI from 'openai';
import config from 'config';

const apiKey = config.get<string>('open-ai.api-key');

class AI {
  private _openai: OpenAI;

  constructor() {
    this._openai = new OpenAI({ apiKey });
  }

  private get openai() {
    return this._openai;
  }

  async generateForecast(forecast: Record<string, any>, style: 'factual' | 'tabloid', lang: 'sk' | 'en'): Promise<string | null> {
    const language = lang === 'sk' ? 'slovak' : 'english';
    let text =
      style === 'factual'
        ? `Write a factual news article about the following weather forecast: ${JSON.stringify(forecast)}.`
        : `Write a sensational, tabloid-style news article about the following weather forecast: ${JSON.stringify(forecast)}.`;
    text += ` In ${language} language. News must have heading, perex and body.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text
            }
          ]
        }
      ],
      temperature: style === 'tabloid' ? 1.0 : 0.2
    });

    return response.choices[0].message.content;
  }
}

export default new AI();
