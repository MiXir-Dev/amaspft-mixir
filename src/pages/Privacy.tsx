
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { privacyContent } from "@/consts/legal.const";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-tradingbg-600 text-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">{privacyContent.title}</h1>
          
          <div className="space-y-6 text-gray-300">
            <p>{privacyContent.lastUpdated}</p>
            
            {privacyContent.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.lead && <p className="mb-3">{section.lead}</p>}
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.list.map((item) => (
                      <li key={`${section.title}-${item.text}`}>
                        {item.label && (
                          <>
                            <span className="font-medium text-white">{item.label}</span>{" "}
                          </>
                        )}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            
            <div className="pt-8">
              <Link to="/" className="text-mintgreen-300 hover:text-mintgreen-400 transition-colors">
                {privacyContent.backToHomeLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Privacy;
