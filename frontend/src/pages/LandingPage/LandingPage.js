import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, ChevronDown, Play, Zap, Shield, 
  BarChart, Brain, Image, Video, Mic, FileText, Globe,
  Database, Users, Lock, CheckCircle, Star, Activity,
  Layers, Cpu, Cloud, GitBranch, Terminal, Code,
  TrendingUp, Award, Clock, HeadphonesIcon
} from 'lucide-react';

// #==============================================================================================#
// #                                     MAIN LANDING PAGE COMPONENT                              #
// #==============================================================================================#
// This is the main landing page component that orchestrates all sections
// Future modifications: Add new sections by importing and including them in the render method

const LandingPage = () => {
  // #------------------------------ State Management ------------------------------#
  // Navigation and UI state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  
  // #------------------------------ Scroll Effect Hook ------------------------------#
  // Handles navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // #==============================================================================================#
  // #                                     SERVICES CONFIGURATION                                   #
  // #==============================================================================================#
  // Add new services here as your platform expands
  // Each service maps to a microservice in your architecture
  
  const services = [
    // #------------------------------ Current Services (Already Implemented) ------------------------------#
    {
      id: 'auth',
      icon: <Lock className="w-8 h-8" />,
      title: "Authentication Service",
      description: "Secure user authentication and authorization with JWT tokens",
      features: ["OAuth 2.0 Support", "Role-based Access", "Session Management"],
      endpoint: "/api/auth",
      port: 8001,
      status: "active"
    },
    {
      id: 'data-ingestion',
      icon: <Database className="w-8 h-8" />,
      title: "Data Ingestion",
      description: "High-performance data pipeline for structured and unstructured data",
      features: ["Batch Processing", "Stream Ingestion", "Format Conversion"],
      endpoint: "/api/data",
      port: 8002,
      status: "active"
    },
    {
      id: 'annotation',
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Annotation",
      description: "AI-powered annotation tools for training data preparation",
      features: ["Auto-labeling", "Collaborative Annotation", "Quality Checks"],
      endpoint: "/api/annotations",
      port: 8003,
      status: "active"
    },
    {
      id: 'quality-control',
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Control",
      description: "Multi-layer validation ensuring highest data integrity",
      features: ["Automated Validation", "Consensus Algorithms", "Error Detection"],
      endpoint: "/api/qc",
      port: 8004,
      status: "active"
    },
    {
      id: 'ml-training',
      icon: <Brain className="w-8 h-8" />,
      title: "ML Training Pipeline",
      description: "Scalable machine learning model training infrastructure",
      features: ["Distributed Training", "AutoML", "Model Versioning"],
      endpoint: "/api/ml",
      port: 8005,
      status: "active"
    },
    
    // #------------------------------ Future Services (Planned) ------------------------------#
    // These will be activated as you develop them
    {
      id: 'image-analysis',
      icon: <Image className="w-8 h-8" />,
      title: "Image Analysis",
      description: "Advanced computer vision for image understanding",
      features: ["Object Detection", "Segmentation", "Face Recognition"],
      endpoint: "/api/image",
      port: 8006,
      status: "coming-soon"
    },
    {
      id: 'video-analytics',
      icon: <Video className="w-8 h-8" />,
      title: "Video Analytics",
      description: "Real-time video processing and analysis",
      features: ["Motion Detection", "Activity Recognition", "Stream Processing"],
      endpoint: "/api/video",
      port: 8007,
      status: "coming-soon"
    },
    {
      id: 'audio-processing',
      icon: <Mic className="w-8 h-8" />,
      title: "Audio Processing",
      description: "Speech recognition and audio analysis",
      features: ["Transcription", "Emotion Detection", "Speaker Diarization"],
      endpoint: "/api/audio",
      port: 8008,
      status: "coming-soon"
    }
  ];

  // #==============================================================================================#
  // #                                     NAVIGATION COMPONENT                                     #
  // #==============================================================================================#
  // Responsive navigation with authentication links
  
  const Navigation = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* #------------------------------ Logo Section ------------------------------# */}
          <div className="flex items-center">
            <Layers className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Spartex AI
            </h1>
          </div>
          
          {/* #------------------------------ Desktop Navigation Menu ------------------------------# */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
            <a href="#architecture" className="text-gray-300 hover:text-white transition-colors">Architecture</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
            
            {/* #------------------------------ Authentication Buttons ------------------------------# */}
            {/* TODO: Connect these to auth service endpoints */}
            <button className="text-gray-300 hover:text-white transition-colors">
              Login
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-lg transition-all transform hover:scale-105">
              Sign Up
            </button>
          </div>

          {/* #------------------------------ Mobile Menu Toggle ------------------------------# */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* #------------------------------ Mobile Navigation Menu ------------------------------# */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800">
          <div className="px-4 py-6 space-y-4">
            <a href="#services" className="block text-gray-300 hover:text-white">Services</a>
            <a href="#architecture" className="block text-gray-300 hover:text-white">Architecture</a>
            <a href="#features" className="block text-gray-300 hover:text-white">Features</a>
            <a href="#pricing" className="block text-gray-300 hover:text-white">Pricing</a>
            <a href="#docs" className="block text-gray-300 hover:text-white">Docs</a>
            <hr className="border-gray-800" />
            <button className="block w-full text-left text-gray-300 hover:text-white">Login</button>
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // #==============================================================================================#
  // #                                     HERO SECTION COMPONENT                                   #
  // #==============================================================================================#
  // Main hero section with animated background and CTAs
  
  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* #------------------------------ Animated Background Elements ------------------------------# */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* #------------------------------ Hero Content ------------------------------# */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="mb-6 inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
          <Zap className="w-4 h-4 text-blue-400 mr-2" />
          <span className="text-sm text-blue-400">AI-Powered Data Intelligence Platform</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Transform Unstructured Data
          </span>
          <br />
          <span className="text-white">Into Actionable Insights</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
          Scale your AI operations with our comprehensive microservices platform. 
          From data ingestion to model deployment, we've got you covered.
        </p>
        
        {/* #------------------------------ CTA Buttons ------------------------------# */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center">
            Get Started Free
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border border-gray-700 hover:border-gray-500 bg-gray-900/50 backdrop-blur px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center group">
            <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
            Watch Demo
          </button>
        </div>

        {/* #------------------------------ Platform Stats ------------------------------# */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10M+</div>
            <div className="text-gray-500">Data Points/Day</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">99.9%</div>
            <div className="text-gray-500">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500ms</div>
            <div className="text-gray-500">Avg. Latency</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-gray-500">Support</div>
          </div>
        </div>
      </div>
    </section>
  );

  // #==============================================================================================#
  // #                                     SERVICES SECTION COMPONENT                               #
  // #==============================================================================================#
  // Displays all available and coming soon services
  
  const ServicesSection = () => (
    <section id="services" className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* #------------------------------ Section Header ------------------------------# */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Microservices Architecture
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Each service is independently scalable and deployable, ensuring maximum flexibility
          </p>
        </div>

        {/* #------------------------------ Services Grid ------------------------------# */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group relative bg-gray-800/50 backdrop-blur border border-gray-700 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300 ${
                service.status === 'coming-soon' ? 'opacity-75' : ''
              }`}
            >
              {/* #------------------------------ Coming Soon Badge ------------------------------# */}
              {service.status === 'coming-soon' && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full">
                  <span className="text-xs text-yellow-400">Coming Soon</span>
                </div>
              )}
              
              {/* #------------------------------ Service Icon ------------------------------# */}
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              
              {/* #------------------------------ Service Details ------------------------------# */}
              <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-4 text-sm">{service.description}</p>
              
              {/* #------------------------------ Service Features ------------------------------# */}
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* #------------------------------ Service Metadata ------------------------------# */}
              <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700 pt-4">
                <span>Port: {service.port}</span>
                <span>{service.endpoint}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // #==============================================================================================#
  // #                                  ARCHITECTURE SECTION COMPONENT                              #
  // #==============================================================================================#
  // Visual representation of the platform architecture
  
  const ArchitectureSection = () => (
    <section id="architecture" className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Platform Architecture
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built for scale with microservices, containerization, and cloud-native principles
          </p>
        </div>

        {/* #------------------------------ Architecture Diagram ------------------------------# */}
        <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* #------------------------------ Frontend Layer ------------------------------# */}
            <div className="text-center">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-4">
                <Globe className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white">Frontend Layer</h3>
                <p className="text-sm text-gray-400 mt-2">React SPA • Port 3000</p>
              </div>
              <ChevronDown className="w-6 h-6 text-gray-600 mx-auto" />
            </div>

            {/* #------------------------------ API Gateway Layer ------------------------------# */}
            <div className="text-center">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-4">
                <GitBranch className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white">API Gateway</h3>
                <p className="text-sm text-gray-400 mt-2">FastAPI • Port 8000</p>
              </div>
              <ChevronDown className="w-6 h-6 text-gray-600 mx-auto" />
            </div>

            {/* #------------------------------ Infrastructure Layer ------------------------------# */}
            <div className="text-center">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-4">
                <Cloud className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white">Infrastructure</h3>
                <p className="text-sm text-gray-400 mt-2">K8s • Docker • Terraform</p>
              </div>
              <ChevronDown className="w-6 h-6 text-gray-600 mx-auto" />
            </div>
          </div>

          {/* #------------------------------ Microservices Grid ------------------------------# */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            {services.slice(0, 5).map((service) => (
              <div key={service.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-gray-400 mb-2">{service.icon}</div>
                <p className="text-xs text-gray-300">{service.title}</p>
                <p className="text-xs text-gray-500 mt-1">:{service.port}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // #==============================================================================================#
  // #                                    FEATURES SECTION COMPONENT                                #
  // #==============================================================================================#
  // Platform features and capabilities
  
  const FeaturesSection = () => {
    const features = [
      {
        icon: <Cpu className="w-12 h-12" />,
        title: "GPU Acceleration",
        description: "Leverage NVIDIA GPUs for faster processing of image and video data"
      },
      {
        icon: <Activity className="w-12 h-12" />,
        title: "Real-time Processing",
        description: "Stream processing with Kafka for real-time data analytics"
      },
      {
        icon: <Shield className="w-12 h-12" />,
        title: "Enterprise Security",
        description: "End-to-end encryption, RBAC, and compliance certifications"
      },
      {
        icon: <TrendingUp className="w-12 h-12" />,
        title: "Auto-scaling",
        description: "Kubernetes-based auto-scaling for handling peak loads"
      },
      {
        icon: <Terminal className="w-12 h-12" />,
        title: "API-First Design",
        description: "RESTful APIs with OpenAPI documentation for all services"
      },
      {
        icon: <Award className="w-12 h-12" />,
        title: "99.9% Uptime SLA",
        description: "High availability with multi-region deployment options"
      }
    ];

    return (
      <section id="features" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Enterprise-Ready Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built for scale, security, and reliability from day one
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                  <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // #==============================================================================================#
  // #                                      PRICING SECTION COMPONENT                               #
  // #==============================================================================================#
  // Pricing tiers - can be connected to billing service later
  
  const PricingSection = () => {
    const plans = [
      {
        name: "Starter",
        price: "$0",
        period: "forever",
        description: "Perfect for trying out Spartex AI",
        features: [
          "Up to 1,000 API calls/month",
          "Basic authentication",
          "Community support",
          "Limited to 1 user",
          "Basic analytics"
        ],
        cta: "Start Free",
        popular: false
      },
      {
        name: "Professional",
        price: "$299",
        period: "per month",
        description: "For growing teams and businesses",
        features: [
          "Unlimited API calls",
          "All microservices access",
          "Priority support",
          "Up to 10 team members",
          "Advanced analytics",
          "Custom integrations",
          "99.9% uptime SLA"
        ],
        cta: "Start Trial",
        popular: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "contact sales",
        description: "For large-scale deployments",
        features: [
          "Everything in Professional",
          "On-premise deployment",
          "24/7 dedicated support",
          "Unlimited team members",
          "Custom ML models",
          "Compliance certifications",
          "Custom SLA"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ];

    return (
      <section id="pricing" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the plan that fits your needs. Scale up anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-gray-900/50 backdrop-blur border ${
                plan.popular ? 'border-blue-500' : 'border-gray-700'
              } rounded-2xl p-8 hover:transform hover:scale-105 transition-all`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 rounded-full">
                      <span className="text-sm font-semibold">Most Popular</span>
                    </div>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // #==============================================================================================#
  // #                                    FOOTER COMPONENT                                          #
  // #==============================================================================================#
  // Footer with links and company information
  
  const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* #------------------------------ Company Info ------------------------------# */}
          <div>
            <div className="flex items-center mb-4">
              <Layers className="w-8 h-8 text-blue-500 mr-2" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Spartex AI
              </h3>
            </div>
            <p className="text-gray-400">
              Leading the future of AI-powered data intelligence
            </p>
          </div>
          
          {/* #------------------------------ Product Links ------------------------------# */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/docs" className="hover:text-white transition-colors">API Docs</a></li>
              <li><a href="/status" className="hover:text-white transition-colors">System Status</a></li>
            </ul>
          </div>
          
          {/* #------------------------------ Developer Links ------------------------------# */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Developers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/docs/api" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="/docs/sdk" className="hover:text-white transition-colors">SDKs</a></li>
              <li><a href="https://github.com/spartex-ai" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="/docs/examples" className="hover:text-white transition-colors">Examples</a></li>
              <li><a href="/changelog" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          {/* #------------------------------ Company Links ------------------------------# */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* #------------------------------ Copyright Section ------------------------------# */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Spartex AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://twitter.com/spartexai" className="text-gray-400 hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="https://github.com/spartexai" className="text-gray-400 hover:text-white">
              <span className="sr-only">GitHub</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://linkedin.com/company/spartexai" className="text-gray-400 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );

  // #==============================================================================================#
  // #                                       MAIN RENDER METHOD                                     #
  // #==============================================================================================#
  // Compose all sections together
  // To add new sections: 1) Create component above 2) Add here in order
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* #------------------------------ Navigation Bar ------------------------------# */}
      <Navigation />
      
      {/* #------------------------------ Hero Section ------------------------------# */}
      <HeroSection />
      
      {/* #------------------------------ Services Grid ------------------------------# */}
      <ServicesSection />
      
      {/* #------------------------------ Architecture Diagram ------------------------------# */}
      <ArchitectureSection />
      
      {/* #------------------------------ Features List ------------------------------# */}
      <FeaturesSection />
      
      {/* #------------------------------ Pricing Plans ------------------------------# */}
      <PricingSection />
      
      {/* #------------------------------ Footer ------------------------------# */}
      <Footer />
      
      {/* #==============================================================================================# */}
      {/* #                                    FLOATING ELEMENTS                                         # */}
      {/* #==============================================================================================# */}
      
      {/* #------------------------------ Live Chat Widget (Future Integration) ------------------------------# */}
      {/* TODO: Connect to support service when implemented */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
          <HeadphonesIcon className="w-6 h-6" />
        </button>
      </div>
      
      {/* #------------------------------ System Status Indicator ------------------------------# */}
      {/* TODO: Connect to monitoring service for real-time status */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="flex items-center space-x-2 bg-gray-900/90 backdrop-blur px-4 py-2 rounded-full border border-gray-800">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">All Systems Operational</span>
        </div>
      </div>
    </div>
  );
};

// #==============================================================================================#
// #                                   EXPORT COMPONENT                                           #
// #==============================================================================================#
export default LandingPage;