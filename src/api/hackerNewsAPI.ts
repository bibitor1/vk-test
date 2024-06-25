import { Story, Comment } from '../types';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchStoryIds = async (type: 'best' | 'new' | 'top'): Promise<number[]> => {
  const response = await fetch(`${BASE_URL}/${type}stories.json`);
  return response.json();
};

export const fetchStory = async (id: number): Promise<Story> => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
};

export const fetchComments = async (ids: number[]): Promise<Comment[]> => {
  return Promise.all(ids.map(id => fetchStory(id) as unknown as Promise<Comment>));
};
