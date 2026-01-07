import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, removeBook } from '../store/booksSlice';
import { Trash2, Plus, BookOpen } from 'lucide-react';

const ManageBooks = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.books);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: 'Programming',
        description: '',
        pages: '',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBook({
            ...formData,
            pages: Number(formData.pages),
            rating: Number(formData.rating)
        }));
        setFormData({ ...formData, title: '', author: '', description: '', pages: '' }); // Reset form
        alert('Book added successfully!');
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Add Book Form */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Plus className="h-5 w-5 text-blue-600" /> Add New Book
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Programming</option>
                                        <option>Fiction</option>
                                        <option>History</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={formData.pages}
                                        onChange={e => setFormData({ ...formData, pages: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
                                Add Book
                            </button>
                        </form>
                    </div>
                </div>

                {/* Book List */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-gray-700" /> Manage Library ({books.length})
                    </h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-semibold text-sm text-gray-600">Title</th>
                                    <th className="p-4 font-semibold text-sm text-gray-600">Author</th>
                                    <th className="p-4 font-semibold text-sm text-gray-600">Category</th>
                                    <th className="p-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {books.map(book => (
                                    <tr key={book.id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 font-medium text-gray-900">{book.title}</td>
                                        <td className="p-4 text-gray-600 text-sm">{book.author}</td>
                                        <td className="p-4">
                                            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                                                {book.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => dispatch(removeBook(book.id))}
                                                className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBooks;
