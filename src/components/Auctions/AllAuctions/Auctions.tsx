import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectBidders,
  removeBidder,
} from "../../../features/services/biddersSlice";
import BiddersTable from "./BiddersTable";
import { calculateRemainingTime } from "../Utilities/calculateRemainingTime";
import { Box, Button } from "@mui/material";
import { selectUser } from "../../../features/services/userSlice";
import { logout } from "../../../features/services/userSlice";

const CurrentAuctions: React.FC = () => {
  const bidders = useSelector(selectBidders);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleBidderDelete = (bidderId: number) => {
    dispatch(removeBidder(bidderId));
  };

  const biddersWithRemainingTime = bidders.map((bidder) => ({
    ...bidder,
    remainingTime: calculateRemainingTime(bidder.endTime),
  }));

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Current Auctions</h1>
        {user.id ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <p>Hi, {user.firstname}!</p>
            <Button color="error" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Link to="/register">Register</Link>
          </Box>
        )}
      </Box>
      <BiddersTable
        allBidders={biddersWithRemainingTime}
        handleBidderDelete={handleBidderDelete}
      />
      {user.id ? (
        <>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            <Link to="/new-auction" color="primary">
              New Auction
            </Link>
          </Button>
          <p>Your current wallet is: ${user.wallet}</p>{" "}
        </>
      ) : null}
    </div>
  );
};

export default CurrentAuctions;
