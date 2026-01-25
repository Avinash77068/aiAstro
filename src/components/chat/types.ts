export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Astrologer {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
  verified: boolean;
  image?: string;
  languages?: string[];
  experience?: string;
  reviews?: number;
  status?: string;
  sessionType?: string;
  specialization?: string[];
  description?: string;
}

export interface ChatScreenProps {
  route?: {
    params?: {
      astrologer?: Astrologer;
    };
  };
  navigation?: any;
  astrologer?: Astrologer;
  onBack?: () => void;
}
