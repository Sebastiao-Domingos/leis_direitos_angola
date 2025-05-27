export function NavBar() {
  return (
    <nav className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-background">
      <div className="flex justify-between h-16">
        <div className="flex items-center">{/* <NavDiretorio /> */}</div>
        <div className="hidden  md:flex items-center ">
          {/* <NavPesquisa /> */}
        </div>
      </div>
    </nav>
  );
}
