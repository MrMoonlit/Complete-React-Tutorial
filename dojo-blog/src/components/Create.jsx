import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author, setAuthor] = useState("Lucinka");
	const [isPending, setIsPending] = useState(false);
	const history = useHistory();

	const handleSubmit = (e) =>{
		e.preventDefault();
		const blog = {title, body, author};

		setIsPending(true)

		fetch("http://localhost:8000/blogs", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(blog)
		}).then(()=>{
			console.log("New blog added")
			setIsPending(false);
			//history.go(-1);
			history.push("/");
		})

	}
	return (
		<div className="crete">
			<div className="create">
				<h2>Add a New Blog</h2>
				<form onSubmit={handleSubmit}>
					<label>Blog Title:</label>
					<input
						type="text"
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label>Blog Body:</label>
					<textarea
						cols="30"
						rows="10"
						required
						onChange={(e) => setBody(e.target.value)}
					></textarea>
					<label>Blog author:</label>
					<select
					value={author}
					onChange={(e) => setAuthor(e.target.value)}>
						<option value="Mackan">Mackan</option>
						<option value="Lucinka">Lucinka</option>
					</select>
					{ !isPending && <button>Add Blog</button>}
					{ isPending && <button disabled>Adding Blog</button>}
					
				</form>
			</div>
		</div>
	);
};

export default Create;
