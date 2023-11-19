import axios from 'axios';
import { User } from '@/types/types';

const BASE_URL = 'https://swapi.dev/api';

const apiClient = axios.create({
  baseURL: 'https://swapi.dev/api',
});

interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export const swapiService = {
  async getUsers(): Promise<User[]> {
    try {
      const initialResponse = await apiClient.get<PeopleResponse>('/people');
      const totalCount = initialResponse.data.count;
      const pageSize = initialResponse.data.results.length;
      const pageCount = Math.ceil(totalCount / pageSize);

      const urls = Array.from({ length: pageCount }, (_, i) => 
        `${BASE_URL}/people?page=${i + 1}`
      );

      const promises = urls.map(url => axios.get<PeopleResponse>(url));
      const pages = await Promise.all(promises);

      return pages.flatMap(page => page.data.results);
    } catch (error) {
      console.error('Error fetching all people:', error);
      throw new Error('Failed to fetch users');
    }
  },

  async getPlanet(url: string) {
    try {
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching planet:', error);
      throw new Error('Failed to fetch planet data');
    }
  }
};