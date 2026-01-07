import { useSelector } from 'react-redux';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Authors = () => {
    const books = useSelector(state => state.books.books);

    // Extract unique authors
    const authors = [...new Set(books.map(book => book.author))].map(authorName => {
        const authorBooks = books.filter(b => b.author === authorName);
        return {
            name: authorName,
            bookCount: authorBooks.length,
            categories: [...new Set(authorBooks.map(b => b.category))],
            image: `https://ui-avatars.com/api/?name=${authorName}&background=random&size=200`
        };
    });

    return (
        <div className="space-y-8">
            <div className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Featured Authors</h1>
                <p className="text-gray-600">Meet the minds behind the masterpieces.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {authors.map((author, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
                        <img
                            src={author.image}
                            alt={author.name}
                            className="w-24 h-24 rounded-full mb-4 shadow-sm"
                        />
                        <h3 className="text-xl font-bold text-gray-900">{author.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{author.bookCount} Books • {author.categories.join(', ')}</p>
                        <Link to={`/books?search=${author.name}`} className="mt-auto px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-semibold">
                            View Books
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Authors;
