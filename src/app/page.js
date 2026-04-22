export default async function Home() {
  const data = await getData();

  console.log(data);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="max-w-6xl mx-auto p-4">

          <h1 className="text-2xl font-bold mb-4">
            Find The Doctor According To Your Health Issue
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search Doctors..."
              className="w-full sm:w-2/3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select className="w-full sm:w-1/3 p-2 border rounded-lg">
              <option>All Categories</option>
              <option>Cardiologist</option>
              <option>Dermatologist</option>
              <option>Orthopedic Surgeon</option>
              <option>Pediatrician</option>
              <option>Neurologist</option>
              <option>Gynecologist</option>
              <option>ENT Specialist</option>
              <option>Psychiatrist</option>
              <option>General Physician</option>
              <option>Endocrinologist</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.doctors?.map((doctor) => (
              <div
                key={doctor.id}
                className="border rounded-lg p-4 shadow-sm bg-white dark:bg-zinc-900"
              >
                <h2 className="font-semibold text-lg">{doctor.name}</h2>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                <p className="text-sm">{doctor.hospital}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

async function getData() {
  const res = await fetch("http://localhost:3000/api/doctors", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}