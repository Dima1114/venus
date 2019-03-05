import {createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
    fontFamily: 'Indie Flower',
    fontSize: 20,
    palette: {
        error: {
            main: red[500]
        },
    },
    typography: {
        useNextVariants: true,
        fontFamily: 'Indie Flower'
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
