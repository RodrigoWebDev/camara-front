/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';

export interface IFormData {
  username: string;
  CPF: string;
  birth: string;
  gender: string;
}

export type TForm = UseFormReturn<IFormData, any, IFormData>;

export type TInputRef = React.MutableRefObject<HTMLInputElement>;

export interface ICardForm {
  form: TForm;
  onSubmit: (data: IFormData) => void;
  inputCPFRef: TInputRef;
  inputBirthRef: TInputRef;
  isAllFilled: boolean;
}
