import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { servicesSectionContent } from "@/consts/services.const";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-tradingbg-700">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{servicesSectionContent.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {servicesSectionContent.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesSectionContent.items.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-tradingbg-600 border border-gray-800 hover:border-mintgreen-300/30 transition-colors">
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
            </motion.div>
          ))}

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: servicesSectionContent.items.length * 0.1 }}
          >
            <Card className="bg-tradingbg-600 border border-mintgreen-300/30 hover:border-mintgreen-300/60 transition-colors">
              <div className="h-48 overflow-hidden rounded-t-lg bg-tradingbg-700 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    {servicesSectionContent.rating.stars.map((star) => (
                      <svg
                        key={star}
                        className="w-8 h-8 fill-mintgreen-300 text-mintgreen-300"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-white mt-2">{servicesSectionContent.rating.value}</div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">{servicesSectionContent.rating.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  {servicesSectionContent.rating.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
