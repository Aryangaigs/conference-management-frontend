export interface Journey {

  _id?: string;

  journeyName: string;

  campaign: string;

  trigger: string;

  waitDays: number;

  condition: string;

  yesAction: string;

  noAction: string;

  status: 'Active' | 'Inactive';

  createdAt?: string;

  updatedAt?: string;

}