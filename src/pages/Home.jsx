import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Book, Code, Globe } from 'lucide-react';
import BookCard from '../components/BookCard';

const Home = () => {
    const books = useSelector(state => state.books.books);
    const featuredBooks = books.slice(0, 4);

    return (
        <div className="space-y-16 pb-10">
            {/* Hero Section */}
            <section className="relative bg-blue-600 text-white rounded-3xl overflow-hidden mx-4 md:mx-0 mt-6 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/50 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000"
                    alt="Library"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-20 container mx-auto px-6 py-24 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Discover Your Next <br /> Great Read
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
                        Explore thousands of books, track your reading journey, and build your digital library.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                        <Link to="/books" className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                            Browse Books <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link to="/library" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition flex items-center justify-center">
                            My Library
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Link to="/programming" className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100 flex flex-col items-center text-center">
                        <div className="bg-blue-100 p-4 rounded-full mb-4 text-blue-600 group-hover:scale-110 transition">
                            <Code className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Programming</h3>
                        <p className="text-gray-500">Master new languages and frameworks.</p>
                    </Link>

                    <Link to="/books?category=Fiction" className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100 flex flex-col items-center text-center">
                        <div className="bg-purple-100 p-4 rounded-full mb-4 text-purple-600 group-hover:scale-110 transition">
                            <Book className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Fiction</h3>
                        <p className="text-gray-500">Escape into imagination and stories.</p>
                    </Link>

                    <Link to="/books?category=History" className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100 flex flex-col items-center text-center">
                        <div className="bg-yellow-100 p-4 rounded-full mb-4 text-yellow-600 group-hover:scale-110 transition">
                            <Globe className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">History</h3>
                        <p className="text-gray-500">Discover the past to understand the present.</p>
                    </Link>
                </div>
            </section>

            {/* Featured Books */}
            <section className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Featured Books</h2>
                    <Link to="/books" className="text-blue-600 font-semibold hover:underline flex items-center">
                        View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredBooks.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
