"use client";

import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "/overview" },
      { name: "Pricing", href: "/pricing" },
      { name: "Marketplace", href: "/marketplace" },
      { name: "Features", href: "/features" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/aboutUs" },
      { name: "Team", href: "/team" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "/help" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Returns", href: "/return-policy" },
      { name: "Terms and Conditions", href: "/terms-and-conditions" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="w-5 h-5" />, href: "https://www.instagram.com/stowave.store/", label: "Instagram" },
  { icon: <FaFacebook className="w-5 h-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "/terms-and-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: "black-red-transparent.png",
    alt: "stowave",
    title: "",
  },
  sections = defaultSections,
  description = "Stowave Quality Wear Everyday.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2025-2026 Stowave.com. All rights reserved.",
  legalLinks = defaultLegalLinks,
}) => {
  return (
    // Upar ki space ko py-32 se pt-32 kar diya aur bottom ko pb-0 kar ke bilkul chipka diya hai
    <section className="pt-16 pb-4 w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8"
                />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
            {/* Social Icons Loop */}
            <ul className="flex items-center space-x-6 text-zinc-400 dark:text-zinc-500">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Main Footer Links Columns */}
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-zinc-800 dark:text-zinc-200">{section.title}</h3>
                <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Copyright and Bottom Legal Links */}
        {/* Is section ki padding-bottom aur margin-bottom ko 0 kar diya hai taake mazeed space na bane */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8 pb-0 mb-0 text-xs font-medium text-zinc-400 dark:text-zinc-500 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
