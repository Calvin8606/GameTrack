const AuthFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm h-[463px] p-6 shadow-xl bg-[#ededed] rounded-3xl">
        {children}
      </div>
    </div>
  );
};

export default AuthFormWrapper;
