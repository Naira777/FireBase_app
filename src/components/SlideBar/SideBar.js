import * as React from 'react';
import s from './SideBar.module.css'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {useNavigate} from "react-router-dom";
import ListIcon from '@mui/icons-material/List';
import {Drawer} from "@mui/material";
import {useSelector} from "react-redux";

export default function SideBar() {

    const navigate = useNavigate()
    const {userInfo} = useSelector((state) => state.user);
    const [state, setState] = React.useState({
        left: false,
    });
    const userSignOut = () => {
        signOut(auth).then(() => {
            navigate('/')

        }).catch((error) => {
            console.log(error)
        })
    }
    const toggleDrawer = (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {

            setState({...state, [anchor]: open});
        };

    const list = (anchor: Anchor) => (
        <Box
            className={s.boxM}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
        >
            <List>
                <div className={s.boxNameM}>
                    <img src={userInfo?.imageUrl} alt='image' className={s.img}/>
                    <p className={s.text1}>{userInfo?.name}</p>
                    <p className={s.text1}>{userInfo?.surname}</p>
                </div>
            </List>
            <Divider/>
            <List>
                <ListItem>


                    <ListItemButton onClick={() => navigate('/dashboard')}>
                        <DashboardIcon></DashboardIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                marginLeft: '7px',
                                fontSize: '14px',
                            }}
                            primary={'Dashboard'}/>
                    </ListItemButton>

                </ListItem>
                <ListItem>
                    <ListItemButton onClick={() => navigate('/settings')}>
                        <SettingsIcon>

                        </SettingsIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                marginLeft: '7px',
                                fontSize: '14px',
                            }}
                            primary={'Edit settings'}/>
                    </ListItemButton>

                </ListItem>
                <ListItem>
                    <ListItemButton onClick={userSignOut}>
                        <LogoutIcon></LogoutIcon>
                        <ListItemText primary={'Log Out'}
                                      primaryTypographyProps={{
                                          marginLeft: '7px',
                                          fontSize: '14px',
                                      }}/>
                    </ListItemButton>

                </ListItem>
            </List>

        </Box>
    );

    return (<div className={s.boxAll}>

        <div className={s.sidebarM}>
            <ListIcon className={s.listIcon} fontSize='large' onClick={toggleDrawer('left', true)}>

            </ListIcon>
        </div>
        <Box
            role="presentation"
            className={s.box}
        >

            <div className={s.boxName}>
                <img src={userInfo?.imageUrl} alt='image' className={s.img}/>
                <p className={s.text1}>{userInfo?.name}</p>
                <p className={s.text1}>{userInfo?.surname}</p>
            </div>
            <List>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    <ListItemButton onClick={() => navigate('/dashboard')}>
                        <DashboardIcon></DashboardIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                marginLeft: '7px',
                                fontSize: '17px',
                            }}
                            primary={'Dashboard'}/>
                    </ListItemButton>

                </ListItem>
                <ListItem>
                    <ListItemButton onClick={() => navigate('/settings')}>
                        <SettingsIcon>

                        </SettingsIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                marginLeft: '7px',
                                fontSize: '17px',
                            }}
                            primary={'Edit settings'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={userSignOut}>
                        <LogoutIcon></LogoutIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                marginLeft: '7px',
                                fontSize: '17px',
                            }}
                            primary={'Log Out'}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
        <div>
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>

        </div>
    </div>)
        ;
}