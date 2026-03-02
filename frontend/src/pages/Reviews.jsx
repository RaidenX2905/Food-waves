import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, Loader2, User } from 'lucide-react';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ author: '', rating: 5, comment: '' });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.get(`${API_URL}/api/reviews`);
            setReviews(res.data.data);
        } catch (err) {
            setError('Failed to load reviews.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        setSubmitMessage({ type: '', text: '' });

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${API_URL}/api/reviews`, formData);
            setSubmitMessage({ type: 'success', text: 'Thank you for your review!' });
            setFormData({ author: '', rating: 5, comment: '' });
            fetchReviews(); // Refresh list
        } catch (err) {
            setSubmitMessage({
                type: 'error',
                text: err.response?.data?.message || 'Failed to submit review.'
            });
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <span className="text-primary-500 uppercase tracking-widest font-semibold text-sm mb-4 block">
                    Testimonials
                </span>
                <h1 className="text-5xl font-bold mb-6">What People Say</h1>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Review Form Component */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1"
                >
                    <div className="glass-card p-6 rounded-2xl sticky top-24">
                        <h3 className="text-2xl font-bold mb-6">Leave a Review</h3>
                        {submitMessage.text && (
                            <div className={`p-4 rounded-lg mb-6 ${submitMessage.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {submitMessage.text}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full bg-dark-900 border border-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-6 w-6 transition-colors ${formData.rating >= star ? 'text-primary-500 fill-primary-500' : 'text-gray-600'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Review</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    className="w-full bg-dark-900 border border-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                                    placeholder="Tell us about your experience..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {submitLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Review'}
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Review List Component */}
                <div className="lg:col-span-2">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-12 w-12 text-primary-500 animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 glass-card p-6 rounded-xl">{error}</div>
                    ) : (
                        <div className="space-y-6">
                            {reviews.length === 0 ? (
                                <div className="text-center text-gray-400 glass-card p-8 rounded-xl">
                                    No reviews yet. Be the first to leave one!
                                </div>
                            ) : (
                                reviews.map((review, index) => (
                                    <motion.div
                                        key={review._id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-card p-6 rounded-2xl"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-dark-900 p-2 rounded-full border border-glass-border">
                                                    <User className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg">{review.author}</h4>
                                                    <span className="text-sm text-gray-400">
                                                        {new Date(review.date).toLocaleDateString('en-US', {
                                                            year: 'numeric', month: 'long', day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`h-5 w-5 ${review.rating >= star ? 'text-primary-500 fill-primary-500' : 'text-gray-700'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-300 italic">"{review.comment}"</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
