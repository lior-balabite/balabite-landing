import { Locale } from './config';
import landingV2Translations from './landing-v2-translations';

// Premium Hospitality Translation System
// Complete translations with cultural adaptation and industry-specific terminology
export type Translations = Record<string, any>;

const premiumTranslations: Record<Locale, Translations> = {
  en: {
    // Common UI elements
    loading: "Loading...",
    error: "Something went wrong. Please try again.",
    success: "Success!",
    processing: "Processing...",
    required: "*",
    
    // Navigation
    navigation: {
      features: "Features",
      about: "About", 
      howItWorks: "How It Works",
      insights: "Industry Insights",
      faq: "FAQ",
      joinWaitlist: "Join Waitlist"
    },

    // Hero Section
    hero: {
      headline: "You run the restaurant. Your AI partner runs the rest.",
      subheadline: "BalaBite is the first AI that manages your menu, kitchen, team, and guests — so you don't have to.",
      title: "Your Best Waiter, At Every Table",
      subtitle: "The AI-powered digital waiter system revolutionizing restaurant service experience.",
      cta: "Join Waitlist ({count}+ restaurants)",
      ctaSubtext: "Be among the first to transform your restaurant with AI",
      aiAssistantTitle: "AI-Powered Restaurant Assistant",
      aiAssistantDescription: "Conversational AI that understands your menu better than your best server"
    },

    // Live Notifications
    notifications: {
      from: "from",
      justJoined: "just joined BalaBite"
    },

    // Restaurant Cities (US Market)
    cities: [
      "New York", "Los Angeles", "Chicago", "Miami", "San Francisco",
      "Las Vegas", "Austin", "Seattle", "Dallas", "Houston", 
      "New Orleans", "Boston", "Philadelphia", "Nashville", "Denver"
    ],

    // Restaurant Types (US Market)
    restaurantTypes: [
      "Bistro", "Trattoria", "Grill", "Kitchen", "Restaurant",
      "Café", "Eatery", "Steakhouse", "Pizzeria", "Brasserie",
      "Chophouse", "Diner", "Bar & Kitchen", "Tavern", "Cantina"
    ],

    // Features Section
    features: {
      title: "AI-Powered Guest Experience",
      subtitle: "Our AI waiter understands and responds to guest needs with human-like intelligence, creating memorable dining experiences that keep customers coming back.",
      menuIntelligence: {
        title: "Menu Intelligence",
        description: "AI understands the menu at a deep level - ingredients, preparation methods, flavor profiles, and dietary restrictions."
      },
      personalRecommendations: {
        title: "Personal Recommendations", 
        description: "Analyzes guest preferences and order history to provide tailored suggestions that increase check sizes."
      },
      multilingualSupport: {
        title: "Multilingual Support",
        description: "Communicates fluently in 30+ languages, eliminating language barriers and enhancing the dining experience for international guests."
      },
      dietaryKnowledge: {
        title: "Dietary Knowledge",
        description: "Instantly answers questions about allergies, ingredients, and can suggest modifications to accommodate dietary restrictions."
      },
      seamlessOrdering: {
        title: "Seamless Ordering",
        description: "Takes orders precisely, sends them directly to the kitchen, and handles modifications without errors."
      },
      guestInsights: {
        title: "Guest Insights", 
        description: "Captures preferences and feedback, building customer profiles that help you understand your guests better."
      }
    },

    // Management Platform
    management: {
      title: "Complete Experience Management Platform",
      subtitle: "Gain unprecedented insights and control over your restaurant's guest experience with our comprehensive management dashboard designed to create memorable moments that keep customers coming back.",
      realTimeAnalytics: {
        title: "Real-time Analytics",
        description: "Track sales, popular items, customer engagement, and AI performance all in one place."
      },
      intelligentMenu: {
        title: "Intelligent Menu",
        description: "Update your menu with dynamic pricing, promotions, and availability in real-time across all platforms."
      },
      staffInsights: {
        title: "Staff Insights",
        description: "Monitor server performance and see how AI is helping your team excel."
      },
      customerProfiles: {
        title: "Customer Profiles",
        description: "Build detailed profiles of your regulars to create more personalized experiences."
      },
      aiTraining: {
        title: "AI Training",
        description: "Customize your AI waiter's knowledge, personality, and recommendations."
      },
      inventoryTracking: {
        title: "Inventory Tracking", 
        description: "Get alerts on low stock items and insights into usage patterns."
      },
      reservationManagement: {
        title: "Reservation Management",
        description: "Handle bookings and optimize table allocation for maximum efficiency."
      },
      marketingTools: {
        title: "Marketing Tools",
        description: "Create targeted promotions based on customer preferences and behaviors."
      }
    },

    // How It Works Section
    howItWorks: {
      badge: "Simple Implementation",
      title: "How It Works",
      subtitle: "Getting started with BalaBite is quick and easy. Our team handles everything from setup to training, ensuring a smooth transition.",
      processTitle: "The 4-Step Implementation Process",
      step1: {
        title: "Menu Digitization & Enhancement",
        description: "We convert your menu into an intelligent format with dynamic pricing that our AI can understand, including ingredients, preparation methods, and nutritional information."
      },
      step2: {
        title: "Experience Integration", 
        description: "BalaBite integrates with your existing systems while adding layers of personalization that transform every dining experience."
      },
      step3: {
        title: "Staff Empowerment",
        description: "We provide comprehensive training for your team, showing how AI enhances their capabilities and helps create memorable guest moments."
      },
      step4: {
        title: "Unicorn Launch & Support",
        description: "Our team creates a magical launch experience to ensure everything exceeds expectations, with ongoing 24/7 support afterward."
      },
      cta: "Get Started Today",
      restaurantFeaturesTitle: "Restaurant Experience Features",
      restaurantFeatures: {
        intelligentMenuManagement: {
          title: "Intelligent Menu Management",
          description: "Easily update menu items with dynamic pricing, promotions, and availability in real-time across all platforms."
        },
        aiKnowledgeTraining: {
          title: "AI Knowledge Training",
          description: "Customize your AI waiter's personality, knowledge, and recommendations to match your restaurant's unique style."
        },
        realTimeAnalytics: {
          title: "Real-time Analytics",
          description: "Track customer interactions, popular dishes, feedback, and sales impact with comprehensive dashboards."
        },
        staffEmpowerment: {
          title: "Staff Empowerment",
          description: "Optimize scheduling, training, and task assignments with AI-powered workforce management tools."
        },
        experienceAutomation: {
          title: "Experience Automation",
          description: "Create personalized promotions and loyalty programs based on customer preferences and dining history."
        },
        guestInsightsDesigner: {
          title: "Guest Insights Designer",
          description: "Understand customers better and craft unforgettable experiences with detailed profiles across visits."
        }
      }
    },

    // Guest App Section
    guestApp: {
      badge: "COMING SOON",
      title: "The BalaBite Guest App",
      subtitle: "Discover the future of dining with our AI-powered restaurant companion. Get personalized menu recommendations, instant answers to your questions, and a seamless ordering experience.",
            features: {
        aiWaiter: "AI Waiter Chat",
        smartRecommendations: "Smart Menu Recommendations",
        instantOrdering: "Instant Ordering",
        dietaryFilters: "Dietary Filters",
        realTimeUpdates: "Real-time Updates",
        menuNavigation: {
          title: "AI-Powered Menu Navigation",
          description: "Our advanced AI understands exactly what you're looking for, whether it's dietary preferences, flavor profiles, or hidden gems on the menu."
        },
        ingredientAnalysis: {
          title: "Instant Ingredient Analysis",
          description: "Easily scan any restaurant menu to get detailed information about ingredients, allergen warnings, and nutritional data in seconds."
        },
        multiRestaurant: {
          title: "Multi-Restaurant Knowledge",
          description: "Upload menus from your favorite local spots and get the same AI assistance, even if they're not BalaBite partners yet."
        },
        messageInteraction: {
          title: "Message-Based Interaction",
          description: "Simply text your AI waiter naturally, just like chatting with a friend, for a seamless and personalized dining experience."
        }
      },
      form: {
        placeholder: "Enter your email",
        button: "Notify Me",
        processing: "Adding...",
        success: "You've been added to the waitlist! We'll notify you when the guest app launches.",
        error: "Please enter a valid email address"
      },
      demo: {
        restaurantName: "Bistro AI",
        restaurantInfo: "Modern Fusion • 0.3mi",
        aiAnalyzing: "AI ANALYZING YOUR PREFERENCES",
        personalizedHeader: "PERSONALIZED FOR YOU",
        dish1: "Truffle Mushroom Risotto",
        dish2: "Miso Glazed Sea Bass",
        aiSommelier: "ASK THE AI SOMMELIER",
        userQuestion: "Wine pairing for the sea bass?",
        aiResponse: "I recommend our Sancerre - its minerality complements the miso beautifully"
      }
    },

    // Industry Insights
    insights: {
      badge: "INDUSTRY INSIGHTS",
      title: "The Future of Restaurant Technology",
      subtitle: "The restaurant industry is evolving rapidly. Stay ahead of the curve with these key insights from the latest market research.",
      stats: {
        aiAdoption: {
          title: "AI Adoption Accelerating",
          stat: "67%",
          description: "of restaurant operators incorporated more technology into their operations in the past 2-3 years, with 69% reporting increased efficiency and productivity.",
          source: "National Restaurant Association 2025 Report"
        },
        laborChallenges: {
          title: "Labor Challenges Persist",
          stat: "98%", 
          description: "of restaurant operators said labor costs were a significant challenge for their restaurant, creating an urgent need for technology solutions.",
          source: "National Restaurant Association 2025 Report"
        },
        experienceOverPrice: {
          title: "Experience Over Price",
          stat: "64%",
          description: "of restaurant customers say the dining experience is more important than the price of the meal. Customers prioritize cleanliness and a kind, welcoming staff.",
          source: "National Restaurant Association 2025 Report"
        },
        multiChannelEngagement: {
          title: "Multi-Channel Engagement", 
          stat: "51%",
          description: "of consumers say ordering for takeout or delivery is essential to their lifestyle, requiring seamless digital experiences.",
          source: "National Restaurant Association 2025 Report"
        },
        techProductivity: {
          title: "Technology Productivity",
          stat: "69%",
          description: "of operators who incorporated more technology reported it made their restaurant more efficient and productive, driving operational excellence.",
          source: "National Restaurant Association 2025 Report"
        },
        industryGrowth: {
          title: "Industry Growth Trajectory",
          stat: "$1.5T",
          description: "projected restaurant industry sales in 2025, with technology adoption playing a crucial role in capturing market share.",
          source: "National Restaurant Association 2025 Report"
        }
      },
      whyAiWaiters: {
        title: "Why AI Waiters Are the Future",
        description: "With 98% of restaurant operators facing significant labor cost challenges and 67% already incorporating more technology into their operations, AI-powered service solutions have become essential for restaurants looking to thrive in 2025 and beyond.",
        conclusion: "BalaBite's AI waiter technology helps restaurants overcome these challenges by optimizing labor costs, enhancing customer experiences, and providing valuable data-driven insights for business growth.",
        limitedServiceStat: "73%",
        limitedServiceDescription: "of limited-service operators have already incorporated more technology into their operations",
        limitedServiceSource: "Source: National Restaurant Association 2025 Report"
      }
    },

    // FAQ Section
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about BalaBite",
      questions: [
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
      ]
    },

    // CTA Section
    cta: {
      title: "Ready to Transform Your Restaurant?",
      subtitle: "Join the waitlist today and be among the {count}+ restaurants already revolutionizing their service with BalaBite.",
      button: "Join the BalaBite Community",
      subtext: "Early partners receive priority access and exclusive benefits"
    },

    // Waitlist Form
    waitlist: {
      title: "Join Our Waitlist", 
      subtitle: "Be among the first restaurants to experience the future of dining service. Early partners receive priority access and exclusive benefits.",
      form: {
        joinCommunity: "Join Our Community",
        restaurantsTransforming: "restaurants already transforming with BalaBite",
        earlyPartnerQuote: "Early partners receive priority access, exclusive pricing, and direct input into feature development",
        restaurantName: "Restaurant Name",
        ownerName: "Owner Name",
        email: "Email",
        phone: "Phone Number *",
        phonePlaceholder: "e.g. (555) 123-4567",
        restaurantType: "Restaurant Type",
        selectType: "Select type",
        fineDining: "Fine Dining",
        casualDining: "Casual Dining", 
        fastCasual: "Fast Casual",
        cafe: "Cafe",
        bar: "Bar",
        other: "Other",
        location: "Location",
        locationPlaceholder: "City, State",
        additionalMessage: "Additional Message",
        required: "*",
        processing: "Processing...",
        joinButton: "Join the Waitlist",
        privacyText: "By joining, you'll receive updates about BalaBite AI. We respect your privacy.",
        validation: {
          restaurantNameRequired: "Restaurant name must be at least 2 characters",
          ownerNameRequired: "Owner name must be at least 2 characters",
          emailInvalid: "Please enter a valid email address",
          phoneInvalid: "Please enter a valid phone number",
          restaurantTypeRequired: "Please select a restaurant type",
          locationRequired: "Please enter a valid location",
          formErrors: "Please fix the errors in the form",
          success: "Thanks for joining our waitlist! We'll be in touch soon.",
          error: "Something went wrong. Please try again."
        }
      }
    },

    // Footer
    footer: {
      copyright: "© {year} BalaBite Technologies Inc.",
      tagline: "AI-powered hospitality for the future of dining — Where tradition meets innovation",
      explore: "Explore",
      company: "Company", 
      connect: "Connect",
      aboutUs: "About Us",
      careers: "Careers",
      blog: "Blog",
      contact: "Contact",
      email: "hello@balabite.ai",
      legal: "Privacy Policy • Terms of Service • Data Processing Agreement",
      heritage: "בעל הבית × bite × byte — Bringing together tradition and technology for exceptional hospitality"
    },

    // API Messages
    api: {
      validation: {
        restaurantNameRequired: "Restaurant name is required",
        ownerNameRequired: "Owner name is required",
        emailInvalid: "Invalid email address",
        phoneRequired: "Valid phone number is required",
        restaurantTypeRequired: "Restaurant type is required", 
        locationRequired: "Location is required"
      },
      success: {
        waitlistJoined: "Successfully joined the waitlist",
        guestWaitlistJoined: "Successfully joined the guest app waitlist!",
        alreadyOnWaitlist: "You're already on our waitlist!"
      },
      errors: {
        validationFailed: "Validation failed",
        serverError: "Server error",
        failedToJoinWaitlist: "Failed to join waitlist",
        invalidEmail: "Invalid email address"
      }
    },

    // Email Templates
    email: {
      welcome: {
        subject: "WELCOME TO THE FUTURE OF DINING",
        greeting: "Welcome to BalaBite!",
        message: "Thank you for joining our waitlist. We're excited to transform your restaurant with AI.",
        nextSteps: "What happens next:",
        step1: "We'll be in touch within 48 hours",
        step2: "Schedule a personalized demo",
        step3: "Begin your digital transformation"
      },
      admin: {
        subject: "New Waitlist Signup: {restaurantName}",
        newSignup: "New restaurant has joined the waitlist",
        restaurantDetails: "Restaurant Details"
      }
    },

    // Language Switcher
    languageSwitcher: {
      helpText: "More languages coming soon"
    },

    // Dashboard Section
    dashboard: {
      menu: {
        dashboard: "Dashboard",
        menu: "Menu",
        orders: "Orders", 
        aiSettings: "AI Settings",
        analytics: "Analytics",
        staff: "Staff",
        settings: "Settings"
      },
      stats: {
        activeTables: "Active Tables",
        todaysOrders: "Today's Orders",
        avgCheck: "Avg. Check",
        aiInteractions: "AI Interactions"
      },
      dishes: {
        dish1: "Spicy Tuna Roll",
        dish2: "Wagyu Burger", 
        dish3: "Truffle Pasta",
        dish4: "Mango Cheesecake"
      },
      labels: {
        popularDishes: "Popular Dishes",
        revenueTrend: "Revenue Trend"
      }
    }
  },

  // SPANISH - Premium Latin American & Spanish Market
  es: {
    loading: "Cargando...",
    error: "Algo salió mal. Por favor intenta de nuevo.",
    success: "¡Éxito!",
    processing: "Procesando...",
    required: "*",

    navigation: {
      features: "Características",
      about: "Acerca de",
      howItWorks: "Cómo Funciona", 
      insights: "Perspectivas de la Industria",
      faq: "Preguntas Frecuentes",
      joinWaitlist: "Unirse a la Lista de Espera"
    },

    hero: {
      title: "Tu Mejor Mesero, En Cada Mesa",
      subtitle: "El sistema de mesero digital con IA que revoluciona la experiencia de servicio gastronómico.",
      cta: "Unirse a la Lista de Espera ({count}+ restaurantes)",
      ctaSubtext: "Sé de los primeros en transformar tu restaurante con IA",
      aiAssistantTitle: "Asistente de Restaurante con IA",
      aiAssistantDescription: "IA conversacional que entiende tu menú mejor que tu mejor mesero"
    },

    notifications: {
      from: "de",
      justJoined: "acaba de unirse a BalaBite"
    },

    // Spanish-speaking restaurant cities
    cities: [
      "Ciudad de México", "Madrid", "Barcelona", "Buenos Aires", "Bogotá",
      "Lima", "Santiago", "Miami", "Los Ángeles", "Nueva York",
      "Guadalajara", "Monterrey", "Medellín", "Valencia", "Sevilla"
    ],

    restaurantTypes: [
      "Restaurante de Autor", "Taquería", "Marisquería", "Parrilla", "Tapas Bar",
      "Café", "Bistró", "Asador", "Pizzería", "Brasería",
      "Cantina", "Comedor", "Bar Restaurante", "Taberna", "Hacienda"
    ],

    features: {
      title: "Experiencia del Huésped con IA",
      subtitle: "Nuestro mesero con IA entiende y responde a las necesidades de los huéspedes con inteligencia similar a la humana, creando experiencias gastronómicas memorables que hacen que los clientes regresen.",
      menuIntelligence: {
        title: "Inteligencia del Menú",
        description: "La IA entiende el menú a un nivel profundo: ingredientes, métodos de preparación, perfiles de sabor y restricciones dietéticas."
      },
      personalRecommendations: {
        title: "Recomendaciones Personalizadas",
        description: "Analiza las preferencias de los huéspedes y el historial de pedidos para proporcionar sugerencias personalizadas que aumentan el ticket promedio."
      },
      multilingualSupport: {
        title: "Soporte Multilingüe", 
        description: "Se comunica con fluidez en más de 30 idiomas, eliminando las barreras del idioma y mejorando la experiencia gastronómica para huéspedes internacionales."
      },
      dietaryKnowledge: {
        title: "Conocimiento Dietético",
        description: "Responde instantáneamente preguntas sobre alergias, ingredientes y puede sugerir modificaciones para acomodar restricciones dietéticas."
      },
      seamlessOrdering: {
        title: "Pedidos Sin Problemas",
        description: "Toma pedidos con precisión, los envía directamente a la cocina y maneja modificaciones sin errores."
      },
      guestInsights: {
        title: "Perspectivas de Huéspedes",
        description: "Captura preferencias y comentarios, construyendo perfiles de clientes que te ayudan a entender mejor a tus huéspedes."
      }
    },

    // Complete Management Platform
    management: {
      title: "Plataforma Completa de Gestión de Experiencias",
      subtitle: "Obtén perspectivas y control sin precedentes sobre la experiencia de huéspedes de tu restaurante con nuestro panel de gestión integral diseñado para crear momentos memorables que hacen que los clientes regresen.",
      realTimeAnalytics: {
        title: "Analíticas en Tiempo Real",
        description: "Rastrea ventas, artículos populares, participación del cliente y rendimiento de IA todo en un lugar."
      },
      intelligentMenu: {
        title: "Menú Inteligente",
        description: "Actualiza tu menú con precios dinámicos, promociones y disponibilidad en tiempo real en todas las plataformas."
      },
      staffInsights: {
        title: "Perspectivas del Personal",
        description: "Monitorea el rendimiento del servidor y ve cómo la IA está ayudando a tu equipo a sobresalir."
      },
      customerProfiles: {
        title: "Perfiles de Clientes",
        description: "Construye perfiles detallados de tus clientes regulares para crear experiencias más personalizadas."
      },
      aiTraining: {
        title: "Entrenamiento de IA",
        description: "Personaliza el conocimiento, personalidad y recomendaciones de tu mesero con IA."
      },
      inventoryTracking: {
        title: "Seguimiento de Inventario",
        description: "Recibe alertas sobre artículos con poco stock y perspectivas sobre patrones de uso."
      },
      reservationManagement: {
        title: "Gestión de Reservas",
        description: "Maneja reservas y optimiza la asignación de mesas para máxima eficiencia."
      },
      marketingTools: {
        title: "Herramientas de Marketing",
        description: "Crea promociones dirigidas basadas en preferencias y comportamientos de clientes."
      }
    },

    // How It Works Section
    howItWorks: {
      badge: "Implementación Sencilla",
      title: "Cómo Funciona",
      subtitle: "Comenzar con BalaBite es rápido y fácil. Nuestro equipo maneja todo desde la configuración hasta el entrenamiento, asegurando una transición suave.",
      processTitle: "El Proceso de Implementación de 4 Pasos",
      step1: {
        title: "Digitalización y Mejora del Menú",
        description: "Convertimos tu menú en un formato inteligente con precios dinámicos que nuestra IA puede entender, incluyendo ingredientes, métodos de preparación e información nutricional."
      },
      step2: {
        title: "Integración de Experiencia",
        description: "BalaBite se integra con tus sistemas existentes mientras añade capas de personalización que transforman cada experiencia gastronómica."
      },
      step3: {
        title: "Empoderamiento del Personal",
        description: "Proporcionamos entrenamiento integral para tu equipo, mostrando cómo la IA mejora sus capacidades y ayuda a crear momentos memorables para los huéspedes."
      },
      step4: {
        title: "Lanzamiento Unicornio y Soporte",
        description: "Nuestro equipo crea una experiencia de lanzamiento mágica para asegurar que todo supere las expectativas, con soporte continuo 24/7 después."
      },
      cta: "Comienza Hoy",
      restaurantFeaturesTitle: "Características de Experiencia del Restaurante",
      restaurantFeatures: {
        intelligentMenuManagement: {
          title: "Gestión Inteligente del Menú",
          description: "Actualiza fácilmente artículos del menú con precios dinámicos, promociones y disponibilidad en tiempo real en todas las plataformas."
        },
        aiKnowledgeTraining: {
          title: "Entrenamiento de Conocimiento IA",
          description: "Personaliza la personalidad, conocimiento y recomendaciones de tu mesero IA para que coincida con el estilo único de tu restaurante."
        },
        realTimeAnalytics: {
          title: "Analíticas en Tiempo Real",
          description: "Rastrea interacciones de clientes, platos populares, comentarios e impacto en ventas con paneles integrales."
        },
        staffEmpowerment: {
          title: "Empoderamiento del Personal",
          description: "Optimiza horarios, entrenamiento y asignaciones de tareas con herramientas de gestión de fuerza laboral con IA."
        },
        experienceAutomation: {
          title: "Automatización de Experiencia",
          description: "Crea promociones personalizadas y programas de lealtad basados en preferencias de clientes e historial gastronómico."
        },
        guestInsightsDesigner: {
          title: "Diseñador de Perspectivas de Huéspedes",
          description: "Entiende mejor a los clientes y crea experiencias inolvidables con perfiles detallados a través de visitas."
        }
      }
    },

    // Guest App Section
    guestApp: {
      badge: "PRÓXIMAMENTE",
      title: "La Aplicación de Huéspedes BalaBite",
      subtitle: "Descubre el futuro de la gastronomía con nuestro compañero de restaurante con IA. Obtén recomendaciones de menú personalizadas, respuestas instantáneas a tus preguntas y una experiencia de pedidos sin problemas.",
      features: {
        aiWaiter: "Chat de Mesero con IA",
        smartRecommendations: "Recomendaciones Inteligentes del Menú",
        instantOrdering: "Pedidos Instantáneos",
        dietaryFilters: "Filtros Dietéticos",
        realTimeUpdates: "Actualizaciones en Tiempo Real",
        menuNavigation: {
          title: "Navegación de Menú con IA",
          description: "Nuestra IA avanzada entiende exactamente lo que buscas, ya sean preferencias dietéticas, perfiles de sabor o joyas ocultas en el menú."
        },
        ingredientAnalysis: {
          title: "Análisis Instantáneo de Ingredientes",
          description: "Escanea fácilmente cualquier menú de restaurante para obtener información detallada sobre ingredientes, advertencias de alérgenos y datos nutricionales en segundos."
        },
        multiRestaurant: {
          title: "Conocimiento Multi-Restaurante",
          description: "Sube menús de tus lugares favoritos locales y obtén la misma asistencia IA, incluso si aún no son socios de BalaBite."
        },
        messageInteraction: {
          title: "Interacción Basada en Mensajes",
          description: "Simplemente envía mensajes a tu mesero IA naturalmente, como chatear con un amigo, para una experiencia gastronómica fluida y personalizada."
        }
      },
      form: {
        placeholder: "Ingresa tu email",
        button: "Notifícame",
        processing: "Añadiendo...",
        success: "¡Has sido añadido a la lista de espera! Te notificaremos cuando se lance la aplicación de huéspedes.",
        error: "Por favor ingresa una dirección de email válida"
      },
      demo: {
        restaurantName: "Bistró IA",
        restaurantInfo: "Fusión Moderna • 0.3km",
        aiAnalyzing: "IA ANALIZANDO TUS PREFERENCIAS",
        personalizedHeader: "PERSONALIZADO PARA TI",
        dish1: "Risotto de Trufa y Hongos",
        dish2: "Lubina Glaseada con Miso",
        aiSommelier: "PREGUNTA AL SOMMELIER IA",
        userQuestion: "¿Qué vino marida con la lubina?",
        aiResponse: "Recomiendo nuestro Sancerre - su mineralidad complementa bellamente el miso"
      }
    },

    // Industry Insights
    insights: {
      badge: "PERSPECTIVAS DE LA INDUSTRIA",
      title: "El Futuro de la Tecnología de Restaurantes",
      subtitle: "La industria de restaurantes está evolucionando rápidamente. Mantente a la vanguardia con estas perspectivas clave de la última investigación de mercado.",
      stats: {
        aiAdoption: {
          title: "Adopción de IA Acelerándose",
          stat: "67%",
          description: "de los operadores de restaurantes incorporaron más tecnología en sus operaciones en los últimos 2-3 años, con 69% reportando mayor eficiencia y productividad.",
          source: "Reporte de la Asociación Nacional de Restaurantes 2025"
        },
        laborChallenges: {
          title: "Desafíos Laborales Persisten",
          stat: "98%",
          description: "de los operadores de restaurantes dijeron que los costos laborales eran un desafío significativo para su restaurante, creando una necesidad urgente de soluciones tecnológicas.",
          source: "Reporte de la Asociación Nacional de Restaurantes 2025"
        },
        experienceOverPrice: {
          title: "Experiencia Sobre Precio",
          stat: "64%",
          description: "de los clientes de restaurantes dicen que la experiencia gastronómica es más importante que el precio de la comida. Los clientes priorizan la limpieza y un personal amable y acogedor.",
          source: "Reporte de la Asociación Nacional de Restaurantes 2025"
        },
        multiChannelEngagement: {
          title: "Participación Multicanal",
          stat: "51%",
          description: "de los consumidores dicen que ordenar para llevar o entrega es esencial para su estilo de vida, requiriendo experiencias digitales sin problemas.",
          source: "Reporte de la Asociación Nacional de Restaurantes 2025"
        },
        techProductivity: {
          title: "Productividad Tecnológica",
          stat: "69%",
          description: "de los operadores que incorporaron más tecnología reportaron que hizo su restaurante más eficiente y productivo, impulsando la excelencia operacional.",
          source: "Reporte de la Asociación Nacional de Restaurantes 2025"
        },
        industryGrowth: {
          title: "Trayectoria de Crecimiento de la Industria",
          stat: "$1.5T",
          description: "ventas proyectadas de la industria de restaurantes en 2025, con la adopción de tecnología jugando un papel crucial en capturar participación de mercado.",
          source: "Reporte de la Asociación Nacional de Restaurantes 2025"
        }
      },
      whyAiWaiters: {
        title: "Por Qué los Meseros con IA Son el Futuro",
        description: "Con 98% de los operadores de restaurantes enfrentando desafíos significativos de costos laborales y 67% ya incorporando más tecnología en sus operaciones, las soluciones de servicio con IA se han vuelto esenciales para restaurantes que buscan prosperar en 2025 y más allá.",
        conclusion: "La tecnología de mesero con IA de BalaBite ayuda a los restaurantes a superar estos desafíos optimizando costos laborales, mejorando experiencias de clientes y proporcionando perspectivas valiosas basadas en datos para el crecimiento del negocio.",
        limitedServiceStat: "73%",
        limitedServiceDescription: "de los operadores de servicio limitado ya han incorporado más tecnología en sus operaciones",
        limitedServiceSource: "Fuente: Reporte de la Asociación Nacional de Restaurantes 2025"
      }
    },

    // FAQ Section
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre BalaBite",
      questions: [
        {
          question: "¿Cuánto cuesta BalaBite?",
          answer: "BalaBite opera con un modelo de suscripción comenzando a menos del costo de un mesero de tiempo completo, con precios escalonados basados en el tamaño y necesidades del restaurante. Contáctanos para una cotización personalizada."
        },
        {
          question: "¿Cuánto tiempo toma la implementación?",
          answer: "La mayoría de restaurantes están funcionando dentro de 2-3 semanas. Nuestro equipo maneja la digitalización del menú, entrenamiento del personal e integración del sistema para asegurar una transición suave."
        },
        {
          question: "¿Puede BalaBite integrarse con nuestro sistema POS existente?",
          answer: "¡Sí! BalaBite se integra sin problemas con todos los principales sistemas POS incluyendo Toast, Square, Clover y muchos otros a través de nuestros conectores API universales."
        },
        {
          question: "¿Qué hardware necesitamos?",
          answer: "BalaBite es un sistema basado en web que funciona en cualquier dispositivo con un navegador web moderno. Para uso óptimo en restaurantes, recomendamos tabletas para cada mesa o sección, y una computadora para el sistema de pantalla de cocina. No se requiere hardware especializado."
        },
        {
          question: "¿Cómo manejan las actualizaciones del menú?",
          answer: "¡Los cambios del menú son fáciles! Actualiza a través de nuestro panel intuitivo o conecta tu sistema POS para actualizaciones automáticas. Artículos de temporada, especiales y cambios de precios se reflejan instantáneamente."
        },
        {
          question: "¿Qué tipo de soporte ofrecen?",
          answer: "Proporcionamos soporte técnico 24/7, actualizaciones regulares de software y un gerente de cuenta dedicado para cada socio restaurante. Nuestro equipo de éxito del cliente asegura que obtengas el máximo del sistema BalaBite."
        }
      ]
    },

    // CTA Section
    cta: {
      title: "¿Listo para Transformar tu Restaurante?",
      subtitle: "Únete a la lista de espera hoy y sé uno de los {count}+ restaurantes ya revolucionando su servicio con BalaBite.",
      button: "Únete a la Comunidad BalaBite",
      subtext: "Los socios tempranos reciben acceso prioritario y beneficios exclusivos"
    },

    waitlist: {
      title: "Únete a Nuestra Lista de Espera",
      subtitle: "Sé uno de los primeros restaurantes en experimentar el futuro del servicio gastronómico. Los socios tempranos reciben acceso prioritario y beneficios exclusivos.",
      form: {
        joinCommunity: "Únete a Nuestra Comunidad",
        restaurantsTransforming: "restaurantes ya transformándose con BalaBite",
        earlyPartnerQuote: "Los socios tempranos reciben acceso prioritario, precios exclusivos y participación directa en el desarrollo de características",
        restaurantName: "Nombre del Restaurante",
        ownerName: "Nombre del Propietario",
        email: "Correo Electrónico", 
        phone: "Número de Teléfono",
        phonePlaceholder: "(555) 123-4567",
        restaurantType: "Tipo de Restaurante",
        selectType: "Selecciona tipo",
        fineDining: "Alta Cocina",
        casualDining: "Restaurante Casual",
        fastCasual: "Comida Rápida Casual",
        cafe: "Café",
        bar: "Bar",
        other: "Otro",
        location: "Ubicación",
        locationPlaceholder: "Ciudad, Estado/Provincia",
        additionalMessage: "Mensaje Adicional",
        required: "*",
        processing: "Procesando...",
        joinButton: "Únete a la Lista de Espera",
        privacyText: "Al unirte, recibirás actualizaciones sobre BalaBite AI. Respetamos tu privacidad.",
        validation: {
          restaurantNameRequired: "El nombre del restaurante debe tener al menos 2 caracteres",
          ownerNameRequired: "El nombre del propietario debe tener al menos 2 caracteres",
          emailInvalid: "Por favor ingresa una dirección de correo válida",
          phoneInvalid: "Por favor ingresa un número de teléfono válido",
          restaurantTypeRequired: "Por favor selecciona un tipo de restaurante",
          locationRequired: "Por favor ingresa una ubicación válida",
                  formErrors: "Por favor corrige los errores en el formulario",
        success: "¡Gracias por unirte a nuestra lista de espera! Nos pondremos en contacto pronto.",
        error: "Algo salió mal. Por favor intenta de nuevo.",
        privacyText: "Al unirte, recibirás actualizaciones sobre BalaBite AI. Respetamos tu privacidad."
        }
      }
    },

    // Footer
    footer: {
      copyright: "© {year} BalaBite Technologies Inc.",
      tagline: "Hospitalidad con IA para el futuro de la gastronomía — Donde la tradición se encuentra con la innovación",
      explore: "Explorar",
      company: "Empresa",
      connect: "Conectar",
      aboutUs: "Acerca de Nosotros",
      careers: "Carreras",
      blog: "Blog",
      contact: "Contacto",
      email: "hello@balabite.ai",
      legal: "Política de Privacidad • Términos de Servicio • Acuerdo de Procesamiento de Datos",
      heritage: "בעל הבית × bite × byte — Uniendo tradición y tecnología para hospitalidad excepcional"
    },

    // API Messages
    api: {
      validation: {
        restaurantNameRequired: "Se requiere el nombre del restaurante",
        ownerNameRequired: "Se requiere el nombre del propietario",
        emailInvalid: "Dirección de correo electrónico inválida",
        phoneRequired: "Se requiere un número de teléfono válido",
        restaurantTypeRequired: "Se requiere el tipo de restaurante", 
        locationRequired: "Se requiere la ubicación"
      },
      success: {
        waitlistJoined: "Te has unido exitosamente a la lista de espera",
        guestWaitlistJoined: "¡Te has unido exitosamente a la lista de espera de la aplicación para huéspedes!",
        alreadyOnWaitlist: "¡Ya estás en nuestra lista de espera!"
      },
      errors: {
        validationFailed: "Falló la validación",
        serverError: "Error del servidor",
        failedToJoinWaitlist: "No se pudo unir a la lista de espera",
        invalidEmail: "Dirección de correo electrónico inválida"
      }
    },

    // Email Templates
    email: {
      welcome: {
        subject: "BIENVENIDO AL FUTURO DE LA GASTRONOMÍA",
        greeting: "¡Bienvenido a BalaBite!",
        message: "Gracias por unirte a nuestra lista de espera. Estamos emocionados de transformar tu restaurante con IA.",
        nextSteps: "Qué sigue:",
        step1: "Te contactaremos en 48 horas",
        step2: "Programar una demostración personalizada",
        step3: "Comenzar tu transformación digital"
      },
      admin: {
        subject: "Nueva Inscripción en Lista de Espera: {restaurantName}",
        newSignup: "Un nuevo restaurante se ha unido a la lista de espera",
        restaurantDetails: "Detalles del Restaurante"
      }
    },

    // Language Switcher
    languageSwitcher: {
      helpText: "Más idiomas próximamente"
    },

    // Dashboard Section
    dashboard: {
      menu: {
        dashboard: "Panel de Control",
        menu: "Menú",
        orders: "Pedidos", 
        aiSettings: "Configuración IA",
        analytics: "Analíticas",
        staff: "Personal",
        settings: "Configuración"
      },
      stats: {
        activeTables: "Mesas Activas",
        todaysOrders: "Pedidos de Hoy",
        avgCheck: "Ticket Promedio",
        aiInteractions: "Interacciones IA"
      },
      dishes: {
        dish1: "Ceviche de Atún",
        dish2: "Hamburguesa Premium", 
        dish3: "Pasta con Trufa",
        dish4: "Tres Leches"
      },
      labels: {
        popularDishes: "Platos Populares",
        revenueTrend: "Tendencia de Ingresos"
      }
    }
  },

  // CHINESE - Premium Chinese Market  
  zh: {
    loading: "加载中...",
    error: "出了点问题。请重试。", 
    success: "成功！",
    processing: "处理中...",
    required: "*",

    navigation: {
      features: "功能特色",
      about: "关于我们",
      howItWorks: "工作原理",
      insights: "行业洞察",
      faq: "常见问题",
      joinWaitlist: "加入等候名单"
    },

    hero: {
      title: "每一桌的最佳服务员",
      subtitle: "革新餐厅服务体验的AI数字服务员系统。",
      cta: "加入等候名单 ({count}+ 家餐厅)",
      ctaSubtext: "成为首批用AI改变餐厅的先行者",
      aiAssistantTitle: "AI智能餐厅助手",
      aiAssistantDescription: "比您最好的服务员更了解菜单的对话式AI"
    },

    notifications: {
      from: "来自",
      justJoined: "刚刚加入了BalaBite"
    },

    // Chinese restaurant cities
    cities: [
      "北京", "上海", "广州", "深圳", "杭州",
      "成都", "重庆", "南京", "武汉", "西安",
      "香港", "台北", "新加坡", "吉隆坡", "悉尼"
    ],

    restaurantTypes: [
      "高端餐厅", "粤菜餐厅", "川菜餐厅", "火锅店", "茶餐厅",
      "咖啡厅", "酒吧", "烧烤店", "面馆", "饺子馆",
      "日料店", "西餐厅", "自助餐厅", "快餐店", "小食店"
    ],

    // Features Section
    features: {
      title: "AI驱动的客户体验",
      subtitle: "我们的AI服务员以类人智能理解并响应客户需求，创造难忘的用餐体验，让客户回头。",
      menuIntelligence: {
        title: "菜单智能",
        description: "AI深度理解菜单 - 食材、制作方法、风味特征和饮食限制。"
      },
      personalRecommendations: {
        title: "个人推荐", 
        description: "分析客户偏好和订单历史，提供量身定制的建议，增加账单金额。"
      },
      multilingualSupport: {
        title: "多语言支持",
        description: "流利使用30多种语言进行交流，消除语言障碍，增强国际客户的用餐体验。"
      },
      dietaryKnowledge: {
        title: "饮食知识",
        description: "即时回答有关过敏、成分的问题，并可建议修改以适应饮食限制。"
      },
      seamlessOrdering: {
        title: "无缝订购",
        description: "精确接受订单，直接发送到厨房，处理修改而不出错。"
      },
      guestInsights: {
        title: "客户洞察", 
        description: "捕获偏好和反馈，建立客户档案，帮助您更好地了解客户。"
      }
    },

    // Complete Management Platform
    management: {
      title: "完整的体验管理平台",
      subtitle: "通过我们的综合管理仪表板获得对餐厅客户体验前所未有的洞察和控制，专为创造让客户回头的难忘时刻而设计。",
      realTimeAnalytics: {
        title: "实时分析",
        description: "在一个地方跟踪销售、热门菜品、客户参与度和AI性能。"
      },
      intelligentMenu: {
        title: "智能菜单",
        description: "在所有平台上实时更新菜单，包括动态定价、促销和可用性。"
      },
      staffInsights: {
        title: "员工洞察",
        description: "监控服务器性能，了解AI如何帮助您的团队表现出色。"
      },
      customerProfiles: {
        title: "客户档案",
        description: "为常客建立详细档案，创造更个性化的体验。"
      },
      aiTraining: {
        title: "AI训练",
        description: "定制您的AI服务员的知识、个性和推荐，以匹配您餐厅的独特风格。"
      },
      inventoryTracking: {
        title: "库存跟踪",
        description: "接收低库存物品的警报和使用模式洞察。"
      },
      reservationManagement: {
        title: "预订管理",
        description: "管理预订并优化餐桌分配以实现最高效率。"
      },
      marketingTools: {
        title: "营销工具",
        description: "基于客户偏好和行为创建有针对性的促销活动。"
      }
    },

    // How It Works Section
    howItWorks: {
      badge: "简单实施",
      title: "工作原理",
      subtitle: "开始使用BalaBite快速简单。我们的团队处理从设置到培训的一切，确保平稳过渡。",
      processTitle: "4步实施流程",
      step1: {
        title: "菜单数字化和增强",
        description: "我们将您的菜单转换为智能格式，包含我们的AI能理解的动态定价，包括配料、制作方法和营养信息。"
      },
      step2: {
        title: "体验集成",
        description: "BalaBite与您现有的系统集成，同时添加个性化层，改变每一次用餐体验。"
      },
      step3: {
        title: "员工赋能",
        description: "我们为您的团队提供全面培训，展示AI如何增强他们的能力并帮助创造难忘的客户时刻。"
      },
      step4: {
        title: "独角兽发布和支持",
        description: "我们的团队创造神奇的发布体验，确保一切都超出预期，之后提供24/7持续支持。"
      },
      cta: "立即开始",
      restaurantFeaturesTitle: "餐厅体验功能",
      restaurantFeatures: {
        intelligentMenuManagement: {
          title: "智能菜单管理",
          description: "在所有平台上轻松更新菜单项目，包括动态定价、促销和实时可用性。"
        },
        aiKnowledgeTraining: {
          title: "AI知识培训",
          description: "定制您的AI服务员的个性、知识和推荐，以匹配您餐厅的独特风格。"
        },
        realTimeAnalytics: {
          title: "实时分析",
          description: "通过综合仪表板跟踪客户互动、热门菜品、反馈和销售影响。"
        },
        staffEmpowerment: {
          title: "员工赋能",
          description: "使用AI驱动的劳动力管理工具优化排班、培训和任务分配。"
        },
        experienceAutomation: {
          title: "体验自动化",
          description: "基于客户偏好和用餐历史创建个性化促销和忠诚度计划。"
        },
        guestInsightsDesigner: {
          title: "客户洞察设计师",
          description: "通过详细的访问档案更好地了解客户，创造难忘的体验。"
        }
      }
    },

    // Guest App Section
    guestApp: {
      badge: "即将推出",
      title: "BalaBite客户应用",
      subtitle: "通过我们的AI餐厅伴侣发现未来的用餐体验。获得个性化菜单推荐、即时问题回答和无缝订餐体验。",
      features: {
        aiWaiter: "AI服务员聊天",
        smartRecommendations: "智能菜单推荐",
        instantOrdering: "即时订餐",
        dietaryFilters: "饮食过滤",
        realTimeUpdates: "实时更新",
        menuNavigation: {
          title: "AI智能菜单导航",
          description: "我们的先进AI准确理解您的需求，无论是饮食偏好、口味特点还是菜单中的隐藏珍品。"
        },
        ingredientAnalysis: {
          title: "即时成分分析",
          description: "轻松扫描任何餐厅菜单，在几秒钟内获取有关成分、过敏原警告和营养数据的详细信息。"
        },
        multiRestaurant: {
          title: "多餐厅知识库",
          description: "上传您喜爱的本地餐厅菜单，获得相同的AI协助，即使他们还不是BalaBite合作伙伴。"
        },
        messageInteraction: {
          title: "基于消息的互动",
          description: "像与朋友聊天一样自然地与您的AI服务员发消息，享受无缝个性化的用餐体验。"
        }
      },
      form: {
        placeholder: "输入您的邮箱",
        button: "通知我",
        processing: "添加中...",
        success: "您已成功加入候补名单！客户应用发布时我们会通知您。",
        error: "请输入有效的邮箱地址"
      },
      demo: {
        restaurantName: "智慧餐厅",
        restaurantInfo: "现代融合菜 • 300米",
        aiAnalyzing: "AI正在分析您的偏好",
        personalizedHeader: "为您量身定制",
        dish1: "松露野菌烩饭",
        dish2: "味噌烤鲈鱼",
        aiSommelier: "询问AI侍酒师",
        userQuestion: "鲈鱼配什么酒？",
        aiResponse: "我推荐桑塞尔白葡萄酒 - 其矿物质感完美平衡味噌的鲜美"
      }
    },

    // Industry Insights
    insights: {
      badge: "行业洞察",
      title: "餐厅技术的未来",
      subtitle: "餐厅行业正在快速发展。通过最新市场研究的这些关键洞察保持领先地位。",
      stats: {
        aiAdoption: {
          title: "AI采用加速",
          stat: "67%",
          description: "的餐厅经营者在过去2-3年中将更多技术纳入其运营，69%报告效率和生产力提高。",
          source: "国家餐厅协会2025年报告"
        },
        laborChallenges: {
          title: "劳动力挑战持续",
          stat: "98%",
          description: "的餐厅经营者表示劳动力成本是其餐厅面临的重大挑战，迫切需要技术解决方案。",
          source: "国家餐厅协会2025年报告"
        },
        experienceOverPrice: {
          title: "体验胜过价格",
          stat: "64%",
          description: "的餐厅客户表示用餐体验比餐费价格更重要。客户优先考虑清洁度和友善、热情的员工。",
          source: "国家餐厅协会2025年报告"
        },
        multiChannelEngagement: {
          title: "多渠道参与",
          stat: "51%",
          description: "的消费者表示外卖或送餐订购对其生活方式至关重要，需要无缝的数字体验。",
          source: "国家餐厅协会2025年报告"
        },
        techProductivity: {
          title: "技术生产力",
          stat: "69%",
          description: "采用更多技术的经营者报告这使他们的餐厅更高效和更有生产力，推动运营卓越。",
          source: "国家餐厅协会2025年报告"
        },
        industryGrowth: {
          title: "行业增长轨迹",
          stat: "$1.5T",
          description: "2025年餐厅行业预计销售额，技术采用在获取市场份额方面发挥关键作用。",
          source: "国家餐厅协会2025年报告"
        }
      },
      whyAiWaiters: {
        title: "为什么AI服务员是未来",
        description: "98%的餐厅经营者面临重大劳动力成本挑战，67%已经将更多技术纳入其运营，AI驱动的服务解决方案已成为希望在2025年及以后蓬勃发展的餐厅的必需品。",
        conclusion: "BalaBite的AI服务员技术通过优化劳动力成本、增强客户体验和提供有价值的数据驱动业务增长洞察，帮助餐厅克服这些挑战。",
        limitedServiceStat: "73%",
        limitedServiceDescription: "的有限服务经营者已经将更多技术纳入其运营",
        limitedServiceSource: "来源：国家餐厅协会2025年报告"
      }
    },

    // FAQ Section
    faq: {
      title: "常见问题",
      subtitle: "关于BalaBite您需要了解的一切",
      questions: [
        {
          question: "BalaBite的费用是多少？",
          answer: "BalaBite采用订阅模式，起价低于一名全职服务员的成本，根据餐厅规模和需求分层定价。请联系我们获取定制报价。"
        },
        {
          question: "实施需要多长时间？",
          answer: "大多数餐厅在2-3周内即可运行。我们的团队处理菜单数字化、员工培训和系统集成，确保平稳过渡。"
        },
        {
          question: "BalaBite能与我们现有的POS系统集成吗？",
          answer: "是的！BalaBite通过我们的通用API连接器与所有主要POS系统无缝集成，包括Toast、Square、Clover等。"
        },
        {
          question: "我们需要什么硬件？",
          answer: "BalaBite是基于Web的系统，可在任何具有现代Web浏览器的设备上运行。为了在餐厅中获得最佳使用效果，我们建议为每张桌子或区域配备平板电脑，以及为厨房显示系统配备计算机。无需专用硬件。"
        },
        {
          question: "您如何处理菜单更新？",
          answer: "菜单更改很简单！通过我们直观的仪表板更新或连接您的POS系统进行自动更新。季节性菜品、特色菜和价格变化会立即反映。"
        },
        {
          question: "您提供什么样的支持？",
          answer: "我们提供24/7技术支持、定期软件更新，每个餐厅合作伙伴都有专门的客户经理。我们的客户成功团队确保您从BalaBite系统中获得最大收益。"
        }
      ]
    },

    // CTA Section
    cta: {
      title: "准备好改变您的餐厅了吗？",
      subtitle: "立即加入候补名单，成为{count}+家已经通过BalaBite革命化服务的餐厅之一。",
      button: "加入BalaBite社区",
      subtext: "早期合作伙伴享受优先访问权和独家优惠"
    },

    waitlist: {
      title: "加入我们的等候名单",
      subtitle: "成为首批体验未来餐饮服务的餐厅。早期合作伙伴享有优先访问权和独家福利。",
      form: {
        joinCommunity: "加入我们的社区",
        restaurantsTransforming: "家餐厅已在使用BalaBite进行转型",
        earlyPartnerQuote: "早期合作伙伴享有优先访问权、独家定价和功能开发的直接参与",
        restaurantName: "餐厅名称",
        ownerName: "业主姓名",
        email: "邮箱",
        phone: "电话号码 *",
        phonePlaceholder: "例如 138-0000-0000",
        restaurantType: "餐厅类型", 
        selectType: "选择类型",
        fineDining: "高档餐厅",
        casualDining: "休闲餐厅",
        fastCasual: "快休闲餐厅",
        cafe: "咖啡厅",
        bar: "酒吧",
        other: "其他",
        location: "地点",
        locationPlaceholder: "城市，省份",
        additionalMessage: "附加信息",
        required: "*",
        processing: "处理中...",
        joinButton: "加入等候名单",
        privacyText: "加入后，您将收到关于BalaBite AI的更新。我们尊重您的隐私。",
        validation: {
          restaurantNameRequired: "餐厅名称至少需要2个字符",
          ownerNameRequired: "业主姓名至少需要2个字符",
          emailInvalid: "请输入有效的邮箱地址",
          phoneInvalid: "请输入有效的电话号码",
          restaurantTypeRequired: "请选择餐厅类型",
          locationRequired: "请输入有效地点",
          formErrors: "请修正表单中的错误",
          success: "感谢加入我们的等候名单！我们很快会与您联系。",
          error: "出了点问题。请重试。",
          privacyText: "加入后，您将收到关于BalaBite AI的更新。我们尊重您的隐私。"
        }
      }
    },

    // Footer
    footer: {
      copyright: "© {year} BalaBite Technologies Inc.",
      tagline: "AI餐饮服务的未来 — 传统与创新的结合",
      explore: "探索",
      company: "公司",
      connect: "联系",
      aboutUs: "关于我们",
      careers: "职业机会",
      blog: "博客",
      contact: "联系我们",
      email: "hello@balabite.ai",
      legal: "隐私政策 • 服务条款 • 数据处理协议",
      heritage: "בעל הבית × bite × byte — 结合传统与技术，打造卓越餐饮服务"
    },

    // API Messages
    api: {
      validation: {
        restaurantNameRequired: "餐厅名称为必填项",
        ownerNameRequired: "业主姓名为必填项",
        emailInvalid: "无效的邮箱地址",
        phoneRequired: "需要有效的电话号码",
        restaurantTypeRequired: "餐厅类型为必填项", 
        locationRequired: "地点为必填项"
      },
      success: {
        waitlistJoined: "成功加入等候名单",
        guestWaitlistJoined: "成功加入客人应用等候名单！",
        alreadyOnWaitlist: "您已在我们的等候名单中！"
      },
      errors: {
        validationFailed: "验证失败",
        serverError: "服务器错误",
        failedToJoinWaitlist: "加入等候名单失败",
        invalidEmail: "无效的邮箱地址"
      }
    },

    // Email Templates
    email: {
      welcome: {
        subject: "欢迎来到餐饮业的未来",
        greeting: "欢迎来到BalaBite！",
        message: "感谢您加入我们的等候名单。我们很兴奋能用AI技术改变您的餐厅。",
        nextSteps: "接下来的步骤：",
        step1: "我们将在48小时内与您联系",
        step2: "安排个性化演示",
        step3: "开始您的数字化转型"
      },
      admin: {
        subject: "新的等候名单注册：{restaurantName}",
        newSignup: "新餐厅已加入等候名单",
        restaurantDetails: "餐厅详情"
      }
    },

    // Language Switcher
    languageSwitcher: {
      helpText: "更多语言即将推出"
    },

    // Dashboard Section
    dashboard: {
      menu: {
        dashboard: "仪表板",
        menu: "菜单",
        orders: "订单", 
        aiSettings: "AI设置",
        analytics: "分析",
        staff: "员工",
        settings: "设置"
      },
      stats: {
        activeTables: "活跃餐桌",
        todaysOrders: "今日订单",
        avgCheck: "平均消费",
        aiInteractions: "AI交互"
      },
      dishes: {
        dish1: "麻辣小龙虾",
        dish2: "和牛汉堡", 
        dish3: "松露意面",
        dish4: "芒果班戟"
      },
      labels: {
        popularDishes: "热门菜品",
        revenueTrend: "收入趋势"
      }
    }
  },

  // JAPANESE - Premium Omotenashi Market
  ja: {
    loading: "読み込み中...",
    error: "問題が発生しました。もう一度お試しください。",
    success: "成功しました！",
    processing: "処理中...",
    required: "*",

    navigation: {
      features: "機能",
      about: "会社概要",
      howItWorks: "仕組み",
      insights: "業界洞察",
      faq: "よくある質問",
      joinWaitlist: "ウェイトリストに参加"
    },

    hero: {
      title: "すべてのテーブルで最高のおもてなし",
      subtitle: "レストランサービス体験を革新するAI搭載デジタルウェイターシステム。",
      cta: "ウェイトリストに参加 ({count}+ レストラン)",
      ctaSubtext: "AIでレストランを変革する最初の一歩を踏み出しましょう",
      aiAssistantTitle: "AI搭載レストランアシスタント",
      aiAssistantDescription: "最高のサーバーよりもメニューを理解する対話型AI"
    },

    notifications: {
      from: "の",
      justJoined: "がBalaBiteに参加しました"
    },

    // Japanese restaurant cities
    cities: [
      "東京", "大阪", "京都", "横浜", "名古屋",
      "福岡", "札幌", "神戸", "広島", "仙台",
      "金沢", "鎌倉", "軽井沢", "箱根", "熱海"
    ],

    restaurantTypes: [
      "高級料亭", "割烹", "寿司店", "焼肉店", "居酒屋",
      "カフェ", "バー", "ラーメン店", "そば店", "うどん店",
      "フレンチ", "イタリアン", "中華料理", "韓国料理", "ファミレス"
    ],

    // Features Section
    features: {
      title: "AIによるおもてなし体験",
      subtitle: "私たちのAIウェイターは人間のような知性でお客様のニーズを理解し、お客様が再び足を運びたくなる記憶に残るお食事体験を創造いたします。",
      menuIntelligence: {
        title: "メニュー・インテリジェンス",
        description: "AIがメニューを深く理解 - 食材、調理法、風味プロファイル、食事制限まで。"
      },
      personalRecommendations: {
        title: "パーソナル・レコメンデーション", 
        description: "お客様の好みとご注文履歴を分析し、お会計金額を増加させるテーラーメイドのご提案を提供。"
      },
      multilingualSupport: {
        title: "多言語サポート",
        description: "30以上の言語で流暢にコミュニケーション、言語の壁を取り除き、海外のお客様のお食事体験を向上。"
      },
      dietaryKnowledge: {
        title: "食事制限の知識",
        description: "アレルギーや食材に関するご質問に即座にお答えし、食事制限に対応するための変更をご提案。"
      },
      seamlessOrdering: {
        title: "シームレスなご注文",
        description: "正確にご注文をお受けし、キッチンに直接送信、変更も間違いなく処理。"
      },
      guestInsights: {
        title: "お客様インサイト", 
        description: "好みとフィードバックを収集し、お客様をより深く理解するための顧客プロファイルを構築。"
      }
    },

    // Guest App Section
    guestApp: {
      badge: "近日公開",
      title: "BalaBiteゲストアプリ",
      subtitle: "私たちのAIレストランコンパニオンで未来のダイニングを発見してください。パーソナライズされたメニュー推奨、質問への即座の回答、シームレスな注文体験を取得。",
      features: {
        aiWaiter: "AIウェイターチャット",
        smartRecommendations: "スマートメニュー推奨",
        instantOrdering: "即座注文",
        dietaryFilters: "食事制限フィルター",
        realTimeUpdates: "リアルタイム更新",
        ingredientAnalysis: {
          title: "即時成分分析",
          description: "レストランのメニューを簡単にスキャンし、数秒で食材、アレルゲン警告、栄養データの詳細情報を取得できます。"
        }
      },
      form: {
        placeholder: "メールアドレスを入力",
        button: "通知する",
        processing: "追加中...",
        success: "ウェイトリストに正常に追加されました！ゲストアプリがローンチされたときに通知いたします。",
        error: "有効なメールアドレスを入力してください"
      },
      demo: {
        restaurantName: "割烹AI",
        restaurantInfo: "現代和食 • 300m",
        aiAnalyzing: "AIがお客様のお好みを分析中",
        personalizedHeader: "お客様専用のご提案",
        dish1: "トリュフ茸の炊き込みご飯",
        dish2: "西京味噌焼き鱸",
        aiSommelier: "AIソムリエにご相談",
        userQuestion: "鱸に合うお酒は？",
        aiResponse: "サンセールをお勧めいたします。そのミネラル感が西京味噌の旨味と美しく調和いたします"
      }
    },

    // Management Section
    management: {
      title: "完全な体験管理プラットフォーム",
      subtitle: "レストランのゲスト体験に対する前例のない洞察と制御を獲得し、顧客を再来させる記憶に残る瞬間を創造する包括的管理ダッシュボードです。",
      realTimeAnalytics: {
        title: "リアルタイム分析",
        description: "売上、人気商品、顧客エンゲージメント、AIパフォーマンスをすべて一箇所で追跡。"
      },
      intelligentMenu: {
        title: "インテリジェントメニュー",
        description: "すべてのプラットフォームで動的価格設定、プロモーション、在庫状況をリアルタイムで更新。"
      },
      staffInsights: {
        title: "スタッフインサイト",
        description: "サーバーのパフォーマンスを監視し、AIがチームの優秀さを支援する様子を確認。"
      },
      customerProfiles: {
        title: "顧客プロファイル",
        description: "常連客の詳細なプロファイルを構築し、よりパーソナライズされた体験を創造。"
      },
      aiTraining: {
        title: "AIトレーニング",
        description: "AIウェイターの知識、個性、推奨事項をレストランの独自スタイルに合わせてカスタマイズ。"
      },
      inventoryTracking: {
        title: "在庫追跡",
        description: "在庫不足商品のアラートと使用パターンの洞察を取得。"
      },
      reservationManagement: {
        title: "予約管理",
        description: "予約を管理し、最大効率のためのテーブル割り当てを最適化。"
      },
      marketingTools: {
        title: "マーケティングツール",
        description: "顧客の好みと行動に基づいたターゲット型プロモーションを作成。"
      }
    },

    // Industry Insights
    insights: {
      badge: "業界洞察",
      title: "レストランテクノロジーの未来",
      subtitle: "レストラン業界は急速に進化しています。最新の市場調査からのこれらの重要な洞察で時代の先端を行きましょう。",
      stats: {
        aiAdoption: {
          title: "AI採用の加速",
          stat: "67%",
          description: "のレストラン運営者が過去2-3年間でより多くのテクノロジーを運営に組み込み、69%が効率性と生産性の向上を報告。",
          source: "全米レストラン協会2025年レポート"
        },
        laborChallenges: {
          title: "労働力課題の継続",
          stat: "98%",
          description: "のレストラン運営者が人件費をレストランにとって重要な課題と述べ、テクノロジーソリューションの緊急な必要性を創出。",
          source: "全米レストラン協会2025年レポート"
        },
        experienceOverPrice: {
          title: "価格より体験",
          stat: "64%",
          description: "のレストラン顧客が食事の価格よりもダイニング体験の方が重要と述べています。顧客は清潔さと親切で歓迎的なスタッフを優先。",
          source: "全米レストラン協会2025年レポート"
        },
        multiChannelEngagement: {
          title: "マルチチャネルエンゲージメント",
          stat: "51%",
          description: "の消費者がテイクアウトまたはデリバリーの注文がライフスタイルに不可欠と述べ、シームレスなデジタル体験を要求。",
          source: "全米レストラン協会2025年レポート"
        },
        techProductivity: {
          title: "テクノロジー生産性",
          stat: "69%",
          description: "より多くのテクノロジーを組み込んだ運営者が、レストランをより効率的で生産的にし、運営の卓越性を推進したと報告。",
          source: "全米レストラン協会2025年レポート"
        },
        industryGrowth: {
          title: "業界成長軌道",
          stat: "$1.5T",
          description: "2025年のレストラン業界売上予測で、テクノロジー採用が市場シェア獲得において重要な役割を果たしています。",
          source: "全米レストラン協会2025年レポート"
        }
      },
      whyAiWaiters: {
        title: "なぜAIウェイターが未来なのか",
        description: "98%のレストラン運営者が重要な人件費課題に直面し、67%がすでにより多くのテクノロジーを運営に組み込んでいる中、AI駆動のサービスソリューションは2025年以降に繁栄を目指すレストランにとって不可欠になっています。",
        conclusion: "BalaBiteのAIウェイターテクノロジーは、人件費の最適化、顧客体験の向上、ビジネス成長のための貴重なデータ駆動洞察の提供により、レストランがこれらの課題を克服するのを支援します。",
        limitedServiceStat: "73%",
        limitedServiceDescription: "の限定サービス運営者がすでにより多くのテクノロジーを運営に組み込んでいます",
        limitedServiceSource: "出典：全米レストラン協会2025年レポート"
      }
    },

    // How It Works Section
    howItWorks: {
      badge: "簡単な実装",
      title: "仕組みについて",
      subtitle: "BalaBiteの導入は迅速かつ簡単です。私たちのチームがセットアップからトレーニングまですべてを処理し、スムーズな移行を保証します。",
      processTitle: "4ステップ実装プロセス",
      step1: {
        title: "メニューのデジタル化と強化",
        description: "メニューを動的価格設定でAIが理解できるインテリジェントな形式に変換し、材料、調理方法、栄養情報を含みます。"
      },
      step2: {
        title: "体験の統合", 
        description: "BalaBiteは既存のシステムと統合し、すべての食事体験を変革するパーソナライゼーションの層を追加します。"
      },
      step3: {
        title: "スタッフの能力向上",
        description: "チームに包括的なトレーニングを提供し、AIが能力を向上させ、記憶に残るゲストの瞬間を作り出す方法を示します。"
      },
      step4: {
        title: "特別なローンチとサポート",
        description: "私たちのチームが期待を超える魔法のようなローンチ体験を作り、その後24時間365日のサポートを提供します。"
      },
      cta: "今すぐ始める",
      restaurantFeaturesTitle: "レストラン体験機能",
      restaurantFeatures: {
        intelligentMenuManagement: {
          title: "インテリジェントメニュー管理",
          description: "すべてのプラットフォームで動的価格設定、プロモーション、在庫状況をリアルタイムで簡単に更新できます。"
        },
        aiKnowledgeTraining: {
          title: "AI知識トレーニング",
          description: "レストランの独特なスタイルに合わせて、AIウェイターの個性、知識、推奨事項をカスタマイズできます。"
        },
        realTimeAnalytics: {
          title: "リアルタイム分析",
          description: "顧客とのやり取り、人気料理、フィードバック、売上への影響を包括的なダッシュボードで追跡できます。"
        },
        staffEmpowerment: {
          title: "スタッフの能力向上",
          description: "AI搭載の労働力管理ツールでスケジューリング、トレーニング、タスク割り当てを最適化できます。"
        },
        experienceAutomation: {
          title: "体験の自動化",
          description: "顧客の好みと食事履歴に基づいて、パーソナライズされたプロモーションとロイヤルティプログラムを作成できます。"
        },
        guestInsightsDesigner: {
          title: "ゲスト洞察デザイナー",
          description: "訪問にわたる詳細なプロファイルで顧客をより良く理解し、忘れられない体験を作り出せます。"
        }
      }
    },

    // FAQ Section
    faq: {
      title: "よくある質問",
      subtitle: "BalaBiteについて知っておくべきすべて",
      questions: [
        {
          question: "BalaBiteの費用はいくらですか？",
          answer: "BalaBiteはフルタイムウェイター1人の費用よりも安いサブスクリプションモデルで運営され、レストランの規模とニーズに基づいた階層価格設定があります。カスタム見積もりについてはお問い合わせください。"
        },
        {
          question: "実装にはどのくらい時間がかかりますか？",
          answer: "ほとんどのレストランは2〜3週間以内に稼働します。私たちのチームがメニューのデジタル化、スタッフトレーニング、システム統合を処理し、スムーズな移行を保証します。"
        },
        {
          question: "BalaBiteは既存のPOSシステムと統合できますか？",
          answer: "はい！BalaBiteは、Toast、Square、Cloverなど、すべての主要POSシステムと、ユニバーサルAPIコネクタを通じてシームレスに統合します。"
        },
        {
          question: "どのようなハードウェアが必要ですか？",
          answer: "BalaBiteは最新のウェブブラウザを備えた任意のデバイスで動作するウェブベースのシステムです。最適なレストラン使用のため、各テーブルまたはセクション用のタブレットと、キッチンディスプレイシステム用のコンピュータをお勧めします。特別なハードウェアは必要ありません。"
        },
        {
          question: "メニューの更新はどのように処理しますか？",
          answer: "メニューの変更は簡単です！直感的なダッシュボードから更新するか、POSシステムを接続して自動更新できます。季節のアイテム、スペシャル、価格変更は即座に反映されます。"
        },
        {
          question: "どのようなサポートを提供しますか？",
          answer: "24時間365日の技術サポート、定期的なソフトウェア更新、すべてのレストランパートナー専用のアカウントマネージャーを提供します。カスタマーサクセスチームがBalaBiteシステムを最大限に活用できるよう支援します。"
        }
      ]
    },

    // CTA Section
    cta: {
      title: "レストランを変革する準備はできていますか？",
      subtitle: "今日ウェイトリストに参加し、すでにBalaBiteでサービスを革命化している{count}+のレストランの仲間入りをしましょう。",
      button: "BalaBiteコミュニティに参加",
      subtext: "早期パートナーは優先アクセスと特別な特典を受けられます"
    },

    waitlist: {
      title: "ウェイトリストにご参加ください",
      subtitle: "未来のダイニングサービスを体験する最初のレストランになりましょう。早期パートナーは優先アクセスと特別な特典をお受けいただけます。",
      form: {
        joinCommunity: "コミュニティに参加",
        restaurantsTransforming: "のレストランがBalaBiteで変革中",
        earlyPartnerQuote: "早期パートナーは優先アクセス、特別価格、機能開発への直接参加をお受けいただけます",
        restaurantName: "レストラン名",
        ownerName: "オーナー名",
        email: "メールアドレス",
        phone: "電話番号 *",
        phonePlaceholder: "例：03-0000-0000",
        restaurantType: "レストランタイプ",
        selectType: "タイプを選択",
        fineDining: "高級レストラン",
        casualDining: "カジュアルダイニング",
        fastCasual: "ファストカジュアル",
        cafe: "カフェ",
        bar: "バー",
        other: "その他",
        location: "所在地",
        locationPlaceholder: "市区町村、都道府県",
        message: "追加メッセージ",
        processing: "処理中...",
        joinButton: "ウェイトリストに参加",
        privacyText: "ご参加いただくと、BalaBite AIに関する最新情報をお送りいたします。プライバシーを尊重いたします。",
        validation: {
          restaurantNameRequired: "レストラン名は2文字以上で入力してください",
          ownerNameRequired: "オーナー名は2文字以上で入力してください",
          emailInvalid: "有効なメールアドレスを入力してください",
          phoneInvalid: "有効な電話番号を入力してください",
          restaurantTypeRequired: "レストランタイプを選択してください",
          locationRequired: "有効な所在地を入力してください",
          formErrors: "フォームのエラーを修正してください",
          success: "ウェイトリストへのご参加ありがとうございます！近日中にご連絡いたします。",
          error: "問題が発生しました。もう一度お試しください。"
        }
      }
    },

    // Footer
    footer: {
      copyright: "© {year} BalaBite Technologies Inc.",
      tagline: "未来のダイニングのためのAI搭載ホスピタリティ — 伝統とイノベーションが出会う場所",
      explore: "探索",
      company: "会社", 
      connect: "つながる",
      aboutUs: "私たちについて",
      careers: "キャリア",
      blog: "ブログ",
      contact: "お問い合わせ",
      email: "hello@balabite.ai",
      legal: "プライバシーポリシー • 利用規約 • データ処理契約",
      heritage: "בעל הבית × bite × byte — 伝統とテクノロジーを結び、卓越したホスピタリティを実現"
    },

    // API Messages
    api: {
      validation: {
        restaurantNameRequired: "レストラン名は必須です",
        ownerNameRequired: "オーナー名は必須です",
        emailInvalid: "無効なメールアドレスです",
        phoneRequired: "有効な電話番号が必要です",
        restaurantTypeRequired: "レストランタイプは必須です", 
        locationRequired: "場所は必須です"
      },
      success: {
        waitlistJoined: "ウェイトリストへの参加が完了しました",
        guestWaitlistJoined: "ゲストアプリのウェイトリストへの参加が完了しました！",
        alreadyOnWaitlist: "既にウェイトリストにご登録いただいております！"
      },
      errors: {
        validationFailed: "検証に失敗しました",
        serverError: "サーバーエラー",
        failedToJoinWaitlist: "ウェイトリストへの参加に失敗しました",
        invalidEmail: "無効なメールアドレスです"
      }
    },

    // Email Templates
    email: {
      welcome: {
        subject: "未来のダイニングへようこそ",
        greeting: "BalaBiteへようこそ！",
        message: "ウェイトリストにご参加いただきありがとうございます。AIでレストランを変革することを楽しみにしております。",
        nextSteps: "次のステップ：",
        step1: "48時間以内にご連絡いたします",
        step2: "パーソナライズされたデモをスケジュール",
        step3: "デジタル変革を開始"
      },
      admin: {
        subject: "新しいウェイトリスト登録：{restaurantName}",
        newSignup: "新しいレストランがウェイトリストに参加しました",
        restaurantDetails: "レストラン詳細"
      }
    },

    // Language Switcher
    languageSwitcher: {
      helpText: "より多くの言語が近日公開予定"
    },

    // Dashboard Section
    dashboard: {
      menu: {
        dashboard: "ダッシュボード",
        menu: "メニュー",
        orders: "注文", 
        aiSettings: "AI設定",
        analytics: "分析",
        staff: "スタッフ",
        settings: "設定"
      },
      stats: {
        activeTables: "アクティブテーブル",
        todaysOrders: "本日の注文",
        avgCheck: "平均単価",
        aiInteractions: "AI対話"
      },
      dishes: {
        dish1: "スパイシーツナロール",
        dish2: "和牛バーガー", 
        dish3: "トリュフパスタ",
        dish4: "マンゴーチーズケーキ"
      },
      labels: {
        popularDishes: "人気料理",
        revenueTrend: "売上トレンド"
      }
    }
  },

  // RUSSIAN - Premium Eastern European Market
  ru: {
    loading: "Загрузка...",
    error: "Что-то пошло не так. Попробуйте еще раз.",
    success: "Успешно!",
    processing: "Обработка...",
    required: "*",

    navigation: {
      features: "Возможности",
      about: "О нас",
      howItWorks: "Как это работает",
      insights: "Аналитика отрасли",
      faq: "Часто задаваемые вопросы",
      joinWaitlist: "Присоединиться к списку ожидания"
    },

    hero: {
      title: "Ваш лучший официант за каждым столом",
      subtitle: "Система цифрового официанта на базе ИИ, революционизирующая опыт ресторанного сервиса.",
      cta: "Присоединиться к списку ожидания ({count}+ ресторанов)",
      ctaSubtext: "Станьте одним из первых, кто трансформирует свой ресторан с помощью ИИ",
      aiAssistantTitle: "Ресторанный ассистент на базе ИИ",
      aiAssistantDescription: "Разговорный ИИ, который понимает ваше меню лучше лучшего официанта"
    },

    notifications: {
      from: "из",
      justJoined: "только что присоединился к BalaBite"
    },

    // Management Section
    management: {
      title: "Полная платформа управления опытом",
      subtitle: "Получите беспрецедентные инсайты и контроль над опытом гостей вашего ресторана с нашей комплексной панелью управления, разработанной для создания запоминающихся моментов, которые заставляют клиентов возвращаться.",
      realTimeAnalytics: {
        title: "Аналитика в реальном времени",
        description: "Отслеживайте продажи, популярные блюда, взаимодействие с клиентами и производительность ИИ в одном месте."
      },
      intelligentMenu: {
        title: "Интеллектуальное меню",
        description: "Обновляйте меню с динамическими ценами, акциями и доступностью в реальном времени на всех платформах."
      },
      staffInsights: {
        title: "Инсайты персонала",
        description: "Отслеживайте производительность серверов и смотрите, как ИИ помогает вашей команде преуспевать."
      },
      customerProfiles: {
        title: "Профили клиентов",
        description: "Создавайте детальные профили ваших постоянных клиентов для создания более персонализированного опыта."
      },
      aiTraining: {
        title: "Обучение ИИ",
        description: "Настройте знания, личность и рекомендации вашего ИИ-официанта под уникальный стиль вашего ресторана."
      },
      inventoryTracking: {
        title: "Отслеживание запасов",
        description: "Получайте уведомления о товарах с низким запасом и инсайты о паттернах использования."
      },
      reservationManagement: {
        title: "Управление бронированием",
        description: "Управляйте бронированием и оптимизируйте распределение столов для максимальной эффективности."
      },
      marketingTools: {
        title: "Маркетинговые инструменты",
        description: "Создавайте целевые промо-акции на основе предпочтений и поведения клиентов."
      }
    },

    // Russian restaurant cities
    cities: [
      "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
      "Нижний Новгород", "Красноярск", "Челябинск", "Самара", "Уфа",
      "Киев", "Минск", "Алматы", "Ташкент", "Тбилиси"
    ],

    restaurantTypes: [
      "Ресторан высокой кухни", "Бистро", "Трактир", "Кафе", "Бар",
      "Пивной ресторан", "Суши-бар", "Пиццерия", "Стейк-хаус", "Гриль-бар",
      "Винный бар", "Лаундж", "Ресторан-клуб", "Таверна", "Брассери"
    ],

    // Features Section
    features: {
      title: "Гостевой опыт на базе ИИ",
      subtitle: "Наш ИИ-официант понимает и реагирует на потребности гостей с человеческим интеллектом, создавая незабываемые впечатления от ужина, которые заставляют клиентов возвращаться.",
      menuIntelligence: {
        title: "Интеллект меню",
        description: "ИИ понимает меню на глубоком уровне - ингредиенты, способы приготовления, вкусовые профили и диетические ограничения."
      },
      personalRecommendations: {
        title: "Персональные рекомендации", 
        description: "Анализирует предпочтения гостей и историю заказов для предоставления индивидуальных предложений, увеличивающих размер чека."
      },
      multilingualSupport: {
        title: "Многоязычная поддержка",
        description: "Свободно общается на более чем 30 языках, устраняя языковые барьеры и улучшая впечатления от ужина для международных гостей."
      },
      dietaryKnowledge: {
        title: "Знания о питании",
        description: "Мгновенно отвечает на вопросы об аллергиях, ингредиентах и может предложить модификации для учета диетических ограничений."
      },
      seamlessOrdering: {
        title: "Бесшовное оформление заказов",
        description: "Принимает заказы точно, отправляет их прямо на кухню и обрабатывает изменения без ошибок."
      },
      guestInsights: {
        title: "Инсайты гостей", 
        description: "Собирает предпочтения и отзывы, создавая профили клиентов, которые помогают лучше понимать ваших гостей."
      }
    },

    // Guest App Section
    guestApp: {
      badge: "СКОРО",
      title: "Гостевое приложение BalaBite",
      subtitle: "Откройте будущее ресторанного сервиса с нашим AI-компаньоном. Получайте персонализированные рекомендации меню, мгновенные ответы на вопросы и бесшовный опыт заказа.",
      features: {
        aiWaiter: "Чат с AI-официантом",
        smartRecommendations: "Умные рекомендации меню",
        instantOrdering: "Мгновенные заказы",
        dietaryFilters: "Диетические фильтры",
        realTimeUpdates: "Обновления в реальном времени",
        ingredientAnalysis: {
          title: "Мгновенный анализ ингредиентов",
          description: "Легко сканируйте любое меню ресторана для получения подробной информации об ингредиентах, предупреждениях об аллергенах и пищевых данных за секунды."
        }
      },
      form: {
        placeholder: "Введите ваш email",
        button: "Уведомить меня",
        processing: "Добавление...",
        success: "Вы добавлены в список ожидания! Мы уведомим вас о запуске гостевого приложения.",
        error: "Пожалуйста, введите действительный адрес электронной почты"
      },
      demo: {
        restaurantName: "Ресторан AI",
        restaurantInfo: "Современная кухня • 300м",
        aiAnalyzing: "AI АНАЛИЗИРУЕТ ВАШИ ПРЕДПОЧТЕНИЯ",
        personalizedHeader: "ПЕРСОНАЛИЗИРОВАНО ДЛЯ ВАС",
        dish1: "Ризотто с трюфелями и грибами",
        dish2: "Сибас в мисо-глазури",
        aiSommelier: "СПРОСИТЕ AI-СОМЕЛЬЕ",
        userQuestion: "Какое вино подойдет к сибасу?",
        aiResponse: "Рекомендую наш Сансер - его минеральность прекрасно дополняет умами мисо"
      }
    },

    // How It Works Section
    howItWorks: {
      badge: "Простая реализация",
      title: "Как ваш ресторан становится AI-powered",
      subtitle: "Наша команда экспертов обеспечивает плавную интеграцию, минимальные нарушения и максимальные результаты для вашего ресторана.",
      processTitle: "Процесс внедрения",
      step1: {
        title: "Консультация и настройка",
        description: "Мы изучаем ваше меню, бренд и операции, чтобы настроить AI под ваши конкретные потребности"
      },
      step2: {
        title: "Интеграция и обучение",
        description: "Наша команда интегрирует систему с вашим существующим POS и обучает ваш персонал"
      },
      step3: {
        title: "Запуск и мониторинг",
        description: "Мы запускаем вашего AI-официанта и внимательно отслеживаем производительность в первые недели"
      },
      step4: {
        title: "Оптимизация и масштабирование",
        description: "На основе данных мы оптимизируем производительность и помогаем масштабировать решение"
      },
      cta: "Начать трансформацию",
      restaurantFeaturesTitle: "Функции для ресторанов",
      intelligentMenuManagement: {
        title: "Интеллектуальное управление меню",
        description: "Динамические обновления меню, управление запасами и оптимизация цен в реальном времени"
      },
      aiKnowledgeTraining: {
        title: "Обучение знаний AI",
        description: "Настройте личность, знания и стиль рекомендаций вашего AI под ваш бренд"
      },
      realTimeAnalytics: {
        title: "Аналитика в реальном времени",
        description: "Подробные инсайты о производительности, предпочтениях клиентов и операционных показателях"
      },
      staffEmpowerment: {
        title: "Расширение возможностей персонала",
        description: "AI помогает вашей команде, а не заменяет её, повышая эффективность и удовлетворённость работой"
      },
      experienceAutomation: {
        title: "Автоматизация опыта",
        description: "Автоматизируйте заказы, рекомендации и взаимодействие с клиентами для стабильного сервиса"
      },
      guestInsightsDesigner: {
        title: "Дизайнер инсайтов гостей",
        description: "Создавайте детальные профили клиентов для персонализированного сервиса и маркетинга"
      }
    },

    // Insights Section
    insights: {
      badge: "ОТРАСЛЕВЫЕ ИНСАЙТЫ",
      title: "Почему AI-официанты — будущее ресторанного сервиса",
      subtitle: "Индустрия быстро развивается. Рестораны, которые внедряют AI-технологии сегодня, получают значительные конкурентные преимущества завтра.",
      whyAiWaiters: {
        title: "Революция в ресторанном сервисе",
        description: "AI-официанты обеспечивают стабильный, персонализированный сервис 24/7, устраняя человеческие ошибки и языковые барьеры, одновременно увеличивая средний чек и удовлетворённость клиентов."
      },
      stats: [
        {
          percentage: "69%",
          description: "операторов сообщают, что внедрение технологий сделало их ресторан более эффективным и продуктивным"
        },
        {
          percentage: "73%",
          description: "операторов ограниченного сервиса уже внедрили больше технологий в свои операции"
        },
        {
          percentage: "84%",
          description: "клиентов готовы взаимодействовать с AI для получения персонализированных рекомендаций меню"
        }
      ],
      limitedServiceStat: {
        title: "Лидеры отрасли уже переходят на AI",
        description: "73% операторов ограниченного сервиса внедрили технологические решения для улучшения операций и опыта клиентов"
      }
    },

    // FAQ Section
    faq: {
      title: "Часто задаваемые вопросы",
      subtitle: "Получите ответы на самые распространённые вопросы о нашей AI-платформе для ресторанов",
      questions: [
        {
          question: "Как быстро мы можем внедрить BalaBite?",
          answer: "Большинство ресторанов запускаются в течение 2-4 недель. Наша команда обеспечивает полную поддержку от консультации до запуска."
        },
        {
          question: "Заменит ли AI наш персонал?",
          answer: "Нет, наш AI дополняет ваш персонал, делая их более эффективными. Он обрабатывает рутинные задачи, позволяя вашей команде сосредоточиться на создании исключительного опыта."
        },
        {
          question: "Какие языки поддерживает AI?",
          answer: "Наш AI свободно говорит на более чем 30 языках, включая русский, английский, испанский, китайский, японский, французский и многие другие."
        },
        {
          question: "Как работает ценообразование?",
          answer: "Мы предлагаем гибкие планы ценообразования на основе размера ресторана и потребностей. Свяжитесь с нами для персонализированного предложения."
        },
        {
          question: "Что если у нас есть особые диетические требования?",
          answer: "Наш AI обучен обширным знаниям о диетах, аллергенах и ограничениях. Он может точно отвечать на вопросы и предлагать подходящие альтернативы."
        },
        {
          question: "Можем ли мы настроить личность AI?",
          answer: "Абсолютно! Мы настраиваем тон, стиль и знания AI под ваш бренд и атмосферу ресторана."
        }
      ]
    },

    // CTA Section
    cta: {
      title: "Готовы трансформировать ваш ресторан?",
      subtitle: "Присоединяйтесь к растущему сообществу ресторанов, которые используют AI для создания исключительного опыта для гостей",
      button: "Начать сегодня"
    },

    waitlist: {
      title: "Присоединиться к нашему списку ожидания",
      subtitle: "Станьте одним из первых ресторанов, которые испытают будущее ресторанного сервиса. Ранние партнеры получают приоритетный доступ и эксклюзивные преимущества.",
      form: {
        joinCommunity: "Присоединиться к сообществу",
        restaurantsTransforming: "ресторанов уже трансформируются с BalaBite",
        earlyPartnerQuote: "Ранние партнеры получают приоритетный доступ, эксклюзивные цены и прямое участие в разработке функций",
        restaurantName: "Название ресторана",
        ownerName: "Имя владельца",
        email: "Электронная почта",
        phone: "Номер телефона *",
        phonePlaceholder: "напр. +7 (000) 000-00-00",
        restaurantType: "Тип ресторана",
        selectType: "Выберите тип",
        fineDining: "Высокая кухня",
        casualDining: "Повседневная кухня",
        fastCasual: "Быстрая повседневная кухня",
        cafe: "Кафе",
        bar: "Бар",
        other: "Другое",
        location: "Местоположение",
        locationPlaceholder: "Город, Регион",
        message: "Дополнительное сообщение",
        processing: "Обработка...",
        joinButton: "Присоединиться к списку ожидания",
        privacyText: "Присоединившись, вы будете получать обновления о BalaBite AI. Мы уважаем вашу конфиденциальность.",
        validation: {
          restaurantNameRequired: "Название ресторана должно содержать не менее 2 символов",
          ownerNameRequired: "Имя владельца должно содержать не менее 2 символов",
          emailInvalid: "Пожалуйста, введите действительный адрес электронной почты",
          phoneInvalid: "Пожалуйста, введите действительный номер телефона",
          restaurantTypeRequired: "Пожалуйста, выберите тип ресторана",
          locationRequired: "Пожалуйста, введите действительное местоположение",
          formErrors: "Пожалуйста, исправьте ошибки в форме",
          success: "Спасибо за присоединение к нашему списку ожидания! Мы скоро свяжемся с вами.",
          error: "Что-то пошло не так. Попробуйте еще раз."
        }
      }
    },

    // API Messages
    api: {
      validation: {
        restaurantNameRequired: "Название ресторана обязательно",
        ownerNameRequired: "Имя владельца обязательно",
        emailInvalid: "Недопустимый адрес электронной почты",
        phoneRequired: "Требуется действительный номер телефона",
        restaurantTypeRequired: "Тип ресторана обязателен", 
        locationRequired: "Местоположение обязательно"
      },
      success: {
        waitlistJoined: "Успешно присоединились к списку ожидания",
        guestWaitlistJoined: "Успешно присоединились к списку ожидания гостевого приложения!",
        alreadyOnWaitlist: "Вы уже в нашем списке ожидания!"
      },
      errors: {
        validationFailed: "Ошибка проверки",
        serverError: "Ошибка сервера",
        failedToJoinWaitlist: "Не удалось присоединиться к списку ожидания",
        invalidEmail: "Недопустимый адрес электронной почты"
      }
    },

    // Email Templates
    email: {
      welcome: {
        subject: "ДОБРО ПОЖАЛОВАТЬ В БУДУЩЕЕ РЕСТОРАННОГО СЕРВИСА",
        greeting: "Добро пожаловать в BalaBite!",
        message: "Спасибо за присоединение к нашему списку ожидания. Мы рады преобразить ваш ресторан с помощью ИИ.",
        nextSteps: "Следующие шаги:",
        step1: "Мы свяжемся с вами в течение 48 часов",
        step2: "Запланируем персонализированную демонстрацию",
        step3: "Начнем вашу цифровую трансформацию"
      },
      admin: {
        subject: "Новая регистрация в списке ожидания: {restaurantName}",
        newSignup: "Новый ресторан присоединился к списку ожидания",
        restaurantDetails: "Детали ресторана"
      }
    },

    // Language Switcher
    languageSwitcher: {
      helpText: "Больше языков скоро"
    },

    // Dashboard Section
    dashboard: {
      menu: {
        dashboard: "Панель управления",
        menu: "Меню",
        orders: "Заказы", 
        aiSettings: "Настройки ИИ",
        analytics: "Аналитика",
        staff: "Персонал",
        settings: "Настройки"
      },
      stats: {
        activeTables: "Активные столы",
        todaysOrders: "Заказы сегодня",
        avgCheck: "Средний чек",
        aiInteractions: "Взаимодействия с ИИ"
      },
      dishes: {
        dish1: "Борщ с говядиной",
        dish2: "Бургер премиум", 
        dish3: "Паста с трюфелями",
        dish4: "Медовик"
      },
      labels: {
        popularDishes: "Популярные блюда",
        revenueTrend: "Тренд доходов"
      }
    },

    // Footer
    footer: {
      copyright: "© {year} BalaBite Technologies Inc.",
      tagline: "AI-технологии гостеприимства для будущего ресторанного сервиса — Где традиции встречаются с инновациями",
      explore: "Исследовать",
      company: "Компания", 
      connect: "Связаться",
      aboutUs: "О нас",
      careers: "Карьера",
      blog: "Блог",
      contact: "Контакты",
      email: "hello@balabite.ai",
      legal: "Политика конфиденциальности • Условия обслуживания • Соглашение об обработке данных",
      heritage: "בעל הבית × bite × byte — Объединяем традиции и технологии для исключительного гостеприимства"
    }
  },

  // UKRAINIAN - Premium Ukrainian Market
  uk: {
    loading: "Завантаження...",
    error: "Щось пішло не так. Спробуйте ще раз.",
    success: "Успішно!",
    processing: "Обробка...",
    required: "*",

    navigation: {
      features: "Можливості",
      about: "Про нас",
      howItWorks: "Як це працює",
      insights: "Аналітика галузі",
      faq: "Часті питання",
      joinWaitlist: "Приєднатися до списку очікування"
    },

    hero: {
      title: "Ваш найкращий офіціант за кожним столом",
      subtitle: "Система цифрового офіціанта на базі ШІ, що революціонізує досвід ресторанного сервісу.",
      cta: "Приєднатися до списку очікування ({count}+ ресторанів)",
      ctaSubtext: "Станьте одним з перших, хто трансформує свій ресторан за допомогою ШІ",
      aiAssistantTitle: "Ресторанний асистент на базі ШІ",
      aiAssistantDescription: "Розмовний ШІ, який розуміє ваше меню краще за найкращого офіціанта"
    },

    notifications: {
      from: "з",
      justJoined: "щойно приєднався до BalaBite"
    },

    cities: [
      "Київ", "Харків", "Одеса", "Дніпро", "Донецьк",
      "Запоріжжя", "Львів", "Кривий Ріг", "Миколаїв", "Маріуполь",
      "Луганськ", "Вінниця", "Макіївка", "Севастополь", "Сімферополь"
    ],

    restaurantTypes: [
      "Ресторан високої кухні", "Бістро", "Корчма", "Кафе", "Бар",
      "Пивний ресторан", "Суші-бар", "Піцерія", "Стейк-хаус", "Гриль-бар",
      "Винний бар", "Лаунж", "Ресторан-клуб", "Таверна", "Брасері"
    ],

    // Features Section
    features: {
      title: "Гостьовий досвід на базі ШІ",
      subtitle: "Наш ШІ-офіціант розуміє та реагує на потреби гостей з людською інтелігентністю, створюючи незабутні обідні враження, які змушують клієнтів повертатися.",
      menuIntelligence: {
        title: "Інтелект меню",
        description: "ШІ розуміє меню на глибокому рівні - інгредієнти, методи приготування, смакові профілі та дієтичні обмеження."
      },
      personalRecommendations: {
        title: "Персональні рекомендації", 
        description: "Аналізує вподобання гостей та історію замовлень для надання індивідуальних пропозицій, що збільшують розмір чеків."
      },
      multilingualSupport: {
        title: "Багатомовна підтримка",
        description: "Вільно спілкується більш ніж 30 мовами, усуваючи мовні бар'єри та покращуючи обідній досвід для міжнародних гостей."
      },
      dietaryKnowledge: {
        title: "Знання дієт",
        description: "Миттєво відповідає на питання про алергії, інгредієнти та може запропонувати модифікації для врахування дієтичних обмежень."
      },
      seamlessOrdering: {
        title: "Безшовне замовлення",
        description: "Приймає замовлення точно, відправляє їх безпосередньо на кухню та обробляє модифікації без помилок."
      },
      guestInsights: {
        title: "Інсайти гостей", 
        description: "Збирає вподобання та відгуки, створюючи профілі клієнтів, які допомагають вам краще розуміти своїх гостей."
      }
    },

    // Guest App Section
    guestApp: {
      badge: "НЕЗАБАРОМ",
      title: "Додаток для гостей BalaBite",
      subtitle: "Відкрийте майбутнє ресторанного сервісу з нашим AI-компаньйоном. Отримуйте персоналізовані рекомендації меню, миттєві відповіді на запитання та бездоганний досвід замовлення.",
      features: {
        aiWaiter: "Чат з AI-офіціантом",
        smartRecommendations: "Розумні рекомендації меню",
        instantOrdering: "Миттєві замовлення",
        dietaryFilters: "Дієтичні фільтри",
        realTimeUpdates: "Оновлення в реальному часі",
        ingredientAnalysis: {
          title: "Миттєвий аналіз інгредієнтів",
          description: "Легко скануйте будь-яке меню ресторану для отримання детальної інформації про інгредієнти, попередження про алергени та харчові дані за секунди."
        }
      },
      form: {
        placeholder: "Введіть вашу електронну пошту",
        button: "Повідомити мене",
        processing: "Додавання...",
        success: "Вас додано до списку очікування! Ми повідомимо вас про запуск додатку для гостей.",
        error: "Будь ласка, введіть дійсну адресу електронної пошти"
      },
      demo: {
        restaurantName: "Інноваційний ресторан",
        restaurantInfo: "Сучасна кухня • 300м",
        aiAnalyzing: "AI АНАЛІЗУЄ ВАШІ УПОДОБАННЯ",
        personalizedHeader: "ПЕРСОНАЛІЗОВАНО ДЛЯ ВАС",
        dish1: "Трюфельне ризото з лісовими грибами",
        dish2: "Сибас у місо-глазурі",
        aiSommelier: "ЗАПИТАЙТЕ AI-СОМ'Є",
        userQuestion: "Яке вино підійде до сибаса?",
        aiResponse: "Рекомендую наш Сансер - його мінеральність чудово доповнює умамі місо"
      }
    },

    // How It Works Section
    howItWorks: {
      badge: "Проста реалізація",
      title: "Як ваш ресторан стає AI-powered",
      subtitle: "Наша команда експертів забезпечує плавну інтеграцію, мінімальні порушення та максимальні результати для вашого ресторану.",
      processTitle: "Процес впровадження",
      step1: {
        title: "Консультація та налаштування",
        description: "Ми вивчаємо ваше меню, бренд та операції, щоб налаштувати AI під ваші конкретні потреби"
      },
      step2: {
        title: "Інтеграція та навчання",
        description: "Наша команда інтегрує систему з вашим існуючим POS та навчає ваш персонал"
      },
      step3: {
        title: "Запуск та моніторинг",
        description: "Ми запускаємо вашого AI-офіціанта та уважно відстежуємо продуктивність у перші тижні"
      },
      step4: {
        title: "Оптимізація та масштабування",
        description: "На основі даних ми оптимізуємо продуктивність та допомагаємо масштабувати рішення"
      },
      cta: "Почати трансформацію",
      restaurantFeaturesTitle: "Функції для ресторанів",
      intelligentMenuManagement: {
        title: "Інтелектуальне управління меню",
        description: "Динамічні оновлення меню, управління запасами та оптимізація цін у реальному часі"
      },
      aiKnowledgeTraining: {
        title: "Навчання знань AI",
        description: "Налаштуйте особистість, знання та стиль рекомендацій вашого AI під ваш бренд"
      },
      realTimeAnalytics: {
        title: "Аналітика в реальному часі",
        description: "Детальні інсайти про продуктивність, переваги клієнтів та операційні показники"
      },
      staffEmpowerment: {
        title: "Розширення можливостей персоналу",
        description: "AI допомагає вашій команді, а не замінює її, підвищуючи ефективність та задоволеність роботою"
      },
      experienceAutomation: {
        title: "Автоматизація досвіду",
        description: "Автоматизуйте замовлення, рекомендації та взаємодію з клієнтами для стабільного сервісу"
      },
      guestInsightsDesigner: {
        title: "Дизайнер інсайтів гостей",
        description: "Створюйте детальні профілі клієнтів для персоналізованого сервісу та маркетингу"
      }
    },

    // Insights Section
    insights: {
      badge: "ГАЛУЗЕВІ ІНСАЙТИ",
      title: "Чому AI-офіціанти — майбутнє ресторанного сервісу",
      subtitle: "Індустрія швидко розвивається. Ресторани, які впроваджують AI-технології сьогодні, отримують значні конкурентні переваги завтра.",
      whyAiWaiters: {
        title: "Революція в ресторанному сервісі",
        description: "AI-офіціанти забезпечують стабільний, персоналізований сервіс 24/7, усуваючи людські помилки та мовні бар'єри, одночасно збільшуючи середній чек та задоволеність клієнтів."
      },
      stats: [
        {
          percentage: "69%",
          description: "операторів повідомляють, що впровадження технологій зробило їх ресторан більш ефективним та продуктивним"
        },
        {
          percentage: "73%",
          description: "операторів обмеженого сервісу вже впровадили більше технологій у свої операції"
        },
        {
          percentage: "84%",
          description: "клієнтів готові взаємодіяти з AI для отримання персоналізованих рекомендацій меню"
        }
      ],
      limitedServiceStat: {
        title: "Лідери галузі вже переходять на AI",
        description: "73% операторів обмеженого сервісу впровадили технологічні рішення для покращення операцій та досвіду клієнтів"
      }
    },

    // FAQ Section
    faq: {
      title: "Часті питання",
      subtitle: "Отримайте відповіді на найпоширеніші питання про нашу AI-платформу для ресторанів",
      questions: [
        {
          question: "Як швидко ми можемо впровадити BalaBite?",
          answer: "Більшість ресторанів запускаються протягом 2-4 тижнів. Наша команда забезпечує повну підтримку від консультації до запуску."
        },
        {
          question: "Чи замінить AI наш персонал?",
          answer: "Ні, наш AI доповнює ваш персонал, роблячи їх більш ефективними. Він обробляє рутинні завдання, дозволяючи вашій команді зосередитися на створенні виняткового досвіду."
        },
        {
          question: "Які мови підтримує AI?",
          answer: "Наш AI вільно розмовляє більш ніж 30 мовами, включаючи українську, англійську, іспанську, китайську, японську, французьку та багато інших."
        },
        {
          question: "Як працює ціноутворення?",
          answer: "Ми пропонуємо гнучкі плани ціноутворення на основі розміру ресторану та потреб. Зв'яжіться з нами для персоналізованої пропозиції."
        },
        {
          question: "Що якщо у нас є особливі дієтичні вимоги?",
          answer: "Наш AI навчений обширним знанням про дієти, алергени та обмеження. Він може точно відповідати на питання та пропонувати підходящі альтернативи."
        },
        {
          question: "Чи можемо ми налаштувати особистість AI?",
          answer: "Абсолютно! Ми налаштовуємо тон, стиль та знання AI під ваш бренд та атмосферу ресторану."
        }
      ]
    },

    // CTA Section
    cta: {
      title: "Готові трансформувати ваш ресторан?",
      subtitle: "Приєднуйтесь до зростаючої спільноти ресторанів, які використовують AI для створення виняткового досвіду для гостей",
      button: "Почати сьогодні"
    },

    waitlist: {
      title: "Приєднатися до нашого списку очікування",
      subtitle: "Станьте одним з перших ресторанів, які випробують майбутнє ресторанного сервісу. Ранні партнери отримують пріоритетний доступ та ексклюзивні переваги.",
      form: {
        joinCommunity: "Приєднатися до спільноти",
        restaurantsTransforming: "ресторанів вже трансформуються з BalaBite",
        earlyPartnerQuote: "Ранні партнери отримують пріоритетний доступ, ексклюзивні ціни та пряму участь у розробці функцій",
        restaurantName: "Назва ресторану",
        ownerName: "Ім'я власника",
        email: "Електронна пошта",
        phone: "Номер телефону *",
        phonePlaceholder: "напр. +38 (000) 000-00-00",
        restaurantType: "Тип ресторану",
        selectType: "Оберіть тип",
        fineDining: "Висока кухня",
        casualDining: "Повсякденна кухня",
        fastCasual: "Швидка повсякденна кухня",
        cafe: "Кафе",
        bar: "Бар",
        other: "Інше",
        location: "Місцезнаходження",
        locationPlaceholder: "Місто, Область",
        message: "Додаткове повідомлення",
        processing: "Обробка...",
        joinButton: "Приєднатися до списку очікування",
        privacyText: "Приєднавшись, ви отримуватимете оновлення про BalaBite AI. Ми поважаємо вашу конфіденційність.",
        validation: {
          restaurantNameRequired: "Назва ресторану повинна містити не менше 2 символів",
          ownerNameRequired: "Ім'я власника повинно містити не менше 2 символів",
          emailInvalid: "Будь ласка, введіть дійсну адресу електронної пошти",
          phoneInvalid: "Будь ласка, введіть дійсний номер телефону",
          restaurantTypeRequired: "Будь ласка, оберіть тип ресторану",
          locationRequired: "Будь ласка, введіть дійсне місцезнаходження",
          formErrors: "Будь ласка, виправте помилки у формі",
          success: "Дякуємо за приєднання до нашого списку очікування! Ми незабаром зв'яжемося з вами.",
          error: "Щось пішло не так. Спробуйте ще раз."
        }
      }
    },

    // Management Section
    management: {
      title: "Повна платформа управління досвідом",
      subtitle: "Отримайте безпрецедентні інсайти та контроль над досвідом гостей вашого ресторану з нашою комплексною панеллю управління, розробленою для створення незабутніх моментів, які змушують клієнтів повертатися.",
      realTimeAnalytics: {
        title: "Аналітика в реальному часі",
        description: "Відстежуйте продажі, популярні страви, взаємодію з клієнтами та продуктивність ШІ в одному місці."
      },
      intelligentMenu: {
        title: "Інтелектуальне меню",
        description: "Оновлюйте меню з динамічними цінами, акціями та доступністю в реальному часі на всіх платформах."
      },
      staffInsights: {
        title: "Інсайти персоналу",
        description: "Відстежуйте продуктивність серверів та дивіться, як ШІ допомагає вашій команді досягати успіху."
      },
      customerProfiles: {
        title: "Профілі клієнтів",
        description: "Створюйте детальні профілі ваших постійних клієнтів для створення більш персоналізованого досвіду."
      },
      aiTraining: {
        title: "Навчання ШІ",
        description: "Налаштуйте знання, особистість та рекомендації вашого ШІ-офіціанта під унікальний стиль вашого ресторану."
      },
      inventoryTracking: {
        title: "Відстеження запасів",
        description: "Отримуйте сповіщення про товари з низькими запасами та інсайти про паттерни використання."
      },
      reservationManagement: {
        title: "Управління бронюванням",
        description: "Керуйте бронюванням та оптимізуйте розподіл столів для максимальної ефективності."
      },
      marketingTools: {
        title: "Маркетингові інструменти",
        description: "Створюйте цільові промо-акції на основі переваг та поведінки клієнтів."
      }
    },

    // API Messages
    api: {
      validation: {
        restaurantNameRequired: "Назва ресторану обов'язкова",
        ownerNameRequired: "Ім'я власника обов'язкове",
        emailInvalid: "Недійсна адреса електронної пошти",
        phoneRequired: "Потрібен дійсний номер телефону",
        restaurantTypeRequired: "Тип ресторану обов'язковий", 
        locationRequired: "Місцезнаходження обов'язкове"
      },
      success: {
        waitlistJoined: "Успішно приєдналися до списку очікування",
        guestWaitlistJoined: "Успішно приєдналися до списку очікування гостьового додатку!",
        alreadyOnWaitlist: "Ви вже в нашому списку очікування!"
      },
      errors: {
        validationFailed: "Помилка перевірки",
        serverError: "Помилка сервера",
        failedToJoinWaitlist: "Не вдалося приєднатися до списку очікування",
        invalidEmail: "Недійсна адреса електронної пошти"
      }
    },

    // Email Templates
    email: {
      welcome: {
        subject: "ЛАСКАВО ПРОСИМО В МАЙБУТНЄ РЕСТОРАННОГО СЕРВІСУ",
        greeting: "Ласкаво просимо в BalaBite!",
        message: "Дякуємо за приєднання до нашого списку очікування. Ми раді перетворити ваш ресторан за допомогою ШІ.",
        nextSteps: "Наступні кроки:",
        step1: "Ми зв'яжемося з вами протягом 48 годин",
        step2: "Заплануємо персоналізовану демонстрацію",
        step3: "Розпочнемо вашу цифрову трансформацію"
      },
      admin: {
        subject: "Нова реєстрація в списку очікування: {restaurantName}",
        newSignup: "Новий ресторан приєднався до списку очікування",
        restaurantDetails: "Деталі ресторану"
      }
    },

    // Language Switcher
    languageSwitcher: {
      helpText: "Більше мов незабаром"
    },

    // Dashboard Section
    dashboard: {
      menu: {
        dashboard: "Панель керування",
        menu: "Меню",
        orders: "Замовлення", 
        aiSettings: "Налаштування ШІ",
        analytics: "Аналітика",
        staff: "Персонал",
        settings: "Налаштування"
      },
      stats: {
        activeTables: "Активні столи",
        todaysOrders: "Замовлення сьогодні",
        avgCheck: "Середній чек",
        aiInteractions: "Взаємодії з ШІ"
      },
      dishes: {
        dish1: "Борщ з телятиною",
        dish2: "Преміум бургер", 
        dish3: "Паста з трюфелями",
        dish4: "Київський торт"
      },
      labels: {
        popularDishes: "Популярні страви",
        revenueTrend: "Тренд доходів"
      }
    },

    // Footer
    footer: {
      copyright: "© {year} BalaBite Technologies Inc.",
      tagline: "AI-технології гостинності для майбутнього ресторанного сервісу — Де традиції зустрічаються з інноваціями",
      explore: "Досліджувати",
      company: "Компанія", 
      connect: "Зв'язатися",
      aboutUs: "Про нас",
      careers: "Кар'єра",
      blog: "Блог",
      contact: "Контакти",
      email: "hello@balabite.ai",
      legal: "Політика конфіденційності • Умови обслуговування • Угода про обробку даних",
      heritage: "בעל הבית × bite × byte — Об'єднуємо традиції та технології для винятковӧ гостинності"
    }
  },

  // FRENCH - Premium Gastronomic Market
  fr: {
    loading: "Chargement...",
    error: "Quelque chose s'est mal passé. Veuillez réessayer.",
    success: "Succès !",
    processing: "Traitement...",
    required: "*",

    navigation: {
      features: "Fonctionnalités",
      about: "À propos",
      howItWorks: "Comment ça marche",
      insights: "Perspectives de l'industrie",
      faq: "FAQ",
      joinWaitlist: "Rejoindre la liste d'attente"
    },

    hero: {
      title: "Votre meilleur serveur, à chaque table",
      subtitle: "Le système de serveur numérique alimenté par l'IA qui révolutionne l'expérience de service restaurant.",
      cta: "Rejoindre la liste d'attente ({count}+ restaurants)",
      ctaSubtext: "Soyez parmi les premiers à transformer votre restaurant avec l'IA",
      aiAssistantTitle: "Assistant de Restaurant alimenté par l'IA",
      aiAssistantDescription: "IA conversationnelle qui comprend votre menu mieux que votre meilleur serveur"
    },

    notifications: {
      from: "de",
      justJoined: "vient de rejoindre BalaBite"
    },

    // French restaurant cities
    cities: [
      "Paris", "Lyon", "Marseille", "Toulouse", "Nice",
      "Nantes", "Montpellier", "Strasbourg", "Bordeaux", "Lille",
      "Montréal", "Québec", "Vancouver", "Bruxelles", "Genève"
    ],

    restaurantTypes: [
      "Restaurant gastronomique", "Bistrot", "Brasserie", "Café", "Bar à vin",
      "Restaurant", "Crêperie", "Pizzeria", "Steakhouse", "Grill",
      "Bar", "Lounge", "Restaurant-club", "Taverne", "Auberge"
    ],

    // Features Section
    features: {
      title: "Expérience Client Alimentée par l'IA",
      subtitle: "Notre serveur IA comprend et répond aux besoins des clients avec une intelligence humaine, créant des expériences culinaires mémorables qui fidélisent la clientèle.",
      menuIntelligence: {
        title: "Intelligence Culinaire",
        description: "L'IA comprend le menu en profondeur - ingrédients, méthodes de préparation, profils gustatifs et restrictions alimentaires."
      },
      personalRecommendations: {
        title: "Recommandations Personnalisées", 
        description: "Analyse les préférences des clients et l'historique des commandes pour fournir des suggestions sur mesure qui augmentent les montants d'addition."
      },
      multilingualSupport: {
        title: "Support Multilingue",
        description: "Communique couramment dans plus de 30 langues, éliminant les barrières linguistiques et améliorant l'expérience culinaire pour les clients internationaux."
      },
      dietaryKnowledge: {
        title: "Connaissance Diététique",
        description: "Répond instantanément aux questions sur les allergies, les ingrédients et peut suggérer des modifications pour accommoder les restrictions alimentaires."
      },
      seamlessOrdering: {
        title: "Commande Fluide",
        description: "Prend les commandes avec précision, les envoie directement en cuisine et gère les modifications sans erreur."
      },
      guestInsights: {
        title: "Insights Client", 
        description: "Capture les préférences et commentaires, construisant des profils clients qui vous aident à mieux comprendre vos convives."
      }
    },

    // Guest App Section
    guestApp: {
      badge: "BIENTÔT DISPONIBLE",
      title: "L'Application Invité BalaBite",
      subtitle: "Découvrez l'avenir de la gastronomie avec notre compagnon IA de restaurant. Obtenez des recommandations de menu personnalisées, des réponses instantanées à vos questions et une expérience de commande fluide.",
      features: {
        aiWaiter: "Chat Serveur IA",
        smartRecommendations: "Recommandations Menu Intelligentes",
        instantOrdering: "Commandes Instantanées",
        dietaryFilters: "Filtres Alimentaires",
        realTimeUpdates: "Mises à jour en Temps Réel",
        ingredientAnalysis: {
          title: "Analyse Instantanée des Ingrédients",
          description: "Scannez facilement n'importe quel menu de restaurant pour obtenir des informations détaillées sur les ingrédients, les avertissements d'allergènes et les données nutritionnelles en quelques secondes."
        }
      },
      form: {
        placeholder: "Entrez votre email",
        button: "Me notifier",
        processing: "Ajout en cours...",
        success: "Vous avez été ajouté à la liste d'attente ! Nous vous notifierons lors du lancement de l'application invité.",
        error: "Veuillez entrer une adresse email valide"
      },
      demo: {
        restaurantName: "Le Bistrot IA",
        restaurantInfo: "Cuisine Moderne • 500m",
        aiAnalyzing: "L'IA ANALYSE VOS PRÉFÉRENCES",
        personalizedHeader: "PERSONNALISÉ POUR VOUS",
        dish1: "Risotto aux Truffes et Champignons",
        dish2: "Bar Glacé au Miso",
        aiSommelier: "DEMANDEZ AU SOMMELIER IA",
        userQuestion: "Quel vin accompagne le bar ?",
        aiResponse: "Je recommande notre Sancerre - sa minéralité complète parfaitement l'umami du miso"
      }
    },

    // How It Works Section
    howItWorks: {
      badge: "Implémentation Simple",
      title: "Comment Ça Marche",
      subtitle: "Commencer avec BalaBite est rapide et facile. Notre équipe gère tout, de l'installation à la formation, garantissant une transition en douceur.",
      processTitle: "Le Processus d'Implémentation en 4 Étapes",
      step1: {
        title: "Numérisation et Amélioration du Menu",
        description: "Nous convertissons votre menu en un format intelligent avec des prix dynamiques que notre IA peut comprendre, incluant ingrédients, méthodes de préparation et informations nutritionnelles."
      },
      step2: {
        title: "Intégration d'Expérience", 
        description: "BalaBite s'intègre à vos systèmes existants tout en ajoutant des couches de personnalisation qui transforment chaque expérience culinaire."
      },
      step3: {
        title: "Autonomisation du Personnel",
        description: "Nous fournissons une formation complète à votre équipe, montrant comment l'IA améliore leurs capacités et aide à créer des moments mémorables pour les invités."
      },
      step4: {
        title: "Lancement Exceptionnel et Support",
        description: "Notre équipe crée une expérience de lancement magique pour s'assurer que tout dépasse les attentes, avec un support 24/7 continu par la suite."
      },
      cta: "Commencer Aujourd'hui",
      restaurantFeaturesTitle: "Fonctionnalités d'Expérience Restaurant",
      restaurantFeatures: {
        intelligentMenuManagement: {
          title: "Gestion Intelligente du Menu",
          description: "Mettez facilement à jour les éléments du menu avec des prix dynamiques, promotions et disponibilité en temps réel sur toutes les plateformes."
        },
        aiKnowledgeTraining: {
          title: "Formation des Connaissances IA",
          description: "Personnalisez la personnalité, les connaissances et les recommandations de votre serveur IA pour correspondre au style unique de votre restaurant."
        },
        realTimeAnalytics: {
          title: "Analytiques en Temps Réel",
          description: "Suivez les interactions clients, plats populaires, commentaires et impact sur les ventes avec des tableaux de bord complets."
        },
        staffEmpowerment: {
          title: "Autonomisation du Personnel",
          description: "Optimisez la planification, la formation et l'attribution des tâches avec des outils de gestion de main-d'œuvre alimentés par l'IA."
        },
        experienceAutomation: {
          title: "Automatisation d'Expérience",
          description: "Créez des promotions personnalisées et programmes de fidélité basés sur les préférences clients et l'historique culinaire."
        },
        guestInsightsDesigner: {
          title: "Concepteur d'Insights Invités",
          description: "Comprenez mieux les clients et créez des expériences inoubliables avec des profils détaillés à travers les visites."
        }
      }
    },

    // Insights Section
    insights: {
      badge: "INSIGHTS INDUSTRIE",
      title: "L'Avenir de la Technologie Restauration",
      subtitle: "L'industrie de la restauration évolue rapidement. Restez en avance sur la courbe avec ces insights clés des dernières recherches de marché.",
      stats: {
        aiAdoption: {
          title: "Adoption IA en Accélération",
          stat: "67%",
          description: "des opérateurs de restaurant ont incorporé plus de technologie dans leurs opérations au cours des 2-3 dernières années, avec 69% rapportant une efficacité et productivité accrues.",
          source: "Rapport Association Nationale des Restaurants 2025"
        },
        laborChallenges: {
          title: "Défis de Main-d'œuvre Persistent",
          stat: "98%", 
          description: "des opérateurs de restaurant ont dit que les coûts de main-d'œuvre étaient un défi significatif pour leur restaurant, créant un besoin urgent de solutions technologiques.",
          source: "Rapport Association Nationale des Restaurants 2025"
        },
        experienceOverPrice: {
          title: "Expérience Plus que Prix",
          stat: "64%",
          description: "des clients de restaurant disent que l'expérience culinaire est plus importante que le prix du repas. Les clients priorisent la propreté et un personnel aimable et accueillant.",
          source: "Rapport Association Nationale des Restaurants 2025"
        },
        multiChannelEngagement: {
          title: "Engagement Multi-Canal", 
          stat: "51%",
          description: "des consommateurs disent que commander pour emporter ou livraison est essentiel à leur style de vie, nécessitant des expériences numériques fluides.",
          source: "Rapport Association Nationale des Restaurants 2025"
        },
        techProductivity: {
          title: "Productivité Technologique",
          stat: "69%",
          description: "des opérateurs qui ont incorporé plus de technologie ont rapporté que cela a rendu leur restaurant plus efficace et productif, conduisant à l'excellence opérationnelle.",
          source: "Rapport Association Nationale des Restaurants 2025"
        },
        industryGrowth: {
          title: "Trajectoire de Croissance Industrie",
          stat: "1,5T$",
          description: "ventes projetées de l'industrie restauration en 2025, avec l'adoption technologique jouant un rôle crucial dans la capture de parts de marché.",
          source: "Rapport Association Nationale des Restaurants 2025"
        }
      },
      whyAiWaiters: {
        title: "Pourquoi les Serveurs IA sont l'Avenir",
        description: "Avec 98% des opérateurs de restaurant faisant face à des défis significatifs de coûts de main-d'œuvre et 67% incorporant déjà plus de technologie dans leurs opérations, les solutions de service alimentées par l'IA sont devenues essentielles pour les restaurants cherchant à prospérer en 2025 et au-delà.",
        conclusion: "La technologie de serveur IA de BalaBite aide les restaurants à surmonter ces défis en optimisant les coûts de main-d'œuvre, améliorant les expériences clients et fournissant des insights précieux basés sur les données pour la croissance des affaires.",
        limitedServiceStat: "73%",
        limitedServiceDescription: "des opérateurs de service limité ont déjà incorporé plus de technologie dans leurs opérations",
        limitedServiceSource: "Source: Rapport Association Nationale des Restaurants 2025"
      }
    },

    // FAQ Section
    faq: {
      title: "Questions Fréquemment Posées",
      subtitle: "Tout ce que vous devez savoir sur BalaBite",
      questions: [
        {
          question: "Combien coûte BalaBite?",
          answer: "BalaBite fonctionne sur un modèle d'abonnement commençant à moins que le coût d'un serveur à temps plein, avec des prix échelonnés basés sur la taille et les besoins du restaurant. Contactez-nous pour un devis personnalisé."
        },
        {
          question: "Combien de temps prend l'implémentation?",
          answer: "La plupart des restaurants sont opérationnels en 2-3 semaines. Notre équipe gère la numérisation du menu, la formation du personnel et l'intégration système pour assurer une transition fluide."
        },
        {
          question: "BalaBite peut-il s'intégrer à notre système POS existant?",
          answer: "Oui! BalaBite s'intègre parfaitement avec tous les systèmes POS majeurs incluant Toast, Square, Clover et beaucoup d'autres via nos connecteurs API universels."
        },
        {
          question: "De quel matériel avons-nous besoin?",
          answer: "BalaBite est un système basé sur le web qui fonctionne sur tout appareil avec un navigateur web moderne. Pour une utilisation optimale en restaurant, nous recommandons des tablettes pour chaque table ou section, et un ordinateur pour le système d'affichage cuisine. Aucun matériel spécialisé n'est requis."
        },
        {
          question: "Comment gérez-vous les mises à jour de menu?",
          answer: "Les changements de menu sont faciles! Soit mettez à jour via notre tableau de bord intuitif ou connectez votre système POS pour des mises à jour automatiques. Articles saisonniers, spéciaux et changements de prix sont reflétés instantanément."
        },
        {
          question: "Quel type de support offrez-vous?",
          answer: "Nous fournissons un support technique 24/7, des mises à jour logicielles régulières et un gestionnaire de compte dédié pour chaque partenaire restaurant. Notre équipe de succès client s'assure que vous tirez le maximum du système BalaBite."
        }
      ]
    },

    // CTA Section
    cta: {
      title: "Prêt à Transformer Votre Restaurant?",
      subtitle: "Rejoignez la liste d'attente aujourd'hui et soyez parmi les {count}+ restaurants révolutionnant déjà leur service avec BalaBite.",
      button: "Rejoindre la Communauté BalaBite",
      subtext: "Les partenaires précoces reçoivent un accès prioritaire et des avantages exclusifs"
    },

    waitlist: {
      title: "Rejoignez notre liste d'attente",
      subtitle: "Soyez parmi les premiers restaurants à découvrir l'avenir du service de restauration. Les partenaires précoces bénéficient d'un accès prioritaire et d'avantages exclusifs.",
      form: {
        joinCommunity: "Rejoindre notre communauté",
        restaurantsTransforming: "restaurants se transforment déjà avec BalaBite",
        earlyPartnerQuote: "Les partenaires précoces bénéficient d'un accès prioritaire, de prix exclusifs et d'une participation directe au développement des fonctionnalités",
        restaurantName: "Nom du restaurant",
        ownerName: "Nom du propriétaire",
        email: "E-mail",
        phone: "Numéro de téléphone *",
        phonePlaceholder: "ex. 01 23 45 67 89",
        restaurantType: "Type de restaurant",
        selectType: "Sélectionner le type",
        fineDining: "Haute gastronomie",
        casualDining: "Restaurant décontracté",
        fastCasual: "Restauration rapide décontractée",
        cafe: "Café",
        bar: "Bar",
        other: "Autre",
        location: "Emplacement",
        locationPlaceholder: "Ville, Région",
        message: "Message supplémentaire",
        processing: "Traitement...",
        joinButton: "Rejoindre la liste d'attente",
        privacyText: "En vous inscrivant, vous recevrez des mises à jour sur BalaBite AI. Nous respectons votre vie privée.",
        validation: {
          restaurantNameRequired: "Le nom du restaurant doit contenir au moins 2 caractères",
          ownerNameRequired: "Le nom du propriétaire doit contenir au moins 2 caractères",
          emailInvalid: "Veuillez entrer une adresse e-mail valide",
          phoneInvalid: "Veuillez entrer un numéro de téléphone valide",
          restaurantTypeRequired: "Veuillez sélectionner un type de restaurant",
          locationRequired: "Veuillez entrer un emplacement valide",
          formErrors: "Veuillez corriger les erreurs dans le formulaire",
          success: "Merci de rejoindre notre liste d'attente ! Nous vous contacterons bientôt.",
          error: "Quelque chose s'est mal passé. Veuillez réessayer."
        }
      }
    },

    // Management Section
    management: {
      title: "Plateforme Complète de Gestion d'Expérience",
      subtitle: "Obtenez des insights et un contrôle sans précédent sur l'expérience client de votre restaurant avec notre tableau de bord de gestion complet conçu pour créer des moments mémorables qui fidélisent la clientèle.",
      realTimeAnalytics: {
        title: "Analyses en Temps Réel",
        description: "Suivez les ventes, les articles populaires, l'engagement client et les performances IA en un seul endroit."
      },
      intelligentMenu: {
        title: "Menu Intelligent",
        description: "Mettez à jour votre menu avec des prix dynamiques, des promotions et la disponibilité en temps réel sur toutes les plateformes."
      },
      staffInsights: {
        title: "Insights du Personnel",
        description: "Surveillez les performances des serveurs et voyez comment l'IA aide votre équipe à exceller."
      },
      customerProfiles: {
        title: "Profils Clients",
        description: "Construisez des profils détaillés de vos habitués pour créer des expériences plus personnalisées."
      },
      aiTraining: {
        title: "Formation IA",
        description: "Personnalisez les connaissances, la personnalité et les recommandations de votre serveur IA selon le style unique de votre restaurant."
      },
      inventoryTracking: {
        title: "Suivi des Stocks",
        description: "Recevez des alertes sur les articles en rupture de stock et des insights sur les modèles d'utilisation."
      },
      reservationManagement: {
        title: "Gestion des Réservations",
        description: "Gérez les réservations et optimisez l'allocation des tables pour une efficacité maximale."
      },
      marketingTools: {
        title: "Outils Marketing",
        description: "Créez des promotions ciblées basées sur les préférences et comportements des clients."
      }
    },

    // Footer
    footer: {
      copyright: "© {year} BalaBite Technologies Inc.",
      tagline: "Hospitalité alimentée par l'IA pour l'avenir de la restauration — Où tradition rencontre innovation",
      explore: "Explorer",
      company: "Entreprise", 
      connect: "Se Connecter",
      aboutUs: "À Propos",
      careers: "Carrières",
      blog: "Blog",
      contact: "Contact",
      email: "hello@balabite.ai",
      legal: "Politique de Confidentialité • Conditions de Service • Accord de Traitement des Données",
      heritage: "בעל הבית × bite × byte — Réunir tradition et technologie pour une hospitalité exceptionnelle"
    },

    // API Messages
    api: {
      validation: {
        restaurantNameRequired: "Le nom du restaurant est requis",
        ownerNameRequired: "Le nom du propriétaire est requis",
        emailInvalid: "Adresse e-mail invalide",
        phoneRequired: "Numéro de téléphone valide requis",
        restaurantTypeRequired: "Le type de restaurant est requis", 
        locationRequired: "L'emplacement est requis"
      },
      success: {
        waitlistJoined: "Rejoint avec succès la liste d'attente",
        guestWaitlistJoined: "Rejoint avec succès la liste d'attente de l'app invité!",
        alreadyOnWaitlist: "Vous êtes déjà sur notre liste d'attente!"
      },
      errors: {
        validationFailed: "Échec de la validation",
        serverError: "Erreur serveur",
        failedToJoinWaitlist: "Échec de rejoindre la liste d'attente",
        invalidEmail: "Adresse e-mail invalide"
      }
    },

    // Email Templates
    email: {
      welcome: {
        subject: "BIENVENUE DANS L'AVENIR DE LA RESTAURATION",
        greeting: "Bienvenue chez BalaBite!",
        message: "Merci de rejoindre notre liste d'attente. Nous sommes ravis de transformer votre restaurant avec l'IA.",
        nextSteps: "Prochaines étapes:",
        step1: "Nous vous contacterons dans les 48 heures",
        step2: "Planifier une démonstration personnalisée",
        step3: "Commencer votre transformation numérique"
      },
      admin: {
        subject: "Nouvelle Inscription Liste d'Attente: {restaurantName}",
        newSignup: "Un nouveau restaurant a rejoint la liste d'attente",
        restaurantDetails: "Détails du Restaurant"
      }
    },

    // Language Switcher
    languageSwitcher: {
      helpText: "Plus de langues bientôt"
    },

    // Dashboard Section
    dashboard: {
      menu: {
        dashboard: "Tableau de Bord",
        menu: "Menu",
        orders: "Commandes", 
        aiSettings: "Paramètres IA",
        analytics: "Analyses",
        staff: "Personnel",
        settings: "Paramètres"
      },
      stats: {
        activeTables: "Tables Actives",
        todaysOrders: "Commandes du Jour",
        avgCheck: "Addition Moyenne",
        aiInteractions: "Interactions IA"
      },
      dishes: {
        dish1: "Bouillabaisse",
        dish2: "Burger de Bœuf", 
        dish3: "Pâtes aux Truffes",
        dish4: "Tarte Tatin"
      },
      labels: {
        popularDishes: "Plats Populaires",
        revenueTrend: "Tendance des Revenus"
      }
    }
  },

  // KOREAN - Premium Tech-Forward Market
  ko: {
    loading: "로딩 중...",
    error: "문제가 발생했습니다. 다시 시도해 주세요.",
    success: "성공!",
    processing: "처리 중...",
    required: "*",

    navigation: {
      features: "기능",
      about: "소개",
      howItWorks: "작동 방식",
      insights: "업계 통찰",
      faq: "자주 묻는 질문",
      joinWaitlist: "대기자 명단 참여"
    },

    hero: {
      title: "모든 테이블에서 최고의 웨이터",
      subtitle: "레스토랑 서비스 경험을 혁신하는 AI 기반 디지털 웨이터 시스템.",
      cta: "대기자 명단 참여 ({count}+ 레스토랑)",
      ctaSubtext: "AI로 레스토랑을 변화시키는 첫 번째가 되세요",
      aiAssistantTitle: "AI 기반 레스토랑 어시스턴트",
      aiAssistantDescription: "최고의 서버보다 메뉴를 더 잘 이해하는 대화형 AI"
    },

    notifications: {
      from: "의",
      justJoined: "님이 BalaBite에 참여했습니다"
    },

    // Korean restaurant cities
    cities: [
      "서울", "부산", "대구", "인천", "광주",
      "대전", "울산", "수원", "고양", "용인",
      "성남", "청주", "전주", "안산", "천안"
    ],

    restaurantTypes: [
      "파인다이닝", "한식당", "일식당", "중식당", "양식당",
      "카페", "바", "치킨집", "피자집", "분식집",
      "고기집", "회집", "호프집", "이자카야", "브런치카페"
    ],

    // Features Section
    features: {
      title: "AI 기반 고객 경험",
      subtitle: "저희 AI 웨이터는 인간과 같은 지능으로 고객의 요구를 이해하고 응답하여, 고객이 다시 찾고 싶은 기억에 남는 식사 경험을 만들어냅니다.",
      menuIntelligence: {
        title: "메뉴 인텔리전스",
        description: "AI가 메뉴를 깊이 이해합니다 - 재료, 조리법, 맛 프로필, 식이 제한까지."
      },
      personalRecommendations: {
        title: "개인 맞춤 추천", 
        description: "고객 선호도와 주문 이력을 분석하여 계산서 금액을 늘리는 맞춤형 제안을 제공합니다."
      },
      multilingualSupport: {
        title: "다국어 지원",
        description: "30개 이상의 언어로 유창하게 소통하여 언어 장벽을 제거하고 외국 고객의 식사 경험을 향상시킵니다."
      },
      dietaryKnowledge: {
        title: "식이 지식",
        description: "알레르기, 재료에 대한 질문에 즉시 답변하고 식이 제한을 수용하기 위한 변경사항을 제안할 수 있습니다."
      },
      seamlessOrdering: {
        title: "원활한 주문",
        description: "정확하게 주문을 받고 주방으로 직접 전송하며, 변경사항을 오류 없이 처리합니다."
      },
      guestInsights: {
        title: "고객 인사이트", 
        description: "선호도와 피드백을 수집하여 고객을 더 잘 이해할 수 있는 고객 프로필을 구축합니다."
      }
    },

    // Guest App Section
    guestApp: {
      badge: "곧 출시",
      title: "BalaBite 고객 앱",
      subtitle: "AI 기반 레스토랑 컴패니언으로 미래의 다이닝을 발견하세요. 개인화된 메뉴 추천, 질문에 대한 즉시 답변, 원활한 주문 경험을 받아보세요.",
      features: {
        aiWaiter: "AI 웨이터 채팅",
        smartRecommendations: "스마트 메뉴 추천",
        instantOrdering: "즉시 주문",
        dietaryFilters: "식단 필터",
        realTimeUpdates: "실시간 업데이트",
        ingredientAnalysis: {
          title: "즉시 성분 분석",
          description: "레스토랑 메뉴를 쉽게 스캔하여 몇 초 안에 재료, 알레르기 경고, 영양 데이터에 대한 자세한 정보를 얻을 수 있습니다."
        }
      },
      form: {
        placeholder: "이메일을 입력하세요",
        button: "알림 받기",
        processing: "추가 중...",
        success: "대기자 명단에 추가되었습니다! 고객 앱 출시 시 알려드리겠습니다.",
        error: "유효한 이메일 주소를 입력해 주세요"
      },
      demo: {
        restaurantName: "모던 레스토랑",
        restaurantInfo: "현대 한식 • 300m",
        aiAnalyzing: "AI가 취향을 분석 중",
        personalizedHeader: "맞춤형 추천",
        dish1: "트러플 버섯 리조또",
        dish2: "미소 글레이즈 농어",
        aiSommelier: "AI 소믈리에에게 문의",
        userQuestion: "농어에 어울리는 와인은?",
        aiResponse: "상세르를 추천합니다 - 미네랄 감이 미소의 감칠맛과 완벽하게 어우러집니다"
      }
    },

    // How It Works Section
    howItWorks: {
      badge: "간단한 구현",
      title: "작동 방식",
      subtitle: "BalaBite 시작하기는 빠르고 쉽습니다. 저희 팀이 설정부터 교육까지 모든 것을 처리하여 원활한 전환을 보장합니다.",
      processTitle: "4단계 구현 프로세스",
      step1: {
        title: "메뉴 디지털화 및 개선",
        description: "저희 AI가 이해할 수 있는 동적 가격 책정을 포함한 지능형 형식으로 메뉴를 변환하며, 재료, 조리 방법, 영양 정보를 포함합니다."
      },
      step2: {
        title: "경험 통합", 
        description: "BalaBite는 기존 시스템과 통합하면서 모든 식사 경험을 변화시키는 개인화 레이어를 추가합니다."
      },
      step3: {
        title: "직원 역량 강화",
        description: "팀에 포괄적인 교육을 제공하여 AI가 역량을 향상시키고 기억에 남는 고객 순간을 만드는 방법을 보여줍니다."
      },
      step4: {
        title: "특별한 런칭 및 지원",
        description: "저희 팀이 모든 것이 기대를 뛰어넘도록 마법 같은 런칭 경험을 만들고, 그 후 24/7 지속적인 지원을 제공합니다."
      },
      cta: "오늘 시작하기",
      restaurantFeaturesTitle: "레스토랑 경험 기능",
      restaurantFeatures: {
        intelligentMenuManagement: {
          title: "지능형 메뉴 관리",
          description: "모든 플랫폼에서 동적 가격 책정, 프로모션, 가용성으로 메뉴 항목을 실시간으로 쉽게 업데이트할 수 있습니다."
        },
        aiKnowledgeTraining: {
          title: "AI 지식 교육",
          description: "레스토랑의 고유한 스타일에 맞게 AI 웨이터의 성격, 지식, 추천사항을 맞춤 설정할 수 있습니다."
        },
        realTimeAnalytics: {
          title: "실시간 분석",
          description: "포괄적인 대시보드로 고객 상호작용, 인기 요리, 피드백, 매출 영향을 추적할 수 있습니다."
        },
        staffEmpowerment: {
          title: "직원 역량 강화",
          description: "AI 기반 인력 관리 도구로 일정 관리, 교육, 업무 할당을 최적화할 수 있습니다."
        },
        experienceAutomation: {
          title: "경험 자동화",
          description: "고객 선호도와 식사 이력을 기반으로 개인화된 프로모션과 로열티 프로그램을 만들 수 있습니다."
        },
        guestInsightsDesigner: {
          title: "고객 인사이트 디자이너",
          description: "방문 전반에 걸친 상세한 프로필로 고객을 더 잘 이해하고 잊을 수 없는 경험을 만들 수 있습니다."
        }
      }
    },

    // Insights Section
    insights: {
      badge: "업계 인사이트",
      title: "레스토랑 기술의 미래",
      subtitle: "레스토랑 업계는 빠르게 발전하고 있습니다. 최신 시장 조사의 핵심 인사이트로 앞서 나가세요.",
      stats: {
        aiAdoption: {
          title: "AI 도입 가속화",
          stat: "67%",
          description: "의 레스토랑 운영자들이 지난 2-3년 동안 운영에 더 많은 기술을 도입했으며, 69%가 효율성과 생산성 향상을 보고했습니다.",
          source: "전국 레스토랑 협회 2025 보고서"
        },
        laborChallenges: {
          title: "인력 문제 지속",
          stat: "98%", 
          description: "의 레스토랑 운영자들이 인건비가 레스토랑에 중대한 도전이라고 말하며, 기술 솔루션에 대한 긴급한 필요를 만들고 있습니다.",
          source: "전국 레스토랑 협회 2025 보고서"
        },
        experienceOverPrice: {
          title: "가격보다 경험",
          stat: "64%",
          description: "의 레스토랑 고객들이 식사 경험이 음식 가격보다 더 중요하다고 말합니다. 고객들은 청결함과 친절하고 환영하는 직원을 우선시합니다.",
          source: "전국 레스토랑 협회 2025 보고서"
        },
        multiChannelEngagement: {
          title: "다채널 참여", 
          stat: "51%",
          description: "의 소비자들이 테이크아웃이나 배달 주문이 그들의 라이프스타일에 필수적이라고 말하며, 원활한 디지털 경험을 요구합니다.",
          source: "전국 레스토랑 협회 2025 보고서"
        },
        techProductivity: {
          title: "기술 생산성",
          stat: "69%",
          description: "의 더 많은 기술을 도입한 운영자들이 이것이 레스토랑을 더 효율적이고 생산적으로 만들었다고 보고하여 운영 우수성을 이끌고 있습니다.",
          source: "전국 레스토랑 협회 2025 보고서"
        },
        industryGrowth: {
          title: "업계 성장 궤도",
          stat: "$1.5조",
          description: "2025년 예상 레스토랑 업계 매출로, 기술 도입이 시장 점유율 확보에 중요한 역할을 하고 있습니다.",
          source: "전국 레스토랑 협회 2025 보고서"
        }
      },
      whyAiWaiters: {
        title: "AI 웨이터가 미래인 이유",
        description: "98%의 레스토랑 운영자들이 중대한 인건비 문제에 직면하고 67%가 이미 운영에 더 많은 기술을 도입하고 있는 상황에서, AI 기반 서비스 솔루션은 2025년과 그 이후에 번영하려는 레스토랑에게 필수가 되었습니다.",
        conclusion: "BalaBite의 AI 웨이터 기술은 인건비를 최적화하고, 고객 경험을 향상시키며, 비즈니스 성장을 위한 귀중한 데이터 기반 인사이트를 제공함으로써 레스토랑이 이러한 도전을 극복하도록 돕습니다.",
        limitedServiceStat: "73%",
        limitedServiceDescription: "의 제한 서비스 운영자들이 이미 운영에 더 많은 기술을 도입했습니다",
        limitedServiceSource: "출처: 전국 레스토랑 협회 2025 보고서"
      }
    },

    // FAQ Section
    faq: {
      title: "자주 묻는 질문",
      subtitle: "BalaBite에 대해 알아야 할 모든 것",
      questions: [
        {
          question: "BalaBite 비용은 얼마인가요?",
          answer: "BalaBite는 풀타임 웨이터 한 명의 비용보다 저렴한 구독 모델로 운영되며, 레스토랑 규모와 필요에 따른 단계별 가격 책정을 제공합니다. 맞춤 견적을 위해 연락주세요."
        },
        {
          question: "구현에 얼마나 걸리나요?",
          answer: "대부분의 레스토랑은 2-3주 내에 운영됩니다. 저희 팀이 메뉴 디지털화, 직원 교육, 시스템 통합을 처리하여 원활한 전환을 보장합니다."
        },
        {
          question: "BalaBite는 기존 POS 시스템과 통합할 수 있나요?",
          answer: "네! BalaBite는 범용 API 커넥터를 통해 Toast, Square, Clover 등 모든 주요 POS 시스템과 완벽하게 통합됩니다."
        },
        {
          question: "어떤 하드웨어가 필요한가요?",
          answer: "BalaBite는 최신 웹 브라우저가 있는 모든 기기에서 실행되는 웹 기반 시스템입니다. 최적의 레스토랑 사용을 위해 각 테이블이나 섹션용 태블릿과 주방 디스플레이 시스템용 컴퓨터를 권장합니다. 특수 하드웨어는 필요하지 않습니다."
        },
        {
          question: "메뉴 업데이트는 어떻게 처리하나요?",
          answer: "메뉴 변경은 쉽습니다! 직관적인 대시보드를 통해 업데이트하거나 POS 시스템을 연결하여 자동 업데이트할 수 있습니다. 계절 메뉴, 특별 메뉴, 가격 변경이 즉시 반영됩니다."
        },
        {
          question: "어떤 지원을 제공하나요?",
          answer: "24/7 기술 지원, 정기적인 소프트웨어 업데이트, 모든 레스토랑 파트너를 위한 전담 계정 매니저를 제공합니다. 고객 성공 팀이 BalaBite 시스템을 최대한 활용할 수 있도록 도와드립니다."
        }
      ]
    },

    // CTA Section
    cta: {
      title: "레스토랑을 변화시킬 준비가 되셨나요?",
      subtitle: "오늘 대기자 명단에 참여하고 이미 BalaBite로 서비스를 혁신하고 있는 {count}+ 레스토랑의 일원이 되세요.",
      button: "BalaBite 커뮤니티 참여",
      subtext: "초기 파트너는 우선 액세스와 독점 혜택을 받습니다"
    },

    waitlist: {
      title: "대기자 명단에 참여하세요",
      subtitle: "미래의 다이닝 서비스를 경험하는 첫 번째 레스토랑이 되세요. 초기 파트너는 우선 접근권과 독점 혜택을 받습니다.",
      form: {
        joinCommunity: "커뮤니티 참여",
        restaurantsTransforming: "개 레스토랑이 이미 BalaBite로 변화하고 있습니다",
        earlyPartnerQuote: "초기 파트너는 우선 접근권, 독점 가격, 기능 개발에 직접 참여할 수 있습니다",
        restaurantName: "레스토랑 이름",
        ownerName: "사장님 성함",
        email: "이메일",
        phone: "전화번호 *",
        phonePlaceholder: "예: 010-0000-0000",
        restaurantType: "레스토랑 유형",
        selectType: "유형 선택",
        fineDining: "파인다이닝",
        casualDining: "캐주얼다이닝",
        fastCasual: "패스트캐주얼",
        cafe: "카페",
        bar: "바",
        other: "기타",
        location: "위치",
        locationPlaceholder: "시, 구",
        message: "추가 메시지",
        processing: "처리 중...",
        joinButton: "대기자 명단 참여",
        privacyText: "참여하시면 BalaBite AI에 대한 업데이트를 받으실 수 있습니다. 개인정보를 존중합니다.",
        validation: {
          restaurantNameRequired: "레스토랑 이름은 최소 2자 이상이어야 합니다",
          ownerNameRequired: "사장님 성함은 최소 2자 이상이어야 합니다",
          emailInvalid: "유효한 이메일 주소를 입력해 주세요",
          phoneInvalid: "유효한 전화번호를 입력해 주세요",
          restaurantTypeRequired: "레스토랑 유형을 선택해 주세요",
          locationRequired: "유효한 위치를 입력해 주세요",
          formErrors: "양식의 오류를 수정해 주세요",
          success: "대기자 명단에 참여해 주셔서 감사합니다! 곧 연락드리겠습니다.",
          error: "문제가 발생했습니다. 다시 시도해 주세요."
        }
      }
    },

    // Management Section
    management: {
      title: "완전한 경험 관리 플랫폼",
      subtitle: "고객이 재방문하게 만드는 기억에 남는 순간을 창조하도록 설계된 포괄적인 관리 대시보드로 레스토랑의 고객 경험에 대한 전례 없는 인사이트와 제어력을 확보하세요.",
      realTimeAnalytics: {
        title: "실시간 분석",
        description: "매출, 인기 메뉴, 고객 참여도, AI 성능을 한 곳에서 추적하세요."
      },
      intelligentMenu: {
        title: "지능형 메뉴",
        description: "모든 플랫폼에서 동적 가격, 프로모션, 재고 상황을 실시간으로 업데이트하세요."
      },
      staffInsights: {
        title: "직원 인사이트",
        description: "서버 성과를 모니터링하고 AI가 팀의 우수성을 어떻게 돕는지 확인하세요."
      },
      customerProfiles: {
        title: "고객 프로필",
        description: "단골 고객의 상세한 프로필을 구축하여 더욱 개인화된 경험을 창조하세요."
      },
      aiTraining: {
        title: "AI 훈련",
        description: "레스토랑의 고유한 스타일에 맞게 AI 웨이터의 지식, 성격, 추천을 맞춤화하세요."
      },
      inventoryTracking: {
        title: "재고 추적",
        description: "재고 부족 품목에 대한 알림과 사용 패턴 인사이트를 받으세요."
      },
      reservationManagement: {
        title: "예약 관리",
        description: "예약을 관리하고 최대 효율성을 위한 테이블 배정을 최적화하세요."
      },
      marketingTools: {
        title: "마케팅 도구",
        description: "고객 선호도와 행동을 기반으로 타겟 프로모션을 생성하세요."
      }
    },

    // Footer
    footer: {
      copyright: "© {year} BalaBite Technologies Inc.",
      tagline: "미래 다이닝을 위한 AI 기반 호스피탈리티 — 전통과 혁신이 만나는 곳",
      explore: "탐색",
      company: "회사", 
      connect: "연결",
      aboutUs: "회사 소개",
      careers: "채용",
      blog: "블로그",
      contact: "연락처",
      email: "hello@balabite.ai",
      legal: "개인정보 보호정책 • 서비스 약관 • 데이터 처리 계약",
      heritage: "בעל הבית × bite × byte — 전통과 기술을 결합하여 탁월한 호스피탈리티 구현"
    },

    // API Messages
    api: {
      validation: {
        restaurantNameRequired: "레스토랑 이름이 필요합니다",
        ownerNameRequired: "소유자 이름이 필요합니다",
        emailInvalid: "유효하지 않은 이메일 주소입니다",
        phoneRequired: "유효한 전화번호가 필요합니다",
        restaurantTypeRequired: "레스토랑 유형이 필요합니다", 
        locationRequired: "위치가 필요합니다"
      },
      success: {
        waitlistJoined: "대기자 명단에 성공적으로 참여했습니다",
        guestWaitlistJoined: "게스트 앱 대기자 명단에 성공적으로 참여했습니다!",
        alreadyOnWaitlist: "이미 저희 대기자 명단에 있습니다!"
      },
      errors: {
        validationFailed: "검증 실패",
        serverError: "서버 오류",
        failedToJoinWaitlist: "대기자 명단 참여 실패",
        invalidEmail: "유효하지 않은 이메일 주소"
      }
    },

    // Email Templates
    email: {
      welcome: {
        subject: "다이닝의 미래에 오신 것을 환영합니다",
        greeting: "BalaBite에 오신 것을 환영합니다!",
        message: "대기자 명단에 참여해 주셔서 감사합니다. AI로 레스토랑을 변화시키게 되어 기쁩니다.",
        nextSteps: "다음 단계:",
        step1: "48시간 내에 연락드리겠습니다",
        step2: "맞춤형 데모 일정 잡기",
        step3: "디지털 변환 시작"
      },
      admin: {
        subject: "새 대기자 명단 가입: {restaurantName}",
        newSignup: "새 레스토랑이 대기자 명단에 참여했습니다",
        restaurantDetails: "레스토랑 세부사항"
      }
    },

    // Language Switcher
    languageSwitcher: {
      helpText: "더 많은 언어가 곧 제공됩니다"
    },

    // Dashboard Section
    dashboard: {
      menu: {
        dashboard: "대시보드",
        menu: "메뉴",
        orders: "주문", 
        aiSettings: "AI 설정",
        analytics: "분석",
        staff: "직원",
        settings: "설정"
      },
      stats: {
        activeTables: "활성 테이블",
        todaysOrders: "오늘의 주문",
        avgCheck: "평균 계산서",
        aiInteractions: "AI 상호작용"
      },
      dishes: {
        dish1: "김치찌개",
        dish2: "불고기 버거", 
        dish3: "트러플 파스타",
        dish4: "티라미수"
      },
      labels: {
        popularDishes: "인기 요리",
        revenueTrend: "수익 동향"
      }
    }
  }
};

// Simple load function - merges base translations with landing page v2
export async function loadTranslations(locale: Locale): Promise<Translations> {
  const base = premiumTranslations[locale] || premiumTranslations.en;
  const landing = landingV2Translations[locale] || landingV2Translations.en;
  return { ...base, ...landing };
}

export function getTranslation(
  translations: Translations,
  key: string,
  params?: Record<string, any>
): any {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation missing: ${key} for key: ${k}`);
      return key; // Return key if not found - never show raw keys to users
    }
  }

  // Handle string interpolation for strings
  if (typeof value === 'string' && params) {
    return value.replace(/{(\w+)}/g, (match, p1) => 
      params[p1] !== undefined ? params[p1] : match
    );
  }
  
  // Return arrays and objects as-is for complex data structures
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
    return value;
  }
  
  // For strings, return as-is
  if (typeof value === 'string') {
    return value;
  }
  
  // Fallback
  console.warn(`Translation key ${key} returned unexpected type:`, typeof value, value);
  return key;
}

export default premiumTranslations;
