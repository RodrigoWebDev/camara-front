import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Button } from '@/common/components/ui/button';

import { FileText, Clock, CheckCircle2 } from 'lucide-react';
import StarRating from '../StarRating';

type CustomCardProps = {
  title: string;
  description: string;
  estimatedTime: string;
  reviews: number;
  review: number;
  docsNeeded: number;
};

const CustomCard = ({
  title,
  description,
  estimatedTime,
  reviews,
  review,
  docsNeeded,
}: CustomCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow max-w-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 self-stretch">
            <FileText className="h-4 w-4 g-0 text-foreground" />
            <CardTitle className="text-card-foreground font-sans text-lg font-semibold leading-[28px]">
              {title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-muted-foreground font-sans text-base font-normal leading-normal">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center">
            <StarRating rating={review} />
            <span className="ml-1 text-gray-500">({reviews})</span>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
          <span>{docsNeeded} documento(s) necessário(s)</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" onClick={() => {}}>
          Ver detalhes
        </Button>
        <Button onClick={() => {}} className="bg-primary">
          Solicitar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;

// Example:
// <CustomCard
//  title="Protocolo de Documentos"
//  description="Protocolo de documentos diversos para a Câmara"
//  estimatedTime="Imediato"
//  reviews={215}
//  review={3}
//  docsNeeded={2}
// />
