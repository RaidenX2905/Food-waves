import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Loader2, CheckCircle2 } from 'lucide-react';
import CustomTimePicker from '../components/CustomTimePicker';

const BookTable = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulating API call for booking
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div className="min-h-screen py-32 px-4 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 rounded-3xl text-center max-w-lg w-full"
                >
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Reservation Confirmed!</h2>
                    <p className="text-gray-300 mb-8">
                        Thank you, {formData.name}. Your table for {formData.guests} has been booked for {formData.date} at {formData.time}. We've sent the details to {formData.email}.
                    </p>
                    <button
                        onClick={() => {
                            setSuccess(false);
                            setFormData({ ...formData, date: '', time: '', specialRequests: '' });
                        }}
                        className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-full font-semibold transition-all inline-block"
                    >
                        Make Another Booking
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[90vh] py-20 px-4 sm:px-6 lg:px-8 flex items-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left side info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <span className="text-primary-500 uppercase tracking-widest font-semibold text-sm mb-4 block">
                        Reserve Your Experience
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Book a Table
                    </h1>
                    <p className="text-xl text-gray-300 mb-10">
                        Join us for an unforgettable culinary journey. Secure your spot and let us take care of the rest.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 glass p-4 rounded-xl">
                            <div className="bg-primary-500/20 p-3 rounded-lg text-primary-500">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold">Opening Hours</h4>
                                <p className="text-gray-400 text-sm">Open 24/7, Every Day</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Booking Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="glass-card p-8 sm:p-10 rounded-3xl shadow-2xl border border-glass-border">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-dark-900 border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
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
                                        className="w-full bg-dark-900 border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary-500" /> Date
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-dark-900 border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary-500" /> Time (24/7)
                                    </label>
                                    <CustomTimePicker
                                        value={formData.time}
                                        onChange={(newTime) => setFormData({ ...formData, time: newTime })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-primary-500" /> Guests
                                    </label>
                                    <select
                                        value={formData.guests}
                                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                        className="w-full bg-dark-900 border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                        ))}
                                        <option value="9+">9+ People</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Special Requests (Optional)</label>
                                <textarea
                                    rows="3"
                                    value={formData.specialRequests}
                                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                    className="w-full bg-dark-900 border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                                    placeholder="Any allergies, special occasions, or seating preferences?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-6 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm Reservation"}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BookTable;
