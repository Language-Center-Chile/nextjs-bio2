import Image from 'next/image'

interface RecursoCardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

export default function RecursoCard({ image, title, description, buttonText }: RecursoCardProps) {
  return (
    <div className="bg-[#1f1f1f] border border-neutral-700 hover:border-green-800 p-4 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
      <div className="w-full h-40 relative mb-4">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover rounded" 
        />
      </div>
      <h4 className="text-white text-lg font-semibold">{title}</h4>
      <p className="text-sm text-gray-300 mt-1">{description}</p>
      <button className="mt-4 px-4 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 hover:scale-105 transition-transform duration-200">
        {buttonText}
      </button>
    </div>
  );
}