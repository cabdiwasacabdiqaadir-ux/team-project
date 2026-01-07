import { useSelector } from 'react-redux';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Library = () => {
    const progress = useSelector(state => state.reader.progress);
    const books = useSelector(state => state.books.books);

    // Get books that have progress
    const readingList = books.filter(book => progress[book.id]);

    return (
        <div className="space-y-8">
            <div className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">My Library</h1>
                <p className="text-gray-600">Continue reading where you left off.</p>
            </div>

            {readingList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {readingList.map(book => {
                        const bookProgress = progress[book.id];
                        return (
                            <div key={book.id} className="bg-white rounded-xl shadow-md p-6 flex gap-4 border border-gray-100">
                                <img src={book.image} alt={book.title} className="w-24 h-36 object-cover rounded-md flex-shrink-0" />
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{book.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{book.author}</p>

                                    <div className="mt-auto">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Progress</span>
                                            <span>{bookProgress.page || 0}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                            <div
                                                className="h-full bg-green-500 rounded-full"
                                                style={{ width: `${bookProgress.page || 0}%` }}
                                            />
                                        </div>
                                        <Link
                                            to={`/read/${book.id}`}
                                            className="block w-full text-center bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Continue Reading
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No books started yet</h3>
                    <p className="text-gray-500 mb-6">Start reading a book to see it here.</p>
                    <Link to="/books" className="text-blue-600 font-semibold hover:underline">Browse Library</Link>
                </div>
            )}
        </div>
    );
};

export default Library;
