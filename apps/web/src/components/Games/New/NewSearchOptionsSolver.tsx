import React, {useEffect} from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Button from "@mui/material/Button"
import Add from "@mui/icons-material/Add"

interface NoSearchOptionsSolverProps {
    option: string
    onConfirmCb: (option: string) => void
  }
  
export function NoSearchOptionsSolver ({ option, onConfirmCb } : NoSearchOptionsSolverProps ) {
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
            event.preventDefault();
            onConfirmCb(option)
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
                    {/* <form onSubmit={() => onConfirmCb(option)}> */}
                        <Button variant="contained" endIcon={<Add />} onClick={() => onConfirmCb(option)} >
                        {option}
                        </Button>
                    {/* </form> */}
                    </ThemeProvider>
                </div>
            </>
    )
}