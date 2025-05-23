import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Footer = () => {
  const linkSections = [
    {
        text: "Quick Links",
        links: ["Home", "Products", "News", "Contact Us", "FAQs"],
        href: ['', 'products']
    },
    {
        text: "Follow Us",
        links: ["Instagram", "Twitter", "Facebook", "YouTube"]
    }
  ]
  return (
    <footer className="bg-gray-300 px-6 md:px-16 lg:px-24 xl:px-32 mt-12">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
          <div>
              <img className="w-36 md:w-32 mix-blend-multiply" src={assets.grocery_store} alt="dummyLogoColored" />
              <p className="max-w-[410px] mt-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?</p>
          </div>
          <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
              {linkSections.map((section, index) => (
                  <div key={index}>
                      <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.text}</h3>
                      <ul className="text-sm space-y-1">
                          {section.links.map((link, i) => (
                              <li key={i}>
                                  <Link href="#" className="hover:underline transition">{link}</Link>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
              <div>
                <h2 class="font-semibold mb-5 text-gray-800">Get In Touch</h2>
                <div class="text-sm space-y-2">
                    <p>(+84) 912 567 790</p>
                    <p>hoanglamxh790@gmail.com</p>
                </div>
              </div>
          </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
          Copyright 2025 © By Hoang Lam. All Right Reserved.
      </p>
    </footer>
  )
}

export default Footer
