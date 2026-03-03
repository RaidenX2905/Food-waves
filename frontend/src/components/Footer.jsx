import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Utensils } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark-900 border-t border-glass-border pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Utensils className="h-8 w-8 text-primary-500" />
                            <span className="font-bold text-2xl tracking-tighter text-white">Food Waves</span>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm">
                            Authentic flavors, premium dining experience. Open 24/7 to satisfy your cravings anytime in Mysuru.
                        </p>
                        <div className="flex space-x-4">
                            <span className="text-gray-400">
                                <Facebook className="h-5 w-5" />
                            </span>
                            <span className="text-gray-400">
                                <Instagram className="h-5 w-5" />
                            </span>
                            <span className="text-gray-400">
                                <Twitter className="h-5 w-5" />
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Home</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/menu" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Our Menu</Link></li>
                            <li><Link to="/reviews" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Customer Reviews</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Contact US</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                                <span>123 Culinary Hub, KD Road, Mysuru, Karnataka, India 570001</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                                <span>hello@foodwaves.in</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Opening Hours</h4>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center pb-2 border-b border-glass-border">
                                <span>Monday - Sunday</span>
                                <span className="text-primary-500 font-semibold">24 Hours Open</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-glass-border pt-8 text-center md:flex justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Food Waves. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 space-x-4 text-sm">
                        <span className="text-gray-500">Privacy Policy</span>
                        <span className="text-gray-500">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
