import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Stack,
  Pagination,
  Container,
} from "@mui/material";
import { ContentCopy, NorthEast, SouthWest } from "@mui/icons-material";
import palette from "../theme/palette";
import SectionHeader from "./SectionHeader";

// 1. Mock Data
const rows = [
  {
    id: 1,
    type: "Transfer",
    fromName: "Zeeshan",
    fromAddress: "0x2599b...1029125",
    toName: "Muhammad Zahid",
    toAddress: "0x2599b...1029125",
    date: "25 Dec, 2025",
    time: "04:34:26 Am",
    amount: "5200 SKRW",
    status: "Success",
  },
  {
    id: 2,
    type: "Receive",
    fromName: "Zeeshan",
    fromAddress: "0x2599b...1029125",
    toName: "Muhammad Zahid",
    toAddress: "0x2599b...1029125",
    date: "25 Dec, 2025",
    time: "04:34:26 Am",
    amount: "5200 SKRW",
    status: "Failed",
  },
  {
    id: 3,
    type: "Transfer",
    fromName: "Zeeshan",
    fromAddress: "0x2599b...1029125",
    toName: "Muhammad Zahid",
    toAddress: "0x2599b...1029125",
    date: "25 Dec, 2025",
    time: "04:34:26 Am",
    amount: "5200 SKRW",
    status: "Success",
  },
  {
    id: 4,
    type: "Receive",
    fromName: "Zeeshan",
    fromAddress: "0x2599b...1029125",
    toName: "Muhammad Zahid",
    toAddress: "0x2599b...1029125",
    date: "25 Dec, 2025",
    time: "04:34:26 Am",
    amount: "5200 SKRW",
    status: "Failed",
  },
  {
    id: 5,
    type: "Transfer",
    fromName: "Zeeshan",
    fromAddress: "0x2599b...1029125",
    toName: "Muhammad Zahid",
    toAddress: "0x2599b...1029125",
    date: "25 Dec, 2025",
    time: "04:34:26 Am",
    amount: "5200 SKRW",
    status: "Success",
  },
];

// ⭐ SPACE CONTROL VARIABLE (Yahan se space kam/zyada karein) ⭐
const rowSidePadding = "40px";

// Common Styles for Cells
const baseCellStyle = {
  borderBottom: "1px solid #E5E7EB",
  borderTop: "1px solid #E5E7EB",
  py: "5px",
};

// Header Styles
const headCellStyle = {
  fontWeight: "bold",
  color: "#111827",
  borderBottom: "none",
  fontSize: "0.95rem",
  pt: 0.5,
};

export default function TransactionTable() {
  return (
    <Container maxWidth="lg" sx={{ pt: 1 }}>
      <SectionHeader
        title="My Wallet"
        subtitle="Manage your balance and transfer funds securely."
      />
      <TableContainer
        component={Box}
        sx={{
          overflowX: "auto",
          background: "linear-gradient(to bottom, #F1F3F9 50px, #fff 50px)",
          borderRadius: "15px",
          border: `1px solid ${palette.primary.gray}`,
          p: "10px",
        }}
      >
        <Table
          sx={{
            minWidth: 900,
            borderCollapse: "separate",
            borderSpacing: "0px 5px",
            marginTop: "-5px",
          }}
          aria-label="transaction table"
        >
          {/* === TABLE HEAD === */}
          <TableHead>
            <TableRow>
              {/* Header First Cell Padding */}
              <TableCell sx={{ ...headCellStyle, paddingLeft: rowSidePadding }}>
                Type
              </TableCell>
              <TableCell sx={headCellStyle}>From</TableCell>
              <TableCell sx={headCellStyle}>To</TableCell>
              <TableCell sx={headCellStyle}>Date & Time</TableCell>
              <TableCell sx={headCellStyle}>Amount</TableCell>
              {/* Header Last Cell Padding */}
              <TableCell
                sx={{ ...headCellStyle, paddingRight: rowSidePadding }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          {/* === TABLE BODY === */}
          <TableBody>
            {rows.map((row) => {
              const isTransfer = row.type === "Transfer";
              const IconComp = isTransfer ? NorthEast : SouthWest;
              const iconBg = isTransfer ? "#FF4D4F" : "#00A86B";
              const statusColor =
                row.status === "Success" ? "#00A86B" : "#FF4D4F";

              return (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  {/* 1. TYPE (First Cell - LEFT SPACE YAHAN ADD KI HAI) */}
                  <TableCell
                    sx={{
                      ...baseCellStyle,
                      borderLeft: "1px solid #E5E7EB",
                      borderTopLeftRadius: "16px",
                      borderBottomLeftRadius: "16px",
                      paddingLeft: rowSidePadding, // ⭐ Space added directly
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          bgcolor: iconBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        <IconComp sx={{ fontSize: 22 }} />
                      </Box>
                      <Typography
                        variant="body1"
                        fontFamily="Poppins-Medium"
                        color="#333"
                      >
                        {row.type}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* 2. FROM */}
                  <TableCell sx={baseCellStyle}>
                    <Box>
                      <Typography
                        variant="body2"
                        fontFamily="Poppins-Medium"
                        color="#333"
                      >
                        {row.fromName}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          {row.fromAddress}
                        </Typography>
                        <IconButton size="small" sx={{ p: 0.5 }}>
                          <ContentCopy
                            sx={{ fontSize: 14, color: "#6B7280" }}
                          />
                        </IconButton>
                      </Stack>
                    </Box>
                  </TableCell>

                  {/* 3. TO */}
                  <TableCell sx={baseCellStyle}>
                    <Box>
                      <Typography
                        variant="body2"
                        fontFamily="Poppins-Medium"
                        color="#333"
                      >
                        {row.toName}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          {row.toAddress}
                        </Typography>
                        <IconButton size="small" sx={{ p: 0.5 }}>
                          <ContentCopy
                            sx={{ fontSize: 14, color: "#6B7280" }}
                          />
                        </IconButton>
                      </Stack>
                    </Box>
                  </TableCell>

                  {/* 4. DATE */}
                  <TableCell sx={baseCellStyle}>
                    <Box>
                      <Typography
                        variant="body2"
                        fontFamily="Poppins-Medium"
                        color="#333"
                      >
                        {row.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.time}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* 5. AMOUNT */}
                  <TableCell sx={baseCellStyle}>
                    <Typography
                      variant="body2"
                      fontFamily="Poppins-Medium"
                      color="#0039CB"
                    >
                      {row.amount}
                    </Typography>
                  </TableCell>

                  {/* 6. STATUS (Last Cell - RIGHT SPACE YAHAN ADD KI HAI) */}
                  <TableCell
                    sx={{
                      ...baseCellStyle,
                      borderRight: "1px solid #E5E7EB",
                      borderTopRightRadius: "16px",
                      borderBottomRightRadius: "16px",
                      paddingRight: rowSidePadding, // ⭐ Space added directly
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontFamily="Poppins-Medium"
                      sx={{ color: statusColor }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* === PAGINATION === */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
          //   borderTop="1px solid #E5E7EB"
        >
          <Typography variant="caption" color="text.secondary">
            Showing 1-5 from 100 data
          </Typography>

          <Pagination
            count={10}
            color="primary"
            shape="circular"
            sx={{
              "& .Mui-selected": {
                bgcolor: "#0039CB !important",
                color: "white",
              },
            }}
          />
        </Box>
      </TableContainer>
    </Container>
  );
}
