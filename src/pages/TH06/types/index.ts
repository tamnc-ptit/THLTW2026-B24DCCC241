export interface Destination {
  id: number;
  name: string;
  location: string;
  type: "beach" | "mountain" | "city";
  rating: number;
  cost: number;
  image: string;
}

export interface ItineraryItem {
  id: number;
  name: string;
  day: number;
  cost: number;
}