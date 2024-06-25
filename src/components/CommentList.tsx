import React from 'react';
import Comment from './Comment';
import styles from '../styles/Comment.module.css';
import { Comment as CommentType } from '../types';

const CommentList: React.FC<{ comments: CommentType[] }> = ({ comments }) => {
  return (
    <div className={styles.commentList}>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
