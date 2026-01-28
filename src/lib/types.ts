export type LinkItem = { title: string; subtitle?: string; url: string; icon?: string };
export type Stats = { lvl: number | string; aim: string; speed: string; code: string };
export type LinkBioData = {
  nick: string;
  bio: string;
  contactEmail: string;
  discordUrl: string;
  stats: Stats;
  links: LinkItem[];
};
