import {
  createNewsService,
  findAllNewsService,
  countNewsService,
  topNewsService,
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { tittle, text, banner } = req.body;
    if (!tittle && !text && !banner) {
      return res
        .status(400)
        .send({ message: "Submit all fields to create a new" });
    }

    await createNewsService({
      tittle,
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
        tittle: item.tittle,
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
      tittle: lastNew.tittle,
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

export { create, findAll, findLast };
