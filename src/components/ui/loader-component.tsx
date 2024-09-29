import { Loader2 } from "lucide-react";

interface Props {
  title: string;
  isLoading: boolean;
}

const LoaderComponent = ({ title, isLoading }: Props) => {
  if (!isLoading) return <p>{title}</p>;

  return <Loader2 className="w-5 h-5 animate-spin" />;
};

export default LoaderComponent;
