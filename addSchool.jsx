import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");


  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append(key, data[key][0]); 
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await axios.post("/api/addSchool", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("School added successfully!");
    } catch (error) {
      setMessage("Error adding school.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Add School</h1>
      {message && <p>{message}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* School Name */}
        <div>
          <label>School Name</label>
          <input {...register("name", { required: "Name is required" })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label>Address</label>
          <textarea {...register("address", { required: "Address is required" })}></textarea>
          {errors.address && <p>{errors.address.message}</p>}
        </div>

        {/* City */}
        <div>
          <label>City</label>
          <input {...register("city", { required: "City is required" })} />
          {errors.city && <p>{errors.city.message}</p>}
        </div>

        {/* State */}
        <div>
          <label>State</label>
          <input {...register("state", { required: "State is required" })} />
          {errors.state && <p>{errors.state.message}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label>Contact</label>
          <input
            type="number"
            {...register("contact", {
              required: "Contact is required",
              pattern: { value: /^[0-9]{10}$/, message: "Invalid contact number" },
            })}
          />
          {errors.contact && <p>{errors.contact.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email_id", {
              required: "Email is required",
              pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email" },
            })}
          />
          {errors.email_id && <p>{errors.email_id.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label>Image</label>
          <input type="file" {...register("image", { required: "Image is required" })} />
          {errors.image && <p>{errors.image.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
