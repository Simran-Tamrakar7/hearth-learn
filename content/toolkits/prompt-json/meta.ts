export const meta = {
  id: "prompt-json",
  title: "LLM Structured JSON Output Prompt",
  description: "Guarantees strict JSON schema responses from LLMs without markdown syntax wrapping.",
  icon: "sparkles",
  category: "AI Engineering",
};

export const snippet = `You are an expert system that returns ONLY valid JSON.
Do not wrap your response in markdown code blocks like \`\`\`json.
Your response must strictly match the following JSON Schema:

{
  "status": "success" | "error",
  "data": {
    "summary": "Concise summary",
    "keyTakeaways": ["item1", "item2"]
  }
}`;
