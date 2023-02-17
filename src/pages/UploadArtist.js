import "../components/SongForm.css";
import { useState } from "react";
import FileInput from "../components/FileInput";

export default function UploadArtist() {

    const [data, setData] = useState({
        name : "",
        imageUrl: ""
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // const url = process.env.REACT_APP_API_URL + "/songs"
            // const { data: res } = await axios.post(url, data);

            if(data.img === ''){
                return alert("Plz choose image");
            }


            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div style={{ margin: "5rem 1rem 1rem" }}>
            <div className="songForm-container">
                <form className="songForm-form" onSubmit={handleSubmit} >

                    <h1 className="songForm-heading">Artsit Form</h1>
                    <input
                        type="text"
                        className="songForm-input"
                        placeholder="Artsit Name"
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                        required
                    />


                    <FileInput
                        name="img"
                        label="Choose Image"
                        handleInputState={handleInputState}
                        type="image"
                        value={data.imageUrl}

                    />

                    <button type="submit" className="songForm-submit_btn" >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}