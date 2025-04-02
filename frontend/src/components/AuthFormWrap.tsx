const AuthFormWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 shadow-lg rounded bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthFormWrapper;
