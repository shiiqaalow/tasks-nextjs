import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import CallToAction from "../components/home/CallToAction";
import { getCurrentUser } from "../lib/token/current-user";
import { getAllTasks } from "../lib/task/task";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await getCurrentUser();
    if (!user) redirect("/login");
  const signedIn = Boolean(user);
    const result = await getAllTasks(String(user.id));
    const tasks = result.success ? (result.data ?? []) : [];

  return (
    <>
      <Hero signedIn={signedIn} />
      <Features />
      <HowItWorks />
      <CallToAction signedIn={signedIn} />
    </>
  );
};

export default HomePage;