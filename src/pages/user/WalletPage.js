import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { transferFunds } from "../../store/slices/ledgerSlice";
import toast from "react-hot-toast";

export default function WalletPage() {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const balance = useSelector((state) => state.ledger.userBalance);

  const handleSend = () => {
    if (amount > balance) return toast.error("Insufficient funds");
    dispatch(
      transferFunds({ amount: Number(amount), from: user.name, to: "Merchant" })
    );
    toast.success("Transfer successful");
  };

  return (
    <Box maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Send sKRW
          </Typography>
          <Typography mb={2}>Balance: ₩{balance.toLocaleString()}</Typography>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleSend}>
            Send Payment
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
