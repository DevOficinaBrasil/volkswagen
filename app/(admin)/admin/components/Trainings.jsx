import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import VolksButton from "@/app/components/defaultButton";
import LiveContext from "@/src/contexts/LiveContext";

export default function Trainings() {
  const [trainings, setTrainings] = React.useState([]);
  // const [onLive, setOnLive] = React.useState(false);
  const [buttonName, setButtonName] = React.useState("Ativar");
  const [trainingId, setTrainingId] = React.useState(null);
  const [aoVivo, setAoVivo] = React.useState();
  const { onLive, setOnLive } = React.useContext(LiveContext);

  const router = useRouter();

  React.useEffect(() => {
    setAoVivo(onLive);
    const getTrainings = async () => {
      const request = await fetch("/api/admin", {
        method: "GET",
      });

      const response = await request.json();

      if (request.ok) {
        setTrainings(response);
      } else {
        setTrainings(response);
      }
    };

    getTrainings();
  }, []);

  const handleInfos = (id) => {
    router.push(`/admin/training/${id}`);
  };

  React.useEffect(() => {
    // console.log(trainingId);
    const setOnLive = async () => {
      const request = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/setTraininOnLive",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            onLive: onLive,
            trainingId: trainingId,
          }),
        }
      );

      const response = request.json();
    };

    setOnLive();
  }, [onLive, trainingId]);

  const handleActiveButton = async (id) => {
    setTrainingId(id);
    setOnLive((prevData) => {
      return !prevData;
    });
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Treinamentos
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ativar/Desativar</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Lista de inscritos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...trainings].reverse().map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {row.active == 1 ? (
                  <Button
                    className="bg-[#022663] w-24 text-white"
                    onClick={() => handleActiveButton(row.id, row.on_live)}
                  >
                    {onLive == 0 ? "Ativar" : "Desativar"}
                  </Button>
                ) : (
                  <Button
                    disabled={true}
                    className="bg-[#022663] disabled:text-white disabled:opacity-30 w-24"
                    onClick={() => handleActiveButton(row.id)}
                  >
                    Offline
                  </Button>
                )}
              </TableCell>
              <TableCell className="font-bold">#{row.id}</TableCell>
              <TableCell>{moment(row.date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                {Boolean(parseInt(row.active)) ? "Ativo" : "Encerrado"}
              </TableCell>
              <TableCell align="right">
                <Button variant="text" onClick={() => handleInfos(row.id)}>
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
