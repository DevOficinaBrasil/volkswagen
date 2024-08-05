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
  const [aoVivo, setAoVivo] = React.useState();
  const { onLive } = React.useContext(LiveContext);
  const router = useRouter();

  React.useEffect(() => {
    setAoVivo(onLive);

    const getTrainings = async () => {
      const request = await fetch("/api/admin", {
        method: "GET",
      });

      const response = await request.json();

        setTrainings(response);
    };

    getTrainings();
  }, []);

  const handleInfos = (id) => {
    router.push(`/admin/training/${id}`);
  };

  const handleList = (id) => {
    router.push(`/admin/registeredList/${id}`);
  };

  return (
    <React.Fragment>
      <Typography variant="h5" className="font-bold uppercase mb-5">Treinamentos</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Lista de Inscritos</TableCell>
            <TableCell align="right">Informações do treinamento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...trainings].reverse().map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-bold">#{row.id}</TableCell>
              <TableCell>
                {Boolean(parseInt(row.active)) ? "Ativo" : "Encerrado"}
              </TableCell>
              <TableCell>{moment(row.date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Button
                  className="bg-[#022663] w-24 text-white"
                  onClick={() => handleList(row.id)}
                  sx={{ ":hover": { backgroundColor: "#184a9b" } }}
                >
                  Ver
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  className="bg-[#022663] w-24 text-white"
                  onClick={() => handleInfos(row.id)}
                  sx={{ ":hover": { backgroundColor: "#184a9b" } }}
                >
                  Alterar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
