import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { getCurrentUser } from "../lib/token/current-user";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col p-5">
      <Header user={user} />
      <main className="flex-1 py-6">{children}</main>
      <Footer />
    </div>
  );
}