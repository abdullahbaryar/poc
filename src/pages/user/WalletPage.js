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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("settle"); // Default 'settle'

  // User Data (Should come from Context or API)
  const walletBalance = 10000000;

  const handleOpenSettle = () => {
    setModalType("settle");
    setModalOpen(true);
  };

  const handleOpenDeposit = () => {
    setModalType("deposit");
    setModalOpen(true);
  };
  return (
    <Box>
      <PageHeader
      // title="KYC Verification"
      // description="KYC verification is required to protect your account and enable full access to all features."
      />
      <Box sx={{ mt: "-120px" }}>
        <WalletCard
          balance={walletBalance.toLocaleString()}
          currency="sKRW"
          address="0xf1da98dd2716a243487f334345"
          // Button Handlers
          onSettle={handleOpenSettle}
          onDeposit={handleOpenDeposit} // Assuming Receive opens Deposit Modal
          onReceive={handleOpenDeposit} // Assuming Receive opens Deposit Modal
          onSend={() => alert("Send feature coming soon")}
        />
      </Box>

      <StyledTable />
      <SettleFundsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        balance={walletBalance} // Pass balance for validation
        currencyCode="sKRW"
      />
    </Box>
  );
}
