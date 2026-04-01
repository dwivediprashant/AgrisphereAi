import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation dictionaries
const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        marketplace: "Marketplace",
        communityForum: "Community Forum",
        advisoryHub: "Advisory Hub",
        voiceAssistant: "Voice Assistant",
        fertilizerAi: "Fertilizer AI",
        pestForecast: "Pest Forecast",
        adminDashboard: "Authority Dashboard",
        buyerDashboard: "Buyer Dashboard",
        farmerDashboard: "Farmer Dashboard",
        diseaseDetection: "Disease Detection",
        yieldPrediction: "Yield Prediction",
        digitalTwin: "Digital Twin",
        login: "Login",
        getStarted: "Get Started",
        logout: "Logout",
        saveProfile: "Save Profile",
        aiTools: "Smart Farming Tools"
      },
      home: {
        heroTitle1: "India's First",
        heroTitle2: "AI + GIS Smart Farming",
        heroSubtitle: "Intelligence Platform",
        heroDescription: "pests, nutrient deficiency, and fungal infections. Increase yields by 30%, reduce costs by 40%.",
        exploreFeatures: "Watch Demo",
        floatingAlert: "Check Weather Risks",
        featuresTitle: "Intelligent Features for",
        featuresSubtitle: "Modern Farming",
        featuresDesc: "Cutting-edge technology designed to revolutionize every aspect of your agricultural operations",
        aboutTitle: "AgriSphere AI is India's first comprehensive AI + GIS Smart Farming Intelligence Platform. We combine multi-class disease detection, digital twin technology, yield prediction, and end-to-end agricultural advisory to transform farming from seed to market.",
        aboutDesc: "Our platform supports offline mode for villages, Hindi voice commands, government scheme recommendations, farmer-buyer marketplace, and blockchain traceability. From small family farms to large commercial operations, we provide rural-accessible technology that increases yields by 30% while reducing costs by 40%.",
        howItWorks: "How It Works",
        howItWorksSubtitle: "Get started in minutes with our simple 4-step process",
        ctaTitle: "Ready to Transform Your",
        ctaSubtitle: "Agricultural Business?",
        ctaDesc: "Join thousands of farmers who are already using AgriSphere AI to increase yields and reduce costs",
        ctaFreeTrial: "Start Your Free Trial",
        ctaDemo: "Schedule a Demo",
        features: {
          f1: { title: "AI Disease Detection", desc: "Advanced ML models analyze images to detect diseases & pests with 95% accuracy" },
          f2: { title: "GIS Digital Twin", desc: "Complete farm replica with mapping & growth tracking" },
          f3: { title: "Yield Prediction", desc: "ML-powered yields forecasting using weather & soil data" },
          f4: { title: "Weather Risk Engine", desc: "Real-time alerts for floods, drought, and heatwaves" },
          f5: { title: "Fertilizer & Irrigation AI", desc: "Smart NPK & water scheduling for optimal nutrition" }
        },
        stats: {
          activeFarmers: "Active Farmers",
          accuracyRate: "Accuracy Rate",
          fieldsMapped: "Fields Mapped",
          yieldIncrease: "Yield Increase"
        },
        advanced: {
          title: "Advanced AI Intelligence",
          desc: "Cutting-edge features that set AgriSphere AI apart",
          pests: { title: "Pest Attack Prediction", desc: "AI forecasts pest attack probability (0-100%) for next 7 days" },
          seedToMarket: { title: "Seed-to-Market Advisory", desc: "Complete guidance from seed selection to market pricing" },
          voice: { title: "Voice Assistant (Hindi)", desc: "Farmers speak in local language, AI responds with advice" },
          schemes: { title: "Government Schemes AI", desc: "Auto-identifies subsidies, loans, and PM-KISAN benefits" },
          marketplace: { title: "Farmer-Buyer Marketplace", desc: "Direct selling platform with AI pricing and logistics" },
          blockchain: { title: "Blockchain Traceability", desc: "Track crop origin and supply chain for quality assurance" }
        },
        rural: {
          title: "Built for Rural India",
          subtitle: "Accessible technology designed for village farmers",
          offline: { title: "Offline Mode", desc: "Works without internet with local caching" },
          languages: { title: "Hindi + Local Languages", desc: "Full support for regional languages and voice" },
          sms: { title: "SMS Fallback Alerts", desc: "Critical alerts sent via SMS when offline" },
          community: { title: "Community Forums", desc: "Farmers discuss pests and schemes" }
        },
        women: {
          title: "Rural Women Agri-Entrepreneur",
          subtitle: "Empowering women-led microbusinesses in agriculture",
          microbusiness: { title: "Microbusiness Support", desc: "Training for honey, spices, and handicraft businesses" },
          training: { title: "Training Modules", desc: "Comprehensive training for women entrepreneurs" },
          marketAccess: { title: "Marketplace Access", desc: "Direct listings for women-led products" }
        },
        testimonials: {
          title: "What Farmers Say",
          subtitle: "Real stories from farmers transforming their operations",
          t1: { name: "Rajesh Kumar", loc: "Punjab, India", text: "AgriSphere's multi-class AI detected stem borer in my wheat early. The pest prediction saved my entire 10-acre crop and increased yield by 35%!", benefit: "35% yield increase" },
          t2: { name: "Anita Sharma", loc: "Maharashtra, India", text: "The GIS digital twin mapped my field perfectly. AI-powered management cut water usage by 45%. Marketplace got me ₹2000/quintal extra!", benefit: "45% water savings" },
          t3: { name: "Vikram Patel", loc: "Gujarat, India", text: "Voice assistant in Hindi is amazing! 'Tamatar mein rog hai' - instantly got disease type, treatment cost. Offline mode works perfectly in my village.", benefit: "Hindi voice support" }
        },
        tech: {
          title: "Built on Cutting-Edge Technology",
          subtitle: "Enterprise-grade tech stack powering your farm"
        }
      },
      disease: {
        title: "AI Multi-Class Disease Detection",
        desc: "Revolutionary multi-class AI system detecting diseases, pests, nutrient deficiencies, and soil texture from leaf, stem, fruit, and soil images with 95%+ accuracy using ensemble CNN models.",
        startBtn: "Start Detection",
        uploadBtn: "Upload Images",
        saveBtn: "Saved Reports",
        hideBtn: "Hide Saved",
        reportsTitle: "Offline Disease Reports",
        noReports: "No saved reports found.",
        capTitle: "Multi-Class Detection Capabilities",
        pestTitle: "Pest Detection & Treatment",
        aiTitle: "Enhanced Multi-Class AI Detection",
        howTitle: "How AI Detection Works",
        backHome: "Back to Home",
        accuracy: "Accuracy",
        types: {
          leaf: { title: "Leaf Disease Detection", desc: "Analyze leaf images for fungal infections, bacterial diseases, and viral infections", d1: "Blight", d2: "Rust", d3: "Mosaic Virus", d4: "Bacterial Spot" },
          stem: { title: "Stem Analysis", desc: "Detect stem borers, rot, and structural damage in crop stems", d1: "Stem Borer", d2: "Stem Rot", d3: "Canker", d4: "Wilt" },
          fruit: { title: "Fruit Inspection", desc: "Identify fruit diseases, pest damage, and quality issues", d1: "Fruit Rot", d2: "Pest Damage", d3: "Cracking", d4: "Discoloration" },
          soil: { title: "Soil Health Analysis", desc: "AI-powered soil texture and nutrient deficiency detection", d1: "Nutrient Deficiency", d2: "pH Imbalance", d3: "Salinity", d4: "Compaction" }
        },
        pests: {
          p1: { name: "Aphids", damage: "Sap sucking", treatment: "Neem oil spray" },
          p2: { name: "Thrips", damage: "Leaf damage", treatment: "Blue sticky traps" },
          p3: { name: "Whitefly", damage: "Virus transmission", treatment: "Yellow traps" },
          p4: { name: "Caterpillars", damage: "Leaf eating", treatment: "Bt spray" }
        },
        how: {
          s1: { title: "Image Capture", desc: "Take photo of affected plant part" },
          s2: { title: "AI Analysis", desc: "CNN models process image data" },
          s3: { title: "Classification", desc: "Multi-class detection results" },
          s4: { title: "Treatment Plan", desc: "Actionable recommendations" }
        },
        stats: {
          disease: "Disease Detection",
          diseaseDesc: "8 disease classes including blight, rust, and viral infections",
          pest: "Pest Detection",
          pestDesc: "6 pest classes with treatment recommendations",
          soil: "Soil Analysis",
          soilDesc: "Texture analysis and nutrient deficiency detection"
        },
        score: "Score",
        issues: "Issues",
        diseasesCount: "Diseases",
        pestsCount: "Pests",
        viewSummary: "View Quick Summary"
      },
      marketplace: {
        title: "Agrisphere Marketplace",
        subtitle: "Seed-to-Market intelligence and direct farmer-buyer connection.",
        tabs: {
          advisory: "Smart Advisory",
          listings: "Marketplace Listings",
          trends: "Market Trends",
          demands: "Buyer Requests"
        },
        advisory: {
          title: "Crop Details",
          desc: "Enter your farming details",
          selectCrop: "Select Crop",
          chooseCrop: "Choose a crop",
          state: "State",
          selectState: "Select State",
          sowingDate: "Sowing Date",
          pickDate: "Pick a date",
          fieldSize: "Field Size (Acres)",
          analyzeBtn: "Get Market Insights",
          analyzing: "Analyzing...",
          readyTitle: "Ready to Analyze",
          readyDesc: "Enter your crop and date details, including your State, to generate a customized Seed-to-Market report.",
          steps: {
            s1: { title: "Step 1: Seed Selection & Sowing", subtitle: "Foundation for a good harvest" },
            s2: { title: "Step 2: Growth & Nutrition", subtitle: "Optimizing crop development" },
            s3: { title: "Step 3: Harvest Planning", subtitle: "Timing your harvest perfectly" },
            s4: { title: "Step 4: Market Intelligence", subtitle: "Maximize your profits" }
          },
          voice: {
            title: "AI Audio Advisory",
            desc: "Listen to the detailed market roadmap in your language.",
            playing: "Playing Audio...",
            stop: "Stop Advisory"
          }
        },
        listings: {
          postBtn: "Post New Listing",
          filters: "Filters",
          search: "Search...",
          priceSort: "Sort by Price",
          lowToHigh: "Low to High",
          highToLow: "High to Low",
          newest: "Newest First",
          noListings: "No listings found matching your criteria.",
          listingPosted: "Listing posted successfully!",
          listingError: "Failed to post listing."
        },
        trends: {
          title: "AI-Driven Market Intelligence",
          desc: "Real-time analysis of crop prices, supply trends, and demand forecasts.",
          selectState: "Select State for Prices",
          livePrices: "Live Market Prices (15 Min Update)",
          msp: "Current MSP",
          avgMarket: "Avg. Market",
          forecast: "Trend Forecast",
          risk: "Risk Level",
          stable: "Stable",
          bullish: "Bullish",
          bearish: "Bearish"
        },
        demands: {
          title: "Live Buyer Demands",
          desc: "Buyers actively looking for produce in your region.",
          noDemands: "No active buyer requirements at the moment.",
          contactBtn: "Contact Buyer",
          targetPrice: "Target Price",
          verified: "Verified"
        }
      },
      advisoryHub: {
        title: "AgriSphere Advisory Hub",
        subtitle: "Real-time schemes, news, and expert videos for smart farming.",
        tabs: {
          schemes: "Schemes & Subsidies",
          calculator: "Fertilizer Calculator",
          news: "Farming News",
          videos: "Video Tutorials"
        },
        eligibility: {
          title: "Check Eligibility",
          desc: "Update your profile to see relevant government schemes.",
          state: "State",
          landSize: "Land Size (Acres)",
          farmerType: "Farmer Type"
        },
        loading: {
          aiScanning: "Scanning for latest government schemes using AI...",
          findingSchemes: "Finding New Schemes...",
          loadingNews: "Loading News...",
          loadingVideos: "Loading Videos...",
          loadingCalc: "Loading Calculator..."
        },
        buttons: {
          loadMore: "Load More",
          findAi: "Find More from AI",
          refresh: "Refresh Content"
        },
        noData: {
          noSchemes: "No eligible schemes found for this profile in {{state}}.",
          allIndiaBtn: "View All India Schemes",
          noNews: "No news available at the moment.",
          noVideos: "No videos available at the moment."
        }
      },
      yield: {
        title: "Optimized Yield Prediction",
        desc: "Predict crop yield using advanced XGBoost models trained on 23 years of Meghalaya's climate data.",
        supportedCrops: "Supported Crops",
        inputTitle: "Input Parameters",
        selectCrop: "Select Crop",
        area: "Area (Acres)",
        areaNote: "1 Acre ≈ 0.4 Hectares",
        rainfall: "Rainfall (mm)",
        temp: "Avg Temp (°C)",
        humidity: "Humidity (%)",
        fertilizer: "Fertilizer (kg)",
        pesticide: "Pesticide (kg)",
        soilPh: "Soil pH",
        soilN: "Soil N (kg/ha)",
        soilP: "Soil P (kg/ha)",
        soilK: "Soil K (kg/ha)",
        predictBtn: "Generate Prediction",
        analyzing: "Analyzing...",
        resultsTitle: "Prediction Results",
        totalProduction: "Total Est. Production",
        yieldEfficiency: "Yield Efficiency",
        potentialRevenue: "Potential Revenue",
        perHectare: "per hectare",
        approx: "approximate",
        confidence: "Confidence Interval",
        modelUsed: "Model Used",
        trainingData: "Training Data",
        accuracyNote: "Note: Rice predictions are now highly accurate (~99.7%) thanks to the integration of Soil Health Card data (pH, N, P, K).",
        readyDesc: "Enter parameters and click \"Generate Prediction\" to see results."
      },
      pest: {
        title: "Pest Attack Prediction (AI Forecasting)",
        inputTitle: "Field Conditions",
        inputDesc: "Enter current weather and crop details",
        selectCrop: "Select Crop",
        temp: "Temperature (°C)",
        humidity: "Humidity (%)",
        rainfall: "Rainfall (mm)",
        predictBtn: "Predict Pest Risk",
        analyzing: "Analyzing Risk...",
        resultsTitle: "Forecast Result",
        probability: "Pest Attack Probability",
        riskLevel: "{{level}} Risk",
        primaryThreat: "Primary Threat",
        recommendation: "Recommendation",
        forecast7Days: "7-Day Risk Forecast",
        readyDesc: "Adjust sliders and click Predict to see AI Analysis",
        advisorTitle: "AI Agro-Advisor",
        advisorDesc: "Hear this analysis in your language",
        stopBtn: "Stop"
      },
      fertilizer: {
        title: "Smart Fertilizer & Irrigation",
        subtitle: "AI-powered recommendations for optimal crop nutrition and water management",
        inputTitle: "Field Parameters",
        cropType: "Crop Type",
        selectCrop: "Select crop",
        nitrogen: "Nitrogen (N)",
        phosphorus: "Phosphorus (P)",
        potassium: "Potassium (K)",
        moisture: "Soil Moisture (%)",
        moistureDry: "Dry",
        moistureWet: "Wet",
        rainfall: "Rainfall Forecast (Next 3 Days) (mm)",
        soilPh: "Soil pH",
        growthStage: "Growth Stage",
        selectStage: "Select Stage",
        stages: {
          sowing: "Sowing/Germination",
          vegetative: "Vegetative (Growth)",
          flowering: "Flowering/Heading",
          harvest: "Maturity/Harvest"
        },
        getBtn: "Get Recommendation",
        analyzing: "Analyzing...",
        results: {
          noDataTitle: "No Recommendations Yet",
          noDataDesc: "Enter field details and click \"Get Recommendation\" to see AI insights.",
          planTitle: "Fertilizer Plan",
          adjustments: "Smart Adjustments",
          phAlert: "Soil Acidity Alert",
          irrigationTitle: "Irrigation Schedule",
          waterAmount: "Water Amount",
          applyWater: "Apply {{amount}} of water.",
          rainNote: " Rain is expected soon, so you might want to delay slightly.",
          moistureNote: " Monitor moisture levels closely over the next 3 days.",
          temperature: "Temperature",
          windSpeed: "Wind Speed",
          normal: "Normal"
        }
      },
      community: {
        title: "Kisan Sarathi Community",
        subtitle: "Connect with fellow farmers, share knowledge, and grow together.",
        searchPlaceholder: "Search discussions, questions, or experts...",
        askBtn: "Ask a Question",
        tabs: {
            feed: "Community Feed",
            experts: "Expert Advice",
            myPosts: "My Activity"
        },
        stats: {
            members: "Members",
            discussions: "Discussions",
            experts: "Experts Online"
        }
      },
      common: {
        today: "Today",
        yesterday: "Yesterday",
        messages: "new messages",
        clickToChat: "Click to chat",
        active: "active",
        loading: "Loading",
        error: "Error",
        success: "Success",
        generatedOn: "Generated on",
        crops: {
          rice: "Rice",
          wheat: "Wheat",
          maize: "Maize",
          sugarcane: "Sugarcane",
          potato: "Potato",
          tomato: "Tomato"
        }
      },
      digitalTwin: {
        title: "GIS Smart Farm Digital Twin",
        subtitle: "Create a complete digital replica of your farm with advanced GIS mapping, multi-layer visualization, and real-time monitoring for precision agriculture.",
        featuring: "✨ Featuring: Farm Boundaries • Soil Zones • Irrigation Planning • Pest Risk Maps • NDVI Crop Health • Weather Analysis",
        setupTitle: "Setup Your Digital Farm",
        setupDesc: "Enter your farm details to generate a precise digital twin.",
        farmName: "Farm Name",
        ownerName: "Owner Name",
        state: "State",
        district: "District",
        town: "Village/Town",
        coordinates: "Or Use Coordinates",
        latitude: "Latitude",
        longitude: "Longitude",
        useCurrent: "Use Current Location",
        size: "Farm Size (Acres)",
        generateBtn: "Generate Digital Twin",
        generating: "Generating...",
        quickDemo: "Quick Demo",
        drawMap: "Draw on Map",
        capabilities: "Digital Twin Capabilities",
        visualization: "Multi-Layer GIS Visualization",
        interactiveMap: "Interactive Farm Map: {{name}}",
        liveData: "Live Digital Twin Data",
        explainBtn: "Explain Farm",
        stopBtn: "Stop",
        accuracy: "Accuracy",
        update: "Update",
        hectares: "Hectares",
        area: "Farm Area"
      },
      gov: {
        title: "Ministry of Agriculture Dashboard",
        subtitle: "National Command & Control Center",
        operational: "System Operational",
        genReport: "Generate Report",
        stats: {
          regFarmers: "Registered Farmers",
          activeAlerts: "Active Alerts",
          cropLossCases: "Crop Loss Cases",
          estDisbursement: "Est. Disbursement"
        },
        tabs: {
          overview: "Overview & Analytics",
          cropLoss: "Crop Loss Compensation",
          market: "Market Intelligence"
        },
        charts: {
          diseaseTrend: "Disease Detection Trend",
          communityIssues: "Community Issues",
          prices: "State-wise Average Prices",
          listings: "Live Listings Overview"
        },
        cases: {
          title: "Compensation Cases Management",
          search: "Search Case ID...",
          noCases: "No active cases found.",
          eligible: "Eligible",
          reviewRequired: "Review Required",
          verify: "Verify",
          reject: "Reject",
          approve: "Approve",
          status: {
            approved: "Approved",
            rejected: "Rejected",
            underVerification: "Under Verification",
            pending: "Pending Approval"
          }
        }
      },
      buyer: {
        title: "Verified Buyer Dashboard",
        welcome: "Welcome, {{name}}",
        subtitle: "Sourcing fresh produce directly from farmers.",
        panIndia: "Pan India",
        postDemand: "Post Demand",
        tabs: {
          listings: "Listing Feed",
          intelligence: "Market Intelligence",
          deals: "My Deals"
        },
        filters: {
          search: "Search wheat, rice, Punjab...",
          allCrops: "All Crops",
          allStates: "All States"
        },
        card: {
          quantity: "Quantity",
          price: "Price/Qtl",
          farmer: "Farmer",
          harvest: "Harvest",
          callFarmer: "Call Farmer",
          grade: "Grade"
        },
        intelligence: {
          scope: "Market Scope",
          config: "Configure AI analysis target",
          forecast: "Trend Forecast",
          demand: "Demand Level",
          vsMsp: "Vs MSP",
          avgPrice: "Avg. Market Price",
          genBtn: "Generate AI Insights",
          analyzing: "Analyzing...",
          strategicAnalysis: "AI Strategic Analysis"
        },
        contact: {
          title: "Contact Farmer",
          desc: "Connect with {{name}} directly.",
          phone: "Phone Number",
          whatsapp: "WhatsApp",
          call: "Call Now",
          close: "Close"
        },
        demand: {
          title: "Post Buying Requirement",
          desc: "Farmers matching these criteria will be alerted.",
          crop: "Target Crop",
          quantity: "Quantity (Quintals)",
          price: "Target Price/Qtl",
          location: "Preferred Location (Optional)",
          postBtn: "Post Demand",
          cancel: "Cancel"
        }
      },
      farmerDashboard: {
        title: "Comprehensive AI Agriculture Dashboard",
        subtitle: "Advanced AI-powered agriculture management system combining disease detection, GIS digital twin, and yield prediction for precision farming.",
        tabs: {
          overview: "Overview",
          disease: "AI Disease Detection",
          twin: "GIS Digital Twin",
          yield: "Yield Prediction",
          pest: "Pest Forecast",
          marketplace: "Marketplace"
        },
        metrics: {
          models: "AI Models",
          area: "Farm Area",
          detections: "Detection Classes",
          accuracy: "Accuracy",
          activeModels: "Active Models",
          hectares: "Hectares",
          types: "Disease/Pest Types",
          precision: "AI Precision"
        },
        status: {
          active: "Active",
          live: "Live",
          types: "Types"
        },
        yield: {
          title: "Crop Yield Predictions (2025)",
          perHectare: "per hectare",
          advancedTitle: "Advanced AI Yield Prediction",
          modelPerformance: "ML Model Performance"
        },
        twin: {
          title: "GIS-Based Smart Farm Digital Twin",
          activeZones: "Active Zones",
          monitored: "Monitored",
          average: "Average",
          spatialFeatures: "Spatial Analysis Features",
          precisionBenefits: "Precision Agriculture Benefits"
        }
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: "होम",
        marketplace: "बाज़ार",
        communityForum: "किसान समुदाय फोरम",
        advisoryHub: "सलाहकार हब",
        voiceAssistant: "वॉयस असिस्टेंट",
        fertilizerAi: "उर्वरक AI",
        pestForecast: "कीट भविष्यवाणी",
        adminDashboard: "अधिकारी डैशबोर्ड",
        buyerDashboard: "क्रेता डैशबोर्ड",
        farmerDashboard: "किसान डैशबोर्ड",
        diseaseDetection: "रोग की पहचान",
        yieldPrediction: "उपज भविष्यवाणी",
        digitalTwin: "डिजिटल ट्विन",
        login: "लॉग इन",
        getStarted: "शुरू करें",
        logout: "लॉग आउट",
        saveProfile: "प्रोफ़ाइल सहेजें",
        aiTools: "स्मार्ट खेती टूल्स"
      },
      home: {
        heroTitle1: "भारत का पहला",
        heroTitle2: "AI + GIS स्मार्ट कृषि",
        heroSubtitle: "इंटेलिजेंस प्लेटफॉर्म",
        heroDescription: "कीटों, पोषक तत्वों की कमी, और फंगल संक्रमण का पता लगाएं। उपज में 30% की वृद्धि और लागत में 40% की कमी करें।",
        exploreFeatures: "डेमो देखें",
        floatingAlert: "मौसम जोखिमों की जाँच करें",
        featuresTitle: "स्मार्ट खेती के लिए",
        featuresSubtitle: "बुद्धिमान विशेषताएं",
        featuresDesc: "आपके कृषि कार्यों के हर पहलू में क्रांति लाने के लिए डिज़ाइन की गई अत्याधुनिक तकनीक",
        aboutTitle: "AgriSphere AI भारत का पहला व्यापक AI + GIS स्मार्ट फार्मिंग इंटेलिजेंस प्लेटफॉर्म है। हम बीज से बाजार तक खेती को बदलने के लिए रोग पहचान, डिजिटल ट्विन, और कृषि सलाह को जोड़ते हैं।",
        aboutDesc: "हमारा प्लेटफ़ॉर्म गांवों के लिए ऑफ़लाइन मोड, हिंदी वॉयस कमांड, सरकारी योजनाओं और किसान-खरीदार बाज़ार का समर्थन करता है। हम उपज को 30% बढ़ाते हैं और लागत को 40% कम करते हैं।",
        howItWorks: "यह कैसे काम करता है",
        howItWorksSubtitle: "हमारी सरल 4-चरण प्रक्रिया के साथ मिनटों में शुरू करें",
        ctaTitle: "क्या आप अपने कृषि व्यवसाय",
        ctaSubtitle: "को बदलने के लिए तैयार हैं?",
        ctaDesc: "उन हजारों किसानों से जुड़ें जो उपज बढ़ाने और लागत कम करने के लिए AgriSphere AI का उपयोग कर रहे हैं",
        ctaFreeTrial: "निःशुल्क परीक्षण शुरू करें",
        ctaDemo: "डेमो शेड्यूल करें",
        features: {
          f1: { title: "AI रोग पहचान", desc: "छवियों का विश्लेषण करके 95% सटीकता के साथ रोगों और कीटों का पता लगाएं" },
          f2: { title: "GIS डिजिटल ट्विन", desc: "मैपिंग और विकास ट्रैकिंग के साथ खेत की पूरी डिजिटल प्रति" },
          f3: { title: "उपज की भविष्यवाणी", desc: "मौसम और मिट्टी के डेटा का उपयोग करके उपज का पूर्वानुमान" },
          f4: { title: "मौसम जोखिम इंजन", desc: "बाढ़, सूखे और लू के लिए रीयल-टाइम अलर्ट" },
          f5: { title: "उर्वरक और सिंचाई AI", desc: "इष्टतम पोषण के लिए स्मार्ट NPK और सिंचाई शेड्यूलिंग" }
        },
        stats: {
          activeFarmers: "सक्रिय किसान",
          accuracyRate: "सटीकता दर",
          fieldsMapped: "मैप किए गए खेत",
          yieldIncrease: "उपज में वृद्धि"
        },
        advanced: {
          title: "उन्नत AI इंटेलिजेंस",
          desc: "अत्याधुनिक विशेषताएं जो एग्रीस्फीयर AI को अलग बनाती हैं",
          pests: { title: "कीट हमले की भविष्यवाणी", desc: "अगले 7 दिनों के लिए कीट हमले की संभावना का पूर्वानुमान" },
          seedToMarket: { title: "बीज-से-बाजार सलाह", desc: "बीज चयन से लेकर बाजार मूल्य निर्धारण तक पूर्ण मार्गदर्शन" },
          voice: { title: "वॉयस असिस्टेंट (हिंदी)", desc: "किसान स्थानीय भाषा में बोलते हैं, AI सलाह के साथ जवाब देता है" },
          schemes: { title: "सरकारी योजनाएं AI", desc: "सब्सिडी, ऋण और पीएम-किसान लाभों की पहचान" },
          marketplace: { title: "किसान-खरीदार बाज़ार", desc: "AI मूल्य निर्धारण और रसद के साथ प्रत्यक्ष बिक्री मंच" },
          blockchain: { title: "ब्लॉकचेन ट्रैसेबिलिटी", desc: "गुणवत्ता आश्वासन के लिए फसल की उत्पत्ति और आपूर्ति श्रृंखला को ट्रैक करें" }
        },
        rural: {
          title: "ग्रामीण भारत के लिए निर्मित",
          subtitle: "गांव के किसानों के लिए डिज़ाइन की गई सुलभ तकनीक",
          offline: { title: "ऑफ़लाइन मोड", desc: "स्थानीय कैशिंग के साथ इंटरनेट के बिना काम करता है" },
          languages: { title: "हिंदी + स्थानीय भाषाएं", desc: "क्षेत्रीय भाषाओं और आवाज़ के लिए पूर्ण समर्थन" },
          sms: { title: "SMS फॉलबैक अलर्ट", desc: "इंटरनेट न होने पर SMS के माध्यम से महत्वपूर्ण अलर्ट" },
          community: { title: "सामुदायिक मंच", desc: "किसान कीटों और योजनाओं पर चर्चा करते हैं" }
        },
        women: {
          title: "ग्रामीण महिला कृषि-उद्यमी",
          subtitle: "कृषि में महिलाओं के नेतृत्व वाले सूक्ष्म व्यवसायों को सशक्त बनाना",
          microbusiness: { title: "सूक्ष्म व्यवसाय सहायता", desc: "शहद, मसाले और हस्तशिल्प व्यवसायों के लिए प्रशिक्षण" },
          training: { title: "प्रशिक्षण मॉड्यूल", desc: "महिला उद्यमियों के लिए व्यापक प्रशिक्षण" },
          marketAccess: { title: "बाज़ार तक पहुँच", desc: "महिला उत्पादों के लिए प्रत्यक्ष बाज़ार लिस्टिंग" }
        },
        marketplace: {
          title: "एग्रीस्फीयर मार्केटप्लेस",
          subtitle: "बीज-से-बाजार तक की खुफिया जानकारी और प्रत्यक्ष किसान-खरीदार कनेक्शन।",
          tabs: {
            advisory: "स्मार्ट सलाह",
            listings: "मार्केटप्लेस लिस्टिंग",
            trends: "बाजार रुझान",
            demands: "खरीदार अनुरोध"
          },
          advisory: {
            title: "फसल विवरण",
            desc: "अपने खेती का विवरण दर्ज करें",
            selectCrop: "फसल चुनें",
            chooseCrop: "फसल चुनें",
            state: "राज्य",
            selectState: "राज्य चुनें",
            sowingDate: "बुवाई की तारीख",
            pickDate: "तारीख चुनें",
            fieldSize: "खेत का आकार (एकड़)",
            analyzeBtn: "बाजार अंतर्दृष्टि प्राप्त करें",
            analyzing: "विश्लेषण कर रहा है...",
            readyTitle: "विश्लेषण के लिए तैयार",
            readyDesc: "अनुकूलित बीज-से-बाजार रिपोर्ट तैयार करने के लिए अपने फसल और तारीख विवरण दर्ज करें, जिसमें आपका राज्य भी शामिल है।",
            steps: {
              s1: { title: "चरण 1: बीज चयन और बुवाई", subtitle: "अच्छी फसल की नींव" },
              s2: { title: "चरण 2: विकास और पोषण", subtitle: "फसल विकास को अनुकूलित करना" },
              s3: { title: "चरण 3: कटाई योजना", subtitle: "अपनी कटाई का समय सही ढंग से निर्धारित करना" },
              s4: { title: "चरण 4: बाजार खुफिया जानकारी", subtitle: "अपना लाभ अधिकतम करें" }
            },
            voice: {
              title: "AI ऑडियो सलाह",
              desc: "अपनी भाषा में विस्तृत बाजार रोडमैप सुनें।",
              playing: "ऑडियो बज रहा है...",
              stop: "सलाह बंद करें"
            }
          },
          listings: {
            postBtn: "नई लिस्टिंग पोस्ट करें",
            filters: "फ़िल्टर",
            search: "खोजें...",
            priceSort: "कीमत के अनुसार क्रमबद्ध करें",
            lowToHigh: "कम से ज्यादा",
            highToLow: "ज्यादा से कम",
            newest: "नवीनतम पहले",
            noListings: "आपकी कसौटी से मेल खाने वाली कोई लिस्टिंग नहीं मिली।",
            listingPosted: "लिस्टिंग सफलतापूर्वक पोस्ट की गई!",
            listingError: "लिस्टिंग पोस्ट करने में विफल।"
          },
          trends: {
            title: "AI-संचालित बाजार खुफिया जानकारी",
            desc: "फसल की कीमतों, आपूर्ति रुझानों और मांग पूर्वानुमानों का रीयल-टाइम विश्लेषण।",
            selectState: "कीमतों के लिए राज्य चुनें",
            livePrices: "लाइव बाजार कीमतें (15 मिनट अपडेट)",
            msp: "वर्तमान MSP",
            avgMarket: "औसत बाजार",
            forecast: "रुझान पूर्वानुमान",
            risk: "जोखिम स्तर",
            stable: "स्थिर",
            bullish: "तेजी",
            bearish: "मंदी"
          },
          demands: {
            title: "लाइव खरीदार मांग",
            desc: "खरीदार सक्रिय रूप से आपके क्षेत्र में उपज की तलाश कर रहे हैं।",
            noDemands: "फिलहाल कोई सक्रिय खरीदार आवश्यकता नहीं है।",
            contactBtn: "खरीदार से संपर्क करें",
            targetPrice: "लक्ष्य मूल्य",
            verified: "सत्यापित"
          }
        },
        testimonials: {
          title: "किसान क्या कहते हैं",
          subtitle: "अपने कार्यों को बदलने वाले किसानों की वास्तविक कहानियाँ",
          t1: { name: "राजेश कुमार", loc: "पंजाब, भारत", text: "एग्रीस्फीयर के बहु-श्रेणी AI ने मेरे गेहूं में स्टेम बोरर का जल्दी पता लगा लिया। कीट भविष्यवाणी ने मेरी पूरी 10 एकड़ की फसल बचा ली और उपज में 35% की वृद्धि की!", benefit: "35% उपज वृद्धि" },
          t2: { name: "अनीता शर्मा", loc: "महाराष्ट्र, भारत", text: "GIS डिजिटल ट्विन ने मेरे खेत को पूरी तरह से मैप किया। AI-संचालित प्रबंधन ने पानी के उपयोग में 45% की कटौती की। मार्केटप्लेस ने मुझे ₹2000/क्विंटल अतिरिक्त दिलाया!", benefit: "45% पानी की बचत" },
          t3: { name: "विक्रम पटेल", loc: "गुजरात, भारत", text: "हिंदी में वॉयस असिस्टेंट कमाल का है! 'टमाटर में रोग है' - तुरंत रोग का प्रकार और उपचार लागत मिल गई। मेरे गांव में ऑफ़लाइन मोड पूरी तरह से काम करता है।", benefit: "हिंदी वॉयस सपोर्ट" }
        },
        tech: {
          title: "अत्याधुनिक तकनीक पर निर्मित",
          subtitle: "आपके खेत को शक्ति प्रदान करने वाला एंटरप्राइज-ग्रेड टेक स्टैक"
        }
      },
      disease: {
        title: "AI बहु-श्रेणी रोग पहचान",
        desc: "क्रांतिकारी बहु-श्रेणी AI सिस्टम जो पत्तियों, तनों, फल और मिट्टी की छवियों से रोगों, कीटों, पोषक तत्वों की कमी और मिट्टी की बनावट का 95%+ सटीकता के साथ पता लगाता है।",
        startBtn: "पहचान प्रारंभ करें",
        uploadBtn: "छवियां अपलोड करें",
        saveBtn: "सहेजी गई रिपोर्टें",
        hideBtn: "सहेजे गए छिपाएं",
        reportsTitle: "ऑफ़लाइन रोग रिपोर्ट",
        noReports: "कोई सहेजी गई रिपोर्ट नहीं मिली।",
        capTitle: "बहु-श्रेणी पहचान क्षमताएं",
        pestTitle: "कीट पहचान और उपचार",
        aiTitle: "उन्नत बहु-श्रेणी AI पहचान",
        howTitle: "AI पहचान कैसे काम करती है",
        backHome: "होम पर वापस जाएं",
        accuracy: "सटीकता",
        types: {
          leaf: { title: "पत्ती रोग पहचान", desc: "फंगल संक्रमण, जीवाणु रोगों और वायरल संक्रमणों के लिए पत्ती की छवियों का विश्लेषण करें", d1: "ब्लाइट", d2: "रस्ट", d3: "मोज़ेक वायरस", d4: "बैक्टीरियल स्पॉट" },
          stem: { title: "तना विश्लेषण", desc: "फसल के तनों में स्टेम बोरर्स, रॉट और संरचनात्मक क्षति का पता लगाएं", d1: "स्टेम बोरर", d2: "स्टेम रॉट", d3: "कैंकर", d4: "विल्ट" },
          fruit: { title: "फल निरीक्षण", desc: "फलों के रोगों, कीटों के नुकसान और गुणवत्ता के मुद्दों की पहचान करें", d1: "फ्रूट रॉट", d2: "कीट का नुकसान", d3: "क्रैकिंग", d4: "मलिनकिरण" },
          soil: { title: "मिट्टी स्वास्थ्य विश्लेषण", desc: "AI-आधारित मिट्टी की बनावट और पोषक तत्वों की कमी का पता लगाना", d1: "पोषक तत्वों की कमी", d2: "pH असंतुलन", d3: "लवणता", d4: "संघनन" }
        },
        pests: {
          p1: { name: "एफिड्स", damage: "रस चूसना", treatment: "नीम के तेल का स्प्रे" },
          p2: { name: "थ्रिप्स", damage: "पत्तियों का नुकसान", treatment: "नीले चिपचिपे जाल" },
          p3: { name: "सफेद मक्खी", damage: "वायरस संचरण", treatment: "पीले जाल" },
          p4: { name: "इल्लियाँ", damage: "पत्ती खाना", treatment: "Bt स्प्रे" }
        },
        how: {
          s1: { title: "छवि कैप्चर", desc: "प्रभावित पौधे के हिस्से की फोटो लें" },
          s2: { title: "AI विश्लेषण", desc: "CNN मॉडल छवि डेटा को प्रोसेस करते हैं" },
          s3: { title: "वर्गीकरण", desc: "बहु-श्रेणी पहचान परिणाम" },
          s4: { title: "उपचार योजना", desc: "कार्रवाई योग्य सिफारिशें" }
        },
        stats: {
          disease: "रोग पहचान",
          diseaseDesc: "ब्लाइट, रस्ट और वायरल संक्रमण सहित 8 रोग श्रेणियां",
          pest: "कीट पहचान",
          pestDesc: "उपचार सिफारिशों के साथ 6 कीट श्रेणियां",
          soil: "मिट्टी विश्लेषण",
          soilDesc: "मिट्टी की बनावट विश्लेषण और पोषक तत्वों की कमी का पता लगाना"
        },
        score: "स्कोर",
        issues: "मुद्दे",
        diseasesCount: "रोग",
        pestsCount: "कीट",
        viewSummary: "त्वरित सारांश देखें"
      },
      marketplace: {
        title: "एग्रीस्फीयर मार्केटप्लेस",
        subtitle: "बीज से बाजार तक की खुफिया जानकारी और प्रत्यक्ष किसान-खरीदार कनेक्शन।",
        tabs: {
          advisory: "स्मार्ट सलाह",
          listings: "बाजार लिस्टिंग",
          trends: "बाजार रुझान",
          demands: "खरीदार अनुरोध"
        },
        advisory: {
          title: "फसल विवरण",
          desc: "अपनी खेती का विवरण दर्ज करें",
          selectCrop: "फसल चुनें",
          chooseCrop: "एक फसल चुनें",
          state: "राज्य",
          selectState: "राज्य चुनें",
          sowingDate: "बुवाई की तारीख",
          pickDate: "तारीख चुनें",
          fieldSize: "खेत का आकार (एकड़)",
          analyzeBtn: "बाजार अंतर्दृष्टि प्राप्त करें",
          analyzing: "विश्लेषण कर रहा है...",
          readyTitle: "विश्लेषण के लिए तैयार",
          readyDesc: "अनुकूलित बीज-से-बाजार रिपोर्ट तैयार करने के लिए अपने राज्य सहित अपनी फसल और तारीख का विवरण दर्ज करें।",
          stages: {
            s1: { title: "चरण 1: बीज चयन और बुवाई", subtitle: "अच्छी फसल की नींव" },
            s2: { title: "चरण 2: विकास और पोषण", subtitle: "फसल विकास को अनुकूलित करना" },
            s3: { title: "चरण 3: कटाई की योजना", subtitle: "अपनी कटाई का सही समय तय करना" },
            s4: { title: "चरण 4: बाजार खुफिया", subtitle: "अपना मुनाफा अधिकतम करें" }
          }
        },
        listings: {
          postBtn: "नई लिस्टिंग पोस्ट करें",
          filters: "फ़िल्टर",
          search: "खोजें...",
          noListings: "आपके मानदंडों से मेल खाने वाली कोई लिस्टिंग नहीं मिली।"
        },
        demands: {
          noDemands: "फिलहाल कोई सक्रिय खरीदार आवश्यकताएं नहीं हैं।",
          contactBtn: "खरीदार से संपर्क करें",
          targetPrice: "लक्ष्य मूल्य"
        }
      },
      advisoryHub: {
        title: "एग्रीस्फीयर सलाहकार हब",
        subtitle: "स्मार्ट खेती के लिए रीयल-टाइम योजनाएं, समाचार और विशेषज्ञ वीडियो।",
        tabs: {
          schemes: "योजनाएं और सब्सिडी",
          calculator: "उर्वरक कैलकुलेटर",
          news: "खेती समाचार",
          videos: "वीडियो ट्यूटोरियल"
        },
        eligibility: {
          title: "पात्रता जांचें",
          desc: "प्रासंगिक सरकारी योजनाओं को देखने के लिए अपनी प्रोफ़ाइल अपडेट करें।",
          state: "राज्य",
          landSize: "भूमि का आकार (एकड़)",
          farmerType: "किसान का प्रकार"
        },
        loading: {
          aiScanning: "AI का उपयोग करके नवीनतम सरकारी योजनाओं की स्कैनिंग...",
          findingSchemes: "नई योजनाएं मिल रही हैं...",
          loadingNews: "समाचार लोड हो रहा है...",
          loadingVideos: "वीडियो लोड हो रहे हैं...",
          loadingCalc: "कैलकुलेटर लोड हो रहा है..."
        },
        buttons: {
          loadMore: "और लोड करें",
          findAi: "AI से और खोजें",
          refresh: "सामग्री रीफ्रेश करें"
        },
        noData: {
          noSchemes: "{{state}} में इस प्रोफ़ाइल के लिए कोई पात्र योजना नहीं मिली।",
          allIndiaBtn: "अखिल भारतीय योजनाएं देखें",
          noNews: "फिलहाल कोई खबर उपलब्ध नहीं है।",
          noVideos: "फिलहाल कोई वीडियो उपलब्ध नहीं है।"
        }
      },
      yield: {
        title: "अनुकूलित उपज भविष्यवाणी",
        desc: "मेघालय के 23 वर्षों के जलवायु डेटा पर प्रशिक्षित उन्नत XGBoost मॉडल का उपयोग करके फसल की उपज का अनुमान लगाएं।",
        supportedCrops: "समर्थित फसलें",
        inputTitle: "इनपुट पैरामीटर",
        selectCrop: "फसल चुनें",
        area: "क्षेत्र (एकड़)",
        areaNote: "1 एकड़ ≈ 0.4 हेक्टेयर",
        rainfall: "वर्षा (मिमी)",
        temp: "औसत तापमान (°C)",
        humidity: "आर्द्रता (%)",
        fertilizer: "उर्वरक (किग्रा)",
        pesticide: "कीटनाशक (किग्रा)",
        soilPh: "मिट्टी का पीएच (pH)",
        soilN: "मिट्टी नाइट्रोजन (kg/ha)",
        soilP: "मिट्टी फास्फोरस (kg/ha)",
        soilK: "मिट्टी पोटेशियम (kg/ha)",
        predictBtn: "भविष्यवाणी उत्पन्न करें",
        analyzing: "विश्लेषण कर रहा है...",
        resultsTitle: "भविष्यवाणी के परिणाम",
        totalProduction: "कुल अनुमानित उत्पादन",
        yieldEfficiency: "उपज दक्षता",
        potentialRevenue: "संभावित राजस्व",
        perHectare: "प्रति हेक्टेयर",
        approx: "लगभग",
        confidence: "विश्वास अंतराल",
        modelUsed: "इस्तेमाल किया गया मॉडल",
        trainingData: "प्रशिक्षण डेटा",
        accuracyNote: "नोट: मृदा स्वास्थ्य कार्ड डेटा (pH, N, P, K) के एकीकरण के कारण चावल की भविष्यवाणियाँ अब अत्यधिक सटीक (~99.7%) हैं।",
        readyDesc: "परिणाम देखने के लिए पैरामीटर दर्ज करें और 'भविष्यवाणी उत्पन्न करें' पर क्लिक करें।"
      },
      pest: {
        title: "कीट हमले की भविष्यवाणी (AI पूर्वानुमान)",
        inputTitle: "खेत की स्थिति",
        inputDesc: "वर्तमान मौसम और फसल विवरण दर्ज करें",
        selectCrop: "फसल चुनें",
        temp: "तापमान (°C)",
        humidity: "आर्द्रता (%)",
        rainfall: "वर्षा (मिमी)",
        predictBtn: "कीट जोखिम की भविष्यवाणी करें",
        analyzing: "जोखिम का विश्लेषण कर रहा है...",
        resultsTitle: "पूर्वानुमान परिणाम",
        probability: "कीट हमले की संभावना",
        riskLevel: "{{level}} जोखिम",
        primaryThreat: "मुख्य खतरा",
        recommendation: "सिफारिश",
        forecast7Days: "7-दिवसीय जोखिम पूर्वानुमान",
        readyDesc: "AI विश्लेषण देखने के लिए स्लाइडर्स को समायोजित करें और भविष्यवाणी पर क्लिक करें",
        advisorTitle: "AI कृषि-सलाहकार",
        advisorDesc: "अपनी भाषा में इस विश्लेषण को सुनें",
        stopBtn: "रुकें"
      },
      fertilizer: {
        title: "स्मार्ट उर्वरक और सिंचाई",
        subtitle: "इष्टतम फसल पोषण और जल प्रबंधन के लिए AI-संचालित सिफारिशें",
        inputTitle: "खेत के पैरामीटर",
        cropType: "फसल का प्रकार",
        selectCrop: "फसल चुनें",
        nitrogen: "नाइट्रोजन (N)",
        phosphorus: "फास्फोरस (P)",
        potassium: "पोटेशियम (K)",
        moisture: "मिट्टी की नमी (%)",
        moistureDry: "सूखा",
        moistureWet: "गीला",
        rainfall: "वर्षा पूर्वानुमान (अगले 3 दिन) (मिमी)",
        soilPh: "मिट्टी का पीएच (pH)",
        growthStage: "विकास का चरण",
        selectStage: "चरण चुनें",
        stages: {
          sowing: "बुवाई/अंकुरण",
          vegetative: "वानस्पतिक (विकास)",
          flowering: "फूल आना",
          harvest: "परिपक्वता/कटाई"
        },
        getBtn: "सिफारिश प्राप्त करें",
        analyzing: "विश्लेषण कर रहा है...",
        results: {
          noDataTitle: "अभी तक कोई सिफारिश नहीं",
          noDataDesc: "AI अंतर्दृष्टि देखने के लिए खेत का विवरण दर्ज करें और 'सिफारिश प्राप्त करें' पर क्लिक करें।",
          planTitle: "उर्वरक योजना",
          adjustments: "स्मार्ट समायोजन",
          phAlert: "मिट्टी की अम्लता की चेतावनी",
          irrigationTitle: "सिंचाई अनुसूची",
          waterAmount: "पानी की मात्रा",
          applyWater: "{{amount}} पानी लगाएं।",
          rainNote: " जल्द ही बारिश होने की संभावना है, इसलिए आप थोड़ी देरी कर सकते हैं।",
          moistureNote: " अगले 3 दिनों तक नमी के स्तर की बारीकी से निगरानी करें।",
          temperature: "तापमान",
          windSpeed: "हवा की गति",
          normal: "सामान्य"
        }
      },
      community: {
        title: "किसान सारथी समुदाय",
        subtitle: "साथी किसानों से जुड़ें, ज्ञान साझा करें और साथ मिलकर बढ़ें।",
        searchPlaceholder: "चर्चाओं, प्रश्नों या विशेषज्ञों को खोजें...",
        askBtn: "प्रश्न पूछें",
        tabs: {
            feed: "सामुदायिक फीड",
            experts: "विशेषज्ञ सलाह",
            myPosts: "मेरी गतिविधि"
        },
        stats: {
            members: "सदस्य",
            discussions: "चर्चाएं",
            experts: "ऑनलाइन विशेषज्ञ"
        }
      },
      common: {
        today: "आज",
        yesterday: "कल",
        messages: "नए संदेश",
        clickToChat: "चैट करने के लिए क्लिक करें",
        active: "सक्रिय",
        loading: "लोड हो रहा है",
        error: "त्रुटि",
        success: "सफलता",
        generatedOn: "पर जनरेट किया गया",
        crops: {
          rice: "चावल",
          wheat: "गेहूं",
          maize: "मक्का",
          sugarcane: "गन्ना",
          potato: "आलू",
          tomato: "टमाटर"
        }
      },
      digitalTwin: {
        title: "GIS स्मार्ट फार्म डिजिटल ट्विन",
        subtitle: "सटीक कृषि के लिए उन्नत GIS मैपिंग, मल्टी-लेयर विज़ुअलाइज़ेशन और रीयल-टाइम मॉनिटरिंग के साथ अपने खेत की एक पूर्ण डिजिटल प्रति बनाएं।",
        featuring: "✨ विशेषता: खेत की सीमाएं • मिट्टी क्षेत्र • सिंचाई योजना • कीट जोखिम मानचित्र • NDVI फसल स्वास्थ्य • मौसम विश्लेषण",
        setupTitle: "अपना डिजिटल फार्म सेटअप करें",
        setupDesc: "सटीक डिजिटल ट्विन बनाने के लिए अपने खेत का विवरण दर्ज करें।",
        farmName: "खेत का नाम",
        ownerName: "मालिक का नाम",
        state: "राज्य",
        district: "जिला",
        town: "गाँव/कस्बा",
        coordinates: "या निर्देशांक का उपयोग करें",
        latitude: "अक्षांश",
        longitude: "देशांतर",
        useCurrent: "वर्तमान स्थान का उपयोग करें",
        size: "खेत का आकार (एकड़)",
        generateBtn: "डिजिटल ट्विन उत्पन्न करें",
        generating: "उत्पन्न कर रहा है...",
        quickDemo: "त्वरित डेमो",
        drawMap: "मानचित्र पर ड्रा करें",
        capabilities: "डिजिटल ट्विन क्षमताएं",
        visualization: "मल्टी-लेयर GIS विज़ुअलाइज़ेशन",
        interactiveMap: "इंटरैक्टिव फार्म मैप: {{name}}",
        liveData: "लाइव डिजिटल ट्विन डेटा",
        explainBtn: "खेत समझाएं",
        stopBtn: "रुकें",
        accuracy: "सटीकता",
        update: "अपडेट",
        hectares: "हेक्टेयर",
        area: "खेत का क्षेत्रफल"
      },
      gov: {
        title: "कृषि मंत्रालय डैशबोर्ड",
        subtitle: "राष्ट्रीय कमान एवं नियंत्रण केंद्र",
        operational: "सिस्टम चालू है",
        genReport: "रिपोर्ट तैयार करें",
        stats: {
          regFarmers: "पंजीकृत किसान",
          activeAlerts: "सक्रिय अलर्ट",
          cropLossCases: "फसल नुकसान के मामले",
          estDisbursement: "अनुमानित संवितरण"
        },
        tabs: {
          overview: "अवलोकन और विश्लेषण",
          cropLoss: "फसल नुकसान मुआवजा",
          market: "बाजार खुफिया जानकारी"
        },
        charts: {
          diseaseTrend: "रोग पहचान रुझान",
          communityIssues: "सामुदायिक मुद्दे",
          prices: "राज्यवार औसत कीमतें",
          listings: "लाइव लिस्टिंग अवलोकन"
        },
        cases: {
          title: "मुआवजा मामला प्रबंधन",
          search: "केस आईडी खोजें...",
          noCases: "कोई सक्रिय मामला नहीं मिला।",
          eligible: "पात्र",
          reviewRequired: "समीक्षा आवश्यक",
          verify: "सत्यापित करें",
          reject: "अस्वीकार करें",
          approve: "स्वीकृत करें",
          status: {
            approved: "स्वीकृत",
            rejected: "अस्वीकार कर दिया",
            underVerification: "सत्यापन के अधीन",
            pending: "अनुमोदन लंबित"
          }
        }
      },
      buyer: {
        title: "सत्यापित क्रेता डैशबोर्ड",
        welcome: "स्वागत है, {{name}}",
        subtitle: "सीधे किसानों से ताजी उपज प्राप्त करना।",
        panIndia: "अखिल भारतीय",
        postDemand: "डिमांड पोस्ट करें",
        tabs: {
          listings: "लिस्टिंग फीड",
          intelligence: "बाजार खुफिया जानकारी",
          deals: "मेरे सौदे"
        },
        filters: {
          search: "गेहूं, चावल, पंजाब खोजें...",
          allCrops: "सभी फसलें",
          allStates: "सभी राज्य"
        },
        card: {
          quantity: "मात्रा",
          price: "मूल्य/क्विंटल",
          farmer: "किसान",
          harvest: "कटाई",
          callFarmer: "किसान को कॉल करें",
          grade: "ग्रेड"
        },
        intelligence: {
          scope: "बाजार का दायरा",
          config: "AI विश्लेषण लक्ष्य कॉन्फ़िगर करें",
          forecast: "रुझान पूर्वानुमान",
          demand: "मांग स्तर",
          vsMsp: "बनाम MSP",
          avgPrice: "औसत बाजार मूल्य",
          genBtn: "AI अंतर्दृष्टि उत्पन्न करें",
          analyzing: "विश्लेषण कर रहा है...",
          strategicAnalysis: "AI रणनीतिक विश्लेषण"
        },
        contact: {
          title: "किसान से संपर्क करें",
          desc: "{{name}} से सीधे जुड़ें।",
          phone: "फ़ोन नंबर",
          whatsapp: "व्हाट्सएप",
          call: "अभी कॉल करें",
          close: "बंद करें"
        },
        demand: {
          title: "खरीद आवश्यकता पोस्ट करें",
          desc: "इन मानदंडों से मेल खाने वाले किसानों को सूचित किया जाएगा।",
          crop: "लक्ष्य फसल",
          quantity: "मात्रा (क्विंटल)",
          price: "लक्ष्य मूल्य/क्विंटल",
          location: "पसंदीदा स्थान (वैकल्पिक)",
          postBtn: "डिमांड पोस्ट करें",
          cancel: "रद्द करें"
        }
      },
      farmerDashboard: {
        title: "व्यापक AI कृषि डैशबोर्ड",
        subtitle: "रोग पहचान, GIS डिजिटल ट्विन और सटीक खेती के लिए उपज भविष्यवाणी को मिलाकर उन्नत AI-संचालित कृषि प्रबंधन प्रणाली।",
        tabs: {
          overview: "अवलोकन",
          disease: "AI रोग पहचान",
          twin: "GIS डिजिटल ट्विन",
          yield: "उपज की भविष्यवाणी",
          pest: "कीट भविष्यवाणी",
          marketplace: "बाज़ार"
        },
        metrics: {
          models: "AI मॉडल",
          area: "खेत क्षेत्र",
          detections: "पहचान वर्ग",
          accuracy: "सटीकता",
          activeModels: "सक्रिय मॉडल",
          hectares: "हेक्टेयर",
          types: "रोग/कीट प्रकार",
          precision: "AI परिशुद्धता"
        },
        status: {
          active: "सक्रिय",
          live: "लाइव",
          types: "प्रकार"
        },
        yield: {
          title: "फसल उपज भविष्यवाणी (2025)",
          perHectare: "प्रति हेक्टेयर",
          advancedTitle: "उन्नत AI उपज भविष्यवाणी",
          modelPerformance: "ML मॉडल प्रदर्शन"
        },
        twin: {
          title: "GIS-आधारित स्मार्ट फार्म डिजिटल ट्विन",
          activeZones: "सक्रिय क्षेत्र",
          monitored: "निगरानी की गई",
          average: "औसत",
          spatialFeatures: "स्थानिक विश्लेषण विशेषताएं",
          precisionBenefits: "सटीक कृषि लाभ"
        },
        advisoryHub: {
          title: "एग्रीस्फीयर सलाहकार केंद्र",
          subtitle: "स्मार्ट खेती के लिए रीयल-टाइम योजनाएं, समाचार और विशेषज्ञ वीडियो।",
          tabs: {
            schemes: "योजनाएं और सब्सिडी",
            calculator: "उर्वरक कैलकुलेटर",
            news: "खेती के समाचार",
            videos: "वीडियो ट्यूटोरियल"
          },
          eligibility: {
            title: "पात्रता जांचें",
            desc: "प्रासंगिक सरकारी योजनाओं को देखने के लिए अपना प्रोफ़ाइल अपडेट करें।",
            state: "राज्य",
            landSize: "भूमि का आकार (एकड़)",
            farmerType: "किसान का प्रकार"
          },
          loading: {
            aiScanning: "AI का उपयोग करके नवीनतम सरकारी योजनाओं के लिए स्कैनिंग...",
            findingSchemes: "नई योजनाएं खोज रहे हैं...",
            loadingNews: "समाचार लोड हो रहा है...",
            loadingVideos: "वीडियो लोड हो रहा है...",
            loadingCalc: "कैलकुलेटर लोड हो रहा है..."
          },
          buttons: {
            loadMore: "और लोड करें",
            findAi: "AI से और खोजें",
            refresh: "सामग्री रीफ्रेश करें"
          },
          noData: {
            noSchemes: "{{state}} में इस प्रोफ़ाइल के लिए कोई पात्र योजना नहीं मिली।",
            allIndiaBtn: "अखिल भारतीय योजनाएं देखें",
            noNews: "फिलहाल कोई समाचार उपलब्ध नहीं है।",
            noVideos: "फिलहाल कोई वीडियो उपलब्ध नहीं है।"
          }
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
