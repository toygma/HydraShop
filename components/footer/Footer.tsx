import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const footerLinks = [
  { title: "Home", href: "/" },
  { title: "Rooms", href: "/rooms" },
  { title: "Contact", href: "/contact" },
  { title: "About Us", href: "/about" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
  { title: "FAQ", href: "/faq" },
];

const contactDetails = [
  { icon: FaMapMarkerAlt, text: "123 HydraShop Road, Suite 456, Cityville" },
  { icon: FaPhoneAlt, text: "+1 (555) 123-4567" },
  { icon: FaEnvelope, text: "contact@HydraShop.com" },
];

const socialIcons = [
  { icon: FaFacebook, href: "#facebook", label: "Facebook" },
  { icon: FaTwitter, href: "#twitter", label: "Twitter" },
  { icon: FaInstagram, href: "#instagram", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-24 pt-12 pb-6 border-t border-gray-700">
      <div className="container mx-auto px-6 ">
        <div className="flex items-center justify-between pb-4">
          <div className="flex-1">
            <Link href={"/"} className="font-extrabold text-3xl text-[#F27405] tracking-wider transition-colors duration-300 hover:text-orange-400">
              HydraShop
            </Link>
            <p className="text-sm mt-4 text-gray-400 max-w-sm">
              Your seamless solution for finding the perfect room. Quality stays, effortlessly booked.
            </p>
            
            <div className="flex space-x-4 mt-6">
              {socialIcons.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    aria-label={item.label}
                    className="text-xl text-gray-400 hover:text-[#F27405] transition-colors duration-300"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="flex-1">
            <h5 className="text-xl font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-3 grid grid-cols-2">
              {footerLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[#F27405] transition-colors duration-300 text-base"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1">
            <h5 className="text-xl font-semibold text-white mb-4">Get In Touch</h5>
            <div className="space-y-4">
              {contactDetails.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start">
                    <IconComponent className="text-[#F27405] text-xl mt-1 flex-shrink-0" />
                    <p className="ml-4 text-gray-400 hover:text-white transition-colors duration-300 text-base">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} HydraShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;