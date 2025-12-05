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
import WalletCard from "../../components/WalletCard";
import StyledTable from "../../components/StyledTable";
import PageHeader from "../../components/PageHeader";
import { headerright } from "../../assets/images";
import SectionHeader from "../../components/SectionHeader";
import SettleFundsModal from "../../components/modal/SettleFundsModal";

export default function WalletPage() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <PageHeader
        // title="KYC Verification"
        // description="KYC verification is required to protect your account and enable full access to all features."
      />
      <Box sx={{ mt: "-120px" }}>
        <WalletCard
          balance="10,000,000"
          currency="SKRW"
          address="0xf1da98dd2716a243487f334345"
          onSettle={() => setOpen(true)}
          onReceive={() => alert("Receive clicked")}
          onSend={() => alert("Send clicked")}
        />
      </Box>

      <StyledTable />
      <SettleFundsModal open={open} onClose={() => setOpen(false)} maxBalance={10000} />
    </Box>
  );
}
