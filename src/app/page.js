import DoctorsClient from "./DoctorsUI/Doctorslist";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/api/doctors?page=1`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-black min-h-screen p-6">
      <div className="w-full max-w-6xl">

       
        <h1 className="text-2xl font-bold mb-6 text-center">
          Find Your Doctor
        </h1>

        
        <DoctorsClient initialData={data.data} />

      </div>
    </div>
  );
}