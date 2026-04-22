
"use client";

import { useEffect, useState } from "react";

export default function DoctorsClient({ initialData }) {
  const [doctors, setDoctors] = useState(initialData);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const fetchDoctors = async (pageNumber, reset = false) => {
    if (reset) setIsSearching(true);
    setLoading(true);

    let url = `/api/doctors?page=${pageNumber}`;
    if (search) {
        url += `&search=${search}`
    };
    if (specialization) {
        url += `&specialization=${specialization}`
    };

    const res = await fetch(url);
    const data = await res.json();

    if (reset) {
        setDoctors(data.data)
    }
    else {
        setDoctors((prev) => [...prev, ...data.data])
    };

    setHasMore(data.hasMore);
    setLoading(false);
    setIsSearching(false);
    setWaiting(false); 
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchDoctors(nextPage);
  };

  
  useEffect(() => {
    setWaiting(true); 
    
    const timer = setTimeout(() => {
      setPage(1);
      fetchDoctors(1, true);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, specialization]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Find Doctors
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>

        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full sm:w-64 px-4 py-3 rounded-xl border border-gray-200 shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Specializations</option>
           <option value="Cardiologist">Cardiologist</option>
//           <option value="Dermatologist">Dermatologist</option>
//           <option value="Neurologist">Neurologist</option>
//           <option value="Pediatrician">Pediatrician</option>
//           <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
//           <option value="Gynecologist">Gynecologist</option>
        </select>
      </div>

      <div className="relative">
        {waiting && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur flex items-center justify-center z-10 rounded-xl">
            <p className="text-blue-600 font-medium">⏳ Waiting...</p>
          </div>
        )}
        
        {isSearching && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur flex items-center justify-center z-10 rounded-xl">
            <p className="text-gray-600 font-medium">🔍 Searching...</p>
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-300 
                         ${waiting || isSearching ? "opacity-50" : "opacity-100"}`}>
          
          {doctors.length > 0 ? (
            doctors.map((doc, i) => (
              <div key={i} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mb-3">
                  {doc.name?.charAt(0)}
                </div>
                <h2 className="text-lg font-semibold">{doc.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{doc.specialization}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-blue-600 font-semibold">₹{doc.consultation_fee}</p>
                  <button className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    Work in Progress
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && !isSearching && !waiting && (
              <div className="col-span-full text-center py-16">
                <div className="text-5xl mb-3">😕</div>
                <h3 className="text-xl font-semibold">No doctors found</h3>
              </div>
            )
          )}
        </div>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium
                       hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}