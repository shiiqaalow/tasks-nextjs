import Link from "next/link";

const Footer = () => (
  <footer className="mt-8 border-t py-8">
    <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
      <p className="font-semibold text-foreground">TaskFlow</p>

      <nav className="flex gap-6">
        <Link href="/#features" className="hover:text-foreground">Features</Link>
        <Link href="/#how-it-works" className="hover:text-foreground">How it works</Link>
        <Link href="/signin" className="hover:text-foreground">Log in</Link>
      </nav>

      <p>Built with Next.js by [your name]</p>
    </div>
  </footer>
);

export default Footer;