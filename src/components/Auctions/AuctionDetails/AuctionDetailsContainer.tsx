import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AuctionDetails from "./AuctionDetails";
import { Bidder, selectBidders } from "../../../features/services/biddersSlice";

const AuctionDetailsContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bidders = useSelector(selectBidders);

  const bidderInfo = bidders.find((bidder) => bidder.id === Number(id));

  return bidderInfo ? <AuctionDetails bidderInfo={bidderInfo} /> : null;
};

export default AuctionDetailsContainer;
