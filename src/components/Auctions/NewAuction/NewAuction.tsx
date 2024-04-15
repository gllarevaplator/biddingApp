import React, { useState } from "react";
import InputForm from "../Forms/InputForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { selectUser, updateWallet } from "../../../features/services/userSlice";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { addBidder } from "../../../features/services/biddersSlice";

interface NewAuctionFormValues {
  productName: string;
  description: string;
  startingBid: number;
  date: Date | string;
}

const NewAuction: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bidError, setBidError] = useState<string>("");

  const { handleSubmit, handleChange, values, touched, errors } =
    useFormik<NewAuctionFormValues>({
      initialValues: {
        productName: "",
        description: "",
        startingBid: 0,
        date: "",
      },
      validationSchema: Yup.object().shape({
        productName: Yup.string()
          .required("Product Name is required")
          .min(3, "Product Name must be at least 3 characters"),
        description: Yup.string()
          .required("Description is required")
          .min(10, "Description must be at least 10 characters"),
        startingBid: Yup.number()
          .required("Starting Bid is required")
          .min(0, "Starting Bid must be greater than or equal to 0")
          .moreThan(0, "Starting Bid must be higher than 0")
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
        date: Yup.date()
          .required("End Date is required")
          .min(
            new Date().toISOString().split("T")[0],
            "End Date must be in the future"
          ),
      }),
      onSubmit: (values) => {
        const newBidder = {
          id: Math.floor(Math.random() * 1000),
          product: values.productName,
          description: values.description,
          bid: values.startingBid,
          seller: user.username ? user.username : "",
          endTime: new Date(values.date),
        };
        const remainingWallet = user.wallet - values.startingBid;
        if (remainingWallet >= 0) {
          navigate("/");
          dispatch(addBidder(newBidder));
          dispatch(updateWallet(values.startingBid));
        } else {
          setBidError("Bid amount exceeds available balance");
        }
      },
    });

  const actudalDate = new Date();
  actudalDate.setDate(actudalDate.getDate() + 1);
  const tomorrowDate = actudalDate.toISOString().split("T")[0];

  return (
    <div>
      <h1>New Auction</h1>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "30%",
          }}
        >
          <TextField
            id="productName"
            name="productName"
            label="Product Name"
            value={values.productName}
            onChange={handleChange}
            error={touched.productName && Boolean(errors.productName)}
            helperText={touched.productName && errors.productName}
          />
          <TextField
            id="description"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
            rows={5}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <TextField
            id="startingBid"
            name="startingBid"
            label="Starting Bid"
            type="number"
            value={values.startingBid}
            onChange={handleChange}
            error={
              (touched.startingBid && Boolean(errors.startingBid)) ||
              Boolean(bidError)
            }
            helperText={(touched.startingBid && errors.startingBid) || bidError}
          />
          <TextField
            id="date"
            name="date"
            label="Select Date"
            type="date"
            value={values.date}
            onChange={handleChange}
            error={touched.date && Boolean(errors.date)}
            helperText={touched.date && errors.date}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: tomorrowDate,
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
        >
          Create Auction
        </Button>
      </form>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NewAuction;
