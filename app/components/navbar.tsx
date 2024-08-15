'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const currentPath = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const linkStyle = (path: any) =>
    `text-sm cursor-pointer flex justify-center pt-2 border-b-2 ${
      currentPath === path
        ? 'text-primary-olive border-primary-olive'
        : 'border-transparent hover:border-accent-orange'
    }`;

  const contactStyle = `p-2 px-4 border-2 bg-primary-olive text-text-light rounded-full hover:bg-accent-red hover:text-text-dark hover:border-transparent`;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <header className="flex flex-col items-center justify-between p-4 bg-primary shadow-md">
      <div className="z-10 w-full max-w-5xl flex items-center justify-between font-bold text-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="font-bold text-4xl text-text-light">Surplus</h1>
          </Link>
        </div>
        {/* mettre la navbar ici */}
        <nav className="hidden md:flex flex-row space-x-8 w-full justify-end">
          <Link href="/" className={linkStyle('/')}>
            Magasin
          </Link>
          <Link href="/produits" className={linkStyle('/produits')}>
            Produits
          </Link>
          <Link href="/marques" className={linkStyle('/marques')}>
            Marques
          </Link>
          <Link
            href="/contact"
            className={`${linkStyle('/contact')} ${contactStyle}`}
          >
            Contact
          </Link>
        </nav>
        <button
          className="md:hidden text-text-light"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-primary-olive z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 text-text-light"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          <FaTimes size={24} />
        </button>
        <nav className="flex flex-col items-center mt-16 space-y-4">
          <Link href="/" className={linkStyle('/')}>
            Magasin
          </Link>
          <Link href="/produits" className={linkStyle('/produits')}>
            Produits
          </Link>
          <Link href="/marques" className={linkStyle('/marques')}>
            Marques
          </Link>
          <Link
            href="/contact"
            className={`${linkStyle('/contact')} ${contactStyle}`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
