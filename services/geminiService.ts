import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateCarDescription = async (brand: string, model: string, category: string): Promise<string> => {
  if (!process.env.API_KEY) return "Descrição indisponível (Chave de API não configurada).";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escreva uma descrição curta, atraente e comercial (máximo 25 palavras) em português para aluguel do carro: ${brand} ${model} (${category}). Foco em conforto e economia.`,
    });
    return response.text?.trim() || "Excelente opção para sua viagem.";
  } catch (error) {
    console.error("Erro ao gerar descrição:", error);
    return "Veículo de alta qualidade disponível para locação.";
  }
};

export const getCarRecommendation = async (query: string, availableCars: string): Promise<string> => {
  if (!process.env.API_KEY) return "Não foi possível processar a recomendação.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `O usuário busca um carro com o seguinte desejo: "${query}".
      Aqui está a lista de carros disponíveis (JSON): ${availableCars}.
      
      Retorne APENAS o nome do carro (Marca Modelo) que melhor se encaixa. Se nenhum se encaixar bem, diga "Nenhum específico".`,
    });
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Erro na recomendação:", error);
    return "";
  }
};