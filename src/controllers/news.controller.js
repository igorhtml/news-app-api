import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.send(401);
    }
    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (parts.lenght !== 2) {
      return res.send(401); 
    }

    if (schema !== "Bearer") {
      return res.send(401);
    }

    res.send({ schema, token });

    // const { tittle, text, banner } = req.body;
    // if (!tittle && !text && !banner) {
    //   return res
    //     .status(400)
    //     .send({ message: "Submit all fields to create a new" });
    // }

    // await createService({
    //   tittle,
    //   text,
    //   banner,
    //   user: { _id: "659556cb324ba6a9b44c7a05" },
    // });

    // res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const news = await findAllService();
  if (news.lenght === 0) {
    return res.status(400).send({ message: "No news" });
  }

  res.send(news);
};

export { create, findAll };
