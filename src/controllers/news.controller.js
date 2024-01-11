import {
  createNewsService,
  findAllNewsService,
  countNewsService,
  topNewsService,
  findByIdNewsService,
  searchByTittleNewsService,
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

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const news = await findByIdNewsService(id);
    res.send({
      result: {
        id: news._id,
        tittle: news.tittle,
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

const searchByTittle = async (req, res) => {
  try {
    const { tittle } = req.query;
    console.log(tittle);
    const news = await searchByTittleNewsService(tittle);
    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no news with this tittle" });
    }

    return res.send({
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

export { create, findAll, findLast, findById, searchByTittle };
