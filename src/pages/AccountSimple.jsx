import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

// Import icons from the cryptocurrency-icons library
import BtcIcon from 'cryptocurrency-icons/svg/color/btc.svg?react';
import EthIcon from 'cryptocurrency-icons/svg/color/eth.svg?react';
import SolIcon from 'cryptocurrency-icons/svg/color/sol.svg?react';
import UsdtIcon from 'cryptocurrency-icons/svg/color/usdt.svg?react';
import BnbIcon from 'cryptocurrency-icons/svg/color/bnb.svg?react';
import AdaIcon from 'cryptocurrency-icons/svg/color/ada.svg?react';
import TrxIcon from 'cryptocurrency-icons/svg/color/trx.svg?react';
import XlmIcon from 'cryptocurrency-icons/svg/color/xlm.svg?react';
import LinkIcon from 'cryptocurrency-icons/svg/color/link.svg?react';
import BchIcon from 'cryptocurrency-icons/svg/color/bch.svg?react';
import AvaxIcon from 'cryptocurrency-icons/svg/color/avax.svg?react';
import XrpIcon from 'cryptocurrency-icons/svg/color/xrp.svg?react';
import WbtcIcon from 'cryptocurrency-icons/svg/color/wbtc.svg?react';
import UsdcIcon from 'cryptocurrency-icons/svg/color/usdc.svg?react';
import DogeIcon from 'cryptocurrency-icons/svg/color/doge.svg?react';

// Static assets data with default values
const staticAssets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 1.26, value: 149244, icon: BtcIcon, change: '+0.3%', color: '#10B981' },
    { name: 'Ethereum', symbol: 'ETH', balance: 14.5, value: 54561, icon: EthIcon, change: '+2.0%', color: '#10B981' },
    { name: 'XRP', symbol: 'XRP', balance: 8500, value: 29750, icon: XrpIcon, change: '+2.4%', color: '#10B981' },
    { name: 'Tether', symbol: 'USDT', balance: 25000, value: 25000, icon: UsdtIcon, change: '-0.0%', color: '#EF4444' },
    { name: 'BNB', symbol: 'BNB', balance: 32.1, value: 22514, icon: BnbIcon, change: '+2.6%', color: '#10B981' },
    { name: 'Solana', symbol: 'SOL', balance: 95.3, value: 17765, icon: SolIcon, change: '+4.7%', color: '#10B981' },
    { name: 'USDC', symbol: 'USDC', balance: 15000, value: 15000, icon: UsdcIcon, change: '-0.0%', color: '#EF4444' },
    { name: 'Dogecoin', symbol: 'DOGE', balance: 28500, value: 10545, icon: DogeIcon, change: '+7.2%', color: '#10B981' },
    { name: 'Cardano', symbol: 'ADA', balance: 18750, value: 8438, icon: AdaIcon, change: '-0.5%', color: '#EF4444' },
    { name: 'TRON', symbol: 'TRX', balance: 25000, value: 7000, icon: TrxIcon, change: '+1.8%', color: '#10B981' },
    { name: 'Avalanche', symbol: 'AVAX', balance: 145.2, value: 6120, icon: AvaxIcon, change: '+3.4%', color: '#10B981' },
    { name: 'Chainlink', symbol: 'LINK', balance: 185.4, value: 4760, icon: LinkIcon, change: '+5.2%', color: '#10B981' },
    { name: 'Bitcoin Cash', symbol: 'BCH', balance: 8.5, value: 4355, icon: BchIcon, change: '-2.1%', color: '#EF4444' },
    { name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: 0.035, value: 4142, icon: WbtcIcon, change: '+0.2%', color: '#10B981' },
    { name: 'Stellar', symbol: 'XLM', balance: 7500, value: 3600, icon: XlmIcon, change: '+6.3%', color: '#10B981' }
];

function AccountSimple() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Account Page - Simple Version
            </Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Your Assets (15 Tokens)
                </Typography>
                <List>
                    {staticAssets.map((asset) => (
                        <ListItem key={asset.symbol} divider>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'background.paper' }}>
                                    <asset.icon style={{ width: 24, height: 24 }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${asset.name} (${asset.symbol})`}
                                secondary={`Balance: ${asset.balance} | Value: $${asset.value.toLocaleString()} | 24h: ${asset.change}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}

export default AccountSimple;
