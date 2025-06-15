import NewServiceTab from '@/features/newService/components/NewServiceTab';
import ServiceConfirmTab from '@/features/newService/components/ServiceConfirmTab';
import ServicePreviewTab from '@/features/newService/components/ServicePreviewTab';
import useServiceHook, {
  FormValues,
} from '@/features/newService/hooks/useServiceHook';
import { AddedField } from '@/features/newService/services';
import { useState } from 'react';

const NewServicePage = () => {
  const defaultService: FormValues = {
    name: '',
    description: '',
    category: 'documents',
    estimatedTime: 1,
    availability: true,
    label: '',
    placeholder: '',
    type: 'text',
    hint: '',
    required: true,
    options: [],
    newOption: '',
  };

  const [step, setStep] = useState<number>(1);
  const [fields, setFields] = useState<AddedField[]>([]);
  const [service, setService] = useState<FormValues>(defaultService);

  const { form } = useServiceHook({ service });

  const handleBack = () => setStep((step) => step - 1);
  const handleNext = () => setStep((step) => step + 1);

  const handleClear = () => {
    form.reset();
    setFields([]);
    setStep(1);
    setService(defaultService);
  };

  return (
    <>
      {step === 1 && (
        <NewServiceTab
          handleNext={handleNext}
          setFields={setFields}
          fields={fields}
          setService={setService}
          service={service}
        />
      )}
      {step === 2 && (
        <ServicePreviewTab
          handleBack={handleBack}
          handleNext={handleNext}
          service={service}
          fields={fields}
        />
      )}
      {step === 3 && (
        <ServiceConfirmTab
          handleBack={handleBack}
          service={service}
          fields={fields}
          handleClear={handleClear}
        />
      )}
    </>
  );
};

export default NewServicePage;
