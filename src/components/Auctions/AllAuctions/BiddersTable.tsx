import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Bidder } from "../../../features/services/biddersSlice";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectUser } from "../../../features/services/userSlice";
import { useSelector, useDispatch } from "react-redux";

interface BiddersTableProps {
  allBidders: Bidder[];
  handleBidderDelete: (bidderId: number) => void;
}

const BiddersTable: React.FC<BiddersTableProps> = ({
  allBidders,
  handleBidderDelete,
}) => {
  const user = useSelector(selectUser);
  const sortedBidders = [...allBidders].sort((a, b) => {
    if (!a.remainingTime || !b.remainingTime) {
      return 0;
    }

    // Sort by hours
    if (!a.remainingTime.includes("day") && !b.remainingTime.includes("day")) {
      const timeA = parseInt(a.remainingTime.split(" ")[0]);
      const timeB = parseInt(b.remainingTime.split(" ")[0]);
      return timeA - timeB;
    }
    // Sort by days
    else if (
      a.remainingTime.includes("day") &&
      b.remainingTime.includes("day")
    ) {
      const timeA = parseInt(a.remainingTime.split(" ")[0]);
      const timeB = parseInt(b.remainingTime.split(" ")[0]);
      return timeA - timeB;
    }
    // Sort hours before days
    else if (
      !a.remainingTime.includes("day") &&
      b.remainingTime.includes("day")
    ) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Top Bid</TableCell>
            <TableCell>Time Remaining</TableCell>
            {user.id ? <TableCell>Actions</TableCell> : <></>}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBidders.map((bidder: Bidder, index: number) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell>
                {user.id ? (
                  <Link to={`/product/${bidder.id}`}>{bidder.product}</Link>
                ) : (
                  <span>{bidder.product}</span>
                )}
              </TableCell>
              <TableCell>{bidder.seller}</TableCell>
              <TableCell>${bidder.bid}</TableCell>
              <TableCell>{bidder.remainingTime}</TableCell>
              {user.id ? (
                <TableCell>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleBidderDelete(bidder.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              ) : (
                <></>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BiddersTable;
