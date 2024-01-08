import News from "../models/News.js";

const createNewsService = (body) => News.create(body);

const findAllNewsService = () => News.find();

export { createNewsService, findAllNewsService };
