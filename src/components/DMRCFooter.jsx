// src/components/DMRCFooter.jsx
import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import dmrc from '../assets/dmrc.png';
const DMRCFooter = () => {
  return (
    <footer className="bg-[#1e293b] text-white py-12 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="bg-white rounded-full p-2">
            <img
              src={dmrc}
              alt="DMRC Logo"
              className="w-6 h-6"
            />

            </span>
            <span>DMRC Lost Found</span>
          </h2>
          <p className="mt-4 text-gray-300">
            Official lost and found service for Delhi Metro passengers. Helping reunite people with their belongings through secure verification and community support.
          </p>
          <p className="mt-4 text-green-400 font-medium">✅ Government Certified Service</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-300 space-y-2">
            {/* <li>How It Works</li> */}
            <li>FAQs</li>
            <li>Contact Support</li>
            <li>Metro Station Directory</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300 border-t border-gray-600 pt-6">
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 mt-1" />
          <div>
            <strong>Helpline</strong><br />
            155370 (DMRC Helpline)
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 mt-1" />
          <div>
            <strong>Official Email</strong><br />
            info@dmrc.org
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 mt-1" />
          <div>
            <strong>Head Office</strong><br />
            Metro Bhawan, Fire Brigade Lane,<br />
            Barakhamba Road, New Delhi - 110001
          </div>
        </div>
      </div>

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
