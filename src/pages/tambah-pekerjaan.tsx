import React, { useState } from "react";
import { useRouter } from "next/router";

const TambahPekerjaanPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    descriptions: "",
    address: "",
    imageURL: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token"); // Ambil token dari local storage

    if (!userId || !token) {
      alert("User ID or token is not available. Please login.");
      return;
    }

    try {
      const response = await fetch(
        `https://alfred-server.up.railway.app/job/create-job/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle success scenario
        // Anda mungkin ingin mengarahkan pengguna ke halaman lain atau menampilkan pesan sukses
        router.push("/dashboard");
      } else {
        // Handle non-successful responses
        const errorData = await response.json();
        alert(errorData.message || "Failed to create job");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Jika error adalah instance dari Error, gunakan message dari error tersebut
        alert(error.message);
      } else {
        // Jika tidak, gunakan pesan error umum
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tambah Pekerjaan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="descriptions">Descriptions</label>
          <input
            type="text"
            name="descriptions"
            value={formData.descriptions}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Tambah Pekerjaan</button>
      </form>
    </div>
  );
};

export default TambahPekerjaanPage;
