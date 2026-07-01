export interface AIRequest {

  objective: string;

  audience: string;

  cta: string;

}

export interface AIResponse {

  subject: string;

  previewText: string;

  emailContent: string;

  ctaSuggestion: string;

}