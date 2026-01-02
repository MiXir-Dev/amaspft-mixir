import { siteBrand, footerContent } from "@/consts/site.const";

const FooterBrand = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full overflow-hidden bg-mintgreen-300 flex items-center justify-center">
          <img
            src="/logo/logo.png"
            alt={siteBrand.logoAlt}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-xl font-bold text-mintgreen-300">
          {siteBrand.namePrimary}<span className="text-white">{siteBrand.nameAccent}</span>
        </span>
      </div>
      <p className="text-gray-400">{footerContent.description}</p>
    </div>
  );
};

export default FooterBrand;
