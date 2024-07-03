"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import Title from "./title";
import { format } from "date-fns";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubscribeModal from "./subscribe";
import VolksButton from "./defaultButton";
import PdfTextEditor from "./pdfCompnent";

export default function SubscribedCard(props) {
  const date = format(new Date(props.content.date), "dd/MM/yyyy");

  const [trainingAddress, setTrainingAddress] = React.useState("");
  const [trainingFormat, setTrainingFormat] = React.useState("");
  const [trainingLocal, setTrainingLocal] = React.useState("");
  const [verifyLocal, setVerifyLocal] = React.useState(false);

  React.useEffect(() => {
    // // console.log(props.content);
    if (props.content.concessionaire_id != 0) {
      setTrainingFormat("Presencial");
      setTrainingLocal(`
                ${props.content.fantasy_name}
            `);
      setTrainingAddress(`
                ${props.content.street},  
                ${props.content.number} - 
                ${props.content.city}/
                ${props.content.state} 
            `);

      setVerifyLocal(true);
    } else {
      setTrainingFormat("Online");
    }
  }, [props.content]);

  return (
    <Card className="flex flex-col" sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 194 }}
        component="img"
        image={props.content.cover}
      />
      <Box className="flex grow flex-col justify-between">
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {props.content.name}
          </Typography>
          <Box>
            <Typography variant="body" color="text.secondary">
              Data: {date}
            </Typography>
          </Box>
          {props.content.active == 1 && (
            <>
              <Box>
                <Typography variant="body" color="text.secondary">
                  Formato: {trainingFormat}
                </Typography>
              </Box>
              {verifyLocal && (
                <>
                  <Box>
                    <Typography variant="body" color="text.secondary">
                      Local: {trainingLocal}
                    </Typography>
                  </Box>
                  <Box className="text-center mt-5">
                    <Typography variant="body" color="text.secondary">
                      {trainingAddress}
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
        </CardContent>

        {props.content.active == 1 ? (
          <CardActions disableSpacing className="px-5 pb-5">
            <SubscribeModal
              content={props.content}
              type="update"
              id={props.content.pivot_id}
              concessionaire={props.concessionaire}
            >
              Atualizar Inscrição
            </SubscribeModal>
          </CardActions>
        ) : (
          <CardActions
            disableSpacing
            className="flex justify-between px-5 pb-5"
          >
            <PdfTextEditor training={props.content} />
          </CardActions>
        )}
      </Box>
    </Card>
  );
}
