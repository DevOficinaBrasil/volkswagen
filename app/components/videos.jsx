import { Box, Divider, Grid, Typography } from "@mui/material";

export default function Videos(props) {
  return (
    <Box
      sx={{
        backgroundColor: "#023489",
        color: "white",
        padding: 5,
        borderRadius: 2,
      }}
    >
      <Box className="flex items-center justify-center" sx={{ mb: 2 }}>
        <Box flexGrow={1}>
          <Divider sx={{ borderBottomWidth: 1, borderColor: "white" }} />
        </Box>
        <Box px={2}>
          <Typography variant="h5" className="uppercase font-bold">
            Treinamentos anteriores
          </Typography>
        </Box>
        <Box flexGrow={1}>
          <Divider sx={{ borderBottomWidth: 1, borderColor: "white" }} />
        </Box>
      </Box>
      {/* <Grid container spacing={7}>
                {props.children}
            </Grid> */}

      <Box
        sx={{
          justifyContent: "center",
          position: "relative",
          paddingX: 0,
          paddingY: 5,
          
         
        }}
      >
        <Box
          container
          spacing={5}
          sx={{
            justifyContent: 'space-evenly',
            flexWrap: "wrap",
            display: "flex",
            gap: 4,
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}
