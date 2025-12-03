import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { settleMerchantFunds } from "../../store/slices/ledgerSlice";
import toast from "react-hot-toast";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SettlementPage() {
  const dispatch = useDispatch();
  const { merchantBalance, pspBalance, settlements } = useSelector(
    (state) => state.ledger
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSettlement = () => {
    if (merchantBalance <= 0) return toast.error("No funds to settle");

    setIsProcessing(true);
    setTimeout(() => {
      dispatch(settleMerchantFunds());
      setIsProcessing(false);
      toast.success("Settled funds to Bank Account");
    }, 1500);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Merchant Settlement
      </Typography>

      {/* Top Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderLeft: "6px solid",
              borderColor: "primary.main",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Unsettled (Incoming)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ₩ {merchantBalance.toLocaleString()}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleSettlement}
                disabled={merchantBalance === 0 || isProcessing}
              >
                {isProcessing ? "Processing..." : "Settle Now"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderLeft: "6px solid",
              borderColor: "secondary.main",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Bank Account (Settled)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ₩ {pspBalance.toLocaleString()}
              </Typography>
              <Chip
                icon={<CheckCircleIcon />}
                label="Available for Withdrawal"
                size="small"
                color="secondary"
                variant="outlined"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* History Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader title="Settlement History" />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Settlement ID</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {settlements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No settlements yet
                  </TableCell>
                </TableRow>
              ) : (
                settlements.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ fontFamily: "monospace" }}>
                      {row.id}
                    </TableCell>
                    <TableCell>{row.timestamp}</TableCell>
                    <TableCell fontWeight="bold">
                      ₩ {row.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip label={row.status} color="success" size="small" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
