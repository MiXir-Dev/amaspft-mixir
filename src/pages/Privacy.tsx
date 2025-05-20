
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-tradingbg-600 text-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <p>Last Updated: May 20, 2025</p>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
              <p>
                This Privacy Policy explains how we collect, use, and share information about you when you visit our website. 
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
              <p className="mb-3">We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium text-white">Contact Information:</span> When you book a call or sign up for our services, we collect your name and email address.
                </li>
                <li>
                  <span className="font-medium text-white">Usage Information:</span> We collect information about how you interact with our website using analytics tools.
                </li>
                <li>
                  <span className="font-medium text-white">Communication Records:</span> Records of your communications with us.
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Schedule and manage calls and consultations</li>
                <li>Provide and improve our services</li>
                <li>Communicate with you about our services</li>
                <li>Analyze website traffic and usage patterns</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at info@amastrading.com.
              </p>
            </div>
            
            <div className="pt-8">
              <Link to="/" className="text-mintgreen-300 hover:text-mintgreen-400 transition-colors">
                &larr; Back to Home
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
