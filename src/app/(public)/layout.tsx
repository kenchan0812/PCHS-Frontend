import Footer from "@/components/(public)/footer";
import Header from "@/components/navbar/header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
