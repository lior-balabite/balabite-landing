'use client';

import { motion } from 'framer-motion';

const venues = [
  'Restaurants',
  'Coffee Shops',
  'Fine Dining',
  'Bars',
  'Fast Casual',
  'Food Halls',
  'Bakeries',
  'QSR',
];

export default function VenueTypes() {
  return (
    <section className="py-20 px-6 bg-cream-100">
      <div className="max-w-[56rem] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cream-900 mb-3">
            Built for every kitchen.
          </h2>
          <p className="text-lg text-cream-600 mb-10">
            From a 10-seat cafe to a 200-cover fine dining room.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {venues.map((venue) => (
            <span
              key={venue}
              className="rounded-full border border-cream-300 bg-white/60 px-5 py-2.5 text-sm font-medium text-cream-700 transition-colors hover:bg-white hover:border-cream-400"
            >
              {venue}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
