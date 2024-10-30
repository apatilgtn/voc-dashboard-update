const generateMentalHealthFeedback = () => {
  const appNames = ['MindWell', 'TherapyConnect', 'PeaceApp', 'MoodTracker', 'AnxietyHelper'];
  const symptoms = ['Anxiety', 'Depression', 'Stress', 'Insomnia', 'PTSD'];
  const improvements = ['Better sleep', 'Reduced anxiety', 'Improved mood', 'Better focus'];
  const challenges = ['Time management', 'Daily practice', 'Technical issues'];

  return {
    appName: appNames[Math.floor(Math.random() * appNames.length)],
    userAge: Math.floor(Math.random() * 40) + 18,
    symptomsAddressed: symptoms[Math.floor(Math.random() * symptoms.length)],
    improvement: improvements[Math.floor(Math.random() * improvements.length)],
    challenge: challenges[Math.floor(Math.random() * challenges.length)],
    usageDuration: `${Math.floor(Math.random() * 11) + 1} months`,
    rating: Math.floor(Math.random() * 2) + 4,
    recommendationScore: Math.floor(Math.random() * 3) + 8,
    timestamp: new Date().toISOString()
  };
};

const generateShoppingFeedback = () => {
  const stores = ['TechHub', 'StyleZone', 'HomeStore', 'GadgetWorld'];
  const categories = ['Electronics', 'Clothing', 'Home Decor', 'Accessories'];
  const deliveryServices = ['Express', 'Standard', 'Premium'];
  const paymentMethods = ['Credit Card', 'PayPal', 'Digital Wallet'];

  return {
    storeName: stores[Math.floor(Math.random() * stores.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    customerSatisfaction: Math.floor(Math.random() * 30) + 70,
    orderAmount: Math.floor(Math.random() * 500) + 50,
    deliveryService: deliveryServices[Math.floor(Math.random() * deliveryServices.length)],
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    deliveryTime: `${Math.floor(Math.random() * 5) + 1} days`,
    rating: Math.floor(Math.random() * 2) + 4,
    timestamp: new Date().toISOString()
  };
};

const generateCompanyReview = () => {
  const companies = ['TechCorp', 'InnoSystems', 'GlobalTech', 'FutureWorks'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'Product'];
  const positions = ['Developer', 'Manager', 'Analyst', 'Designer'];
  const pros = [
    'Great work environment',
    'Excellent benefits',
    'Good work-life balance',
    'Growth opportunities'
  ];
  const cons = [
    'Fast-paced environment',
    'Complex processes',
    'Limited remote options',
    'High expectations'
  ];

  return {
    companyName: companies[Math.floor(Math.random() * companies.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    employmentStatus: Math.random() > 0.3 ? 'Current' : 'Former',
    pros: pros[Math.floor(Math.random() * pros.length)],
    cons: cons[Math.floor(Math.random() * cons.length)],
    yearsAtCompany: Math.floor(Math.random() * 5) + 1,
    recommendToFriend: Math.random() > 0.2,
    timestamp: new Date().toISOString()
  };
};

export const generateSpecializedFeedback = {
  mentalHealth: generateMentalHealthFeedback,
  shopping: generateShoppingFeedback,
  company: generateCompanyReview
};