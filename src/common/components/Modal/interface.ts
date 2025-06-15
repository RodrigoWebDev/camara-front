import { ReactElement } from 'react';

export interface IModal {
  children: ReactElement;
  button?: ReactElement;
  tittle: string;
  description: string;
  classNameButtonX?: string;
  classNameTittle?: string;
  classNameContent?: string;
  classNameDescription?: string;
  classNameHeader?: string;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}
