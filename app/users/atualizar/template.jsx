// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
import AtualizarMenu from "../../components/atualizarMenu";

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return redirect("/login?redirect=cadastro/edit/pessoais");
  // }

  return (
    <div className="grid grid-cols-5 gap-0 ">
      <div className="lg:col-span-1 lg:grid hidden">
        <AtualizarMenu />
      </div>
      {/* <div className="w-full">{children}</div> */}
      <div className="lg:col-span-4 col-span-12 px-10">{children}</div>
    </div>
  );
}
