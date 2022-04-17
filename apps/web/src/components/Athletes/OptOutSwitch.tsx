import { Switch, Typography, Grid, withStyles, Stack, FormLabel } from '@mui/material'
import { FormControl, FormControlLabel, FormGroup } from '@mui/material'
// import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { createTheme, makeStyles, styled, ThemeProvider } from '@mui/material/styles'

interface OptOutSwitchProps {
    active: boolean
    switchCb: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const OptOutSwitch = ( { active, switchCb }: OptOutSwitchProps ) => {
    // const useStyles = makeStyles(theme => ({
    //     // container: {
    //     //   display: 'flex',
    //     //   flexWrap: 'wrap',
    //     // },
    //     // textField: {
    //     //   marginLeft: theme.spacing(1),
    //     //   marginRight: theme.spacing(1),
    //     //   width: 200,
    //     // },
    //     formGroup: {
    //         alignItems: 'center'
    //       }
    //   }));
    //   const classes = useStyles();
    return (
        <div className='d-flex flex-column justify-content-center'>
            {/* <FormControl component="fieldset"> */}
                {/* <FormGroup aria-label="position" row> */}
                    <ThemeProvider theme={theme}>
                        <FormControlLabel
                        value="end"
                        control={<Switch color="success" size="small" onChange={switchCb} checked={active}/>}
                        label={<Typography variant="body2" color="textSecondary">auto-účast</Typography>}
                        labelPlacement="end"
                        style={{ marginLeft: '0', marginRight: '0'}}
                        />
                    </ThemeProvider>
                {/* </FormGroup> */}
            {/* </FormControl> */}
        </div>
    )
}

const theme = createTheme({
    //v5.0.0
    typography: {
      body2: {
          fontSize: 8
      }
    }
  })