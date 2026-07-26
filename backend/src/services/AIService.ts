import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  /**
   * Generates social media content based on a prompt, platform, and tone.
   */
  static async generateContent(prompt: string, platform: string, tone: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional social media manager. Generate a post for ${platform} with a ${tone} tone. Return the response in JSON format with 'content', 'hashtags' (array), and 'suggestions' (array).`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  }

  /**
   * Rewrites existing content to improve it or change its style.
   */
  static async rewriteContent(content: string, instruction: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert editor. Rewrite the following content based on the user's instructions. Keep the tone consistent."
        },
        {
          role: "user",
          content: `Content: ${content}\nInstruction: ${instruction}`
        }
      ]
    });

    return {
      rewritten: response.choices[0].message.content
    };
  }

  /**
   * Analyzes trending data to suggest content ideas.
   */
  static async getStrategySuggestions(userContext: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "Analyze the user's brand context and suggest 3 content strategies for the upcoming week."
        },
        {
          role: "user",
          content: userContext
        }
      ]
    });

    return response.choices[0].message.content;
  }
}
