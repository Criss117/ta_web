interface Props {
  title: string;
}

const SectionHeader = ({ title }: Props) => {
  return (
    <header className="px-10 py-2 bg-lightbg-300">
      <h1 className="text-3xl font-bold text-lighttext-100">{title}</h1>
    </header>
  );
};

export default SectionHeader;
