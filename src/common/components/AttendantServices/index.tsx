import { FileText } from 'lucide-react';

type attendantServicesProps = {
  name: string;
  countPending: number;
};

const AttendantServices = ({ name, countPending }: attendantServicesProps) => {
  return (
    <div className="flex flex-col items-start gap-6 p-4 self-stretch md:justify-between md:p-6 md:gap-0 md:flex-1 rounded border border-border bg-white shadow-sm">
      <div className="flex flex-col items-start gap-0 self-stretch">
        <div className="flex flex-col items-start gap-[6px] self-stretch">
          <div className="flex items-center gap-2 self-stretch">
            <p className="flex-[1_0_0] text-base font-medium leading-6 text-primary font-sans">
              {name}
            </p>
            <FileText className="w-[18px] h-[18px] text-primary" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end self-stretch">
        <div className="flex flex-col items-start gap-0">
          <p className="text-sm font-medium leading-5 text-card-foreground font-sans mt-4">
            Pendentes
          </p>
          <p className="text-2xl font-semibold leading-8 text-primary font-sans">
            {countPending}
          </p>
        </div>
        {/* <Button
          className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md bg-primary"
        >
          <p className="text-base font-medium leading-6 text-primary-foreground font-sans">
            Solicitar
          </p>
        </Button> */}
      </div>
    </div>
  );
};

export default AttendantServices;
