import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Books from './pages/Books';
import Programming from './pages/Programming';
import Authors from './pages/Authors';
import BookDetails from './pages/BookDetails';
import ReadBook from './pages/ReadBook';
import Wishlist from './pages/Wishlist';
import Library from './pages/Library';
import ManageBooks from './pages/ManageBooks';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';



function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/programming" element={<Programming />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/read/:id" element={<ReadBook />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/library" element={<Library />} />
          <Route path="/manage-books" element={<ManageBooks />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
