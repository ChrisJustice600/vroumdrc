// Mock data for the AutoDirect platform
export interface User {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  isActive: boolean;
  subscriptionExpiry: Date;
  createdAt: Date;
}

export interface Car {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  location: string;
  images: string[];
  whatsappNumber: string;
  sellerName: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planType: "monthly";
  amount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  paymentId: string;
}

// Mock users data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    whatsapp: "+1234567890",
    isActive: true,
    subscriptionExpiry: new Date("2024-02-15"),
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    whatsapp: "+1234567891",
    isActive: true,
    subscriptionExpiry: new Date("2024-03-01"),
    createdAt: new Date("2024-01-05"),
  },
];

// Mock cars data
export const mockCars: Car[] = [
  {
    id: "1",
    sellerId: "1",
    title: "2022 BMW X5 - Luxury SUV",
    description:
      "Excellent condition BMW X5 with premium features, leather interior, and advanced safety systems.",
    brand: "BMW",
    model: "X5",
    year: 2022,
    mileage: 15000,
    price: 65000,
    location: "New York, NY",
    images: ["/banner.png", "/banner.png"],
    whatsappNumber: "+1234567890",
    sellerName: "John Smith",
    createdAt: new Date("2024-01-10"),
    isActive: true,
  },
  {
    id: "2",
    sellerId: "2",
    title: "2022 BMW X5 - Luxury SUV",
    description:
      "Excellent condition BMW X5 with premium features, leather interior, and advanced safety systems.",
    brand: "BMW",
    model: "X5",
    year: 2022,
    mileage: 15000,
    price: 65000,
    location: "New York, NY",
    images: ["/banner.png", "/banner.png"],
    whatsappNumber: "+1234567890",
    sellerName: "Etienne Smith",
    createdAt: new Date("2024-01-10"),
    isActive: true,
  },
  // {
  //   id: '2',
  //   sellerId: '2',
  //   title: '2021 Mercedes C-Class - Sport Edition',
  //   description: 'Beautiful Mercedes C-Class with sport package, AMG wheels, and premium sound system.',
  //   brand: 'Mercedes',
  //   model: 'C-Class',
  //   year: 2021,
  //   mileage: 22000,
  //   price: 45000,
  //   location: 'Los Angeles, CA',
  //   images: [
  //     'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
  //   ],
  //   whatsappNumber: '+1234567891',
  //   sellerName: 'Sarah Johnson',
  //   createdAt: new Date('2024-01-12'),
  //   isActive: true,
  // },
  // {
  //   id: '3',
  //   sellerId: '1',
  //   title: '2023 Audi A4 - Executive Package',
  //   description: 'Brand new Audi A4 with executive package, virtual cockpit, and quattro all-wheel drive.',
  //   brand: 'Audi',
  //   model: 'A4',
  //   year: 2023,
  //   mileage: 5000,
  //   price: 52000,
  //   location: 'Chicago, IL',
  //   images: [
  //     'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800'
  //   ],
  //   whatsappNumber: '+1234567890',
  //   sellerName: 'John Smith',
  //   createdAt: new Date('2024-01-15'),
  //   isActive: true,
  // },
  // {
  //   id: '4',
  //   sellerId: '2',
  //   title: '2020 Toyota Camry - Hybrid',
  //   description: 'Reliable Toyota Camry Hybrid with excellent fuel economy and comprehensive service history.',
  //   brand: 'Toyota',
  //   model: 'Camry',
  //   year: 2020,
  //   mileage: 35000,
  //   price: 28000,
  //   location: 'Miami, FL',
  //   images: [
  //     'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800'
  //   ],
  //   whatsappNumber: '+1234567891',
  //   sellerName: 'Sarah Johnson',
  //   createdAt: new Date('2024-01-18'),
  //   isActive: true,
  // },
];

// Mock API functions
export const api = {
  // Users
  async getUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockUsers]), 500);
    });
  },

  async getUserById(id: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === id);
        resolve(user || null);
      }, 300);
    });
  },

  async createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        };
        mockUsers.push(newUser);
        resolve(newUser);
      }, 500);
    });
  },

  // Cars
  async getCars(filters?: {
    brand?: string;
    model?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
  }): Promise<Car[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let cars = [...mockCars.filter((car) => car.isActive)];

        if (filters) {
          if (filters.brand) {
            cars = cars.filter((car) =>
              car.brand.toLowerCase().includes(filters.brand!.toLowerCase())
            );
          }
          if (filters.model) {
            cars = cars.filter((car) =>
              car.model.toLowerCase().includes(filters.model!.toLowerCase())
            );
          }
          if (filters.minPrice) {
            cars = cars.filter((car) => car.price >= filters.minPrice!);
          }
          if (filters.maxPrice) {
            cars = cars.filter((car) => car.price <= filters.maxPrice!);
          }
          if (filters.location) {
            cars = cars.filter((car) =>
              car.location
                .toLowerCase()
                .includes(filters.location!.toLowerCase())
            );
          }
        }

        resolve(cars);
      }, 500);
    });
  },

  async getCarById(id: string): Promise<Car | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const car = mockCars.find((c) => c.id === id && c.isActive);
        resolve(car || null);
      }, 300);
    });
  },

  async createCar(carData: Omit<Car, "id" | "createdAt">): Promise<Car> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCar: Car = {
          ...carData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        };
        mockCars.push(newCar);
        resolve(newCar);
      }, 500);
    });
  },

  async updateCar(id: string, carData: Partial<Car>): Promise<Car | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const carIndex = mockCars.findIndex((c) => c.id === id);
        if (carIndex !== -1) {
          mockCars[carIndex] = { ...mockCars[carIndex], ...carData };
          resolve(mockCars[carIndex]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  async deleteCar(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const carIndex = mockCars.findIndex((c) => c.id === id);
        if (carIndex !== -1) {
          mockCars[carIndex].isActive = false;
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },

  // Authentication
  async login(email: string, password: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.email === email);
        // In a real app, you'd verify the password hash
        resolve(user || null);
      }, 800);
    });
  },

  async register(userData: {
    name: string;
    email: string;
    whatsapp: string;
    password: string;
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find((u) => u.email === userData.email);
        if (existingUser) {
          reject(new Error("User already exists"));
          return;
        }

        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: userData.name,
          email: userData.email,
          whatsapp: userData.whatsapp,
          isActive: false, // Requires subscription activation
          subscriptionExpiry: new Date(),
          createdAt: new Date(),
        };

        mockUsers.push(newUser);
        resolve(newUser);
      }, 800);
    });
  },

  // Subscription
  async activateSubscription(
    userId: string,
    paymentId: string
  ): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          const subscriptionExpiry = new Date();
          subscriptionExpiry.setMonth(subscriptionExpiry.getMonth() + 1);

          mockUsers[userIndex] = {
            ...mockUsers[userIndex],
            isActive: true,
            subscriptionExpiry,
          };

          resolve(mockUsers[userIndex]);
        } else {
          resolve(null);
        }
      }, 1000);
    });
  },
};

export const carBrands = [
  "BMW",
  "Mercedes",
  "Audi",
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "Volkswagen",
  "Nissan",
  "Hyundai",
  "Mazda",
  "Subaru",
  "Lexus",
  "Infiniti",
];
