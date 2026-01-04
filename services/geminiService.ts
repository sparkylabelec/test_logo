
import { GoogleGenAI } from "@google/genai";
import { MatchReport } from "../types";

export const generateMatchSummary = async (report: MatchReport): Promise<string> => {
  // 함수 호출 시점에 인스턴스를 생성하여 process.env.API_KEY가 주입된 후 사용되도록 보장
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "API 키가 설정되지 않았습니다.";
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Generate a professional soccer match summary based on the following details:
    Match ID: ${report.id}
    Date: ${report.date}
    Opponent: ${report.opponent}
    Score: FC United ${report.scoreUs} - ${report.scoreThem} ${report.opponent}
    Result: ${report.result === '승' ? 'Win' : report.result === '패' ? 'Loss' : 'Draw'}
    Venue: ${report.venue}
    Scorers: ${report.scorers.map(s => `${s.name} (${s.goals} goals)`).join(', ')}
    Competition: ${report.competition || 'N/A'}
    
    Please provide a 2-paragraph summary. Paragraph 1 should focus on the result and key moments. Paragraph 2 should discuss the impact on the season and team morale.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    
    return response.text || "Failed to generate summary.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "An error occurred while generating the AI summary.";
  }
};
