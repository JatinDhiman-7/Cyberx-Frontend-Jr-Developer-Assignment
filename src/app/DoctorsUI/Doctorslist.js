"use client";

import { useEffect, useState } from "react";

export default function DoctorsClient({ initialData }) {
  const [doctors, setDoctors] = useState(initialData);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // MAIN FETCH FUNCTION
  const fetchDoctors = async (pageNumber, reset = false) => {
    setLoading(true);

    let url = `/api/doctors?page=${pageNumber}`;

    if (search) url += `&search=${search}`;
    if (specialization) url += `&specialization=${specialization}`;

    const res = await fetch(url);
    const data = await res.json();

    if (reset) {
      setDoctors(data.data);
    } else {
      setDoctors((prev) => [...prev, ...data.data]);
    }

    setHasMore(data.hasMore);
    setLoading(false);
  };

  // LOAD MORE
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchDoctors(nextPage);
  };

  // SEARCH (RESET PAGE)
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchDoctors(1, true);
    }, 400); // debounce

    return () => clearTimeout(delay);
  }, [search, specialization]);

  return (
    <div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3 mb-6">

        <input
          type="text"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-lg w-full"
        />

        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="">All</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
          <option value="Gynecologist">Gynecologist</option>
        </select>

      </div>

      {/* DOCTORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doc, i) => (
          <div key={i} className="border p-4 rounded-lg">
            <h2 className="font-bold">{doc.name}</h2>
            <p>{doc.specialization}</p>
            <p>₹{doc.consultation_fee}</p>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

    </div>
  );
}