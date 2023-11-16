import { QueryCommentById, QueryCommentsByPost, CreateComment, UpdateComment, DeleteCommentOnPost } from "../services/CommentTable.js";

export const GetCommentById = async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await QueryCommentById(commentId);
        return res.status(200).json(comment);
    } catch (err) {
        return res.send(err.toString());
    }
};

export const GetCommentsOnPost = async (req, res) => {
    const postId = req.params.postId;
    try {
        const commentsOnPost = await QueryCommentsByPost(postId);
        return res.status(200).json(commentsOnPost);
    } catch (err) {
        return res.send(err.toString());
    }
};

export const PostComment = async (req, res) => {
    const { email, postId, text } = req.body;
    if (!email || !postId || !text) {
        return res.status(400).json({error: "Missing fields"});
    }
    const currentDate = new Date().toISOString().replace(/\.\d*Z/, "");
    try {
        await CreateComment(email, postId, text, currentDate);
        return res.status(200).json({message: `${email} successfully created new comment on post: ${postId}`});
    } catch(err) {
        return res.send(err.toString());
    }
};

export const PutComment = async (req, res) => {
    const commentId = req.params.commentId;
    const { text }  = req.body;
    if(!commentId || !text) {
        return res.status(400).json({error: "Missing fields"});
    }
    const currentDate = new Date().toISOString().replace(/\.\d*Z/, "");
    try {
        await UpdateComment(commentId, text, currentDate);
        return res.status(200).json({message: `Successfully updated comment ${commentId}`});
    } catch (err) {
        return res.send(err.toString());
    }
}

export const DeleteComment = async(req, res) => {
    const commentId = req.params.commentId;
    try {
        await DeleteCommentOnPost(commentId);
        return res.status(200).json({message: `Successfully deleted comment ${commentId}`});
    } catch (err) {
        return res.send(err.toString());
    }
};

