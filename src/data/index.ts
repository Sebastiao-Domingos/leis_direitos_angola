import { Home, UserCircle, FileArchive, MessageCircle } from "lucide-react";

export const Menudata = {
  user: {
    name: "RH",
    email: "rh@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Início",
      url: "/sango-luzingo",
      icon: Home,
    },
    {
      title: "Nova Conversa",
      url: "/sango-luzingo/conversar",
      icon: MessageCircle,
    },
  ],

  navSetting: [
    {
      title: "Configurações",
      url: "/sango-luzingo/configuracoes",
      icon: FileArchive,
    },

    {
      title: "Minha Conta",
      url: "/sango-luzingo/minha_conta",
      icon: UserCircle,
    },
  ],
};
