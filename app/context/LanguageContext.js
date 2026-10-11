'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Brand & Header
    brandTitle: "BAIL",
    brandHindi: "सेतु",
    tagline: "Your Bridge to Legal Information",
    navHome: "Home",
    navSearch: "Search",
    navAdvocates: "Find Advocate",
    navLegalAid: "Legal Aid",
    navResources: "Resources",
    navAbout: "About",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    profile: "My Profile",

    // Home / Landing
    heroTitle1: "Understand Bail.",
    heroTitle2: "Know Your Rights.",
    heroSubtext: "Get clear information about IPC / BNS sections, bail eligibility, legal procedures and connect with legal aid.",
    heroSearchPlaceholder: "Enter offence, IPC/BNS section or describe your case...",
    popularSearches: "Popular Searches",
    tileBailInfo: "Bail Information",
    tileLegalProvisions: "Legal Provisions",
    tileFindAdvocates: "Find Advocates",
    tileLegalAidSupport: "Legal Aid Support",

    // Search Page
    searchTitle: "Search Offence / Legal Provision",
    searchSubtitle: "Enter a description of the incident, offence name or IPC/BNS section to get relevant legal information.",
    searchByDesc: "Search by Description",
    searchBySection: "Search by Section Number",
    searchPlaceholderDesc: "e.g. stole a mobile phone, 302, hurt, dowry harassment...",
    searchPlaceholderSec: "e.g. 379, 420, 302, 498A, BNS 303...",
    tryCategories: "Or try these categories",

    // Results Page
    resultsFor: "Showing results for:",
    bailEligibility: "Bail Eligibility",
    bailType: "Bail Type",
    typicalTime: "Typical Time Limit",
    generallyBailable: "Generally Bailable",
    regularBail: "Regular Bail",
    all: "All",
    saveSearch: "Save Search",
    sortBy: "Sort by: Relevance",

    // Section Details
    bailable: "Bailable",
    cognizable: "Cognizable",
    nonCompoundable: "Non-Compoundable",
    yes: "Yes",
    no: "No",
    overview: "Overview",
    lawDetails: "Law Details",
    relatedSections: "Related Sections",
    law: "Law",
    sectionNumber: "Section Number",
    description: "Description",
    punishment: "Punishment",
    courtLevel: "Court Level",
    relevantJudgments: "Relevant Judgments",
    viewLandmarkJudgments: "View Landmark Judgments",
    sourceLink: "Source Link",
    disclaimer: "Disclaimer: This information is for educational purposes only and not legal advice. Please consult a qualified advocate for your specific case.",

    // Advocates
    findAdvocatesTitle: "Find Advocates",
    findAdvocatesSubtitle: "Connect with experienced lawyers for legal guidance.",
    cityPlaceholder: "City",
    practiceAreaPlaceholder: "Practice Area",
    languagePlaceholder: "Language",
    searchAdvocates: "Search",
    viewProfile: "View Profile",
    contact: "Contact",
    yearsExperience: "years experience",

    // Legal Aid Application
    applyLegalAidTitle: "Apply for Legal Aid",
    applyLegalAidSubtitle: "Provide your basic information to apply for legal aid.",
    step1: "Applicant Details",
    step2: "Case Details",
    step3: "Documents",
    step4: "Review & Submit",
    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    emailOptional: "Email (Optional)",
    address: "Address",
    state: "State",
    district: "District",
    pincode: "PIN Code",
    next: "Next",
    back: "Back",
    submit: "Submit Application",

    // Login / Signup
    welcomeBack: "Welcome Back!",
    welcomeBackSub: "Access legal information and get support, anytime.",
    welcomeToBailsetu: "Welcome to",
    loginSignupSub: "Access legal information and get support, anytime.",
    feature1: "Save your searches",
    feature2: "Bookmark important sections",
    feature3: "Connect with advocates",
    feature4: "Apply for legal aid",
    mobileOrEmail: "Mobile Number / Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    continueWithGoogle: "Continue with Google",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",

    // Dashboard
    helloUser: "Hello, Rupayan 👋",
    dashboardSub: "Here's your recent activity and saved information.",
    searchesStat: "Searches",
    savedStat: "Saved Sections",
    appsStat: "Applications",
    msgStat: "Messages",
    recentSearchesTitle: "Recent Searches",
    savedSectionsTitle: "Saved Sections",
    viewAll: "View All",

    // Track Application
    trackTitle: "Track Your Legal Aid Application",
    trackSubtitle: "Enter your application number to check the current status.",
    appNumberPlaceholder: "Enter application number (e.g. LA202600123)",
    trackBtn: "Track",
    applicationNo: "Application No:",
    inProgress: "In Progress",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Find answers to common questions about bail, legal process and using BailSETU.",
    searchFaqPlaceholder: "Search FAQs...",

    // About
    aboutTitle: "About BailSETU",
    aboutDescription: "BailSETU (BAIL सेतु) is a legal information platform aimed at making bail-related information easily accessible to everyone. Our mission is to bridge the gap between citizens and legal knowledge through technology, simple language and bilingual way.",
    ourMission: "Our Mission",
    ourMissionText: "Accessible legal information for all citizens regardless of socio-economic background.",
    ourVision: "Our Vision",
    ourVisionText: "Empowered citizens and fair justice facilitated by transparency and clarity.",
    ourValues: "Our Values",
    ourValuesText: "Transparency, Inclusion, Social Impact and Pro-bono legal accessibility.",
    contactUs: "Contact Us",
    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send Message",
    usefulResources: "Useful Resources",
  },
  hi: {
    // Brand & Header
    brandTitle: "BAIL",
    brandHindi: "सेतु",
    tagline: "कानूनी जानकारी का आपका सेतु",
    navHome: "होम",
    navSearch: "खोजें",
    navAdvocates: "वकील खोजें",
    navLegalAid: "कानूनी सहायता",
    navResources: "संसाधन",
    navAbout: "हमारे बारे में",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    profile: "मेरी प्रोफाइल",

    // Home / Landing
    heroTitle1: "जमानत को समझें।",
    heroTitle2: "अधिकार जानें।",
    heroSubtext: "आईपीसी / बीएनएस धाराओं, जमानत पात्रता और कानूनी प्रक्रियाओं की स्पष्ट जानकारी प्राप्त करें तथा मुफ्त विधिक सहायता से जुड़ें।",
    heroSearchPlaceholder: "अपराध, आईपीसी/बीएनएस धारा लिखें या अपना मामला बताएं...",
    popularSearches: "लोकप्रिय खोजें",
    tileBailInfo: "जमानत जानकारी",
    tileLegalProvisions: "कानूनी धाराएं",
    tileFindAdvocates: "वकील खोजें",
    tileLegalAidSupport: "विधिक सहायता",

    // Search Page
    searchTitle: "अपराध / कानूनी धारा खोजें",
    searchSubtitle: "घटना का विवरण, अपराध का नाम या धारा संख्या दर्ज करके तुरंत कानूनी जानकारी प्राप्त करें।",
    searchByDesc: "विवरण द्वारा खोजें",
    searchBySection: "धारा संख्या द्वारा खोजें",
    searchPlaceholderDesc: "उदा. मोबाइल चोरी, 302, मारपीट, दहेज प्रताड़ना...",
    searchPlaceholderSec: "उदा. 379, 420, 302, 498A, BNS 303...",
    tryCategories: "या इन श्रेणियों में देखें",

    // Results Page
    resultsFor: "खोज परिणाम:",
    bailEligibility: "जमानत पात्रता",
    bailType: "जमानत प्रकार",
    typicalTime: "अपेक्षित समय",
    generallyBailable: "सामान्यतः जमानती",
    regularBail: "नियमित जमानत",
    all: "सभी",
    saveSearch: "खोज सहेजें",
    sortBy: "क्रमबद्ध: प्रासंगिकता",

    // Section Details
    bailable: "जमानती (Bailable)",
    cognizable: "संज्ञेय (Cognizable)",
    nonCompoundable: "अशमनीय (Non-Compoundable)",
    yes: "हाँ",
    no: "नहीं",
    overview: "अवलोकन",
    lawDetails: "कानूनी विवरण",
    relatedSections: "संबंधित धाराएं",
    law: "कानून",
    sectionNumber: "धारा संख्या",
    description: "विवरण",
    punishment: "सज़ा",
    courtLevel: "न्यायालय स्तर",
    relevantJudgments: "प्रमुख फैसले",
    viewLandmarkJudgments: "महत्वपूर्ण निर्णय देखें",
    sourceLink: "मूल स्रोत लिंक",
    disclaimer: "अस्वीकरण: यह जानकारी केवल शैक्षिक और जागरूकता उद्देश्यों के लिए है, कानूनी सलाह नहीं। अपने व्यक्तिगत मामले के लिए कृपया किसी योग्य अधिवक्ता से परामर्श लें।",

    // Advocates
    findAdvocatesTitle: "अधिवक्ता खोजें",
    findAdvocatesSubtitle: "कानूनी सलाह और जमानत मामलों के लिए अनुभवी वकीलों से संपर्क करें।",
    cityPlaceholder: "शहर चुनें",
    practiceAreaPlaceholder: "कार्यक्षेत्र चुनें",
    languagePlaceholder: "भाषा चुनें",
    searchAdvocates: "खोजें",
    viewProfile: "प्रोफ़ाइल देखें",
    contact: "संपर्क करें",
    yearsExperience: "वर्ष का अनुभव",

    // Legal Aid Application
    applyLegalAidTitle: "निःशुल्क कानूनी सहायता हेतु आवेदन",
    applyLegalAidSubtitle: "विधिक सहायता प्राप्त करने के लिए अपनी बुनियादी जानकारी दर्ज करें।",
    step1: "आवेदक विवरण",
    step2: "मामले का विवरण",
    step3: "दस्तावेज़",
    step4: "समीक्षा और सबमिट",
    fullName: "पूरा नाम",
    mobileNumber: "मोबाइल नंबर",
    emailOptional: "ईमेल (वैकल्पिक)",
    address: "पता",
    state: "राज्य",
    district: "जिला",
    pincode: "पिन कोड",
    next: "आगे बढ़ें",
    back: "पीछे",
    submit: "आवेदन जमा करें",

    // Login / Signup
    welcomeBack: "पुनः स्वागत है!",
    welcomeBackSub: "कानूनी जानकारी और सहायता कभी भी प्राप्त करें।",
    welcomeToBailsetu: "स्वागत है",
    loginSignupSub: "कानूनी जानकारी और सहायता कभी भी प्राप्त करें।",
    feature1: "अपनी खोजें सहेजें",
    feature2: "महत्वपूर्ण धाराओं को बुकमार्क करें",
    feature3: "अनुभवी वकीलों से संपर्क करें",
    feature4: "विधिक सहायता के लिए आवेदन करें",
    mobileOrEmail: "मोबाइल नंबर / ईमेल",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड भूल गए?",
    continueWithGoogle: "गूगल के साथ जारी रखें",
    dontHaveAccount: "खाता नहीं है?",
    alreadyHaveAccount: "पहले से खाता है?",

    // Dashboard
    helloUser: "नमस्ते, रुपायन 👋",
    dashboardSub: "यहाँ आपकी हालिया गतिविधियाँ और सहेजी गई जानकारी है।",
    searchesStat: "खोजें",
    savedStat: "सहेजी गई धाराएं",
    appsStat: "आवेदन",
    msgStat: "संदेश",
    recentSearchesTitle: "हालिया खोजें",
    savedSectionsTitle: "सहेजी गई धाराएं",
    viewAll: "सभी देखें",

    // Track Application
    trackTitle: "विधिक सहायता आवेदन ट्रैक करें",
    trackSubtitle: "वर्तमान स्थिति जानने के लिए अपना आवेदन क्रमांक दर्ज करें।",
    appNumberPlaceholder: "आवेदन क्रमांक दर्ज करें (उदा. LA202600123)",
    trackBtn: "ट्रैक करें",
    applicationNo: "आवेदन क्रमांक:",
    inProgress: "प्रगति पर है",

    // FAQ
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
    faqSubtitle: "जमानत, अदालती प्रक्रिया और BailSETU के उपयोग से जुड़े आम सवालों के जवाब।",
    searchFaqPlaceholder: "प्रश्न खोजें...",

    // About
    aboutTitle: "BailSETU के बारे में",
    aboutDescription: "BailSETU (BAIL सेतु) एक विधिक सूचना मंच है जिसका उद्देश्य जमानत संबंधी जानकारी को हर नागरिक तक सुलभ बनाना है। हमारा मिशन तकनीक, सरल भाषा और द्विभाषी पहुंच के जरिए नागरिकों और कानून के बीच सेतु बनना है।",
    ourMission: "हमारा मिशन",
    ourMissionText: "सामाजिक-आर्थिक पृष्ठभूमि की परवाह किए बिना सभी के लिए सुलभ कानूनी ज्ञान।",
    ourVision: "हमारा विजन",
    ourVisionText: "सशक्त नागरिक और पारदर्शी, निष्पक्ष न्याय व्यवस्था।",
    ourValues: "हमारे मूल्य",
    ourValuesText: "पारदर्शिता, समावेशिता, सामाजिक प्रभाव और निःशुल्क विधिक सेवा।",
    contactUs: "संपर्क करें",
    name: "नाम",
    email: "ईमेल",
    message: "संदेश",
    sendMessage: "संदेश भेजें",
    usefulResources: "उपयोगी कानूनी संसाधन",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bailsetu_lang');
      if (saved === 'hi' || saved === 'en') {
        setLanguageState(saved);
      }
    } catch (e) {
      // ignore localstorage errors
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('bailsetu_lang', lang);
    } catch (e) {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'hi' : 'en';
    setLanguage(next);
  };

  const t = (key, fallback = '') => {
    const dict = translations[language] || translations.en;
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    return translations.en[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key) => key,
    };
  }
  return context;
};
