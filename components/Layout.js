import { AppBar, Toolbar, Typography, Container, Link, createTheme, ThemeProvider, CssBaseline, Switch, Checkbox } from "@material-ui/core";
import Cookies from "js-cookie";
import Head from "next/head";
import NextLink from "next/link";
import React, { useContext } from "react";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";

export default function Layout({title, children, description}){
    const {state, dispatch} = useContext(Store);
    const {darkMode} = state;
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: "1.6rem",
                fontWeight: 400,
                margin: "1rem 0"
            },
            h2: {
                fontSize: "1.4rem",
                fontWeight: 400,
                margin: "1rem 0"
            }
        },
        palette: {
            type: darkMode ? "dark" : "light",
            primary: {
                main: "#f0c000"
            },
            secondary: {
                main: "#208080"
            }
        }
    })
    const classes = useStyles();
    const darkModeChangeHandler = () => {
        dispatch({type : darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON"});
    }
    return (
        <div>
            <Head>
                <title>{title ? `${title} - Next Amazona` : "Next Amazona"}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography className={classes.brand}>Amazona</Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}></div>
                        <div>
                            <Switch checked={darkMode} onClick={() => darkModeChangeHandler()} className=""/>
                            <NextLink href="/cart" passHref>
                                <Link>Cart</Link>
                            </NextLink>
                            <NextLink href="/login" passHref>
                                <Link>Login</Link>
                            </NextLink>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>{children}</Container>
                <footer className={classes.footer}>
                    <Typography>All right reserved</Typography>
                </footer>
            </ThemeProvider>
            
        </div>
    )
}