import { createNewsService, findAllNewsService } from "../services/news.service.js";

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
  const news = await findAllNewsService();
  if (news.lenght === 0) {
    return res.status(400).send({ message: "No news" });
  }

  res.send(news);
};

export { create, findAll };
