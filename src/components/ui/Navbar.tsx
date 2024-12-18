import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "./button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const admin = true; // Set your condition for admin access here

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo */}
          <Link to="/">
            <h1 className="font-bold md:font-extrabold text-2xl text-green-600 dark:text-green-400">
              EcoMove
            </h1>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-green-600 dark:text-green-400"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition"
            >
              Home
            </Link>
            <a
  href="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/16/15/20241216153741-9IAFZ8D1.json"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
>
  AskAI
</a>

            <Link
              to="/order/status"
              className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition"
            >
              Order
            </Link>

            {/* Admin Dropdown */}
            {admin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Dashboard
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-800 rounded-md shadow-lg mt-2 p-2">
                  <Link
                    to="/admin/product"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
                  >
                    Product
                  </Link>
                  <Link
                    to="/admin/store"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
                  >
                    Store
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
                  >
                    Orders
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow-lg">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
            >
              Home
            </Link>
            <Link
              to="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/16/15/20241216153741-9IAFZ8D1.json"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
            >
              AskAI
            </Link>
            <a
              href="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/16/15/20241216153741-9IAFZ8D1.json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
            >
              AskAI
            </a>

            <Link
              to="/order/status"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
            >
              Order
            </Link>

            {/* Admin Links */}
            {admin && (
              <div>
                <p className="font-semibold text-green-600 dark:text-green-400 mb-2">
                  Admin Dashboard
                </p>
                <Link
                  to="/admin/product"
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
                >
                  Product
                </Link>
                <Link
                  to="/admin/store"
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
                >
                  Store
                </Link>
                <Link
                  to="/admin/orders"
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
                >
                  Orders
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
