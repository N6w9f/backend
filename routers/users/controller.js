import bcrypt from "bcryptjs";

import F400 from "../../utils/F400.js";
import catcher from "../../utils/catcher.js";
import tokenGen from "../../utils/tokenGen.js";

// db
import Users from "../../models/users.js";

// auth
const login = catcher(async (req, res) => {
  const { email, password } = req.body.data;

  const user = await Users.findOne({ email: email });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = tokenGen({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });

      await Users.updateOne({ _id: user._id }, { $set: { token: token } });

      res.status(200).json({ token });
    } else {
      console.log("wrong");
      res.status(400).json(F400(`password not match`));
    }
  } else {
    res.status(404).json(F400());
  }
});

// export functions

export { login };
