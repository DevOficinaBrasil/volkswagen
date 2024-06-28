import { Box, Grid } from "@mui/material";

export default function PiecesMobile(props) {
    return(
        <Box sx={{ flexWrap: 'wrap', display: 'flex', gap: 4}}>
            {props.children.map((child, index) => (
        <Box
          key={index}
          sx={{
            flex: '1 1 calc(33.333% - 16px)', // 3 colunas com gap de 16px
            boxSizing: 'border-box',
            // marginLeft: 1,
            '& > *': {
                '& > div': {
                    // height: '100%',
                    // width: '100%',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
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