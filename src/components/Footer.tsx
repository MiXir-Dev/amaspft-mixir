import FooterCtaRow from "@/components/footer/FooterCtaRow";
import FooterBrand from "@/components/footer/FooterBrand";
import FooterLinks from "@/components/footer/FooterLinks";
import FooterBottom from "@/components/footer/FooterBottom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tradingbg-800 pt-8 pb-4 px-4">
      <div className="container mx-auto max-w-6xl">
        <FooterCtaRow />

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <FooterBrand />
          <FooterLinks />
        </div>

        {/* Footer Bottom Bar */}
        <FooterBottom currentYear={currentYear} />
      </div>
    </footer>
  );
};

export default Footer;
