import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, BookOpen, Heart, Calendar, FileText } from 'lucide-react';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';

const BookDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.books);
    const wishlist = useSelector(state => state.wishlist.items);

    const book = books.find(b => b.id === Number(id)); // Assuming ID is number
    const isInWishlist = wishlist.some(item => item.id === Number(id));

    if (!book) {
        return <div className="text-center py-20">Book not found</div>;
    }

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(book.id));
        } else {
            dispatch(addToWishlist(book));
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/books" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Books
            </Link>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="md:flex">
                    <div className="md:w-1/3 h-96 md:h-auto relative">
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm text-gray-800">
                                {book.category}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 md:w-2/3 flex flex-col">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
                        <p className="text-xl text-gray-600 mb-6">{book.author}</p>

                        <div className="flex items-center space-x-6 mb-8 text-sm text-gray-500">
                            <span className="flex items-center">
                                <span className="text-yellow-500 text-lg mr-1">★</span> {book.rating} Rating
                            </span>
                            <span className="flex items-center">
                                <FileText className="h-4 w-4 mr-1" /> {book.pages} Pages
                            </span>
                            <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" /> Added recently
                            </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-8 flex-grow">
                            {book.description}
                        </p>

                        <div className="flex gap-4 mt-auto">
                            <Link
                                to={`/read/${book.id}`}
                                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                            >
                                <BookOpen className="h-5 w-5" /> Read Now
                            </Link>
                            <button
                                onClick={handleWishlistToggle}
                                className={`flex-1 border-2 px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${isInWishlist
                                        ? 'border-red-500 text-red-500 bg-red-50 hover:bg-red-100'
                                        : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                                {isInWishlist ? 'Saved' : 'Save for Later'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
