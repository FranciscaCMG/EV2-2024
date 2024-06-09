import { Box } from "@mui/system";
import { List, ListItemText, ListItem, ListItemIcon,  ListItemButton } from "@mui/material";



export default function NavListDrawer({ navArrayLinks, NavLink, setOpen }) {
    return (
        <Box sx={{ width: 250 }}>
            <nav>
                <List>
                    {navArrayLinks.map((item) => (
                        <ListItem
                            disablePadding
                            key={item.title}
                        >
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                onClick={() => setOpen(false)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>{item.title}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
        </Box>
    );
}