export async function GET(request) {
  const doctors = [
    { id: "doc_001", name: "Dr. Aarav Sharma", specialization: "Cardiologist", consultation_fee: 1200 },
    { id: "doc_002", name: "Dr. Neha Verma", specialization: "Dermatologist", consultation_fee: 800 },
    { id: "doc_003", name: "Dr. Rohan Gupta", specialization: "Orthopedic Surgeon", consultation_fee: 1000 },
    { id: "doc_004", name: "Dr. Priya Mehta", specialization: "Pediatrician", consultation_fee: 700 },
    { id: "doc_005", name: "Dr. Vikram Singh", specialization: "Neurologist", consultation_fee: 1500 },
    { id: "doc_006", name: "Dr. Ananya Das", specialization: "Gynecologist", consultation_fee: 900 },
    { id: "doc_007", name: "Dr. Kunal Joshi", specialization: "ENT Specialist", consultation_fee: 600 },
    { id: "doc_008", name: "Dr. Sneha Iyer", specialization: "Psychiatrist", consultation_fee: 1100 },
    { id: "doc_009", name: "Dr. Aditya Rao", specialization: "General Physician", consultation_fee: 500 },
    { id: "doc_010", name: "Dr. Meera Nair", specialization: "Endocrinologist", consultation_fee: 1300 },

    { id: "doc_011", name: "Dr. Arjun Patel", specialization: "Cardiologist", consultation_fee: 1400 },
    { id: "doc_012", name: "Dr. Shreya Kulkarni", specialization: "Dermatologist", consultation_fee: 850 },
    { id: "doc_013", name: "Dr. Mohit Bansal", specialization: "Orthopedic Surgeon", consultation_fee: 1100 },
    { id: "doc_014", name: "Dr. Kavya Reddy", specialization: "Pediatrician", consultation_fee: 750 },
    { id: "doc_015", name: "Dr. Nitin Agarwal", specialization: "Neurologist", consultation_fee: 1600 },
    { id: "doc_016", name: "Dr. Pooja Sharma", specialization: "Gynecologist", consultation_fee: 950 },
    { id: "doc_017", name: "Dr. Saurabh Malhotra", specialization: "ENT Specialist", consultation_fee: 650 },
    { id: "doc_018", name: "Dr. Ritu Kapoor", specialization: "Psychiatrist", consultation_fee: 1200 },
    { id: "doc_019", name: "Dr. Devansh Mehta", specialization: "General Physician", consultation_fee: 400 },
    { id: "doc_020", name: "Dr. Ishita Banerjee", specialization: "Endocrinologist", consultation_fee: 1250 },

    { id: "doc_021", name: "Dr. Harsh Vardhan", specialization: "Cardiologist", consultation_fee: 1500 },
    { id: "doc_022", name: "Dr. Tanya Kapoor", specialization: "Dermatologist", consultation_fee: 900 },
    { id: "doc_023", name: "Dr. Yash Deshmukh", specialization: "Orthopedic Surgeon", consultation_fee: 1050 },
    { id: "doc_024", name: "Dr. Alok Verma", specialization: "Pediatrician", consultation_fee: 700 },
    { id: "doc_025", name: "Dr. Simran Kaur", specialization: "Neurologist", consultation_fee: 1550 },
    { id: "doc_026", name: "Dr. Nisha Jain", specialization: "Gynecologist", consultation_fee: 900 },
    { id: "doc_027", name: "Dr. Rahul Mehra", specialization: "ENT Specialist", consultation_fee: 600 },
    { id: "doc_028", name: "Dr. Aditi Sharma", specialization: "Psychiatrist", consultation_fee: 1150 },
    { id: "doc_029", name: "Dr. Manoj Tripathi", specialization: "General Physician", consultation_fee: 450 },
    { id: "doc_030", name: "Dr. Sanya Arora", specialization: "Endocrinologist", consultation_fee: 1350 },

    { id: "doc_031", name: "Dr. Deepak Sinha", specialization: "Cardiologist", consultation_fee: 1450 },
    { id: "doc_032", name: "Dr. Rhea Malhotra", specialization: "Dermatologist", consultation_fee: 850 },
    { id: "doc_033", name: "Dr. Pranav Khanna", specialization: "Orthopedic Surgeon", consultation_fee: 1000 },
    { id: "doc_034", name: "Dr. Neelam Joshi", specialization: "Pediatrician", consultation_fee: 720 },
    { id: "doc_035", name: "Dr. Amitabh Rao", specialization: "Neurologist", consultation_fee: 1700 },
    { id: "doc_036", name: "Dr. Kriti Sharma", specialization: "Gynecologist", consultation_fee: 950 },
    { id: "doc_037", name: "Dr. Vikas Chauhan", specialization: "ENT Specialist", consultation_fee: 650 },
    { id: "doc_038", name: "Dr. Palak Gupta", specialization: "Psychiatrist", consultation_fee: 1000 },
    { id: "doc_039", name: "Dr. Sanjay Batra", specialization: "General Physician", consultation_fee: 500 },
    { id: "doc_040", name: "Dr. Radhika Nair", specialization: "Endocrinologist", consultation_fee: 1400 },

    { id: "doc_041", name: "Dr. Anil Mehta", specialization: "Cardiologist", consultation_fee: 1550 },
    { id: "doc_042", name: "Dr. Swati Jain", specialization: "Dermatologist", consultation_fee: 900 },
    { id: "doc_043", name: "Dr. Hemant Verma", specialization: "Orthopedic Surgeon", consultation_fee: 1100 },
    { id: "doc_044", name: "Dr. Juhi Kapoor", specialization: "Pediatrician", consultation_fee: 750 },
    { id: "doc_045", name: "Dr. Tarun Sethi", specialization: "Neurologist", consultation_fee: 1600 },
    { id: "doc_046", name: "Dr. Manisha Iyer", specialization: "Gynecologist", consultation_fee: 920 },
    { id: "doc_047", name: "Dr. Karan Malhotra", specialization: "ENT Specialist", consultation_fee: 600 },
    { id: "doc_048", name: "Dr. Divya Arora", specialization: "Psychiatrist", consultation_fee: 1180 },
    { id: "doc_049", name: "Dr. Gaurav Mehra", specialization: "General Physician", consultation_fee: 450 },
    { id: "doc_050", name: "Dr. Ishaan Kapoor", specialization: "Endocrinologist", consultation_fee: 1320 },
  ];

   const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = 10;

  const search = searchParams.get("search") || "";
  const specialization = searchParams.get("specialization") || "";

  let filtered = doctors;

  if (search) {
    filtered = filtered.filter((doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (specialization) {
    filtered = filtered.filter(
      (doc) => doc.specialization === specialization
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = filtered.slice(start, end);

  return Response.json({
    data: paginated,
    hasMore: end < filtered.length,
  });
}