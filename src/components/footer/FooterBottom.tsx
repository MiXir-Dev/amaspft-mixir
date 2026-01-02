import { footerContent } from "@/consts/site.const";

type FooterBottomProps = {
  currentYear: number;
};

const FooterBottom = ({ currentYear }: FooterBottomProps) => {
  return (
    <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm mb-4 md:mb-0">
        {footerContent.copyright(currentYear)}
      </p>
      <div className="text-gray-600 text-sm">
        <span className="text-mintgreen-300 font-medium">{footerContent.tradersMentored.value}</span>{" "}
        {footerContent.tradersMentored.label}
      </div>
    </div>
  );
};

export default FooterBottom;
