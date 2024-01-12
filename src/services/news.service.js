import News from "../models/News.js";

const createNewsService = (body) => News.create(body);

const findAllNewsService = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const findByIdNewsService = (id) => News.findById(id).populate("user");

const countNewsService = () => News.countDocuments();

const searchByTittleNewsService = (title) =>
  News.find({ title: { $regex: `${title || ""}`, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");

const searchByUserService = (id) => {
  return News.find({ user: id }).sort({ _id: -1 }).populate("user");
};

const updateNewsService = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

const eraseNewsService = (id) => News.findByIdAndDelete(id);

export const likeNewsService = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

export const deleteLikeNewsService = (idNews, userId) =>
  News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

export {
  createNewsService,
  findAllNewsService,
  countNewsService,
  topNewsService,
  findByIdNewsService,
  searchByTittleNewsService,
  searchByUserService,
  updateNewsService,
  eraseNewsService,
};
