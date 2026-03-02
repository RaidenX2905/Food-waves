import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, UtensilsCrossed } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-lg mx-auto"
            >
                <div className="relative inline-block mb-8">
                    <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                        404
                    </h1>
                    <UtensilsCrossed className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 w-20 text-dark-900 opacity-80" />
                </div>

                <h2 className="text-3xl font-bold mb-4">Dish Not Found</h2>
                <p className="text-gray-400 mb-8 text-lg">
                    Looks like the page you are looking for has been taken off the menu or never existed.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2"
                    >
                        <Home className="h-5 w-5" /> Back to Home
                    </Link>
                    <Link
                        to="/menu"
                        className="glass hover:bg-white/10 text-white px-8 py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2 border border-glass-border"
                    >
                        Explore Menu
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
