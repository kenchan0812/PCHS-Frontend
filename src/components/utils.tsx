export const FormWrapper = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full flex flex-col items-center bg-white pt-20 rounded-md">
      <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold">
        {title}
      </div>
      <div className=" sm:text-lg lg:text-xl">{description}</div>
      {children}
    </div>
  );
};
