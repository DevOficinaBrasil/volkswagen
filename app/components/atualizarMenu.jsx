"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AtualizarMenu = () => {
  const [userData, setUserData] = useState({});
  const pathname = usePathname();
  const router = useRouter();

  const menus = [
    { value: "pessoais", label: "Dados Pessoais" },
    { value: "profissionais", label: "Dados Profissionais" },
    { value: "endereco", label: "Endereço Pessoal" },
  ];

  return (
    <div className="w-full flex flex-col border-r-[1px] border-slate-300 h-full">
      {menus.map((menu, key) => (
        <button
          key={menu.value}
          // href={`/atualizar/${menu.value}`}
          onClick={() => {
            userData && router.push(`/atualizar/${menu.value}`);
          }}
          className={`w-[105%] font-medium text-center rounded-r-full hover:bg-blue-200 py-2 px-1 ${
            pathname.includes(menu.value)
              ? "bg-opacity-100 bg-gradient-to-r  from-volks-blue-900 to-volks-blue-800 text-white"
              : null
          }`}
        >
          {menu.label}
        </button>
      ))}
      <div></div>
    </div>
  );
};

export default AtualizarMenu;
