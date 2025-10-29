import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import logo from "../assets/LOGO.png"; // Replace with your logo path

const FooterLinks = [
  { title: "Company", links: ["About Us", "Careers", "Press"] },
  { title: "Support", links: ["Help Center", "Community", "Contact Us"] },
  { title: "Legal", links: ["Terms of Service", "Privacy Policy", "Cookie Policy"] },
];

export function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 50) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerStyle = {
    opacity: showFooter ? 1 : 0,
    transform: showFooter ? "translateY(0)" : "translateY(100%)",
    transition: "all 0.6s ease-in-out",
  };

  return (
    <footer
      style={footerStyle}
      className="fixed bottom-0 left-0 w-full bg-[#2C6E69] text-[#F4FBFA] z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Cognify Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold tracking-tight text-[#E8F7F4]">
              Cognify
            </span>
          </div>
          <p className="text-[#D4EFEB] text-sm leading-relaxed max-w-xs">
            “Empowering minds to reconnect, remember, and rediscover joy.”
          </p>
        </div>

        {/* Footer Links */}
        {FooterLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-lg font-semibold mb-3 text-[#F4FBFA]">
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-[#E8F7F4]/80 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-[#36827A]/40 px-6 py-4 bg-[#2C6E69]/95 backdrop-blur-sm">
        <p className="text-[#E8F7F4]/80 text-sm order-2 sm:order-1 mt-4 sm:mt-0 text-center">
          &copy; {new Date().getFullYear()} Cognify. All rights reserved.
        </p>

        <div className="flex space-x-5 order-1 sm:order-2">
          {[Facebook, Instagram, Twitter, Mail].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-[#E8F7F4]/80 hover:text-white transition-transform duration-200 hover:scale-110"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
