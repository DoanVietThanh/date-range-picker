type SeparatorProps = {
  vertical?: boolean;
  color: string;
};

const Separator = ({ vertical = true, color }: SeparatorProps) => {
  const separatorClass = vertical ? `bg-${color} h-[200px] w-[2px]` : `bg-${color} w-[200px] h-[2px]`;

  return <div className={`${separatorClass} my-auto`}></div>;
};

export default Separator;
