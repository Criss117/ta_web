interface Props {
  subtitle: string;
}

const Subtitle = ({ subtitle }: Props) => {
  return (
    <div className="px-10 py-2">
      <h3 className="text-2xl font-bold">{subtitle}</h3>
    </div>
  );
};

export default Subtitle;
