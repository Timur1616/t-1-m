import { isAuthed } from "../../lib/auth";
import AdminClient from "./ui";

export default async function AdminPage() {
  const authed = await isAuthed();
  return <AdminClient authed={authed} />;
}
