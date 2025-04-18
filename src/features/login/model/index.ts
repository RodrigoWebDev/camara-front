/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';

export interface IFormData {
  CPF: string;
  password: string;
}

export type TForm = UseFormReturn<IFormData, any, IFormData>;

export type TInputRef = React.MutableRefObject<HTMLInputElement>;

export interface ILoginForm {
  form: TForm;
  onSubmit: (data: IFormData) => void;
  isAllFilled: boolean;
}
