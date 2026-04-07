import GooeyNav from './GooeyNav';

export default function Navbar() {
  const items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Events", href: "/events" }
  ];

  return <GooeyNav items={items} initialActiveIndex={0} />;
}
