import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ArrowLeft, Settings, Type, Moon, Sun } from 'lucide-react';
import { updateProgress, updateSettings } from '../store/readerSlice';

const ReadBook = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const book = useSelector(state => state.books.books.find(b => b.id === Number(id)));
    const { settings, progress } = useSelector(state => state.reader);

    const [showSettings, setShowSettings] = useState(false);

    // Dummy content generator
    const dummyContent = Array(20).fill(`
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `).join('\n\n');

    useEffect(() => {
        // Restore scroll position
        const bookProgress = progress[id];
        if (bookProgress && bookProgress.page) {
            // In a real reader, page would map to scroll position or pagination
            // For this demo, we just acknowledge it
        }
    }, [id, progress]);

    const handleScroll = (e) => {
        // Save progress periodically or on unmount in real app
        // Here we just dispatch on significant scroll merely as demo
        const percent = (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) * 100;
        if (percent > 0) {
            dispatch(updateProgress({ bookId: id, page: Math.round(percent) }));
        }
    };

    if (!book) return <div>Loading...</div>;

    const isDark = settings.theme === 'dark';

    return (
        <div className={`fixed inset-0 z-50 flex flex-col ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-800'}`}>
            {/* Reader Header */}
            <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'}`}>
                <Link to={`/books/${id}`} className="p-2 rounded-full hover:bg-gray-100/10 transition">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="font-bold truncate max-w-md">{book.title}</h1>
                <button onClick={() => setShowSettings(!showSettings)} className="p-2 rounded-full hover:bg-gray-100/10 transition">
                    <Settings className="h-6 w-6" />
                </button>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="absolute top-16 right-6 w-72 bg-white rounded-xl shadow-2xl p-6 border border-gray-100 text-gray-800 z-50 animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold mb-4">Reader Settings</h3>

                    <div className="mb-6">
                        <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2"><Type className="h-4 w-4" /> Font Size</label>
                        <input
                            type="range"
                            min="14"
                            max="24"
                            value={settings.fontSize}
                            onChange={(e) => dispatch(updateSettings({ fontSize: Number(e.target.value) }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500 mb-2 block">Theme</label>
                        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => dispatch(updateSettings({ theme: 'light' }))}
                                className={`flex-1 py-1 rounded-md flex items-center justify-center gap-1 ${settings.theme === 'light' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                            >
                                <Sun className="h-4 w-4" /> Light
                            </button>
                            <button
                                onClick={() => dispatch(updateSettings({ theme: 'dark' }))}
                                className={`flex-1 py-1 rounded-md flex items-center justify-center gap-1 ${settings.theme === 'dark' ? 'bg-white shadow-sm text-black' : 'hover:bg-gray-200'}`}
                            >
                                <Moon className="h-4 w-4" /> Dark
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div
                className="flex-grow overflow-y-auto px-4 md:px-0"
                onScroll={handleScroll}
            >
                <div
                    className="max-w-2xl mx-auto py-12 leading-relaxed font-serif transition-all duration-300"
                    style={{ fontSize: `${settings.fontSize}px` }}
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">{book.title}</h2>
                    <div className="whitespace-pre-line text-justify">
                        {dummyContent}
                    </div>
                    <div className="mt-20 text-center text-sm opacity-50">
                        End of Preview
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-200">
                <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress[id]?.page || 0}%` }}
                />
            </div>
        </div>
    );
};

export default ReadBook;
