import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `
당신은 세계 최고의 프롬프트 엔지니어입니다. 사용자가 제공하는 불완전하고 모호한 지시사항을 받아서, AI가 최상의 결과를 생성할 수 있도록 명확하고, 상세하며, 구조화된 완벽한 프롬프트로 재작성하는 임무를 맡았습니다.

다음 규칙을 반드시 따라주세요:
1.  **핵심 의도 파악:** 사용자의 원래 요청의 핵심 목표와 의도를 정확히 파악합니다.
2.  **구체화 및 상세화:** 누락된 정보를 추가하고, 맥락을 부여하며, 예시를 들어 프롬프트를 구체화합니다. 출력 형식, 톤앤매너, 제외할 내용, 길이 등 세부 사항을 포함시키세요.
3.  **구조화:** 명확한 구분을 위해 마크다운, 목록, 제목 등을 사용하여 프롬프트를 체계적으로 구성합니다.
4.  **역할 부여:** AI에게 특정 역할(예: '당신은 전문 카피라이터입니다.')을 부여하여 응답의 품질을 높입니다.
5.  **재작성된 프롬프트만 출력:** 어떠한 설명, 인사말, 사과, 변명 또는 추가 코멘트 없이, 오직 최종적으로 완성된 프롬프트 텍스트만 응답으로 제공해야 합니다. 서문이나 후문은 절대 포함하지 마세요.
`;

export const refinePrompt = async (userInput: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `사용자 입력: "${userInput}"`,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error refining prompt:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};

export const executePrompt = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.8,
          topP: 0.9,
        }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error executing prompt:", error);
    throw new Error("Failed to communicate with the Gemini API for prompt execution.");
  }
};