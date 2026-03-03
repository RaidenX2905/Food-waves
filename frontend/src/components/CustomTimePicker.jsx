import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft } from 'lucide-react';

const CustomTimePicker = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('hours'); // 'hours' or 'minutes'
    const [period, setPeriod] = useState('PM');
    const [hour, setHour] = useState('07');
    const [minute, setMinute] = useState('00');
    const [inputValue, setInputValue] = useState('');
    const wrapperRef = useRef(null);

    // Sync from parent value (e.g. "19:30" 24h format)
    useEffect(() => {
        if (value) {
            let [h, m] = value.split(':');
            let hInt = parseInt(h, 10);
            const p = hInt >= 12 ? 'PM' : 'AM';
            hInt = hInt % 12;
            if (hInt === 0) hInt = 12;

            const formattedH = hInt.toString().padStart(2, '0');
            const formattedM = m.padStart(2, '0');

            setHour(formattedH);
            setMinute(formattedM);
            setPeriod(p);
            setInputValue(`${formattedH}:${formattedM} ${p}`);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const updateParent = (h, m, p) => {
        let hInt = parseInt(h, 10);
        if (p === 'PM' && hInt < 12) hInt += 12;
        if (p === 'AM' && hInt === 12) hInt = 0;

        const stringVal = `${hInt.toString().padStart(2, '0')}:${m}`;
        onChange(stringVal);
    };

    const handleHourSelect = (h) => {
        const formatted = h.toString().padStart(2, '0');
        setHour(formatted);
        updateParent(formatted, minute, period);
        setTimeout(() => setMode('minutes'), 300);
    };

    const handleMinuteSelect = (m) => {
        const formatted = m.toString().padStart(2, '0');
        setMinute(formatted);
        updateParent(hour, formatted, period);
        setTimeout(() => setIsOpen(false), 300);
    };

    const handlePeriodChange = (p) => {
        setPeriod(p);
        updateParent(hour, minute, p);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        // Simple regex to match HH:MM AM/PM
        const match = e.target.value.match(/^([0-1]?[0-9]):([0-5][0-9])\s?(AM|PM|am|pm)?$/);
        if (match) {
            let [_, h, m, p] = match;
            h = parseInt(h, 10);
            if (h >= 1 && h <= 12) {
                const finalP = p ? p.toUpperCase() : period;
                setHour(h.toString().padStart(2, '0'));
                setMinute(m);
                setPeriod(finalP);
                updateParent(h, m, finalP);
            }
        }
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setMode('hours');
    };

    // Render circular options
    const renderCircle = () => {
        const radius = 90;
        const items = mode === 'hours'
            ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

        return (
            <div className="relative w-56 h-56 rounded-full bg-dark-800/80 mx-auto mt-4 border border-glass-border flex items-center justify-center">
                {/* Center dot */}
                <div className="w-2 h-2 bg-primary-500 rounded-full z-10" />

                {items.map((item, index) => {
                    // 12 or 0 is at top (-90 degrees)
                    const angle = (index * 30 - 90) * (Math.PI / 180);
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    const isSelected = mode === 'hours'
                        ? parseInt(hour, 10) === item || (item === 12 && parseInt(hour, 10) === 0)
                        : parseInt(minute, 10) === item;

                    return (
                        <button
                            key={item}
                            onClick={() => mode === 'hours' ? handleHourSelect(item) : handleMinuteSelect(item)}
                            className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center text-sm font-medium transition-colors z-20 hover:bg-primary-500 hover:text-white ${isSelected ? 'bg-primary-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'text-gray-300'
                                }`}
                            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                            type="button"
                        >
                            {item === 0 ? '00' : item}
                        </button>
                    );
                })}

                {/* Connecting line */}
                <div
                    className="absolute w-0.5 bg-primary-500 origin-bottom z-0"
                    style={{
                        height: radius,
                        bottom: '50%',
                        left: 'calc(50% - 1px)',
                        transform: `rotate(${mode === 'hours'
                            ? (parseInt(hour, 10) % 12) * 30
                            : (parseInt(minute, 10) / 5) * 30
                            }deg)`
                    }}
                />
            </div>
        );
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative flex items-center">
                <input
                    type="text"
                    required
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="HH:MM AM/PM"
                    className="w-full bg-dark-900 border border-glass-border rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                />
                <button
                    type="button"
                    onClick={toggleOpen}
                    className="absolute right-3 p-1.5 text-gray-400 hover:text-primary-500 transition-colors rounded-lg hover:bg-white/5"
                >
                    <Clock className="w-5 h-5" />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 top-full mt-2 w-72 glass-card rounded-2xl p-4 shadow-2xl border border-glass-border left-0 sm:left-auto sm:right-0"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                                {mode === 'minutes' && (
                                    <button
                                        type="button"
                                        onClick={() => setMode('hours')}
                                        className="text-gray-400 hover:text-white mb-2 flex items-center text-xs"
                                    >
                                        <ChevronLeft className="w-3 h-3 mr-1" /> Back to hours
                                    </button>
                                )}
                                <div className="text-3xl font-bold text-white flex gap-1">
                                    <span
                                        className={`cursor-pointer hover:text-primary-400 ${mode === 'hours' ? 'text-primary-500' : ''}`}
                                        onClick={() => setMode('hours')}
                                    >
                                        {hour}
                                    </span>
                                    <span>:</span>
                                    <span
                                        className={`cursor-pointer hover:text-primary-400 ${mode === 'minutes' ? 'text-primary-500' : ''}`}
                                        onClick={() => setMode('minutes')}
                                    >
                                        {minute}
                                    </span>
                                </div>
                            </div>

                            {/* AM / PM Toggle */}
                            <div className="flex flex-col gap-1 bg-dark-900 rounded-lg p-1 border border-glass-border">
                                <button
                                    type="button"
                                    onClick={() => handlePeriodChange('AM')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${period === 'AM' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    AM
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePeriodChange('PM')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${period === 'PM' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    PM
                                </button>
                            </div>
                        </div>

                        {/* Analog Clock Face */}
                        {renderCircle()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomTimePicker;
