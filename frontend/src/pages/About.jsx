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
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-primary-500/20 blur-3xl rounded-full pointer-events-none" />
                    <img
                        src="/images/chef_about_realistic.png"
                        alt="Expert Indian Chef"
                        className="relative rounded-2xl shadow-2xl glass border border-glass-border w-full h-[500px] object-cover z-10"
                    />
                    <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-2xl z-20 hidden md:block border border-primary-500/30">
                        <h4 className="font-bold text-2xl text-primary-500">10+ Years</h4>
                        <p className="text-gray-300 text-sm">Of Culinary Excellence</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">A Culinary Journey Began in <span className="text-primary-500">2020</span></h2>
                    <p className="text-gray-300 mb-4 leading-relaxed text-lg">
                        Food Waves started with a simple, disruptive vision: to bring <span className="text-white font-semibold border-b border-primary-500 pb-0.5">authentic, high-quality, and delicious Indian cuisine</span> to the people of Mysuru <span className="text-primary-500 font-bold">around the clock</span>. What started as a small cloud kitchen has rapidly evolved into the city's premier <span className="text-white font-semibold">24/7 dining destination</span>.
                    </p>
                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                        We passionately believe that absolute culinary perfection knows no time bounds. Whether it's a brisk power-lunch, an extravagant family dinner, or an undeniable <span className="text-primary-400 font-medium italic">3 AM craving</span>, our doors are always open, and our master chefs' kitchen is always firing with uncompromising passion.
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-glass-border">
                        <div className="glass p-6 rounded-2xl border-l-4 border-l-primary-500 hover:bg-white/5 transition-colors">
                            <h4 className="text-4xl font-black text-white mb-2">5k+</h4>
                            <p className="text-primary-400 font-medium uppercase tracking-wider text-xs">Happy Customers</p>
                        </div>
                        <div className="glass p-6 rounded-2xl border-l-4 border-l-primary-500 hover:bg-white/5 transition-colors">
                            <h4 className="text-4xl font-black text-white mb-2">60+</h4>
                            <p className="text-primary-400 font-medium uppercase tracking-wider text-xs">Signature Dishes</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Ethos Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-12 rounded-3xl text-center relative overflow-hidden mt-12"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />
                <h3 className="text-3xl font-bold mb-4">Our Core Ethos</h3>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto italic font-light">
                    "Every spice tells a story. Every plate is a canvas. We don't just cook food; we craft unforgettable <span className="text-primary-500 font-semibold not-italic">sensory waves</span> that linger long after the last bite."
                </p>
            </motion.div>
        </div>
    );
};

export default About;
