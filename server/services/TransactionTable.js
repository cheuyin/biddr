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
    const result = await query(
      "SELECT * FROM bid WHERE postId = $1 ORDER BY timeCreated DESC",
      [auctionId]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryAllBidsForWallet = async (walletName, email) => {
  try {
    const result = await query(
      "SELECT * FROM bid WHERE walletName = $1 AND email = $2 ORDER BY timeCreated DESC",
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

    if (result[0]["max"] === null) {
      return 0;
    }
    return result[0]["max"];
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
      "UPDATE bid SET status = NULL WHERE postID = $1 AND bidID <> $2",
      [postId, bidId[0]["bidid"]]
    );
  } catch (error) {
    throw error;
  }
};

export const QueryDonation = async (donationId) => {
  try {
    const result = await query("SELECT * FROM donation WHERE donationID = $1", [
      donationId,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryAllDonationsForFundraiser = async (donationId) => {
  try {
    const result = await query(
      "SELECT * FROM donation WHERE postId = $1 ORDER BY timeCreated DESC",
      [donationId]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const QueryAllDonationsForWallet = async (walletName, email) => {
  try {
    const result = await query(
      "SELECT * FROM donation WHERE walletName = $1 AND email = $2 ORDER BY timeCreated DESC",
      [walletName, email]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const CreateDonation = async (
  walletName,
  email,
  postId,
  amount,
  timeCreated
) => {
  try {
    return await query(
      "INSERT INTO donation (walletName, email, postID, amount, timecreated) VALUES ($1, $2, $3, $4, $5)",
      [walletName, email, postId, amount, timeCreated]
    );
  } catch (error) {
    throw error;
  }
};
