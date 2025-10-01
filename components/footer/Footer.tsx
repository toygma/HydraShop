import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const footerLinks = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "About Us", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms & Conditions", href: "/terms" },
  { title: "FAQ", href: "/faq" },
  { title: "Shipping Info", href: "/shipping" },
];

const contactDetails = [
  {
    icon: FaMapMarkerAlt,
    text: "123 HydraShop Road, Suite 456, Cityville, ST 12345",
    href: "https://maps.google.com",
  },
  {
    icon: FaPhoneAlt,
    text: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: FaEnvelope,
    text: "contact@hydrashop.com",
    href: "mailto:contact@hydrashop.com",
  },
];

const socialIcons = [
  {
    icon: FaFacebook,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:text-blue-500",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter",
    color: "hover:text-sky-400",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:text-blue-600",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-24 border-t border-gray-700/50">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F27405] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block group">
              <h2 className="font-black text-3xl lg:text-4xl bg-gradient-to-r from-[#F27405] to-orange-500 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:scale-105">
                HydraShop
              </h2>
            </Link>

            <p className="text-sm lg:text-base text-gray-400 leading-relaxed max-w-xs">
              Your seamless solution for finding the perfect products. Quality
              goods, effortlessly delivered.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialIcons.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={`group relative p-3 bg-gray-800/50 rounded-full border border-gray-700 transition-all duration-300 hover:border-transparent hover:scale-110 hover:shadow-lg ${item.color}`}
                  >
                    <IconComponent className="text-lg transition-transform duration-300 group-hover:rotate-12" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#F27405] to-transparent" />
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-3">
              {footerLinks.slice(0, 4).map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center text-gray-400 hover:text-[#F27405] transition-all duration-300 text-sm lg:text-base"
                  >
                    <span className="w-0 h-0.5 bg-[#F27405] transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Information
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#F27405] to-transparent" />
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-3">
              {footerLinks.slice(4).map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center text-gray-400 hover:text-[#F27405] transition-all duration-300 text-sm lg:text-base"
                  >
                    <span className="w-0 h-0.5 bg-[#F27405] transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#F27405] to-transparent" />
            </h3>
            <div className="space-y-4">
              {contactDetails.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    target={item.icon === FaMapMarkerAlt ? "_blank" : undefined}
                    rel={
                      item.icon === FaMapMarkerAlt
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-start gap-4 p-3 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-[#F27405]/50 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 p-2 bg-[#F27405]/10 rounded-lg group-hover:bg-[#F27405]/20 transition-colors duration-300">
                      <IconComponent className="text-[#F27405] text-xl" />
                    </div>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm lg:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              &copy; {currentYear}{" "}
              <span className="text-[#F27405] font-semibold">HydraShop</span>.
              All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link
                href="/privacy"
                className="hover:text-[#F27405] transition-colors duration-300"
              >
                Privacy
              </Link>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <Link
                href="/terms"
                className="hover:text-[#F27405] transition-colors duration-300"
              >
                Terms
              </Link>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <Link
                href="/cookies"
                className="hover:text-[#F27405] transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#F27405]/5 rounded-full blur-3xl" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
};

export default Footer;
