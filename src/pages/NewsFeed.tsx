import React, { useEffect, useState, useCallback } from 'react';
import { fetchStoryIds, fetchStory } from '../api/hackerNewsAPI';
import NewsList from '../components/NewsList';
import styles from '../styles/NewsList.module.css';
import { Link } from 'react-router-dom';
import { Story } from '../types';

const NewsFeed: React.FC = () => {
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'best' | 'new' | 'top'>('top');

  const fetchStories = useCallback(async () => {
    const ids = await fetchStoryIds(sortBy);
    setStoryIds(ids);
  }, [sortBy]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  useEffect(() => {
    const loadStories = async () => {
      const start = (page - 1) * 30;
      const end = start + 30;
      const stories = await Promise.all(storyIds.slice(start, end).map(fetchStory));
      setStories(prev => [...prev, ...stories]);
    };
    if (storyIds.length) loadStories();
  }, [storyIds, page]);

  useEffect(() => {
    const intervalId = setInterval(fetchStories, 30000);
    return () => clearInterval(intervalId);
  }, [fetchStories]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSort = (type: 'best' | 'new' | 'top') => {
    setSortBy(type);
    setStories([]);
    setPage(1);
  };

  const handleManualRefresh = () => {
    fetchStories();
    setStories([]);
    setPage(1);
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className={styles.newsFeed}>
      <div className={styles.buttonGroup}>
        <button onClick={() => handleSort('top')}>Top Stories</button>
        <button onClick={() => handleSort('new')}>New Stories</button>
        <button onClick={() => handleSort('best')}>Best Stories</button>
        <button onClick={handleManualRefresh}>Refresh</button>
        <Link to="/favorites" className={styles.button}>Favorites</Link>
      </div>
      <NewsList stories={stories} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
      <button onClick={handleLoadMore} className={styles.loadMoreButton}>Load More</button>
    </div>
  );
};

export default NewsFeed;
