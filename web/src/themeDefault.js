import {createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from "@material-ui/core/es/colors/grey";

const font = 'Indie Flower';

export const muiTheme = createMuiTheme({
    fontFamily: font,
    fontSize: 20,
    palette: {
        primary: {
            main: grey[900],
        },
        error: {
            main: red[500]
        },
    },
    overrides: {
        MuiButton: { // Name of the component ⚛️ / style sheet
            text: { // Name of the rule
                color: 'black', // Some CSS
            },
            root: {
                borderRadius: 3,
                border: 0,
                color: 'black',
                height: 44,
                padding: '0 30px',
            },
            label: {
                width: '100%',
                textTransform: 'capitalize',
                fontFamily: font,
                fontSize: 20,
                fontWeight: 600,
                textDecoration: 'none'
            },
        },
        MuiButtonBase: {
            root: {
                fontFamily: font
            }
        },
        MuiInputBase: {
            input: {
                fontFamily: font,
                height: 25,
                fontWeight: 600,
                fontSize: 20
            },
            root: {
                fontWeight: 600
            }
        },
        MuiSelect:{
            selectMenu:{
                height: 25
            }
        },
        MuiMenuItem: {
            root: {
                fontWeight: 600
            }
        },
        MuiFormLabel: {
            root: {
                fontFamily: font,
                fontSize: 18,
                lineHeight: '20px'
            }
        },
        MuiFormHelperText: {
            root: {
                fontFamily: font,
                paddingTop: 12,
                fontSize: 15
            }
        },
        MuiPaper: {
            root: {
                // backgroundImage: 'url(' + svg + ')',
            },
            elevation8:{
                boxShadow: 'none'
            }
        }
    },
    typography: {
        useNextVariants: true,
        fontFamily: font
    }
});

// const theme = createMuiTheme({
//     overrides: {
//         MuiInput: {
//             underline: {
//                 '&:before': { //underline color when textfield is inactive
//                     backgroundColor: 'red',
//                 },
//                 '&:hover:not($disabled):before': { //underline color when hovered
//                     backgroundColor: 'green',
//                 },
//             }
//         }
//     }
// });
