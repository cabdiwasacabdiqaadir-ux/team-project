import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">OpenLib</h3>
                        <p className="text-gray-400 text-sm">
                            Your gateway to a world of knowledge. Explore, read, and grow with our vast collection of books.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">Books</a></li>
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white">Programming</a></li>
                            <li><a href="#" className="hover:text-white">Fiction</a></li>
                            <li><a href="#" className="hover:text-white">History</a></li>
                            <li><a href="#" className="hover:text-white">Science</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><Github className="h-6 w-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-6 w-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Linkedin className="h-6 w-6" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} OpenLib. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
