import { Locale } from './config';

// Translation type
export type Translations = Record<string, any>;

// Inline translations - much simpler!
// Premium Hospitality Translation System
// Each language includes cultural adaptation and industry-specific terminology
const translations: Record<Locale, Translations> = {
  en: {
    navigation: {
      features: "Features",
      about: "About",
      howItWorks: "How It Works",
      insights: "Insights",
      faq: "FAQ",
      joinWaitlist: "Join Waitlist"
    },
    hero: {
      title: "Your Best Waiter, At Every Table",
      subtitle: "The AI-powered digital waiter system revolutionizing restaurant service experience.",
      cta: "Join Waitlist ({count}+ restaurants)",
      ctaSubtext: "Be among the first to transform your restaurant with AI",
      aiAssistantTitle: "AI-Powered Restaurant Assistant",
      aiAssistantDescription: "Conversational AI that understands your menu better than your best server"
    },
    notifications: {
      from: "from",
      justJoined: "just joined BalaBite"
    },
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
      restaurantFeaturesTitle: "Restaurant Experience Features"
    },
    guestApp: {
      badge: "COMING SOON",
      title: "The BalaBite Guest App",
      subtitle: "Discover the future of dining with our AI-powered restaurant companion. Get personalized menu recommendations, instant answers to your questions, and a seamless ordering experience.",
      features: {
        aiWaiter: "AI Waiter Chat",
        smartRecommendations: "Smart Menu Recommendations", 
        instantOrdering: "Instant Ordering",
        dietaryFilters: "Dietary Filters",
        realTimeUpdates: "Real-time Updates"
      },
      form: {
        placeholder: "Enter your email",
        button: "Notify Me",
        processing: "Adding...",
        success: "You've been added to the waitlist! We'll notify you when the guest app launches.",
        error: "Please enter a valid email address"
      }
    },
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
        conclusion: "BalaBite's AI waiter technology helps restaurants overcome these challenges by optimizing labor costs, enhancing customer experiences, and providing valuable data-driven insights for business growth."
      }
    },
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
    cta: {
      title: "Ready to Transform Your Restaurant?",
      subtitle: "Join the waitlist today and be among the {count}+ restaurants already revolutionizing their service with BalaBite.",
      button: "Join the BalaBite Community",
      subtext: "Early partners receive priority access and exclusive benefits"
    },
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
        phone: "Phone Number",
        phonePlaceholder: "(555) 123-4567",
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
        message: "Additional Message",
        processing: "Processing...",
        joinButton: "Join the Waitlist",
        privacyText: "By joining, you'll receive updates about BalaBite AI. We respect your privacy.",
        required: "*",
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
    }
  },
  es: {
    navigation: {
      features: "Características",
      about: "Acerca de",
      howItWorks: "Cómo Funciona",
      insights: "Información",
      faq: "Preguntas Frecuentes",
      joinWaitlist: "Unirse a la Lista de Espera"
    },
    hero: {
      title: "Tu Mejor Mesero, En Cada Mesa",
      subtitle: "El sistema de mesero digital con IA que revoluciona la experiencia de servicio en restaurantes.",
      cta: "Unirse a la Lista de Espera ({count}+ restaurantes)",
      ctaSubtext: "Sé de los primeros en transformar tu restaurante con IA",
      aiAssistantTitle: "Asistente de Restaurante con IA",
      aiAssistantDescription: "IA conversacional que entiende tu menú mejor que tu mejor mesero"
    },
    notifications: {
      from: "de",
      justJoined: "acaba de unirse a BalaBite"
    },
    features: {
      title: "Experiencia del Huésped con IA",
      subtitle: "Nuestro mesero con IA entiende y responde a las necesidades de los huéspedes con inteligencia similar a la humana, creando experiencias gastronómicas memorables que hacen que los clientes regresen.",
      menuIntelligence: {
        title: "Inteligencia del Menú",
        description: "La IA entiende el menú a un nivel profundo: ingredientes, métodos de preparación, perfiles de sabor y restricciones dietéticas."
      },
      personalRecommendations: {
        title: "Recomendaciones Personales",
        description: "Analiza las preferencias de los huéspedes y el historial de pedidos para proporcionar sugerencias personalizadas que aumentan el monto de la cuenta."
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
      restaurantFeaturesTitle: "Características de Experiencia del Restaurante"
    },
    guestApp: {
      badge: "PRÓXIMAMENTE",
      title: "La Aplicación de Huéspedes BalaBite",
      subtitle: "Descubre el futuro de la gastronomía con nuestro compañero de restaurante con IA. Obtén recomendaciones de menú personalizadas, respuestas instantáneas a tus preguntas y una experiencia de pedidos sin problemas.",
      features: {
        aiWaiter: "Chat de Mesero con IA",
        smartRecommendations: "Recomendaciones Inteligentes del Menú",
        instantOrdering: "Pedidos Instantáneos",
        dietaryFilters: "Filtros Dietéticos",
        realTimeUpdates: "Actualizaciones en Tiempo Real"
      },
      form: {
        placeholder: "Ingresa tu email",
        button: "Notifícame",
        processing: "Añadiendo...",
        success: "¡Has sido añadido a la lista de espera! Te notificaremos cuando se lance la aplicación de huéspedes.",
        error: "Por favor ingresa una dirección de email válida"
      }
    },
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
        conclusion: "La tecnología de mesero con IA de BalaBite ayuda a los restaurantes a superar estos desafíos optimizando costos laborales, mejorando experiencias de clientes y proporcionando perspectivas valiosas basadas en datos para el crecimiento del negocio."
      }
    },
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
        email: "Email",
        phone: "Número de Teléfono",
        phonePlaceholder: "(555) 123-4567",
        restaurantType: "Tipo de Restaurante",
        selectType: "Selecciona tipo",
        fineDining: "Restaurante Fino",
        casualDining: "Restaurante Casual",
        fastCasual: "Comida Rápida Casual",
        cafe: "Café",
        bar: "Bar",
        other: "Otro",
        location: "Ubicación",
        locationPlaceholder: "Ciudad, Estado",
        message: "Mensaje Adicional",
        processing: "Procesando...",
        joinButton: "Únete a la Lista de Espera",
        privacyText: "Al unirte, recibirás actualizaciones sobre BalaBite AI. Respetamos tu privacidad.",
        required: "*",
        validation: {
          restaurantNameRequired: "El nombre del restaurante debe tener al menos 2 caracteres",
          ownerNameRequired: "El nombre del propietario debe tener al menos 2 caracteres",
          emailInvalid: "Por favor ingresa una dirección de email válida",
          phoneInvalid: "Por favor ingresa un número de teléfono válido",
          restaurantTypeRequired: "Por favor selecciona un tipo de restaurante",
          locationRequired: "Por favor ingresa una ubicación válida",
          formErrors: "Por favor corrige los errores en el formulario",
          success: "¡Gracias por unirte a nuestra lista de espera! Nos pondremos en contacto pronto.",
          error: "Algo salió mal. Por favor intenta de nuevo."
        }
      }
    },
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
    }
  },
  zh: {
    navigation: {
      features: "功能特色",
      about: "关于我们",
      howItWorks: "工作原理",
      insights: "行业洞察",
      faq: "常见问题",
      joinWaitlist: "加入等候名单"
    },
    hero: {
      title: "您最好的服务员，在每一桌",
      subtitle: "AI驱动的数字服务员系统，革新餐厅服务体验。",
      cta: "加入等候名单 ({count}+ 家餐厅)",
      ctaSubtext: "成为首批用AI转型餐厅的先行者"
    },
    waitlist: {
      title: "加入我们的等候名单",
      subtitle: "成为首批体验未来餐饮服务的餐厅。"
    }
  },
  ja: {
    navigation: {
      features: "機能",
      about: "について",
      howItWorks: "仕組み",
      insights: "洞察",
      faq: "よくある質問",
      joinWaitlist: "ウェイトリストに参加"
    },
    hero: {
      title: "すべてのテーブルで最高のウェイター",
      subtitle: "レストランサービス体験を革新するAI搭載デジタルウェイターシステム。",
      cta: "ウェイトリストに参加 ({count}+ レストラン)",
      ctaSubtext: "AIでレストランを変革する最初の一歩を踏み出しましょう"
    },
    waitlist: {
      title: "ウェイトリストに参加",
      subtitle: "未来のダイニングサービスを体験する最初のレストランになりましょう。"
    }
  },
  ru: {
    navigation: {
      features: "Возможности",
      about: "О нас",
      howItWorks: "Как это работает",
      insights: "Аналитика",
      faq: "Часто задаваемые вопросы",
      joinWaitlist: "Присоединиться к списку ожидания"
    },
    hero: {
      title: "Ваш лучший официант за каждым столом",
      subtitle: "Система цифрового официанта на базе ИИ, революционизирующая опыт ресторанного сервиса.",
      cta: "Присоединиться к списку ожидания ({count}+ ресторанов)",
      ctaSubtext: "Станьте одним из первых, кто трансформирует свой ресторан с помощью ИИ"
    },
    waitlist: {
      title: "Присоединиться к нашему списку ожидания",
      subtitle: "Станьте одним из первых ресторанов, которые испытают будущее ресторанного сервиса."
    }
  },
  uk: {
    navigation: {
      features: "Можливості",
      about: "Про нас",
      howItWorks: "Як це працює",
      insights: "Аналітика",
      faq: "Часті питання",
      joinWaitlist: "Приєднатися до списку очікування"
    },
    hero: {
      title: "Ваш найкращий офіціант за кожним столом",
      subtitle: "Система цифрового офіціанта на базі ШІ, що революціонізує досвід ресторанного сервісу.",
      cta: "Приєднатися до списку очікування ({count}+ ресторанів)",
      ctaSubtext: "Станьте одним з перших, хто трансформує свій ресторан за допомогою ШІ"
    },
    waitlist: {
      title: "Приєднатися до нашого списку очікування",
      subtitle: "Станьте одним з перших ресторанів, які випробують майбутнє ресторанного сервісу."
    }
  },
  fr: {
    navigation: {
      features: "Fonctionnalités",
      about: "À propos",
      howItWorks: "Comment ça marche",
      insights: "Analyses",
      faq: "FAQ",
      joinWaitlist: "Rejoindre la liste d'attente"
    },
    hero: {
      title: "Votre meilleur serveur, à chaque table",
      subtitle: "Le système de serveur numérique alimenté par l'IA qui révolutionne l'expérience de service restaurant.",
      cta: "Rejoindre la liste d'attente ({count}+ restaurants)",
      ctaSubtext: "Soyez parmi les premiers à transformer votre restaurant avec l'IA"
    },
    waitlist: {
      title: "Rejoignez notre liste d'attente",
      subtitle: "Soyez parmi les premiers restaurants à découvrir l'avenir du service de restauration."
    }
  },
  ko: {
    navigation: {
      features: "기능",
      about: "소개",
      howItWorks: "작동 방식",
      insights: "인사이트",
      faq: "자주 묻는 질문",
      joinWaitlist: "대기자 명단 참여"
    },
    hero: {
      title: "모든 테이블에서 최고의 웨이터",
      subtitle: "레스토랑 서비스 경험을 혁신하는 AI 기반 디지털 웨이터 시스템.",
      cta: "대기자 명단 참여 ({count}+ 레스토랑)",
      ctaSubtext: "AI로 레스토랑을 변화시키는 첫 번째가 되세요"
    },
    waitlist: {
      title: "대기자 명단에 참여하세요",
      subtitle: "미래의 다이닝 서비스를 경험하는 첫 번째 레스토랑이 되세요."
    }
  },
};

// Simple load function - no dynamic imports needed
export async function loadTranslations(locale: Locale): Promise<Translations> {
  return translations[locale] || translations.en;
}

// Get translation function
export function getTranslation(
  translations: Translations,
  key: string,
  params?: Record<string, any>
): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Replace parameters
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? String(params[paramKey]) : match;
    });
  }
  
  return value;
}
