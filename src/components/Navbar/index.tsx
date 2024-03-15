'use client';
import Link from 'next/link';

const NavigationBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-white text-lg font-bold">
            E commerce
          </Link>
        </div>

        <ul className="flex space-x-4 gap-6">
          <li>
            <Link href="/" className="text-white hover:text-gray-300 flex gap-2">
              Home
            </Link>
          </li>
          <li>
            <Link href="/cart" className="text-white hover:text-gray-300 flex gap-2">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;