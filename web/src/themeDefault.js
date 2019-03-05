import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
    fontFamily: 'Indie Flower',
    fontSize: 20,
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
