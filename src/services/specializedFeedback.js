// Mock real-time data generator for specialized feedback
export const generateSpecializedFeedback = {
    mentalHealth: () => {
      const apps = ['MindSpace', 'Calm Mind', 'Serenity', 'TherapyConnect', 'MoodTracker'];
      const symptoms = ['Anxiety', 'Depression', 'Stress', 'Sleep Issues', 'Mood Swings'];
      const improvements = ['Better sleep', 'Reduced anxiety', 'Improved mood', 'More relaxed', 'Clear thinking'];
      const challenges = ['Difficulty concentrating', 'Feeling overwhelmed', 'Sleep disturbances', 'Racing thoughts'];
  
      return {
        appName: apps[Math.floor(Math.random() * apps.length)],
        userAge: Math.floor(Math.random() * (65 - 18) + 18),
        rating: Math.floor(Math.random() * 5) + 1,
        symptomsAddressed: symptoms[Math.floor(Math.random() * symptoms.length)],
        improvement: improvements[Math.floor(Math.random() * improvements.length)],
        challenge: challenges[Math.floor(Math.random() * challenges.length)],
        usageDuration: Math.floor(Math.random() * 12) + 1 + ' months',
        recommendationScore: Math.floor(Math.random() * 10) + 1,
        timestamp: new Date().toISOString()
      };
    },
  
    shopping: () => {
      const stores = ['TechHub', 'FashionZone', 'HomeEssentials', 'SportsPro', 'GadgetWorld'];
      const categories = ['Electronics', 'Clothing', 'Home & Living', 'Sports', 'Accessories'];
      const deliveryServices = ['Express', 'Standard', 'Same Day', 'Next Day'];
      const paymentMethods = ['Credit Card', 'Digital Wallet', 'Cash on Delivery', 'Bank Transfer'];
  
      return {
        storeName: stores[Math.floor(Math.random() * stores.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        orderAmount: Math.floor(Math.random() * 1000) + 50,
        deliveryService: deliveryServices[Math.floor(Math.random() * deliveryServices.length)],
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        deliveryTime: Math.floor(Math.random() * 7) + 1 + ' days',
        rating: Math.floor(Math.random() * 5) + 1,
        customerSatisfaction: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString()
      };
    },
  
    companyReview: () => {
      const companies = ['TechCorp', 'InnovateNow', 'GlobalSoft', 'DataDynamics', 'CloudTech'];
      const departments = ['IT', 'HR', 'Marketing', 'Sales', 'Customer Support'];
      const positions = ['Software Engineer', 'Manager', 'Analyst', 'Designer', 'Support Specialist'];
      const benefits = ['Good work-life balance', 'Great benefits', 'Career growth', 'Learning opportunities'];
      const improvements = ['Better communication', 'More training', 'Remote work options', 'Career development'];
  
      return {
        companyName: companies[Math.floor(Math.random() * companies.length)],
        department: departments[Math.floor(Math.random() * departments.length)],
        position: positions[Math.floor(Math.random() * positions.length)],
        employmentStatus: Math.random() > 0.5 ? 'Current' : 'Former',
        rating: Math.floor(Math.random() * 5) + 1,
        pros: benefits[Math.floor(Math.random() * benefits.length)],
        cons: improvements[Math.floor(Math.random() * improvements.length)],
        yearsAtCompany: Math.floor(Math.random() * 5) + 1,
        recommendToFriend: Math.random() > 0.5,
        timestamp: new Date().toISOString()
      };
    }
  };