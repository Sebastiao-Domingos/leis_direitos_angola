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
      url: "/",
      icon: Home,
    },
    {
      title: "Nova Conversa",
      url: "/conversar",
      icon: MessageCircle,
    },
  ],

  navSetting: [
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: FileArchive,
    },

    {
      title: "Minha Conta",
      url: "/minha_conta",
      icon: UserCircle,
    },
  ],
};
