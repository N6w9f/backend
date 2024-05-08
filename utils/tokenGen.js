import jwt from "jsonwebtoken";

const tokenGen = (object) => {
  const token = jwt.sign(
    {
      _id: object._id,
      username: object.username,
      email: object.email,
      role: object.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return token;
};

export default tokenGen