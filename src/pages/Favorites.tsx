import React, { useEffect, useState } from 'react';
import { fetchStory } from '../api/hackerNewsAPI';
import NewsList from '../components/NewsList';
import { Story } from '../types';
import styles from '../styles/NewsList.module.css';

const Favorites: React.FC = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [favorites, setFavorites] = useState<Story[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const stories = await Promise.all(favoriteIds.map(fetchStory));
      setFavorites(stories);
    };
    if (favoriteIds.length) loadFavorites();
  }, [favoriteIds]);

  const handleToggleFavorite = (id: number) => {
    setFavoriteIds(prevFavorites => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className={styles.newsFeed}>
      <h2>Favorites</h2>
      <NewsList stories={favorites} favorites={favoriteIds} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
};

export default Favorites;
