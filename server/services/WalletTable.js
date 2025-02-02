import query from '../db.js';

export const QueryWallet = async (walletName, email) => {
  try {
    const result = await query(
      'SELECT * FROM wallet WHERE walletName = $1 AND email = $2',
      [walletName, email],
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryAllWalletsForUser = async (email) => {
  try {
    const result = await query('SELECT * FROM wallet WHERE email = $1', [
      email,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const UpdateWalletBalance = async (walletName, email, balance) => {
  try {
    return await query(
      'UPDATE Wallet SET balance = $1 WHERE walletName = $2 AND email = $3',
      [balance, walletName, email],
    );
  } catch (error) {
    throw error;
  }
};

export const CreateWallet = async (walletName, email) => {
  try {
    return await query(
      'INSERT INTO Wallet (walletName, email, balance) VALUES ($1, $2, $3)',
      [walletName, email, 0],
    );
  } catch (error) {
    throw error;
  }
};

export const BurnWallet = async (walletName, email) => {
  try {
    return await query(
      'DELETE FROM Wallet WHERE walletName = $1 AND email = $2',
      [walletName, email],
    );
  } catch (error) {
    throw error;
  }
};

export const CreateJoin = async (name, email) => {
  try {
    return await query('INSERT INTO Joins(walletName, email) VALUES ($1, $2)', [
      name,
      email,
    ]);
  } catch (error) {
    return error;
  }
};

export const RemoveJoin = async (name, email) => {
  try {
    return await query(
      'DELETE FROM Joins WHERE walletName = $1 AND email = $2',
      [name, email],
    );
  } catch (error) {
    return error;
  }
};
