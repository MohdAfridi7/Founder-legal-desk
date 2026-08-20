import Header from "@/compontents/header-footer-whatsAPP/Header";
import Footer from "@/compontents/header-footer-whatsAPP/Footer";
import WhatsAppButton from "@/compontents/header-footer-whatsAPP/WhatsAppButton";
import CustomCursor from "@/compontents/CustomCursor";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <CustomCursor />
      <Header />

      <main>{children}</main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}