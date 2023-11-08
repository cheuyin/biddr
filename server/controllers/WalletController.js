import { QueryWallet } from "../services/WalletTable.js";
import { QueryAllWalletsForUser } from "../services/WalletTable.js";
import { UpdateWalletBalance } from "../services/WalletTable.js";
import { CreateWallet } from "../services/WalletTable.js";
import { BurnWallet } from "../services/WalletTable.js";

export const GetWallet = async (req, res) => {
  const walletName = req.params.name;
  const email = req.params.email;
  try {
    const data = await QueryWallet(walletName, email);
    return res.status(200).json(data);
  } catch (err) {
    return res.send(err.toString());
  }
};

export const GetAllWallets = async (req, res) => {
  const email = req.params.email;
  try {
    const data = await QueryAllWalletsForUser(email);
    return res.status(200).json(data);
  } catch (err) {
    return res.send(err.toString());
  }
};

export const PutWalletBalance = async (req, res) => {
  const walletName = req.params.name;
  const email = req.params.email;
  const { balance } = req.body;
  if (!balance) {
    return res
      .status(400)
      .json({ error: "Ok, next time I will give u null balance" });
  }
  try {
    await UpdateWalletBalance(walletName, email, balance);
    return res.status(200).json({ message: "New balance set" });
  } catch (err) {
    return res.send(err.toString());
  }
};

export const PostWallet = async (req, res) => {
  const { walletName, email } = req.body;
  if (!walletName || !email) {
    return res
      .status(400)
      .json({ error: "Give me the wallet name and email pls" });
  }
  try {
    await CreateWallet(walletName, email);
    return res.status(200).json({ message: "Created new wallet" });
  } catch (err) {
    if (err.code == 23505) {
      return res.status(409).json({ message: "That wallet already exists!" });
    }
    return res.send(err.toString());
  }
};

export const DeleteWallet = async (req, res) => {
  console.log("DELETE CALLED");
  const { walletName, email } = req.body;
  if (!walletName || !email) {
    return res
      .status(400)
      .json({ error: "Give me the wallet name and email pls" });
  }
  try {
    await BurnWallet(walletName, email);
    return res.status(200).json({ message: "Wallet is now gone" });
  } catch (err) {
    return res.send(err.toString());
  }
};
