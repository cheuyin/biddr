import query from '../db.js';

export const QueryCommentById = async (commentId) => {
  try {
    const comment = await query('SELECT * FROM Comment WHERE commentId = $1', [
      commentId,
    ]);
    return comment;
  } catch (error) {
    throw error;
  }
};

export const QueryCommentsByPost = async (postId) => {
  try {
    const commentsOnPost = await query(
      'SELECT * FROM Comment WHERE postId = $1 ORDER BY timeSent DESC',
      [postId],
    );
    return commentsOnPost;
  } catch (error) {
    throw error;
  }
};

export const CreateComment = async (email, postId, text, timeSent) => {
  try {
    return await query(
      'INSERT INTO Comment(email, postId, text, timeSent) VALUES ($1, $2, $3, $4)',
      [email, postId, text, timeSent],
    );
  } catch (error) {
    throw error;
  }
};

export const UpdateComment = async (commentId, text, timeSent) => {
  try {
    return await query(
      'UPDATE Comment SET text = $1, timeSent = $2 WHERE commentId = $3',
      [text, timeSent, commentId],
    );
  } catch (error) {
    throw error;
  }
};

export const DeleteCommentOnPost = async (commentId) => {
  try {
    return await query('DELETE FROM Comment WHERE commentId = $1', [commentId]);
  } catch (error) {
    throw error;
  }
};
