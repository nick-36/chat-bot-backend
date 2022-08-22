import bcrypt from "bcrypt";
import crypto from "crypto";
import * as dotenv from "dotenv";
import { connect } from "getstream";
import { StreamChat } from "stream-chat";
dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password } = req.body;

    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(api_key, api_secret);

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userId);

    const data = { token, fullName, userName, hashedPassword, userId };

    res.status(200).json({
      status: "success",
      user: data,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);

    const { users } = await client.queryUsers({ name: userName });

    if (!users) {
      return res.status(400).json({
        status: "fail",
        message: "USER NOT FOUND!",
      });
    }

    const success = await bcrypt.compare(password, users[0].hashedPassword);

    if (!success) {
      res.status(500).json({
        status: "fail",
        message: "Incorrect Credentials!",
      });
    }

    const token = serverClient.createUserToken(users[0].id);
    const data = {
      token,
      fullName: users[0].fullName,
      userName,
      hashedPassword: users[0].hashedPassword,
      userId: users[0].id,
    };

    res.status(200).json({
      status: "success",
      user: data,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
