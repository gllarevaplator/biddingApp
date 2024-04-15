import React from "react";
import { Bidder } from "../../../features/services/biddersSlice";
import { useFormik } from "formik";
import { calculateRemainingTime } from "../Utilities/calculateRemainingTime";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputForm from "../Forms/InputForm";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateBid } from "../../../features/services/biddersSlice";
import { selectUser, updateWallet } from "../../../features/services/userSlice";
import { useNavigate } from "react-router-dom";

interface AuctionDetailsProps {
  bidderInfo: Bidder;
}

interface AuctionBid {
  bid: number;
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ bidderInfo }) => {
  const remainingTime = calculateRemainingTime(bidderInfo.endTime);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { handleSubmit, handleChange, values, touched, errors } =
    useFormik<AuctionBid>({
      initialValues: {
        bid: 0,
      },
      validationSchema: Yup.object().shape({
        bid: Yup.number()
          .required("Bid is required")
          .min(
            bidderInfo.bid,
            `Bid must be greater than the current bid: $${bidderInfo.bid}`
          )
          .moreThan(
            bidderInfo.bid,
            `Bid must be greater than the current bid: $${bidderInfo.bid}`
          )
          .test(
            "balance",
            "Bid amount exceeds your wallet balance",
            (value) => {
              if (user.wallet !== null) {
                return value ? value <= user.wallet : true;
              }
              return true;
            }
          ),
      }),
      onSubmit: (values) => {
        dispatch(updateBid({ id: bidderInfo.id, newBid: values.bid }));
        dispatch(updateWallet(values.bid));
        navigate("/");
      },
    });

  return (
    <div>
      <h1>Product: {bidderInfo.product}</h1>
      <p>Description: {bidderInfo.description}</p>
      <p>Remaining Time: {remainingTime}</p>
      <p>Current Highest Bid: ${bidderInfo.bid}</p>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "30%",
            mb: 2,
          }}
        >
          <InputForm
            id="bid"
            name="bid"
            type="number"
            label="Bid"
            value={values.bid}
            handleChange={handleChange}
            touched={touched.bid}
            errors={errors.bid}
          />
          <Button type="submit" variant="contained">
            Place Bid
          </Button>
        </Box>
      </form>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default AuctionDetails;
