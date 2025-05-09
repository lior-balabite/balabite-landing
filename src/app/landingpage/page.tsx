'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import WaitlistForm from '../components/WaitlistForm';
import { Toaster } from 'react-hot-toast';
import GuestAppTeaser from '../components/GuestAppTeaser';
import RestaurantAppFeatures from '../components/RestaurantAppFeatures';
import HandDrawnIcon from '../components/HandDrawnIcon';
import BalaBiteLogo from '../components/BalaBiteLogo';

export default function LandingPage() {
  const [waitlistCount, setWaitlistCount] = useState(120);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Array<{city: string, name: string, time: number}>>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  
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
      question: "What hardware do we need?",
      answer: "BalaBite is a web-based system that runs on any device with a modern web browser. For optimal restaurant use, we recommend tablets for each table or section, and a computer for the kitchen display system. No specialized hardware is required."
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

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        // Fetch the count from the API endpoint
        const response = await fetch('/api/restaurant-count');
        if (response.ok) {
          const data = await response.json();
          console.log("Restaurant count refreshed:", data.count, 
            "This value is 120 + actual count from the database");
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
      console.log("Refreshing restaurant count...");
      fetchCount();
    }, 120000); // 2 minutes (120,000 milliseconds)
    
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
    console.log("scrollToWaitlist called");
    console.log("waitlistSectionRef exists:", !!waitlistSectionRef.current);
    
    if (waitlistSectionRef.current) {
      console.log("Scrolling to waitlist section");
      waitlistSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      console.log("Scroll command executed");
    } else {
      console.error("Waitlist section ref not found");
      
      // Fallback to ID-based scrolling if ref doesn't work
      const waitlistElement = document.getElementById('waitlist');
      if (waitlistElement) {
        console.log("Found element by ID, scrolling to it instead");
        waitlistElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error("Could not find waitlist element by ID either");
      }
    }
  };

  // Add an effect to log when the waitlist section is mounted
  useEffect(() => {
    if (waitlistSectionRef.current) {
      console.log("Waitlist section ref is mounted:", waitlistSectionRef.current);
    } else {
      console.log("Waitlist section ref not mounted yet");
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="bottom-center" toastOptions={{
        style: {
          background: '#1f2937',
          color: '#f3f4f6',
          border: '1px solid rgba(253, 224, 71, 0.3)',
        },
        success: {
          iconTheme: {
            primary: '#FFC107',
            secondary: '#1f2937',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#1f2937',
          },
        },
      }} />
      
      {/* Particle background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-0 opacity-50"
      />
      
      {/* Navigation Bar */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 transition-all duration-300 ${
          isScrolled ? 'bg-primary-900/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BalaBiteLogo size="md" className="hover:scale-105 transition-transform cursor-pointer" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-primary-100 hover:text-accent-300 transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-primary-100 hover:text-accent-300 transition-colors">
              About
            </Link>
            <Link href="#how-it-works" className="text-primary-100 hover:text-accent-300 transition-colors">
              How It Works
            </Link>
            <Link href="#insights" className="text-primary-100 hover:text-accent-300 transition-colors">
              Insights
            </Link>
            <Link href="#faq" className="text-primary-100 hover:text-accent-300 transition-colors">
              FAQ
            </Link>
          </div>
          
          <Link 
            href="#waitlist"
            className="btn-primary text-sm px-4 py-2 font-semibold rounded-full hover:scale-105 transition-all hover:shadow-[0_0_10px_rgba(245,158,11,0.3)]"
          >
            Join Waitlist
          </Link>
        </div>
      </motion.nav>
      
      {/* Live notifications */}
      <div className="fixed bottom-4 right-4 z-50">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.time}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="bg-primary-800/90 backdrop-blur-sm border border-accent-500/30 rounded-lg p-3 mb-2 shadow-xl flex items-center gap-2 max-w-xs"
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <div className="text-sm">
              <span className="text-accent-300 font-medium">{notification.name}</span>
              <span className="text-primary-100/80"> from {notification.city} just joined BalaBite</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center z-10 overflow-hidden pt-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <BalaBiteLogo size="lg" className="mx-auto" />
          </motion.div>
          
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
            <a 
              href="#waitlist"
              className="btn-primary text-lg px-10 py-4 font-semibold rounded-full hover:scale-105 transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] inline-block"
            >
              Join Waitlist ({waitlistCount}+ restaurants)
            </a>
            <p className="mt-4 text-primary-100/60 text-sm">
              Be among the first to transform your restaurant with AI
            </p>
          </motion.div>
          
          {/* AI-Powered Restaurant Assistant */}
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
      
      {/* New AI Features Section */}
      <section id="features" className="relative z-10 py-20 px-4 bg-gradient-to-b from-primary-900 to-primary-800/70">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI-Powered <span className="text-accent-300">Guest Experience</span>
            </h2>
            <p className="text-primary-100/80 max-w-2xl mx-auto">
              Our AI waiter understands and responds to guest needs with human-like intelligence, 
              creating memorable dining experiences that keep customers coming back.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Menu Intelligence",
                description: "AI understands the menu at a deep level - ingredients, preparation methods, flavor profiles, and dietary restrictions.",
                icon: <HandDrawnIcon name="menu" className="w-10 h-10 text-accent-300" />
              },
              {
                title: "Personal Recommendations",
                description: "Analyzes guest preferences and order history to provide tailored suggestions that increase check sizes.",
                icon: <HandDrawnIcon name="menu-navigation" className="w-10 h-10 text-accent-300" />
              },
              {
                title: "Multilingual Support",
                description: "Communicates fluently in 30+ languages, eliminating language barriers and enhancing the dining experience for international guests.",
                icon: <HandDrawnIcon name="multilingual" className="w-10 h-10 text-accent-300" />
              },
              {
                title: "Dietary Knowledge",
                description: "Instantly answers questions about allergies, ingredients, and can suggest modifications to accommodate dietary restrictions.",
                icon: <HandDrawnIcon name="dietary" className="w-10 h-10 text-accent-300" />
              },
              {
                title: "Seamless Ordering",
                description: "Takes orders precisely, sends them directly to the kitchen, and handles modifications without errors.",
                icon: <HandDrawnIcon name="ordering" className="w-10 h-10 text-accent-300" />
              },
              {
                title: "Guest Insights",
                description: "Captures preferences and feedback, building customer profiles that help you understand your guests better.",
                icon: <HandDrawnIcon name="customer-profiles" className="w-10 h-10 text-accent-300" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/40 backdrop-blur-sm border border-accent-500/20 rounded-xl p-6 hover:border-accent-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-3xl mb-4 font-mono text-accent-300">
                  {typeof feature.icon === 'string' ? feature.icon : feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-accent-300 mb-2">{feature.title}</h3>
                <p className="text-primary-100/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Complete Control Panel for Owners Section */}
      <section className="relative z-10 py-20 px-4 bg-gradient-to-b from-primary-800/70 to-primary-900/70">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete <span className="text-accent-300">Experience Management Platform</span>
            </h2>
            <p className="text-primary-100/80 max-w-2xl mx-auto">
              Gain unprecedented insights and control over your restaurant's guest experience with our comprehensive 
              management dashboard designed to create memorable moments that keep customers coming back.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Real-time Analytics",
                description: "Track sales, popular items, customer engagement, and AI performance all in one place.",
                icon: <HandDrawnIcon name="analytics" className="w-8 h-8 text-accent-300" />
              },
              {
                title: "Intelligent Menu",
                description: "Update your menu with dynamic pricing, promotions, and availability in real-time across all platforms.",
                icon: <HandDrawnIcon name="menu" className="w-8 h-8 text-accent-300" />
              },
              {
                title: "Staff Insights",
                description: "Monitor server performance and see how AI is helping your team excel.",
                icon: <HandDrawnIcon name="staff" className="w-8 h-8 text-accent-300" />
              },
              {
                title: "Customer Profiles",
                description: "Build detailed profiles of your regulars to create more personalized experiences.",
                icon: <HandDrawnIcon name="customer-profiles" className="w-8 h-8 text-accent-300" />
              },
              {
                title: "AI Training",
                description: "Customize your AI waiter's knowledge, personality, and recommendations.",
                icon: <HandDrawnIcon name="ai-training" className="w-8 h-8 text-accent-300" />
              },
              {
                title: "Inventory Tracking",
                description: "Get alerts on low stock items and insights into usage patterns.",
                icon: <HandDrawnIcon name="inventory" className="w-8 h-8 text-accent-300" />
              },
              {
                title: "Reservation Management",
                description: "Handle bookings and optimize table allocation for maximum efficiency.",
                icon: <HandDrawnIcon name="reservation" className="w-8 h-8 text-accent-300" />
              },
              {
                title: "Marketing Tools",
                description: "Create targeted promotions based on customer preferences and behaviors.",
                icon: <HandDrawnIcon name="marketing" className="w-8 h-8 text-accent-300" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/40 backdrop-blur-sm border border-accent-500/20 rounded-xl p-5 hover:border-accent-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="text-2xl mb-3 font-mono text-accent-300">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-accent-300 mb-2">{feature.title}</h3>
                <p className="text-sm text-primary-100/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="relative w-full max-w-4xl rounded-xl overflow-hidden border border-accent-500/30">
              {/* Admin Dashboard Mockup */}
              <div className="aspect-w-16 aspect-h-9 bg-primary-900">
                <div className="p-4 w-full h-full">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-center mb-4 border-b border-primary-700 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center text-accent-300">B</div>
                      <div className="font-bold text-white">BalaBite Restaurant Dashboard</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-md text-sm">Demo Mode</div>
                      <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center text-white text-sm">JD</div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="grid grid-cols-12 gap-4 h-[calc(100%-60px)]">
                    {/* Sidebar */}
                    <div className="col-span-2 bg-primary-800/50 rounded-lg p-3">
                      <div className="space-y-1">
                        {["Dashboard", "Menu", "Orders", "AI Settings", "Analytics", "Staff", "Settings"].map((item, i) => (
                          <div 
                            key={i} 
                            className={`px-3 py-2 rounded-md text-sm ${i === 0 ? 'bg-accent-500/20 text-accent-300' : 'text-primary-100/70 hover:bg-primary-700/50'}`}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-10 space-y-4">
                      {/* Stats Row */}
                      <div className="grid grid-cols-4 gap-4">
                        {[
                          { label: "Active Tables", value: "12", change: "+3" },
                          { label: "Today's Orders", value: "89", change: "+14%" },
                          { label: "Avg. Check", value: "$42.50", change: "+8%" },
                          { label: "AI Interactions", value: "324", change: "+20%" }
                        ].map((stat, i) => (
                          <div key={i} className="bg-primary-800/70 rounded-lg p-3">
                            <div className="text-primary-100/60 text-xs">{stat.label}</div>
                            <div className="flex justify-between items-end mt-1">
                              <div className="text-white text-lg font-bold">{stat.value}</div>
                              <div className="text-xs text-green-400">{stat.change}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Charts Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary-800/70 rounded-lg p-4">
                          <div className="text-white font-medium mb-2">Popular Dishes</div>
                          <div className="space-y-2">
                            {["Spicy Tuna Roll", "Wagyu Burger", "Truffle Pasta", "Mango Cheesecake"].map((dish, i) => (
                              <div key={i} className="flex items-center">
                                <div className="flex-1 text-sm text-primary-100/80">{dish}</div>
                                <div className="h-2 bg-primary-700 rounded-full w-full max-w-[120px]">
                                  <div className="h-2 bg-accent-300 rounded-full" style={{ width: `${80 - i * 15}%` }}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-primary-800/70 rounded-lg p-4">
                          <div className="text-white font-medium mb-2">Revenue Trend</div>
                          <div className="h-[80px] flex items-end justify-between">
                            {[40, 65, 45, 70, 65, 80, 90].map((height, i) => (
                              <div key={i} className="w-8 relative">
                                <div className="absolute bottom-0 w-full bg-accent-500/20 rounded-t-sm" style={{ height: `${height}%` }}></div>
                                <div className="absolute bottom-0 w-full bg-accent-300 rounded-t-sm" style={{ height: `${height * 0.7}%` }}></div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-primary-100/50">
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                            <div>Sun</div>
                          </div>
                        </div>
                      </div>

                      {/* AI Insights */}
                      <div className="bg-primary-800/70 rounded-lg p-4">
                        <div className="text-white font-medium mb-3">AI Insights & Actions</div>
                        <div className="space-y-2">
                          <div className="bg-accent-500/10 border border-accent-500/20 rounded-lg p-3">
                            <div className="text-accent-300 font-medium">Menu Recommendation</div>
                            <div className="text-sm text-primary-100/80">Based on customer feedback, consider adding a vegetarian option to your pasta section.</div>
                          </div>
                          <div className="bg-primary-700/50 rounded-lg p-3">
                            <div className="text-white font-medium">Pricing Optimization</div>
                            <div className="text-sm text-primary-100/80">Your signature cocktails are priced 15% below market average. Consider a price adjustment.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent opacity-40"></div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section (Replacing Restaurant Demo) */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 bg-gradient-to-b from-primary-800/70 to-primary-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-accent-500/20 text-accent-300 rounded-full px-4 py-1 text-sm font-semibold mb-4">
              Simple Implementation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How <span className="text-accent-300">It Works</span>
            </h2>
            <p className="text-primary-100/80 max-w-2xl mx-auto">
              Getting started with BalaBite is quick and easy. Our team handles everything from setup to training, ensuring a smooth transition.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary-800/40 backdrop-blur-sm border border-accent-500/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-accent-300">The 4-Step Implementation Process</h3>
              
              <div className="space-y-4 mt-6">
                {[
                  {
                    title: "Menu Digitization & Enhancement",
                    description: "We convert your menu into an intelligent format with dynamic pricing that our AI can understand, including ingredients, preparation methods, and nutritional information.",
                    icon: <HandDrawnIcon name="implementation" className="w-10 h-10 text-accent-300" />
                  },
                  {
                    title: "Experience Integration",
                    description: "BalaBite integrates with your existing systems while adding layers of personalization that transform every dining experience.",
                    icon: <HandDrawnIcon name="integration" className="w-10 h-10 text-accent-300" />
                  },
                  {
                    title: "Staff Empowerment",
                    description: "We provide comprehensive training for your team, showing how AI enhances their capabilities and helps create memorable guest moments.",
                    icon: <HandDrawnIcon name="training" className="w-10 h-10 text-accent-300" />
                  },
                  {
                    title: "Unicorn Launch & Support",
                    description: "Our team creates a magical launch experience to ensure everything exceeds expectations, with ongoing 24/7 support afterward.",
                    icon: <HandDrawnIcon name="launch" className="w-10 h-10 text-accent-300" />
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-12 w-12 flex items-center justify-center bg-primary-800/60 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-primary-100/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <a 
                  href="#waitlist"
                  className="btn-primary text-lg px-10 py-4 font-semibold rounded-full hover:scale-105 transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] inline-block"
                >
                  Get Started Today
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-primary-800/40 backdrop-blur-sm border border-accent-500/30 rounded-xl p-6 h-full">
                <h3 className="text-2xl font-bold text-accent-300 mb-4">Restaurant Experience Features</h3>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Intelligent Menu Management",
                      description: "Easily update menu items with dynamic pricing, promotions, and availability in real-time across all platforms.",
                      icon: <HandDrawnIcon name="menu" className="text-accent-300" />
                    },
                    {
                      title: "AI Knowledge Training",
                      description: "Customize your AI waiter's personality, knowledge, and recommendations to match your restaurant's unique style.",
                      icon: <HandDrawnIcon name="ai-training" className="text-accent-300" />
                    },
                    {
                      title: "Real-time Analytics",
                      description: "Track customer interactions, popular dishes, feedback, and sales impact with comprehensive dashboards.",
                      icon: <HandDrawnIcon name="analytics" className="text-accent-300" />
                    },
                    {
                      title: "Staff Empowerment",
                      description: "Optimize scheduling, training, and task assignments with AI-powered workforce management tools.",
                      icon: <HandDrawnIcon name="staff" className="text-accent-300" />
                    },
                    {
                      title: "Experience Automation",
                      description: "Create personalized promotions and loyalty programs based on customer preferences and dining history.",
                      icon: <HandDrawnIcon name="marketing" className="text-accent-300" />
                    },
                    {
                      title: "Guest Insights Designer",
                      description: "Understand customers better and craft unforgettable experiences with detailed profiles across visits.",
                      icon: <HandDrawnIcon name="guest-experience" className="text-accent-300" />
                    }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex gap-4 items-start border-b border-primary-700/30 pb-4 last:border-0"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="min-w-[36px] flex justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{feature.title}</h4>
                        <p className="text-sm text-primary-100/70">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Guest App Teaser Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <GuestAppTeaser />
        </div>
      </section>
      
      {/* Industry Insights Section */}
      <section id="insights" className="relative z-10 py-20 px-4 bg-gradient-to-b from-primary-900/95 to-primary-950/95">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-accent-500/20 text-accent-300 rounded-full px-4 py-1 text-sm font-semibold mb-4">
              INDUSTRY INSIGHTS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Future of <span className="text-accent-300">Restaurant Technology</span>
            </h2>
            <p className="text-primary-100/80 max-w-2xl mx-auto">
              The restaurant industry is evolving rapidly. Stay ahead of the curve with these key insights from the latest market research.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "AI Adoption Accelerating",
                stat: "67%",
                description: "of restaurant operators incorporated more technology into their operations in the past 2-3 years, with 69% reporting increased efficiency and productivity.",
                icon: <HandDrawnIcon name="ai-adoption" className="w-8 h-8 text-accent-300" />,
                source: "National Restaurant Association 2025 Report"
              },
              {
                title: "Labor Challenges Persist",
                stat: "98%",
                description: "of restaurant operators said labor costs were a significant challenge for their restaurant, creating an urgent need for technology solutions.",
                icon: <HandDrawnIcon name="labor-challenges" className="w-8 h-8 text-accent-300" />,
                source: "National Restaurant Association 2025 Report"
              },
              {
                title: "Experience Over Price",
                stat: "64%",
                description: "of restaurant customers say the dining experience is more important than the price of the meal. Customers prioritize cleanliness and a kind, welcoming staff.",
                icon: <HandDrawnIcon name="customer-experience" className="w-8 h-8 text-accent-300" />,
                source: "National Restaurant Association 2025 Report"
              },
              {
                title: "Multi-Channel Engagement",
                stat: "51%",
                description: "of consumers say ordering for takeout or delivery is essential to their lifestyle, requiring seamless digital experiences.",
                icon: <HandDrawnIcon name="multichannel" className="w-8 h-8 text-accent-300" />,
                source: "National Restaurant Association 2025 Report"
              },
              {
                title: "Technology Productivity",
                stat: "69%",
                description: "of operators who incorporated more technology reported it made their restaurant more efficient and productive, driving operational excellence.",
                icon: <HandDrawnIcon name="tech-productivity" className="w-8 h-8 text-accent-300" />,
                source: "National Restaurant Association 2025 Report"
              },
              {
                title: "Industry Growth Trajectory",
                stat: "$1.5T",
                description: "projected restaurant industry sales in 2025, with technology adoption playing a crucial role in capturing market share.",
                icon: <HandDrawnIcon name="industry-growth" className="w-8 h-8 text-accent-300" />,
                source: "National Restaurant Association 2025 Report"
              }
            ].map((insight, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/30 backdrop-blur-sm border border-accent-500/20 rounded-xl p-6 hover:border-accent-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-mono text-accent-300">{insight.icon}</div>
                  <div className="text-3xl font-bold text-accent-400">{insight.stat}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{insight.title}</h3>
                <p className="text-primary-100/70 mb-2">{insight.description}</p>
                <p className="text-xs text-primary-100/50 italic">Source: {insight.source}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-primary-800/40 backdrop-blur-sm border border-accent-500/30 rounded-xl p-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
              
                <h3 className="text-2xl font-bold text-accent-300">Why AI Waiters Are the Future</h3>
              </div>
              <p className="text-primary-100/80 mb-6">
                With 98% of restaurant operators facing significant labor cost challenges and 67% already incorporating more technology into their operations, 
                AI-powered service solutions have become essential for restaurants looking to thrive in 2025 and beyond.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-primary-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                  
                    <p className="text-accent-300 font-bold text-4xl">69%</p>
                  </div>
                  <p className="text-sm text-primary-100/80">of operators report that technology adoption made their restaurant more efficient and productive</p>
                  <p className="text-xs text-primary-100/50 italic mt-2">Source: National Restaurant Association 2025 Report</p>
                </div>
                <div className="bg-primary-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
               
                    <p className="text-accent-300 font-bold text-4xl">73%</p>
                  </div>
                  <p className="text-sm text-primary-100/80">of limited-service operators have already incorporated more technology into their operations</p>
                  <p className="text-xs text-primary-100/50 italic mt-2">Source: National Restaurant Association 2025 Report</p>
                </div>
              </div>
              <div className="flex items-start">
       
                <p className="text-primary-100/80">
                  BalaBite's AI waiter technology helps restaurants overcome these challenges by optimizing labor costs, 
                  enhancing customer experiences, and providing valuable data-driven insights for business growth.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="relative py-24 bg-primary-900 z-10">
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
                <a 
                  href="#waitlist"
                  className="btn-primary text-lg px-10 py-4 font-semibold rounded-full hover:scale-105 transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] inline-block"
                >
                  Join the BalaBite Community
                </a>
                <p className="mt-6 text-primary-300/60">
                  Early partners receive priority access and exclusive benefits
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Waitlist Section */}
      <section ref={waitlistSectionRef} id="waitlist" className="relative py-24 bg-primary-950 z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent-300">Join Our Waitlist</h2>
            <p className="text-xl max-w-3xl mx-auto text-primary-100/80">
              Be among the first restaurants to experience the future of dining service.
              Early partners receive priority access and exclusive benefits.
            </p>
          </motion.div>
          
          <WaitlistForm waitlistCount={waitlistCount} />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative py-12 bg-primary-950 border-t border-primary-800 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
              <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <BalaBiteLogo size="sm" className="mb-3 cursor-pointer hover:scale-105 transition-transform" />
              </div>
              <p className="text-primary-100/60 text-sm mt-2">© {new Date().getFullYear()} BalaBite Technologies Inc.</p>
              <p className="text-primary-100/40 text-xs mt-1">AI-powered hospitality for the future of dining — Where tradition meets innovation</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-accent-300 font-medium mb-3">Explore</h4>
                <div className="flex flex-col gap-2">
                  <Link href="#features" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    Features
                  </Link>
                  <Link href="/about" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    About
                  </Link>
                  <Link href="#how-it-works" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    How It Works
                  </Link>
                  <Link href="#insights" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    Insights
                  </Link>
                  <Link href="#faq" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    FAQ
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-accent-300 font-medium mb-3">Company</h4>
                <div className="flex flex-col gap-2">
                  <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    About Us
                  </Link>
                  <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    Careers
                  </Link>
                  <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    Blog
                  </Link>
                  <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    Contact
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
                <h4 className="text-accent-300 font-medium mb-3">Connect</h4>
                <div className="flex flex-col gap-2">
                  <Link href="#waitlist" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    Join Waitlist
                  </Link>
                  <Link href="mailto:hello@balabite.ai" className="text-primary-100/70 hover:text-accent-300 transition-colors text-sm">
                    hello@balabite.ai
                  </Link>
                  <div className="flex gap-4 mt-2">
                    <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </Link>
                    <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </Link>
                    <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                      </svg>
                    </Link>
                    <Link href="#" className="text-primary-100/70 hover:text-accent-300 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-primary-800/30 text-center">
            <p className="text-primary-100/40 text-xs">
              Privacy Policy • Terms of Service • Data Processing Agreement
            </p>
            <p className="text-primary-100/40 text-xs mt-3">
              <span className="text-accent-300/70">בעל הבית</span> × bite × byte — Bringing together tradition and technology for exceptional hospitality
            </p>
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
    </div>
  );
} 