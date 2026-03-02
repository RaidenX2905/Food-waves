import { motion } from 'framer-motion';

const images = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1414235077428-338988a2e8c0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800"
];

const Gallery = () => {
    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <span className="text-primary-500 uppercase tracking-widest font-semibold text-sm mb-4 block">
                    Visual Feast
                </span>
                <h1 className="text-5xl font-bold mb-6">Our Gallery</h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="overflow-hidden rounded-2xl glass border border-glass-border h-72 cursor-pointer group"
                    >
                        <img
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
