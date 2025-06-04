import axios from 'axios';

export interface GoogleBook {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
}

export interface WishlistBook {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  status: string;
}