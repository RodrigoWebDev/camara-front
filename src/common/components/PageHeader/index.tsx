import { Button } from "@/common/components/ui/button";
import { CheckCheck, Settings } from "lucide-react";

type PageHeaderProps = {
  pageHeaderTitle: string;
  pageHeaderText: string;
  isNotification?: boolean;
};

const PageHeader = ({
  pageHeaderTitle,
  pageHeaderText,
  isNotification = false,
}: PageHeaderProps) => {
  return (
    <div className="flex h-20 px-4 items-center gap-4 flex-shrink-0 self-stretch">
      <div className="flex flex-col items-start flex-[1_0_0]">
        <h1 className="text-[#09090B] font-sans text-2xl font-semibold leading-8">
          {pageHeaderTitle}
        </h1>
        <p className="text-[#71717A] font-sans text-base font-normal leading-6">
          {pageHeaderText}
        </p>
      </div>

      {isNotification && (
        <div className="flex items-start gap-4">
          <Button
            className="flex h-10 px-4 py-2 justify-center items-center gap-2"
            variant="secondary"
          >
            <CheckCheck /> Marcar todas como lidas
          </Button>
          <Button
            className="flex h-10 px-4 py-2 justify-center items-center gap-2"
            variant="secondary"
          >
            <Settings />
            Configurações
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
