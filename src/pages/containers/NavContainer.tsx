import Nav from "./components/nav";
function NavContainer() {
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <Nav />
    </div>
  );
}

export default NavContainer;
