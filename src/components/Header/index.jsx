import Logo from "../icons/Logo";

export default function Header() {
  return (
    <div className=" container mx-auto flex h-14 max-w-screen-2xl items-center p-3 drop-shadow-xl rounded-b-lg  bg-gradient-to-b hover:bg-gradient-to-t from-[#E0EAFC] to-[#CFDEF3]">
      <div className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Logo className="h-10 w-10" />
        <h3>Finfree</h3>
      </div>
    </div>
  );
}
