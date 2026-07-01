export interface Journey {
  _id?: string;

  journeyName: string;
  trigger: string;
  action: string;
  condition: string;
  yesAction: string;
  noAction: string;
}