import React from 'react';
import styles from '../styles/NewsItem.module.css';
import { Story } from '../types';
import { Link } from 'react-router-dom';

interface NewsItemProps extends Story {
  isFavorite?: boolean;
  onToggleFavorite: (id: number) => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ id, title, score, by, descendants, isFavorite, onToggleFavorite }) => {
  return (
    <div className={styles.newsItem}>
      <a href={`https://news.ycombinator.com/item?id=${id}`} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
      <div>
        Score: {score} | By: {by} | 
        <Link to={`/news/${id}`}>Comments: {descendants}</Link>
      </div>
      <button onClick={() => onToggleFavorite(id)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default NewsItem;
