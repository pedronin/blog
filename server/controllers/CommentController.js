import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';

export const create = async (req, res) => {
  try {
    await PostModel.updateOne({ _id: req.body.postId }, { $inc: { commentsCount: 1 } });

    const doc = new CommentModel({
      text: req.body.text,
      user: req.userId,
      postId: req.body.postId,
    });

    const comment = await doc.save();

    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: 'Ошибка при создании комментария',
      comm: {
        text: req.body.text,
        user: req.userId,
        postId: req.body.id,
      },
    });
  }
};

export const get = async (req, res) => {
  try {
    const сomments = await CommentModel.find({ postId: req.params.id }).populate('user').exec();
    // на случай если удаляем комментарий прямо в бд
    // потом надо будет удалить
    await PostModel.updateOne({ _id: req.params.id }, { commentsCount: сomments.length });

    res.json(сomments);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: 'Ошибка при получении комментариев',
    });
  }
};
