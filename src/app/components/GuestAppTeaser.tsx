'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function GuestAppTeaser() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/guest-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('You\'ve been added to the waitlist! We\'ll notify you when the guest app launches.');
        setEmail('');
      } else {
        throw new Error(data.message || 'Failed to join waitlist');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block bg-accent-500/20 text-accent-300 rounded-full px-4 py-1 text-sm font-semibold mb-4">
          COMING SOON
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The BalaBite <span className="text-accent-300">Guest App</span>
        </h2>
        <p className="text-primary-100/80 max-w-2xl mx-auto">
          Discover the future of dining with our AI-powered restaurant companion. Get personalized menu recommendations, 
          instant answers to your questions, and a seamless ordering experience.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative border-8 border-primary-800 rounded-[3rem] shadow-xl bg-primary-900 p-3 max-w-[280px] mx-auto">
            {/* Phone Screen with Futuristic UI */}
            <div className="rounded-[2.3rem] overflow-hidden aspect-[9/19] relative bg-gradient-to-b from-primary-850 to-primary-950">
              {/* App Interface */}
              <div className="absolute inset-0 flex flex-col">
                {/* Status Bar */}
                <div className="h-8 px-6 flex justify-between items-center text-xs bg-primary-950/50 backdrop-blur-sm text-primary-100/80">
                  <span>9:41</span>
                  <div className="flex space-x-1">
                    <span>5G</span>
                    <span>●●●●</span>
                  </div>
                </div>
                
                {/* App Header */}
                <div className="px-4 py-3 bg-primary-900/90 backdrop-blur-md border-b border-accent-500/20">
                  <div className="flex justify-between items-center">
                    <div className="text-accent-300 font-bold">BalaBite</div>
                    <div className="h-8 w-8 rounded-full bg-primary-850 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-300">
                        <path d="M12 4C8 4 4 8 4 12C4 16 8 20 12 20C16 20 20 16 20 12C20 8 16 4 12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 12C7 12 9 8 12 8C15 8 17 12 17 12C17 12 15 16 12 16C9 16 7 12 7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="flex-1 overflow-hidden">
                  {/* Restaurant View */}
                  <div className="h-24 bg-gradient-to-r from-primary-850 to-primary-900 p-3 border-b border-accent-500/10">
                    <div className="flex gap-3">
                      <div className="w-18 h-18 rounded-lg bg-primary-800/80 overflow-hidden flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-300">
                          <path d="M5 5C5 5 4 7 6 9C8 11 9 8 11 10C13 12 10 14 12 16C14 18 16 15 18 17C20 19 19 21 19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 4H4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16 20H20V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Bistro AI</h4>
                        <div className="flex items-center space-x-1 text-accent-300 text-xs">
                          <span>★★★★</span>
                          <span className="text-primary-100/60">4.8</span>
                        </div>
                        <p className="text-primary-100/60 text-xs mt-1">Modern Fusion • 0.3mi</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Neural Network Visualization */}
                  <div className="p-2 bg-primary-900/70 border-b border-accent-500/10">
                    <div className="h-16 w-full relative">
                      {/* Neural Network Animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xs text-center text-accent-300/80">
                          <div className="text-xs mb-1">AI ANALYZING YOUR PREFERENCES</div>
                          <div className="flex justify-center space-x-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-300 animate-pulse">
                              <path d="M12 4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12 17V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M17 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-300 animate-pulse delay-100">
                              <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="7" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M7 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M17 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-300 animate-pulse delay-200">
                              <path d="M12 4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12 17V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M17 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Recommendations */}
                  <div className="p-3">
                    <div className="text-xs text-accent-300/90 mb-2 font-bold">PERSONALIZED FOR YOU</div>
                    <div className="space-y-2">
                      <div className="bg-primary-850/80 rounded-md p-2 border border-accent-500/10">
                        <div className="text-accent-300 text-xs flex items-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 text-accent-300">
                            <path d="M12 4L14 8.5L19 9L15.5 12.5L16.5 17.5L12 15L7.5 17.5L8.5 12.5L5 9L10 8.5L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Based on your preferences:
                        </div>
                        <div className="text-white text-sm">Truffle Mushroom Risotto</div>
                      </div>
                      <div className="bg-primary-850/80 rounded-md p-2 border border-accent-500/10">
                        <div className="text-accent-300 text-xs flex items-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 text-accent-300">
                            <path d="M6 6C6 6 10 10 12 12C14 14 18 18 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 9.87827 19.1571 7.9356 17.7573 6.53553" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Popular with diners like you:
                        </div>
                        <div className="text-white text-sm">Miso Glazed Sea Bass</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Chat Interface */}
                  <div className="absolute bottom-0 left-0 right-0 bg-primary-900/95 backdrop-blur-sm border-t border-accent-500/20 p-3">
                    <div className="text-xs text-accent-300 mb-2 font-bold">ASK THE AI SOMMELIER</div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-primary-850 rounded-full px-3 py-1.5 text-primary-100/60 text-xs border border-accent-500/10">
                        Wine pairing for the sea bass?
                      </div>
                      <div className="h-6 w-6 rounded-full bg-accent-500/30 flex items-center justify-center">
                        <span className="text-accent-300 text-xs font-mono">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-300">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Phone Camera Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-6 bg-primary-950 rounded-b-xl"></div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-6">
            {[
              {
                title: "AI-Powered Menu Navigation",
                description: "Our advanced AI understands exactly what you're looking for, whether it's dietary preferences, flavor profiles, or hidden gems on the menu.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
                    <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 12C8 12 10 8 12 8C14 8 16 12 16 12C16 12 14 16 12 16C10 16 8 12 8 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 4L20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 18L6 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                title: "Instant Ingredient Analysis",
                description: "Easily scan any restaurant menu to get detailed information about ingredients, allergen warnings, and nutritional data in seconds.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
                    <path d="M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 8L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 12L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 16L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 18L21 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                title: "Multi-Restaurant Knowledge",
                description: "Upload menus from your favorite local spots and get the same AI assistance, even if they're not BalaBite partners yet.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
                    <path d="M6 9C6 9 6 4 12 4C18 4 18 9 18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 9V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 9C12 9 12 13 16 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 9C12 9 12 13 8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 9V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                title: "Message-Based Interaction",
                description: "Simply text your AI waiter naturally, just like chatting with a friend, for a seamless and personalized dining experience.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
                    <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20H4L6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="text-accent-300">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-primary-100/70 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
        
        </motion.div>
      </div>
    </>
  );
} 