import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <span className="text-primary-500 uppercase tracking-widest font-semibold text-sm mb-4 block">
                    Our Story
                </span>
                <h1 className="text-5xl font-bold mb-6">About Food Waves</h1>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800"
                        alt="Chef inside kitchen"
                        className="rounded-2xl shadow-2xl glass border border-glass-border w-full h-[400px] object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-4">A Culinary Journey Began in <span className="text-primary-500">2020</span></h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Food Waves started with a simple vision: to bring authentic, high-quality, and delicious food to the people of Mysuru around the clock. What started as a small cloud kitchen has now grown into a premium 24/7 dining destination.
                    </p>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                        We believe that good food knows no time bounds. Whether it's a quick lunch break, a family dinner, or a 3 AM craving, our doors are always open, and our kitchen is always firing.
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-glass-border">
                        <div>
                            <h4 className="text-4xl font-bold text-primary-500 mb-2">5k+</h4>
                            <p className="text-gray-400">Happy Customers</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-primary-500 mb-2">50+</h4>
                            <p className="text-gray-400">Signature Dishes</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
