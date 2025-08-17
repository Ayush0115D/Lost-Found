// src/components/DMRCFooter.jsx
import React from "react";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dmrc from "../assets/dmrc.png";

const DMRCFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#1e293b] text-white py-12 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="bg-white rounded-full p-2">
              <img src={dmrc} alt="DMRC Logo" className="w-6 h-6" />
            </span>
            <span>DMRC Lost Found</span>
          </h2>
          <p className="mt-4 text-gray-300">
            Official lost and found service for Delhi Metro passengers. Helping
            reunite people with their belongings through secure verification and
            community support.
          </p>
          <p className="mt-4 text-green-400 font-medium flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Government Certified Service
          </p>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-300 space-y-3">
            <li
              className="hover:text-blue-400 transition cursor-pointer"
              onClick={() => navigate("/faq")} // Open in same tab
            >
              FAQ
            </li>
            <li>
              <a
                href="https://www.delhimetrorail.com/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition cursor-pointer"
              >
                DMRC Helpdesk
              </a>
            </li>
            <li>
              <a
                href="https://delhimetroroutes.com/stations"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition cursor-pointer"
              >
                Metro Station Directory
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300 border-t border-gray-600 pt-6">
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 mt-1" />
          <div>
            <strong>Helpline</strong>
            <br />
            155370 (DMRC Helpline)
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 mt-1" />
          <div>
            <strong>Official Email</strong>
            <br />
            info@dmrc.org
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 mt-1" />
          <div>
            <strong>Head Office</strong>
            <br />
            Metro Bhawan, Fire Brigade Lane,
            <br />
            Barakhamba Road, New Delhi - 110001
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-6xl mx-auto text-center mt-10 border-t border-gray-700 pt-4 text-sm text-gray-400">
        © 2025 Delhi Metro Rail Corporation. All rights reserved.
        <div className="mt-1 space-x-4">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
export default DMRCFooter;
