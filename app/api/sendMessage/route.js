import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { Nome, NomeOficina, Mensagem, VW } = body;

  if (!Nome || !NomeOficina || !Mensagem || VW === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const Data = new Date().toLocaleDateString('pt-BR');
  const Hora = new Date().toLocaleTimeString('pt-BR');

  const connection = await mysql.createConnection({
    host: '186.202.133.41', // substitua pelo seu host
    user: 'rotadoreparador', // substitua pelo seu usuário
    password: 'rotainsorg34', // substitua pela sua senha
    database: 'rotadoreparador' // substitua pelo seu banco de dados
  });

  try {
    const [rows] = await connection.execute(
      'INSERT INTO chat (Nome, NomeOficina, Mensagem, VW, Data, Hora) VALUES (?, ?, ?, ?, ?, ?)',
      [Nome, NomeOficina, Mensagem, VW, Data, Hora]
    );
    await connection.end();

    return NextResponse.json({ result: 'Data inserted successfully' }, { status: 201 });
  } catch (error) {
    await connection.end();
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
