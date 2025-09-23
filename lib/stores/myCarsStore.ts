import { create } from "zustand";

export type MyCar = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  description?: string | null;
  location?: string | null;
  whatsappNumber?: string | null;
  status?: "ACTIVE" | "SOLD" | "CANCELLED";
};

type MyCarsState = {
  cars: MyCar[];
  loading: boolean;
  refetch: () => Promise<void>;
  setCars: (cars: MyCar[]) => void;
  updateCar: (car: MyCar) => void;
  removeCar: (id: string) => void;
};

export const useMyCarsStore = create<MyCarsState>((set, get) => ({
  cars: [],
  loading: false,
  setCars: (cars) => set({ cars }),
  updateCar: (car) =>
    set({ cars: get().cars.map((c) => (c.id === car.id ? car : c)) }),
  removeCar: (id) => set({ cars: get().cars.filter((c) => c.id !== id) }),
  refetch: async () => {
    try {
      set({ loading: true });
      const res = await fetch("/api/my/cars", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as MyCar[];
      set({ cars: data });
    } finally {
      set({ loading: false });
    }
  },
}));
