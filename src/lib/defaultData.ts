import type { LinkBioData } from './types';

export const DEFAULT_DATA: LinkBioData = {
  "nick": "TIM",
  "bio": "Привет! Я делаю сайты, ботов и разные полезные штуки. Ниже — мои главные ссылки.",
  "contactEmail": "timur.ua.16@gmail.com",
  "discordUrl": "https://discord.com/",
  "stats": {
    "lvl": 27,
    "aim": "S",
    "speed": "A",
    "code": "S+"
  },
  "links": [
    {
      "title": "TELEGRAM",
      "subtitle": "@your_handle",
      "url": "https://t.me/",
      "icon": "TG"
    },
    {
      "title": "YOUTUBE",
      "subtitle": "Мой канал",
      "url": "https://youtube.com/",
      "icon": "YT"
    },
    {
      "title": "GITHUB",
      "subtitle": "Проекты и код",
      "url": "https://github.com/",
      "icon": "GH"
    },
    {
      "title": "PORTFOLIO",
      "subtitle": "Сайты / работы",
      "url": "https://example.com",
      "icon": "PF"
    },
    {
      "title": "DONATE",
      "subtitle": "Поддержать",
      "url": "https://donate.stream/",
      "icon": "$$"
    }
  ]
} as any;
