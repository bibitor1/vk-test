import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStory, fetchComments } from '../api/hackerNewsAPI';
import CommentList from '../components/CommentList';
import { Story, Comment } from '../types';

const News: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const story = await fetchStory(Number(id));
        setStory(story);
        if (story.kids) {
          const comments = await fetchComments(story.kids);
          setComments(comments);
        }
      }
    };
    fetchData();
  }, [id]);

  if (!story) return <div>Loading...</div>;

  return (
    <div>
      <h1>{story.title}</h1>
      <p>Score: {story.score} | By: {story.by}</p>
      {story.url && <a href={story.url} target="_blank" rel="noopener noreferrer">Read full article</a>}
      <CommentList comments={comments} />
    </div>
  );
};

export default News;
