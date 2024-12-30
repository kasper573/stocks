export type ISODate = `${number}-${number}-${number}`;

export interface ISODateSpan {
  from: ISODate;
  to: ISODate;
}
