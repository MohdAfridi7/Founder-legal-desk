import Header from "@/compontents/header-footer-whatsAPP/Header";
import Footer from "@/compontents/header-footer-whatsAPP/Footer";
import WhatsAppButton from "@/compontents/header-footer-whatsAPP/WhatsAppButton";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}