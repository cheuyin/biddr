import query from "../db.js";

export const QueryBid = async (bidId) => {
  try {
    const result = await query("SELECT * FROM bid WHERE bidId = $1", [bidId]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryAllBidsForAuction = async (auctionId) => {
  try {
    const result = await query("SELECT * FROM bid WHERE postId = $1", [
      auctionId,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryAllBidsForWallet = async (walletName, email) => {
  try {
    const result = await query(
      "SELECT * FROM bid WHERE walletName = $1 AND email = $2",
      [walletName, email]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryHighestBidForAuction = async (auctionId) => {
  try {
    const result = await query(
      "SELECT MAX(amount) FROM bid WHERE postId = $1",
      [auctionId]
    );
    if (result.length === 0) {
      return 0;
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const CreateBid = async (
  walletName,
  email,
  postId,
  amount,
  timeCreated
) => {
  try {
    const bidId = await query(
      "INSERT INTO bid (walletName, email, postID, amount, timecreated, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING bidID",
      [walletName, email, postId, amount, timeCreated, "highest"]
    );
    return await query(
      "UPDATE bid SET status = NULL WHERE postID = $1 AND status = 'highest' AND bidID <> $2",
      [postId, bidId]
    );
  } catch (error) {
    throw error;
  }
};

// export const UpdateWalletBalance = async (walletName, email, balance) => {
//   try {
//     return await query(
//       "UPDATE Wallet SET balance = $1 WHERE walletName = $2 AND email = $3",
//       [balance, walletName, email]
//     );
//   } catch (error) {
//     throw error;
//   }
// };

// export const CreateWallet = async (walletName, email) => {
//   try {
//     return await query(
//       "INSERT INTO Wallet (walletName, email, balance) VALUES ($1, $2, $3)",
//       [walletName, email, 0]
//     );
//   } catch (error) {
//     throw error;
//   }
// };

// export const BurnWallet = async (walletName, email) => {
//   try {
//     return await query(
//       "DELETE FROM Wallet WHERE walletName = $1 AND email = $2",
//       [walletName, email]
//     );
//   } catch (error) {
//     throw error;
//   }
// };

// export const CreateJoin = async (name, email) => {
//   try {
//     return await query("INSERT INTO Joins(walletName, email) VALUES ($1, $2)", [
//       name,
//       email,
//     ]);
//   } catch (error) {
//     return error;
//   }
// };

// export const RemoveJoin = async (name, email) => {
//   try {
//     return await query(
//       "DELETE FROM Joins WHERE walletName = $1 AND email = $2",
//       [name, email]
//     );
//   } catch (error) {
//     return error;
//   }
// };
