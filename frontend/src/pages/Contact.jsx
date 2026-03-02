import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', text: '' });

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${API_URL}/api/contact`, formData);
            setStatus({ type: 'success', text: 'Message sent successfully! We will get back to you shortly.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus({
                type: 'error',
                text: err.response?.data?.message || 'Failed to send message. Please try again later.'
            });
        } finally {
            setLoading(false);
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
                    Get in Touch
                </span>
                <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="glass-card p-8 rounded-2xl h-full">
                        <h3 className="text-2xl font-bold mb-8">Reach Out Directly</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-500/10 p-4 rounded-xl text-primary-500">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                                    <p className="text-gray-400">123 Culinary Hub, KD Road<br />Mysuru, Karnataka, India 570001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary-500/10 p-4 rounded-xl text-primary-500">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                                    <p className="text-gray-400">+91 98765 43210<br />+91 12345 67890</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary-500/10 p-4 rounded-xl text-primary-500">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Email Address</h4>
                                    <p className="text-gray-400">hello@foodwaves.in<br />support@foodwaves.in</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary-500/10 p-4 rounded-xl text-primary-500">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                                    <p className="text-gray-400">Monday - Sunday<br /><span className="text-primary-500 font-semibold">Open 24 Hours</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="glass-card p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                        {status.text && (
                            <div className={`p-4 rounded-lg mb-6 ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {status.text}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-dark-900 border border-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-dark-900 border border-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-dark-900 border border-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                    <>
                                        Send Message <Send className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Map Placeholder for visual completeness */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-16 rounded-2xl overflow-hidden glass h-96 border border-glass-border relative object-cover flex items-center justify-center bg-dark-800"
            >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1920')] opacity-20 bg-center bg-cover" />
                <div className="z-10 text-center glass-card p-6 rounded-xl">
                    <MapPin className="h-10 w-10 text-primary-500 mx-auto mb-2" />
                    <p className="font-bold text-lg">Interactive Map Temporarily Disabled</p>
                    <p className="text-gray-400 text-sm">Please see physical address above.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
