'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HandDrawnIcon from '../components/HandDrawnIcon';
import BalaBiteLogo from '../components/BalaBiteLogo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950">
      {/* Navigation */}
      <nav className="bg-primary-900/95 backdrop-blur-md shadow-md px-4 py-3 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <BalaBiteLogo size="md" className="hover:scale-105 transition-transform" />
          </Link>
          
          <Link href="/" 
            className="btn-primary text-sm px-4 py-2 font-semibold rounded-full hover:scale-105 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent-400 to-accent-300 text-transparent bg-clip-text">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-primary-100/90">
              Bringing the warmth of traditional hospitality into the age of AI
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary-800/50 backdrop-blur-sm border border-accent-500/20 rounded-xl p-8 md:p-12 mb-20"
          >
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-accent-500/20 rounded-full blur-xl"></div>
                  <div className="relative flex items-center justify-center w-full h-full">
                    <BalaBiteLogo size="lg" />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-accent-300 mb-6">The Meaning Behind Our Name</h2>
                <p className="text-primary-100/90 text-lg mb-6">
                  BalaBite is a thoughtful fusion of cultural heritage and technological innovation:
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500/20 p-3 rounded-full flex-shrink-0">
                      <span className="text-xl font-semibold text-accent-300">בעל</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Baal Habayit (בעל הבית)</h3>
                      <p className="text-primary-100/80">
                        In Hebrew tradition, the "owner of the house" who provides attentive, personalized hospitality. 
                        This figure embodies the warmth, care, and personal touch that defines exceptional service.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500/20 p-3 rounded-full flex-shrink-0">
                      <HandDrawnIcon name="ordering" className="w-6 h-6 text-accent-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">"Bite"</h3>
                      <p className="text-primary-100/80">
                        Represents our focus on food and dining experiences, capturing the essence of restaurant service
                        and the culinary journey we enhance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500/20 p-3 rounded-full flex-shrink-0">
                      <HandDrawnIcon name="ai-training" className="w-6 h-6 text-accent-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">"Byte"</h3>
                      <p className="text-primary-100/80">
                        Emphasizes our technological foundation and AI-powered approach, bringing 
                        intelligence and innovation to the hospitality experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-primary-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-primary-800/40 backdrop-blur-sm border border-accent-500/30 rounded-xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-accent-500/20 p-3 rounded-full">
                    <HandDrawnIcon name="multichannel" className="w-8 h-8 text-accent-300" />
                  </div>
                  <h2 className="text-3xl font-bold text-accent-300">Our Vision</h2>
                </div>
                <p className="text-primary-100/80 text-lg mb-6">
                  To create a world where technology enhances human connection in dining experiences, where AI serves as an extension of hospitality rather than a replacement for it.
                </p>
                <p className="text-primary-100/80 mb-6">
                  We envision digital dining assistants that embody the warmth and attentiveness of a traditional <span className="text-accent-300 font-semibold">בעל הבית</span>, while leveraging AI to transform every aspect of the restaurant experience.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="bg-accent-500/10 text-accent-300/90 text-xs px-3 py-1 rounded-full">Connection</span>
                  <span className="bg-accent-500/10 text-accent-300/90 text-xs px-3 py-1 rounded-full">Innovation</span>
                  <span className="bg-accent-500/10 text-accent-300/90 text-xs px-3 py-1 rounded-full">Experience</span>
                  <span className="bg-accent-500/10 text-accent-300/90 text-xs px-3 py-1 rounded-full">Future</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-primary-800/40 backdrop-blur-sm border border-accent-500/30 rounded-xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-accent-500/20 p-3 rounded-full">
                    <HandDrawnIcon name="ai-adoption" className="w-8 h-8 text-accent-300" />
                  </div>
                  <h2 className="text-3xl font-bold text-accent-300">Our Approach</h2>
                </div>
                <p className="text-primary-100/80 text-lg mb-6">
                  We're bringing the warmth and attentiveness of traditional hospitality into the digital age through three core principles:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent-500/10 p-2 rounded-full">
                      <HandDrawnIcon name="ai-training" className="w-5 h-5 text-accent-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">AI-Powered Personalization</h3>
                      <p className="text-primary-100/70">Creating digital systems that understand and anticipate needs, preferences, and behaviors.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-accent-500/10 p-2 rounded-full">
                      <HandDrawnIcon name="guest-experience" className="w-5 h-5 text-accent-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Human-Centered Experience</h3>
                      <p className="text-primary-100/70">Designing technology that enhances rather than replaces the human elements of dining.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-accent-500/10 p-2 rounded-full">
                      <HandDrawnIcon name="analytics" className="w-5 h-5 text-accent-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Data-Driven Hospitality</h3>
                      <p className="text-primary-100/70">Using insights to continuously improve and tailor the dining experience to each guest.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team/Culture */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Bringing Together <span className="text-accent-300">Technology</span> and <span className="text-accent-300">Hospitality</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-primary-100/80">
              Our team combines expertise in AI, restaurant operations, and experience design
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-accent-500/20 blur-xl rounded-xl opacity-70"></div>
            <div className="relative bg-primary-800/60 backdrop-blur-sm border border-accent-500/30 rounded-xl p-8 md:p-12">
              <blockquote className="italic text-2xl text-primary-100/90 mb-10 text-center">
                "We believe AI should enhance the human touch in hospitality, not replace it. Our technology is designed to free staff to focus on what matters most — creating meaningful connections with guests."
              </blockquote>
              
              <div className="flex justify-center mb-12">
                <div className="h-16 w-16 bg-accent-500/30 rounded-full flex items-center justify-center">
                  <BalaBiteLogo showText={false} size="md" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-primary-900/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-accent-300 mb-3">AI Innovation</h3>
                  <p className="text-primary-100/70">
                    Our AI engineers develop intelligent systems that understand menu context, personalize recommendations, and streamline service.
                  </p>
                </div>
                <div className="bg-primary-900/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-accent-300 mb-3">Restaurant Expertise</h3>
                  <p className="text-primary-100/70">
                    Restaurant industry veterans ensure our solutions address real operational challenges and enhance the dining experience.
                  </p>
                </div>
                <div className="bg-primary-900/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-accent-300 mb-3">Experience Design</h3>
                  <p className="text-primary-100/70">
                    Our designers craft intuitive, delightful interfaces that embody the warmth and personality of traditional hospitality.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary-800/40 backdrop-blur-sm border border-accent-500/30 rounded-xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Us in Reimagining <span className="text-accent-300">Restaurant Experiences</span>
            </h2>
            <p className="text-xl text-primary-100/80 mb-10 max-w-2xl mx-auto">
              Experience the perfect fusion of traditional hospitality and cutting-edge AI with BalaBite
            </p>
            <Link 
              href="/"
              className="btn-primary text-lg px-12 py-4 font-semibold rounded-full hover:scale-105 transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] inline-block"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-primary-950 border-t border-primary-800">
        <div className="container mx-auto px-4 text-center">
          <BalaBiteLogo size="sm" className="mx-auto mb-6" />
          <p className="text-primary-100/60 text-sm">© {new Date().getFullYear()} BalaBite Technologies Inc.</p>
          <p className="text-primary-100/40 text-xs mt-3">
            AI-powered hospitality for the future of dining — Where tradition meets innovation
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <Link href="/" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">Home</Link>
            <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">Privacy</Link>
            <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">Terms</Link>
            <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 