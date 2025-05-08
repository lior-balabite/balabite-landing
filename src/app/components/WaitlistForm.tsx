'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface WaitlistFormData {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  restaurantType: string;
  location: string;
  message?: string;
}

interface ValidationErrors {
  restaurantName?: string;
  ownerName?: string;
  email?: string;
  phone?: string;
  restaurantType?: string;
  location?: string;
}

interface WaitlistFormProps {
  waitlistCount: number;
}

export default function WaitlistForm({ waitlistCount }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<WaitlistFormData>({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    restaurantType: '',
    location: '',
    message: '',
  });

  // Validate the form data
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Restaurant name validation
    if (formData.restaurantName.trim().length < 2) {
      newErrors.restaurantName = 'Restaurant name must be at least 2 characters';
      isValid = false;
    }

    // Owner name validation
    if (formData.ownerName.trim().length < 2) {
      newErrors.ownerName = 'Owner name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation (allow various formats but ensure it's a valid number)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    // Restaurant type validation
    if (!formData.restaurantType) {
      newErrors.restaurantType = 'Please select a restaurant type';
      isValid = false;
    }

    // Location validation
    if (formData.location.trim().length < 2) {
      newErrors.location = 'Please enter a valid location';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    // Strip all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Format based on length
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      // Show a toast with validation errors
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      toast.success('Thanks for joining our waitlist! We\'ll be in touch soon.');
      setFormData({
        restaurantName: '',
        ownerName: '',
        email: '',
        phone: '',
        restaurantType: '',
        location: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="space-y-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Community Header */}
      <motion.div 
        className="bg-accent-500/20 backdrop-blur-sm rounded-t-2xl p-5 border-t border-x border-accent-500/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-accent-300 font-medium">Join Our Community</p>
        </div>
        
        <div className="text-center">
          <div className="text-white mb-2">
            <span className="text-2xl font-bold text-accent-300">{waitlistCount}+</span> 
            <span className="text-primary-100/80"> restaurants already transforming with BalaBite</span>
          </div>
          <p className="text-sm text-primary-100/60 italic">
            "Early partners receive priority access, exclusive pricing, and direct input into feature development"
          </p>
        </div>
      </motion.div>
      
      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 bg-primary-800/40 backdrop-blur-sm rounded-b-2xl border-b border-x border-accent-500/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="restaurantName" className="block text-sm font-medium text-primary-100 mb-2">
              Restaurant Name *
            </label>
            <input
              type="text"
              id="restaurantName"
              required
              className={`w-full px-4 py-2 bg-primary-900/50 border ${errors.restaurantName ? 'border-red-500' : 'border-primary-700'} rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent`}
              value={formData.restaurantName}
              onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
            />
            {errors.restaurantName && (
              <p className="mt-1 text-sm text-red-500">{errors.restaurantName}</p>
            )}
          </div>

          <div>
            <label htmlFor="ownerName" className="block text-sm font-medium text-primary-100 mb-2">
              Owner Name *
            </label>
            <input
              type="text"
              id="ownerName"
              required
              className={`w-full px-4 py-2 bg-primary-900/50 border ${errors.ownerName ? 'border-red-500' : 'border-primary-700'} rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent`}
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            />
            {errors.ownerName && (
              <p className="mt-1 text-sm text-red-500">{errors.ownerName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-100 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              className={`w-full px-4 py-2 bg-primary-900/50 border ${errors.email ? 'border-red-500' : 'border-primary-700'} rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-primary-100 mb-2">
              Phone Number * <span className="text-xs text-primary-100/50">(e.g. (555) 123-4567)</span>
            </label>
            <input
              type="tel"
              id="phone"
              required
              placeholder="(555) 123-4567"
              className={`w-full px-4 py-2 bg-primary-900/50 border ${errors.phone ? 'border-red-500' : 'border-primary-700'} rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent`}
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="restaurantType" className="block text-sm font-medium text-primary-100 mb-2">
              Restaurant Type *
            </label>
            <select
              id="restaurantType"
              required
              className={`w-full px-4 py-2 bg-primary-900/50 border ${errors.restaurantType ? 'border-red-500' : 'border-primary-700'} rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent`}
              value={formData.restaurantType}
              onChange={(e) => setFormData({ ...formData, restaurantType: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="fine-dining">Fine Dining</option>
              <option value="casual-dining">Casual Dining</option>
              <option value="fast-casual">Fast Casual</option>
              <option value="cafe">Cafe</option>
              <option value="bar">Bar</option>
              <option value="other">Other</option>
            </select>
            {errors.restaurantType && (
              <p className="mt-1 text-sm text-red-500">{errors.restaurantType}</p>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-primary-100 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              required
              placeholder="City, State"
              className={`w-full px-4 py-2 bg-primary-900/50 border ${errors.location ? 'border-red-500' : 'border-primary-700'} rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent`}
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary-100 mb-2">
            Additional Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-2 bg-primary-900/50 border border-primary-700 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-xl btn-primary font-semibold disabled:opacity-70 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Join the Waitlist'
          )}
        </button>
        
        <p className="text-center text-sm text-primary-100/60">
          By joining, you'll receive updates about BalaBite AI. We respect your privacy.
        </p>
      </motion.form>
    </motion.div>
  );
}
