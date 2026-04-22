import DoctorsClient from "./DoctorsUI/Doctorslist";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/doctors?page=1", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-black min-h-screen p-6">
      <div className="w-full max-w-6xl">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Find Your Doctor
        </h1>

        {/* CLIENT COMPONENT */}
        <DoctorsClient initialData={data.data} />

      </div>
    </div>
  );
}