import E500 from "../utils/E500.js";
import F400 from "./F400.js";

const catcher = (asyncFN) => {
  return (req, res) => {
    asyncFN(req, res).catch((err) => {
      /validation\sfailed/.test(err.message)
        ? res.status(400).json(F400(err.message))
        : res.status(500).json(E500(err.message));
    });
  };
};

export default catcher;
