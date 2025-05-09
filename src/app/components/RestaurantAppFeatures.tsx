'use client';

import { motion } from 'framer-motion';

export default function RestaurantAppFeatures() {
  const features = [
    {
      title: "Intelligent Menu",
      description: "Create dynamic menus with adaptive pricing, real-time promotions, and availability. Our AI instantly incorporates these changes into its knowledge base for a seamless customer experience.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
          <path d="M5 3C5 3 4.5 3.5 5 6C5.5 8.5 7 9 8 9C9 9 10 8.5 10 7C10 5.5 9 4 7 4C5 4 5 6 5 7C5 8 6 10 9 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 4C14 4 13 5 13 7C13 9 14 10 16 10C18 10 19 9 19 7C19 5 18 4 16 4C14 4 13 5 13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 14C5 14 4 14.5 4 17C4 19.5 5 20 7 20C9 20 10 19 10 17C10 15 9 14 7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 14C14 14 13 15 13 17C13 19 15 20 17 20C19 20 20 19 20 17C20 15 19 14 17 14C15 14 14 15 14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7C4 7 6 10 12 10C18 10 20 7 20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 17C4 17 6 13 12 13C18 13 20 17 20 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "AI Training Controls",
      description: "Customize your AI waiter's personality, knowledge, and recommendations to match your restaurant's unique style and offerings.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
          <path d="M12 4C8.5 4 6 6.5 6 10C6 13.5 8.5 16 12 16C15.5 16 18 13.5 18 10C18 6.5 15.5 4 12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 20H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 9C9 9 10 11 12 11C14 11 15 9 15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 7.5C9.5 7 10 7 10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 7.5C13.5 7 13 7 13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "Performance Analytics",
      description: "Track customer interactions, popular dishes, feedback, and sales impact with comprehensive analytics dashboards.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
          <path d="M4 4V20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 15L10 10L14 14L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="15" r="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="10" r="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="14" r="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="7" r="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "Staff Insights",
      description: "Optimize scheduling, training, and task assignments with AI-powered workforce management tools.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
          <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 19C4 16 6 14 9 14C12 14 14 16 14 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 11H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 9V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 17H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "Marketing Automation",
      description: "Create personalized promotions and loyalty programs based on customer preferences and dining history.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
          <path d="M12 4L14 8.5L19 9L15.5 12.5L16.5 17.5L12 15L7.5 17.5L8.5 12.5L5 9L10 8.5L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 20H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "Guest Experience Designer",
      description: "Understand your customers better and craft unforgettable experiences with detailed profiles across visits.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hand-drawn">
          <path d="M8 6H16C17 6 18 7 18 8V16C18 17 17 18 16 18H8C7 18 6 17 6 16V8C6 7 7 6 8 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 9C10.5 9.82843 9.82843 10.5 9 10.5C8.17157 10.5 7.5 9.82843 7.5 9C7.5 8.17157 8.17157 7.5 9 7.5C9.82843 7.5 10.5 8.17157 10.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.5 12C16.5 12.8284 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8284 13.5 12C13.5 11.1716 14.1716 10.5 15 10.5C15.8284 10.5 16.5 11.1716 16.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 15C10.5 15.8284 9.82843 16.5 9 16.5C8.17157 16.5 7.5 15.8284 7.5 15C7.5 14.1716 8.17157 13.5 9 13.5C9.82843 13.5 10.5 14.1716 10.5 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-primary-800/40 backdrop-blur-sm border border-accent-500/30 rounded-xl p-6 h-full">
      <h3 className="text-2xl font-bold text-accent-300 mb-4">Restaurant Experience Platform</h3>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="flex gap-4 items-start border-b border-primary-700/30 pb-4 last:border-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="text-accent-300">{feature.icon}</div>
            <div>
              <h4 className="font-semibold text-white">{feature.title}</h4>
              <p className="text-sm text-primary-100/70">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 