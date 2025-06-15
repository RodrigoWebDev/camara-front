/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface ICPFFormData {
  CPF: string;
}

export interface IEmailFormData {
  email: string;
}

export interface ICodeFormData {
  code: string;
}

export interface IPasswordFormData {
  password: string;
  confirmPassword: string;
}

export type TForm<T extends FieldValues> = UseFormReturn<T, any, T>;

export type TInputRef = React.MutableRefObject<HTMLInputElement>;

export interface IRecoverForm<T extends FieldValues> {
  form: TForm<T>;
  onSubmit: (data: T) => void;
  isAllFilled: boolean;
}

export interface IRecoverCPFForm<T extends FieldValues>
  extends IRecoverForm<T> {
  inputCPFRef: TInputRef;
}
