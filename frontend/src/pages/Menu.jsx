import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/menu');
                setMenuItems(res.data.data);
            } catch (err) {
                setError('Failed to fetch menu items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const categories = ['All', ...new Set(menuItems.map(item => item.category))];

    const filteredItems = activeCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <span className="text-primary-500 uppercase tracking-widest font-semibold text-sm mb-4 block">
                    Our Cravings Collection
                </span>
                <h1 className="text-5xl font-bold mb-6">Explore the Menu</h1>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 text-primary-500 animate-spin" />
                </div>
            ) : error ? (
                <div className="text-center text-red-500 glass-card p-6 rounded-xl">{error}</div>
            ) : (
                <>
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-colors ${activeCategory === category
                                        ? 'bg-primary-500 text-white'
                                        : 'glass hover:bg-white/10 text-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        layout
                    >
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item._id || index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="glass-card rounded-2xl overflow-hidden group hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-shadow"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        {item.isVegetarian && (
                                            <span className="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full font-bold">
                                                Veg
                                            </span>
                                        )}
                                        {item.isSpicy && (
                                            <span className="bg-red-500/90 text-white text-xs px-2 py-1 rounded-full font-bold">
                                                Spicy
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold">{item.name}</h3>
                                        <span className="text-primary-500 font-bold text-lg">₹{item.price}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default Menu;
