export interface Campaign {

  _id?: string;

  campaignName: string;

  objective: string;

  subject: string;

  previewText: string;

  emailContent: string;

  ctaButton: string;

  ctaUrl: string;

  audience: string;

  status: 'Draft' | 'Published';

  createdAt?: string;

  updatedAt?: string;

}