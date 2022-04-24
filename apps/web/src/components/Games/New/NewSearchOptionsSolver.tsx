import React, {useEffect} from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Button from "@mui/material/Button"
import Add from "@mui/icons-material/Add"
import { AthleteRole, IAnonymAthlete } from "puckee-common/types"

interface NoSearchOptionsSolverProps {
    option: string
    onConfirmCb: (option: string) => void
    inputRemovalCb: () => void
  }
  
export function NoSearchOptionsSolver ({ option, onConfirmCb, inputRemovalCb } : NoSearchOptionsSolverProps ) {
    const theme2 = createTheme({
    components: {
        MuiButton: {
        styleOverrides: {
            root: {
            textTransform: "none"
            }
        }
        }
    }
    });

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
            onConfirmCb(option)
            inputRemovalCb()
            }
        }

        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    },[])

    return (
            <>
                <div>Hráč nenalezen. Přidat mezi neregistrované?</div>
                <div className="mt-2">
                    <ThemeProvider theme={theme2}>
                        <Button variant="contained" endIcon={<Add />} onClick={() => onConfirmCb(option)} >
                            {option}
                        </Button>
                    </ThemeProvider>
                </div>
            </>
    )
}