import { Box, Grid } from "@mui/material";

export default function CoverMobile(props) {
    return(
        <Box sx={{ flexWrap: 'wrap', display: 'flex', gap: 4}}>
            {props.children.map((child, index) => (
        <Box
          key={index}
          sx={{
            flex: '1 1 calc(33.333% - 5px)', // 3 colunas com gap de 16px
            boxSizing: 'border-box',
            marginLeft: 1,
            '& > *': {
                '& > div': {
                position: 'relative',
                '::before':{
                    content: '""',
                    position: 'absolute',
                    top: 20,
                    right: 0,
                    left: -10,
                    bottom: -20,
                    width: '100%',
                    borderRadius: 5,
                    border: 'solid 2px blue',
                    zIndex: -1,
                },
                '& > div': { borderRadius: 5 }
                }
            }
          }}
        >
          {child}
        </Box>
      ))}
        </Box>
      );
    
}