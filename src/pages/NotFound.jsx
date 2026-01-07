import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="relative mb-8">
                <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">Page Not Found</span>
                </div>
            </div>
            <p className="text-gray-600 max-w-md mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <Link to="/" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                <Home className="h-5 w-5" /> Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
