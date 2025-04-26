const Label = ({
  htmlFor,
  children,
  ...props
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <label
      className="block mb-1 text-sm font-bold text-gray-700"
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
