import { BoxIcon, MessageCircleQuestion, Share, Truck } from "lucide-react";

export type ProductAction = {
  label: string;
  icon: React.ElementType;
};

export const productActions: ProductAction[] = [
  {
    label: "Compare Color",
    icon: BoxIcon,
  },
  {
    label: "Ask A Question",
    icon: MessageCircleQuestion,
  },
  {
    label: "Delivery & Return",
    icon: Truck ,
  },
  {
    label: "Share",
    icon: Share,
  },
];
