const postValidate = (req, res, next) => {
  const { name, height, weight, life_span, image, temperament } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name!" });
  if (!height) return res.status(400).json({ error: "Missing height!" });
  if (!weight) return res.status(400).json({ error: "Missing weight!" });
  if (!life_span) return res.status(400).json({ error: "Missing life_span!" });
  if (!image) return res.status(400).json({ error: "Missing image!" });
  if (!temperament)
    return res.status(400).json({ error: "Missing temperament!" });

  next();
};

module.exports = { postValidate };
