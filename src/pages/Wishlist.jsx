import { useSelector, useDispatch } from 'react-redux';
import BookCard from '../components/BookCard';
import { clearWishlist } from '../store/wishlistSlice';
import { Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Heart className="h-8 w-8 text-red-500 fill-current" /> My Wishlist
                    </h1>
                    <p className="text-gray-600">Books you've saved for later.</p>
                </div>
                {wishlist.length > 0 && (
                    <button
                        onClick={() => dispatch(clearWishlist())}
                        className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                    >
                        <Trash2 className="h-4 w-4" /> Clear All
                    </button>
                )}
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-8">Save interesting books here to read them later.</p>
                    <Link to="/books" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                        Browse Books
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
