import jwt from "jsonwebtoken";

const createTokenJWT = (userId) => {
  const token = jwt.sign(
    {
      _id: userId,
    },
    "secret123",
    {
      expiresIn: "30d",
    }
  );

  return token;
};

export default createTokenJWT;
