import News from "../models/News.js";

const createNewsService = (body) => News.create(body);

const findAllNewsService = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const findByIdNewsService = (id) => News.findById(id).populate("user");

const countNewsService = () => News.countDocuments();

const searchByTittleNewsService = (tittle) => {
  console.log(tittle);
  return News.find({ tittle: { $regex: `${tittle || ""}`, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");
};
export {
  createNewsService,
  findAllNewsService,
  countNewsService,
  topNewsService,
  findByIdNewsService,
  searchByTittleNewsService,
};
