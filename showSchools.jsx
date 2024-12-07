import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    
    const fetchSchools = async () => {
      const response = await fetch("/api/getSchools");
      const data = await response.json();
      setSchools(data);
    };

    fetchSchools();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Schools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {schools.map((school) => (
          <div key={school.id} className="border rounded p-4">
            <img src={`/schoolImages/${school.image}`} alt={school.name} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-bold">{school.name}</h2>
            <p>{school.address}</p>
            <p>{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
