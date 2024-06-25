import React from 'react';
import { Comment as CommentType } from '../types';
import styles from '../styles/Comment.module.css';
import CommentList from './CommentList';

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <p>
        <strong>{comment.by}</strong> {comment.text}
      </p>
      {comment.kids && <CommentList comments={comment.kids.map(id => ({ id, by: '', text: '', parent: comment.id }))} />}
    </div>
  );
};

export default Comment;
