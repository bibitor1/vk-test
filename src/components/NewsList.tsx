import React from 'react';
import NewsItem from './NewsItem';
import styles from '../styles/NewsList.module.css';
import { Story } from '../types';

interface NewsListProps {
  stories: Story[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

const NewsList: React.FC<NewsListProps> = ({ stories, favorites, onToggleFavorite }) => {
  const seenIds = new Set<number>();

  const uniqueStories = stories.filter(story => {
    if (seenIds.has(story.id)) {
      return false;
    } else {
      seenIds.add(story.id);
      return true;
    }
  });

  return (
    <div className={styles.newsList}>
      {uniqueStories.map(story => (
        <NewsItem
          key={story.id}
          id={story.id}
          title={story.title}
          score={story.score}
          by={story.by}
          descendants={story.descendants}
          isFavorite={favorites.includes(story.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default NewsList;
