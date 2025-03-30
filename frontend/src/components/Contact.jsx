import React, { useRef, useState } from "react";
import { motion } from "framer-motion";


import { SectionWrapper } from "../hoc";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa6";


const socialLinks = [
  { id: 1, icon: <FaWhatsapp />, url: "https://wa.me/9063106736", color: "text-green-400" },
  { id: 2, icon: <FaLinkedinIn />, url: "https://www.linkedin.com/n/gowthami-reddy-dasari-a34427322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ", color: "text-blue-700" },
  { id: 3, icon: <FaEnvelope />, url: "mailto:pandu.sci90@gmail.com", color: "text-red-500" }, // Gmail icon
];

const Contact = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className=" text-white py-10 px-4 text-center"
    >
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-6">
        Let's Connect!
      </h2>

      {/* Social Media Links */}
      <div className="flex justify-center gap-6 mb-6">
        {socialLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full bg-gray-800 ${link.color} hover:bg-opacity-80 shadow-lg transition-all duration-300 text-2xl`}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-sm text-gray-400">
        © 2025 <span className="text-blue-400 font-semibold">D.Gowthami</span>. All Rights Reserved.
      </p>
    </motion.footer>
  );
};



export default SectionWrapper(Contact, "contact");