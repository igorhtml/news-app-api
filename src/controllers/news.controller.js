import {
  createNewsService,
  findAllNewsService,
  countNewsService,
  topNewsService,
  findByIdNewsService,
  searchByTittleNewsService,
  searchByUserService,
  updateNewsService,
  eraseNewsService,
  likeNewsService,
  deleteLikeNewsService,
  addCommentNewsService,
  removeCommentNewsService,
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      return res
        .status(400)
        .send({ message: "Submit all fields to create a new" });
    }

    await createNewsService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) limit = 5;
    if (!offset) offset = 0;

    const news = await findAllNewsService(limit, offset);
    const total = await countNewsService();
    const currentUrl = req.baseUrl;

    const next = limit + offset;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = !null
      ? `${currentUrl}?limit=${limit}&offset=${previous}`
      : null;

    if (news.lenght === 0) {
      return res.status(400).send({ message: "No news" });
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.name,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findLast = async (req, res) => {
  try {
    const lastNew = await topNewsService();
    const result = {
      id: lastNew._id,
      title: lastNew.title,
      text: lastNew.text,
      banner: lastNew.banner,
      likes: lastNew.likes,
      comments: lastNew.comments,
      userName: lastNew.user.name,
      userAvatar: lastNew.user.avatar,
    };
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const news = await findByIdNewsService(id);
    res.send({
      result: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        userName: news.user.name,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    console.log(title);
    const news = await searchByTittleNewsService(title);
    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no news with this tittle" });
    }

    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.name,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchByUser = async (req, res) => {
  try {
    const id = req.userId;

    const news = await searchByUserService(id);
    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no news with this tittle" });
    }

    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.name,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, banner } = req.body;
    if (!title && !text && !banner) {
      return res
        .status(400)
        .send({ message: "Submit at least one field to update a new" });
    }

    const news = await findByIdNewsService(id);

    if (news.user._id != req.userId) {
      return res.status(400).send({ message: "Only can update your news" });
    }
    await updateNewsService(id, title, text, banner);
    return res.status(200).send({ message: "Sucessfully updated new" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findByIdNewsService(id);
    if (news.user._id != req.userId) {
      return res.status(400).send({ message: "Only can delte your news" });
    }

    await eraseNewsService(id);

    return res.sendStatus(200);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const likeNews = async (req, res) => {
  try {
    const idNews = req.params.id;
    const userId = req.userId;

    const like = await likeNewsService(idNews, userId);
    if (!like) {
      await deleteLikeNewsService(idNews, userId);
      return res.status(200).send({ message: "Like succesfully removed" });
    }
    return res.status(200).send({ message: "Liked" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const idNews = req.params.id;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res
        .status(400)
        .send({ message: "Please write a text to comment" });
    }

    await addCommentNewsService(idNews, userId, comment);
    return res.status(200).send({ message: "Comment succefuly added" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const removeComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const deleteComment = await removeCommentNewsService(
      idNews,
      idComment,
      userId
    );

    const thisComment = deleteComment.comments.find(
      (comment) => comment.idComment == idComment
    );

    if (!thisComment) {
      return res.send({ message: "Comment not found" });
    }

    if (thisComment.userId !== req.userId) {
      return res.send({ message: "Can only remove your comment" });
    }
    return res.status(200).send({ message: "Comment succesfully removed" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { create, findAll, findLast, findById, searchByTitle, searchByUser };
