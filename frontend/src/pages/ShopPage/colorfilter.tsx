
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Paper,
} from "@mui/material";

interface ColorFilter {
    name: string;
    color: string;
    border?: string;
    chosen?: boolean;
    link: string;
}

const colors: ColorFilter[] = [
    { name: "Beige", color: "#c9b28f", link: "#" },
    { name: "Black", color: "#000000", border: "#ffffff", link: "#" },
    { name: "Blue", color: "#334665", link: "#" },
    { name: "Brown", color: "#866c48", link: "#" },
    { name: "Green", color: "#003a2e", link: "#" },
    { name: "Pink", color: "#ea88a8", link: "#" },
    { name: "Teal", color: "#36a893", link: "#" },
    { name: "White", color: "#ffffff", border: "#ccc", link: "#" },
    { name: "Orange", color: "#f35f1b", chosen: true, link: "#" },
    { name: "Burgundy Red", color: "#931a1a", chosen: true, link: "#" },
    { name: "Lavender Purple", color: "#a25dcc", link: "#" },
];

export default function ColorFilterSidebar() {
    return (
        <Paper elevation={2} sx={{ width: 280, p: 2 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Shop by color
                </Typography>
            </Box>

            <List dense>
                {colors.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            selected={item.chosen}
                            sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                "&.Mui-selected": {
                                    backgroundColor: "rgba(0,0,0,0.06)",
                                },
                            }}
                            component="a"
                            href={item.link}
                        >
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <Box
                                    sx={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: "50%",
                                        backgroundColor: item.color,
                                        border: item.border ? `1px solid ${item.border}` : "none",
                                    }}
                                />
                            </ListItemIcon>

                            <ListItemText
                                primary={item.name}
                                sx={{ fontSize: 14 }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

