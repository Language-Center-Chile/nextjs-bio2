interface ConsultantCardProps {
  image: string;
  name: string;
  specialty: string;
}

export default function ConsultantCard({ image, name, specialty }: ConsultantCardProps) {
  return (
    <div className="bg-[#1f1f1f] border border-neutral-700 hover:border-green-800 p-4 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h4 className="text-white text-lg font-semibold">{name}</h4>
      <p className="text-sm text-gray-300 mt-1">{specialty}</p>
      <button className="cursor-pointer mt-4 px-4 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 hover:scale-105 transition-transform duration-200">
        Ver perfil
      </button>
    </div>
  );
}
