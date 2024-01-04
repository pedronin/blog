import PostModel from '../models/Post.js';
import CommentModel from '../models/Comment.js';

export const create = async (req, res) => {
  try {
    const tags = [...new Set(req.body.tags.split(' '))].filter((el) => el !== ' ');

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка при создани статьи',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    let posts = await PostModel.find().populate('user').exec();
    const query = req.query;

    if (query.tag) {
      const tag = query.tag;
      posts = posts.filter((el) => el.tags.includes(tag));
    }

    if (query.sortTo === 'new') {
      posts = posts.reverse();
    } else if (query.sortTo === 'popular') {
      posts.sort((a, b) => b.viewsCount - a.viewsCount);
    }

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка при получении статей',
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const post = await PostModel.find().limit(5).exec();

    const arr = post.map((obj) => obj.tags);
    const tags = [...new Set(arr.flat())].slice(0, 5);

    if (!tags) {
      return res.status(404).json({
        message: 'Теги не найдены',
      });
    }

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось вернуть теги',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { new: true },
    )
      .populate('user')
      .exec();
    // const post = await PostModel.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({
        message: 'Статья не найденна',
      });
    }

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось вернуть статью',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndDelete({ _id: postId });

    await CommentModel.deleteMany({ postId: postId }) 

    if (!post) {
      return res.status(404).json({
        message: 'Статья не найденна',
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const tags = [...new Set(req.body.tags)].filter((el) => el !== '');

    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        tags: tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};

// export const createComment = async (req, res) => {
//   try {
//     const newComment = {
//       text: req.body.text,
//       user: req.userId,
//     };

//     const post = await PostModel.findOne({ _id: req.params.id });

//     const newComments = [...post.comments, newComment];

//     await PostModel.updateOne(
//       { _id: req.params.id },
//       { comments: newComments },
//       { $inc: { commentsCount: 1 } },
//     );

//     res.json({
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(403).json({
//       message: 'Ошибка при создании комментария',
//     });
//   }
// };
