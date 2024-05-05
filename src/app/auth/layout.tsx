const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-custom-lighterGreen">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
