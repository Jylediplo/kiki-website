import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-around text-center">
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h4 className="text-lg font-semibold border-b-2 border-primary-olive pb-2 mb-4 text-primary-sand">
              À propos
            </h4>
            <p>© SARL Le Surplus 2013</p>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h4 className="text-lg font-semibold border-b-2 border-primary-olive pb-2 mb-4 text-primary-sand">
              Liens utiles
            </h4>
            <ul>
              <li>
                <a href="/mentions-legales" className="hover:underline">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/politique-de-confidentialite"
                  className="hover:underline"
                >
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="/conditions-generales" className="hover:underline">
                  Conditions générales
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h4 className="text-lg font-semibold border-b-2 border-primary-olive pb-2 mb-4 text-primary-sand">
              Suivez-nous
            </h4>
            <ul className="flex space-x-4 justify-center">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <FaFacebook size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <FaTwitter size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <FaInstagram size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <FaLinkedin size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
