'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MeetYourTeam() {
  return (
    <section className="py-24 px-6 bg-cream-100">
      <div className="max-w-[72rem] mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-widest text-cream-500 mb-4">
            Meet the team
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-900 mb-4">
            Your AI management team.
          </h2>
          <p className="text-lg text-cream-600 max-w-[48rem] mx-auto leading-relaxed">
            9 specialist brains. Each one a department head. They work together 24/7 so you can focus on what you do best: hospitality.
          </p>
        </motion.div>

        {/* Team lineup illustration */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/illustrations/scenes/team-lineup.png"
            alt="AI brain characters standing in a confident lineup — each with a unique hat representing their specialty"
            width={1920}
            height={640}
            className="w-full h-auto rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
