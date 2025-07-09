import { FaLeaf } from "react-icons/fa";

export default function NavbarLogo() {
  return (
    <div className="flex items-center text-green-500 text-xl font-bold">
      <FaLeaf className="mr-2" />
      <span>Biodiversidad.cl</span>
    </div>
  );
}
