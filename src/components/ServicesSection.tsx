
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "5-Day Free Trial",
    description: "Try before you commit with full access to all features for 5 days.",
    image: "/services/free.png"
  },
  {
    title: "Live Trading Sessions",
    description: "Access our Unicorn Model NQ strategy in real-time with professional guidance.",
    image: "/services/live.gif"
  },
  {
    title: "Daily Trade Recaps",
    description: "Review the day's setups and results with expert analysis and learning points.",
    image: "/services/recap.png"
  },
  {
    title: "Weekly Setup PDFs",
    description: "Get detailed trade setup documentation to study and implement.",
    image: "/services/analysis.png"
  },
  {
    title: "Bi-Weekly Backtesting",
    description: "Learn to validate strategies using historical data for better future decisions.",
    image: "/services/backtest.png"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-tradingbg-700">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive trading education and support designed to help you achieve consistent profitability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-tradingbg-600 border border-gray-800 hover:border-mintgreen-300/30 transition-colors animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full transition-transform duration-300 hover:scale-102"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-tradingbg-600 border border-mintgreen-300/30 hover:border-mintgreen-300/60 transition-colors animate-fade-in" style={{animationDelay: `500ms`}}>
            <div className="h-48 overflow-hidden rounded-t-lg bg-tradingbg-700 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      className="w-8 h-8 fill-mintgreen-300 text-mintgreen-300" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <div className="text-2xl font-bold text-white mt-2">4.98/5 Rating</div>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Client Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Join hundreds of satisfied traders who have transformed their trading with our methods.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
