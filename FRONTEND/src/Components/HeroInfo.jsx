import { motion } from "framer-motion";
import { Heart, Clock, Users, Brain } from "lucide-react";
import heroImg from "../assets/memoryCare.png"; // replace with your image

export function HeroInfoCard() {
  const features = [
    {
      icon: <Heart className="w-10 h-10 text-cognify-teal" />,
      title: "Cherish Every Moment",
      description:
        "Capture and relive precious memories with an elegant, comforting interface designed to make nostalgia feel alive.",
    },
    {
      icon: <Clock className="w-10 h-10 text-cognify-teal" />,
      title: "Gentle Reminders",
      description:
        "Stay connected with reminders for important dates, family calls, and joyful moments worth celebrating.",
    },
    {
      icon: <Users className="w-10 h-10 text-cognify-teal" />,
      title: "Family Connection",
      description:
        "Invite family members to share updates, messages, and photos that keep hearts close — no matter the distance.",
    },
    {
      icon: <Brain className="w-10 h-10 text-cognify-teal" />,
      title: "Cognitive Wellness",
      description:
        "Thoughtfully designed to encourage memory recall and emotional wellbeing through interactive, mindful prompts.",
    },
  ];

  return (
    <section className="bg-bgLight py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-cognify-dark leading-tight">
            Caring for <span className="text-cognify-teal">Memories</span>,  
            <br />Connecting Hearts 💞
          </h1>

          <p className="text-textPrimary text-lg max-w-xl">
            Cognify helps families preserve, relive, and strengthen emotional
            connections through gentle reminders and meaningful digital experiences.
          </p>

          {/* Animated Features */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-cognify-mint/30"
              >
                <div className="flex items-center space-x-3 mb-3">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-cognify-dark">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-textPrimary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <img
            src={heroImg}
            alt="Cognify Care"
            className="w-full max-w-md rounded-2xl shadow-lg border border-cognify-mint/20"
          />
        </motion.div>
      </div>
    </section>
  );
}
