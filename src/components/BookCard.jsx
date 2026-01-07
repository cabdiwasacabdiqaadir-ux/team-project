import { Link } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';

const BookCard = ({ book }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.items);
    const isInWishlist = wishlist.some(item => item.id === book.id);

    const handleWishlistClick = (e) => {
        e.preventDefault(); // Prevent navigation if wrapped in link
        if (isInWishlist) {
            dispatch(removeFromWishlist(book.id));
        } else {
            dispatch(addToWishlist(book));
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
            <div className="relative h-64 overflow-hidden group">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                    onClick={handleWishlistClick}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-500 hover:text-red-500'
                        }`}
                >
                    <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {book.category}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{book.author}</p>

                <div className="mt-auto flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm font-medium text-yellow-500">★ {book.rating}</span>
                    <span className="text-sm text-gray-400">{book.pages} pages</span>
                </div>

                <div className="mt-3 flex gap-2">
                    <Link
                        to={`/books/${book.id}`}
                        className="flex-1 text-center py-2 px-4 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    >
                        Details
                    </Link>
                    <Link
                        to={`/read/${book.id}`}
                        className="flex-1 text-center py-2 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <BookOpen className="h-4 w-4" /> Read
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
