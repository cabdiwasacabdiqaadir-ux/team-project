import { Link, NavLink } from 'react-router-dom';
import { BookOpen, Menu, X, Heart, Library } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const wishlistItems = useSelector(state => state.wishlist.items);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/books', label: 'Books' },
        { to: '/programming', label: 'Programming' },
        { to: '/authors', label: 'Authors' },
        { to: '/library', label: 'My Library' },
        { to: '/about', label: 'About' },
    ];

    const activeLink = "text-blue-600 font-semibold";
    const normalLink = "text-gray-600 hover:text-blue-600 transition-colors";

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            <span className="text-2xl font-bold text-gray-800">OpenLib</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => isActive ? activeLink : normalLink}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <Link to="/wishlist" className="relative text-gray-600 hover:text-red-500 transition-colors">
                            <Heart className="h-6 w-6" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>
                        <Link to="/manage-books" className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                            Admin
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link to="/wishlist" className="relative text-gray-600">
                            <Heart className="h-6 w-6" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>
                        <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <Link to="/manage-books" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50">
                            Manage Books (Admin)
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
