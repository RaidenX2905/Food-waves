import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1920"
                        alt="Restaurant Ambiance"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary-500 uppercase tracking-widest font-semibold text-sm mb-4 block">
                            Welcome to Food Waves
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Taste the Ocean of <br /><span className="text-primary-500">Authentic Flavors</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Experience the finest culinary journey in Mysuru. Premium ingredients, crafted with passion, served 24/7.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/menu"
                                className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2"
                            >
                                Explore Menu <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link
                                to="/contact"
                                className="glass hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center"
                            >
                                Book a Table
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-20 bg-dark-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-8 rounded-2xl text-center"
                        >
                            <Clock className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Open 24/7</h3>
                            <p className="text-gray-400">Craving at 3 AM? We're open round the clock to serve you hot, fresh food anytime.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-8 rounded-2xl text-center"
                        >
                            <Star className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                            <p className="text-gray-400">Only the freshest, locally sourced ingredients go into preparing our signature dishes.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-8 rounded-2xl text-center"
                        >
                            <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Prime Location</h3>
                            <p className="text-gray-400">Located in the heart of Mysuru with ample parking and a beautiful ambiance.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Dish CTA */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-primary-500/20 blur-3xl rounded-full" />
                            <img
                                src="https://images.unsplash.com/photo-1589302168068-964664d93cb0?auto=format&fit=crop&q=80&w=800"
                                alt="Signature Biryani"
                                className="relative rounded-2xl z-10 w-full h-[500px] object-cover shadow-2xl border border-glass-border"
                            />
                            <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-xl z-20 flex items-center gap-4">
                                <div className="bg-primary-500 text-white rounded-full p-3 font-bold text-xl">
                                    4.9
                                </div>
                                <div>
                                    <p className="font-bold">Highly Rated</p>
                                    <p className="text-sm text-gray-400">By 500+ Customers</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience the Legacy of <span className="text-primary-500">Spices</span></h2>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                Our master chefs blend traditional recipes with modern culinary techniques. Every dish tells a story of heritage, love for food, and uncompromising quality.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3"><ArrowRight className="text-primary-500 h-5 w-5" /> Award-winning chefs</li>
                                <li className="flex items-center gap-3"><ArrowRight className="text-primary-500 h-5 w-5" /> Exquisite mocktail bar</li>
                                <li className="flex items-center gap-3"><ArrowRight className="text-primary-500 h-5 w-5" /> Private dining available</li>
                            </ul>
                            <Link
                                to="/about"
                                className="inline-block border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
                            >
                                Discover Our Story
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
