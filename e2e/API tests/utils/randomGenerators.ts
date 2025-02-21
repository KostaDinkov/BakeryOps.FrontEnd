const firstNames = [
    "Maria", "Ivan", "Elena", "Georgi", "Nina",
    "Peter", "Anna", "Dimitar", "Sofia", "Alex",
    "Mihail", "Katerina", "Vesela", "Stoyan", "Lyubomir",
    "Teodora", "Boris", "Diana",
    // Additional English names
    "John", "James", "William", "David", "Emily",
    "Emma", "Olivia", "Sophia", "Michael", "Jacob", "Ethan"
];

const lastNames = [
    "Ivanov", "Dimitrov", "Petrov", "Georgiev", "Nikolov",
    "Todorov", "Kovachev", "Popov", "Stoianov", "Vasilev",
    "Rusev", "Hristov", "Mladenov", "Angelov", "Vasileva",
    "Markov", "Stoychev", "Andonov",
    // Additional English surnames
    "Smith", "Johnson", "Williams", "Brown", "Jones",
    "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"
];

const materialNames = [
    // Basic Ingredients
    "All-Purpose Flour", "Cake Flour", "Wheat Flour", "Rye Flour",
    "Granulated Sugar", "Brown Sugar", "Powdered Sugar", "Caster Sugar",
    "Butter", "Margarine", "Vegetable Oil", "Olive Oil",
    "Eggs", "Milk", "Heavy Cream", "Buttermilk",
    "Yeast", "Baking Powder", "Baking Soda", "Salt",
    
    // Flavorings & Spices
    "Vanilla Extract", "Almond Extract", "Lemon Extract",
    "Cinnamon", "Nutmeg", "Cardamom", "Ginger",
    "Cocoa Powder", "Dark Chocolate", "Milk Chocolate", "White Chocolate",
    
    // Nuts & Fruits
    "Almonds", "Walnuts", "Pecans", "Hazelnuts",
    "Raisins", "Dried Cranberries", "Candied Orange Peel", "Dates",
    
    // Decorations
    "Sprinkles", "Food Coloring", "Fondant", "Marzipan",
    "Chocolate Chips", "Coconut Flakes", "Pearl Sugar",
    
    // Additional Ingredients
    "Cream Cheese", "Sour Cream", "Yogurt",
    "Honey", "Maple Syrup", "Molasses",
    "Peanut Butter", "Jam", "Fruit Preserves",
    "Whipping Cream", "Condensed Milk"
];

const companyNames = [
    // Local Bakeries
    "Sweet Haven Bakery", "Golden Crust Co.", "Morning Glory Bakes",
    "Sunshine Pastries", "Royal Bread House", "Fresh Batch Bakery",
    "The Daily Knead", "Flour Power Bakery", "Sugar & Spice",
    "Heritage Baking Co.", "The Grateful Bread", "Baker's Delight",
    
    // Confectionery Companies
    "Sweet Dreams Confections", "Candy Land Delights", "Pure Indulgence",
    "Sweet Symphony", "Divine Desserts", "Sugar Cloud Sweets",
    "Crystal Sugar Works", "Premium Treats Co.", "Delightful Bites",
    "Signature Sweets", "Perfect Pastry", "Sweet Sensations",
    
    // Industrial/Commercial
    "Global Bakery Solutions", "Premium Food Industries",
    "United Baking Group", "European Pastry Systems",
    "Master Bakers Alliance", "Quality Foods Ltd.",
    "Imperial Food Products", "Superior Baking Co.",
    "Foodtech Solutions", "Advanced Bakery Systems",
    
    // Traditional/Artisanal
    "Old World Bakehouse", "Artisan's Pride", "Traditional Tastes",
    "Classic Confections", "Family Baker's Guild", "Heritage Foods",
    "Authentic Bites", "Craft Bakery Works", "Master's Touch",
    
    // Modern/Trendy
    "Urban Baking Lab", "The Smart Baker", "Next Gen Foods",
    "Green Bakery Co.", "Pure & Simple", "Modern Munch",
    "Innovative Bakes", "Fresh Forward", "Smart Snacks",
    
    // Specialty
    "Gluten Free Masters", "Organic Baking Co.", "Vegan Delights",
    "Health First Bakery", "Natural Bites", "Wellness Baking"
];

export function generateRandomName(): string {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
}

export function generateRandomMaterial(): string {
    return materialNames[Math.floor(Math.random() * materialNames.length)];
}

export function generateRandomCompany(): string {
    return companyNames[Math.floor(Math.random() * companyNames.length)];
}

export function generateRandomFiveDigitNumber(): number {
    return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
}

// Usage example:
// const randomName = generateRandomName(); // e.g. "Maria Ivanov"
// const randomMaterial = generateRandomMaterial(); // e.g. "All-Purpose Flour"
// const randomNumber = generateRandomFiveDigitNumber(); // e.g. 45237
// const randomCompany = generateRandomCompany(); // e.g. "Sweet Haven Bakery"