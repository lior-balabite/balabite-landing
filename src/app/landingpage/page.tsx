'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import WaitlistForm from '../components/WaitlistForm';
import { Toaster } from 'react-hot-toast';

export default function LandingPage() {
  const [waitlistCount, setWaitlistCount] = useState(120);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Array<{city: string, name: string, time: number}>>([]);
  
  // Ref for the background particles canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // First add a ref for the waitlist section
  const waitlistSectionRef = useRef<HTMLDivElement>(null);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const testimonials = [
    {
      name: "Bella Cucina",
      location: "San Francisco, CA",
      quote: "BalaBite has revolutionized our customer service. We're saving 30% on labor costs with higher customer satisfaction."
    },
    {
      name: "Sakura Sushi",
      location: "Chicago, IL",
      quote: "Our guests love the interactive recommendations. Food sales are up 22% since implementation."
    },
    {
      name: "Harvest Table",
      location: "Austin, TX",
      quote: "The seamless POS integration made adoption painless. Staff now focuses on creating memorable experiences."
    }
  ];

  const faqs = [
    {
      question: "How much does BalaBite cost?",
      answer: "BalaBite operates on a subscription model starting at less than the cost of one full-time waiter, with tiered pricing based on restaurant size and needs. Contact us for a custom quote."
    },
    {
      question: "How long does implementation take?",
      answer: "Most restaurants are up and running within 2-3 weeks. Our team handles menu digitization, staff training, and system integration to ensure a smooth transition."
    },
    {
      question: "Can BalaBite integrate with our existing POS system?",
      answer: "Yes! BalaBite integrates seamlessly with all major POS systems including Toast, Square, Clover, and many others through our universal API connectors."
    },
    {
      question: "How does the AI understand customer questions?",
      answer: "Our proprietary NLP technology has been trained on millions of restaurant interactions, enabling it to understand context, preferences, and even complex dietary requirements with remarkable accuracy."
    },
    {
      question: "What hardware do we need?",
      answer: "BalaBite works on standard tablets (iPad, Android) or can be deployed on dedicated hardware we provide. The system is designed to be flexible and adapt to your existing setup."
    },
    {
      question: "How do you handle menu updates?",
      answer: "Menu changes are easy! Either update through our intuitive dashboard or connect your POS system for automatic updates. Seasonal items, specials, and price changes are reflected instantly."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide 24/7 technical support, regular software updates, and a dedicated account manager for every restaurant partner. Our customer success team ensures you get the most out of the BalaBite system."
    }
  ];

  // Initialize particle background
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: {x: number, y: number, size: number, speedX: number, speedY: number, color: string}[] = [];
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: `rgba(255, 207, 87, ${Math.random() * 0.5})`
      });
    }
    
    function animate() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        if (!ctx) return;
        
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x > canvas.width) particle.x = 0;
        else if (particle.x < 0) particle.x = canvas.width;
        
        if (particle.y > canvas.height) particle.y = 0;
        else if (particle.y < 0) particle.y = canvas.height;
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch real restaurant count periodically to keep it current
  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch('/api/restaurant-count');
        if (response.ok) {
          const data = await response.json();
          if (data.count) {
            setWaitlistCount(data.count);
          }
        }
      } catch (error) {
        console.error("Failed to fetch restaurant count:", error);
      }
    }
    
    // Fetch immediately on load
    fetchCount();
    
    // Then fetch every 2 minutes to keep the count current
    const interval = setInterval(() => {
      fetchCount();
    }, 120000); // 2 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Add this effect to create realistic notifications periodically
  useEffect(() => {
    // Cities for random notifications based on major restaurant markets
    const cities = [
      "New York", "Los Angeles", "Chicago", "Miami", "San Francisco", 
      "Las Vegas", "Austin", "Seattle", "Dallas", "Houston",
      "New Orleans", "Boston", "Philadelphia", "Nashville", "Denver"
    ];
    
    // Names of restaurants for more realistic notifications
    const restaurantTypes = [
      "Bistro", "Trattoria", "Grill", "Kitchen", "Restaurant", 
      "Café", "Eatery", "Steakhouse", "Pizzeria", "Brasserie",
      "Chophouse", "Diner", "Bar & Kitchen", "Tavern", "Cantina"
    ];
    
    // Show initial notification after 5s
    const timer1 = setTimeout(() => {
      addNotification(cities, restaurantTypes);
    }, 5000);
    
    // Add more random notifications less frequently for more realism
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        addNotification(cities, restaurantTypes);
      }
    }, 30000);
    
    // Function to add a new notification
    function addNotification(cities: string[], restaurantTypes: string[]) {
      const city = cities[Math.floor(Math.random() * cities.length)];
      const type = restaurantTypes[Math.floor(Math.random() * restaurantTypes.length)];
      const randomName = generateRestaurantName(type);
      
      const newNotification = { 
        city, 
        name: randomName,
        time: Date.now() 
      };
      
      setNotifications(prev => [...prev.slice(-1), newNotification]);
      
      // Remove notification after 7 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n !== newNotification));
      }, 7000);
    }
    
    // Generate semi-realistic restaurant names
    function generateRestaurantName(type: string): string {
      const adjectives = [
        "Golden", "Blue", "Urban", "Rustic", "Coastal", "Spice", "Wild", 
        "Green", "Bella", "Olive", "Modern", "Vintage", "Fresh", "Harbor", "Terra"
      ];
      
      const nouns = [
        "Table", "Plate", "Fork", "Spoon", "Knife", "Garden", "Leaf", 
        "Harvest", "Season", "Market", "Fire", "Ember", "River", "Grove", "Vine"
      ];
      
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      
      // 50% chance to use Adjective + Noun + Type format
      if (Math.random() > 0.5) {
        return `${adj} ${noun} ${type}`;
      } 
      // 50% chance to use just Adjective + Noun
      return `${adj} ${noun}`;
    }
    
    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    };
  }, []);

  // Add a scroll function to scroll to the waitlist section
  const scrollToWaitlist = () => {
    waitlistSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particle background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-0 opacity-50"
      />
      
      {/* Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center z-10 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-400 to-accent-300 text-transparent bg-clip-text"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Your Best Waiter, At Every Table
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-100/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            The AI-powered digital waiter system revolutionizing restaurant service experience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <button 
              onClick={scrollToWaitlist}
              className="btn-primary text-lg px-10 py-4 font-semibold rounded-full hover:scale-105 transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            >
              Join Waitlist ({waitlistCount}+ restaurants)
            </button>
            <p className="mt-4 text-primary-100/60 text-sm">
              Be among the first to transform your restaurant with AI
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-accent-500/20 blur-xl rounded-3xl"></div>
              <div className="relative bg-primary-800/80 backdrop-blur-sm p-6 rounded-2xl border border-accent-500/30 shadow-lg">
                <div className="hand-drawn-border text-center p-4">
                  <h3 className="text-2xl font-semibold mb-2 text-accent-300">AI-Powered Restaurant Assistant</h3>
                  <p className="text-primary-100/80">Conversational AI that understands your menu better than your best server</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </header>
      
      {/* Floating Notifications */}
      {notifications.map((notification, index) => (
        <motion.div 
          key={notification.time}
          className="fixed bottom-4 right-4 bg-primary-800/80 backdrop-blur-md p-4 rounded-lg border border-accent-500/40 shadow-lg z-50 max-w-xs"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            bottom: `${4 + index * 5}rem`,
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-accent-300">{notification.name} Joined!</p>
              <p className="text-xs text-primary-100/70">
                {notification.city}
              </p>
              <p className="text-xs text-primary-100/50 mt-1">
                {Math.floor((Date.now() - notification.time) / 1000)}s ago
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* What/Why Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary-900 to-primary-950 z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent-300">Why Restaurants Are Switching</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent-500/20 p-3 rounded-full mt-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Rising Labor Costs</h3>
                    <p className="text-primary-100/70">Staffing challenges and increasing wages are squeezing restaurant margins like never before.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-accent-500/20 p-3 rounded-full mt-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Inconsistent Service</h3>
                    <p className="text-primary-100/70">Even your best staff have off days, and training new servers takes months.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-accent-500/20 p-3 rounded-full mt-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Missed Revenue Opportunities</h3>
                    <p className="text-primary-100/70">Poor upselling, slow service, and limited menu knowledge leave money on the table.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="relative">
              <div className="absolute inset-0 bg-accent-500/10 blur-xl rounded-3xl"></div>
              <div className="relative bg-primary-800/40 backdrop-blur-sm p-8 rounded-2xl border border-accent-500/20">
                <h2 className="text-3xl font-bold mb-6 text-accent-300">The BalaBite Solution</h2>
                <p className="text-xl mb-6 text-primary-100/90">An AI-powered digital waiter that delivers exceptional service for less than one waiter's salary.</p>
                
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Never calls in sick or takes a vacation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Knows your entire menu perfectly, every time</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Increases check sizes through intelligent recommendations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Learns your customers' preferences over time</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Seamlessly integrates with your existing systems</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative py-24 bg-primary-950 z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-300 to-accent-500 text-transparent bg-clip-text">
              Cutting-Edge Features
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-primary-100/80">
              Powered by advanced AI, BalaBite transforms the dining experience with technology that feels magical yet intuitive.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeIn}
              className="card hover:shadow-[0_0_25px_rgba(253,224,71,0.1)] transition-all hover:-translate-y-1 group"
            >
              <div className="rounded-full bg-accent-500/20 w-16 h-16 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-accent-300">Conversational AI</h3>
              <p className="text-primary-100/70 text-center">
                Natural language understanding that handles complex requests, special instructions, and menu questions with human-like comprehension.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="card hover:shadow-[0_0_25px_rgba(253,224,71,0.1)] transition-all hover:-translate-y-1 group"
            >
              <div className="rounded-full bg-accent-500/20 w-16 h-16 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 7H7V17H9V7Z" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 7H15V13H17V7Z" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-accent-300">Menu Knowledge</h3>
              <p className="text-primary-100/70 text-center">
                Comprehensive understanding of your entire menu, including ingredients, allergens, preparation methods, and perfect pairings.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="card hover:shadow-[0_0_25px_rgba(253,224,71,0.1)] transition-all hover:-translate-y-1 group"
            >
              <div className="rounded-full bg-accent-500/20 w-16 h-16 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1952 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-accent-300">Personalized Recommendations</h3>
              <p className="text-primary-100/70 text-center">
                AI-powered suggestion engine that learns customer preferences to offer relevant, personalized recommendations that increase sales.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="card hover:shadow-[0_0_25px_rgba(253,224,71,0.1)] transition-all hover:-translate-y-1 group"
            >
              <div className="rounded-full bg-accent-500/20 w-16 h-16 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4H8C7.44772 4 7 4.44772 7 5V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V5C17 4.44772 16.5523 4 16 4Z" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 17H13" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-accent-300">Seamless POS Integration</h3>
              <p className="text-primary-100/70 text-center">
                Works with your existing POS system for frictionless order management, payments, and inventory tracking.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Waitlist Form Section */}
      <section ref={waitlistSectionRef} className="relative py-24 bg-primary-900 z-10 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-300 to-accent-500 text-transparent bg-clip-text">
              Join the Revolution
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-primary-100/80">
              Be among the first {waitlistCount}+ restaurants to transform dining with AI
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <WaitlistForm waitlistCount={waitlistCount} />
          </motion.div>
          
          {/* Pioneer Restaurants */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-primary-100/50 mb-3">Pioneering restaurants from across the country</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["New York", "San Francisco", "Chicago", "Miami", "Austin", "Las Vegas", "Seattle"].map((city) => (
                <span key={city} className="px-3 py-1 bg-primary-800/40 rounded-full text-sm text-primary-100/70">
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="relative py-24 bg-gradient-to-b from-primary-950 to-primary-900 z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent-300">What Restaurants Are Saying</h2>
            <p className="text-xl max-w-3xl mx-auto text-primary-100/80">
              Hear from restaurants already transforming their service with BalaBite
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-primary-800/50 backdrop-blur-sm p-6 rounded-xl border border-primary-700 hover:border-accent-500/30 hover:shadow-[0_0_25px_rgba(253,224,71,0.05)] transition-all"
              >
                <div className="flex justify-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-primary-100/90 italic mb-6">"{testimonial.quote}"</p>
                <div className="text-center">
                  <p className="font-bold text-accent-300">{testimonial.name}</p>
                  <p className="text-primary-200/60 text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="relative py-24 bg-primary-900 z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent-300">Frequently Asked Questions</h2>
            <p className="text-xl max-w-3xl mx-auto text-primary-100/80">
              Everything you need to know about BalaBite
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-primary-800/30 backdrop-blur-sm border border-primary-700 rounded-lg overflow-hidden"
              >
                <button 
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                >
                  <span className="text-lg font-medium text-accent-200">{faq.question}</span>
                  <svg 
                    className={`w-6 h-6 text-accent-500 transform transition-transform ${activeQuestion === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeQuestion === index && (
                  <div className="px-6 pb-4 text-primary-100/80">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary-900 to-primary-950 z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent-500/20 blur-3xl rounded-full opacity-20"></div>
              <div className="relative bg-primary-800/40 backdrop-blur-sm p-12 rounded-2xl border border-accent-500/30">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent-300">Ready to Transform Your Restaurant?</h2>
                <p className="text-xl mb-8 text-primary-100/90">
                  Join the waitlist today and be among the <span className="text-accent-300 font-bold">{waitlistCount}+</span> restaurants already revolutionizing their service with BalaBite.
                </p>
                <button 
                  onClick={scrollToWaitlist}
                  className="btn-primary text-lg px-10 py-4 font-semibold rounded-full hover:scale-105 transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                >
                  Join the BalaBite Community
                </button>
                <p className="mt-6 text-primary-300/60">
                  Early partners receive priority access and exclusive benefits
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative py-12 bg-primary-950 border-t border-primary-800 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-accent-300">BalaBite.ai</div>
              <p className="text-primary-100/60">© {new Date().getFullYear()} BalaBite Technologies Inc.</p>
            </div>
            
            <div className="flex space-x-8">
              <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors">
                About
              </Link>
              <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors">
                Case Studies
              </Link>
              <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Custom CSS for hand-drawn effects */}
      <style jsx>{`
        .hand-drawn-border {
          position: relative;
          border-radius: 10px;
        }
        
        .hand-drawn-border:before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 2px solid rgba(245, 158, 11, 0.3);
          border-radius: 12px;
          clip-path: polygon(
            0% 5%, 5% 0%, 95% 0%, 100% 5%,
            100% 95%, 95% 100%, 5% 100%, 0% 95%,
            0% 5%
          );
        }
      `}</style>
      <Toaster position="bottom-center" />
    </div>
  );
} 