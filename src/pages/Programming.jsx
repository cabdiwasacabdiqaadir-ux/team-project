import { useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import { Code } from 'lucide-react';

const Programming = () => {
    const books = useSelector(state => state.books.books);
    const programmingBooks = books.filter(book => book.category === 'Programming');

    return (
        <div className="space-y-8">
            <div className="text-center py-10 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                    <Code className="h-10 w-10 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Programming Books</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Level up your coding skills with top-rated technical books.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {programmingBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Programming;
