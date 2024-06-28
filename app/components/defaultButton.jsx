import { Button, styled } from "@mui/material";

const DefaultButton = styled(Button) ({
    backgroundColor: '#022663',
})

export default function VolksButton({ type, fullWidth, children, spacing, ...rest }){
    return(
        <DefaultButton type={type && type} variant="contained" sx={spacing ? spacing : { mt: 3, mb: 2 }} fullWidth={fullWidth} {...rest}>
            {children}
        </DefaultButton>
    )
}