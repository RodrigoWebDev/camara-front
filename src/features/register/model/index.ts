/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';

export interface IFormData {
  username: string;
  email: string;
  CPF: string;
  birth: string;
  gender: string;
  password: string;
}

export type FirstStepForm = Omit<IFormData, 'password'>;

export type TForm = UseFormReturn<IFormData, any, IFormData>;

export type TInputRef = React.MutableRefObject<HTMLInputElement>;

export interface ICardForm {
  form: TForm;
  onSubmit: (data: IFormData) => void;
  inputCPFRef: TInputRef;
  inputBirthRef: TInputRef;
  isAllFilled: boolean;
}
