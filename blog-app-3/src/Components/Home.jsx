import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleAddButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (data) => {
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const newBlog = await response.json();
        // Optionally update local state to show the newly added blog
        setBlogs([...blogs, newBlog]);
        // Hide the form and reset inputs
        setShowForm(false);
        reset();
      } else {
        console.error("Error adding blog post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="">
        {/*first grid section */}
        <div className="">
          title
          {/*header outline */}
          <div>
            {/*header boxes */}
            <div></div>
            <div></div>
          </div>
        </div>
        {/* small box to add and press previous page */}
        <div>
          <button className="home-buttons">Previous</button>
          <button onClick={handleAddButtonClick} className="home-buttons">
            {showForm ? "Cancel" : "Add"}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <input
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title && <p>Title is required.</p>}
              <input
                placeholder="Body"
                {...register("content", { required: true })}
              />
              {errors.content && <p>Content part is required</p>}
            </div>
            <button type="submit" className="home-buttons">
              Submit
            </button>
          </form>
        )}
        {/*second grid section */}
        <div>
          {/*body outline */}
          <div>
            <Link to={`/blog/:id`} className="block">
              <div className="p-4 border rounded hover:bg-gray-100">
                <h2 className="text-xl font-bold">w</h2>
                <p>title</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
