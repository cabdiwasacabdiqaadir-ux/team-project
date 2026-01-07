import { BookOpen, Users, Globe } from 'lucide-react';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <section className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About OpenLib</h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    We believe in the power of knowledge and the joy of reading. OpenLib is designed to make books accessible, manageable, and enjoyable for everyone.
                </p>
            </section>

            <section className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Our Mission</h3>
                    <p className="text-gray-500">To create the world's best open digital library experience.</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <Users className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Community</h3>
                    <p className="text-gray-500">Connecting readers and authors across the globe.</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                        <Globe className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Accessibility</h3>
                    <p className="text-gray-500">Available everywhere, on any device, for everyone.</p>
                </div>
            </section>

            <section className="bg-blue-50 rounded-3xl p-10 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Reading Matters</h2>
                <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    "A reader lives a thousand lives before he dies . . . The man who never reads lives only one." – George R.R. Martin. <br /><br />
                    Reading expands our vocabulary, improves focus, and reduces stress. It is the foundation of self-improvement and lifelong learning.
                </p>
            </section>
        </div>
    );
};

export default About;
