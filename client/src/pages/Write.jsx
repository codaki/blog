import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");

  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateInputs = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Ingrese un título";
    if (!value) newErrors.value = "Ingrese una descripción";
    if (!file) newErrors.file = "Ingrese un archivo";
    if (!cat) newErrors.cat = "Seleccione una categoria";
    return newErrors;
  };
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(DOMPurify.sanitize(e.target.value))}
        />
        {errors.title && <span className="error">{errors.title}</span>}
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={(content) => setValue(DOMPurify.sanitize(content))}
          />
        </div>
        {errors.value && <span className="error">{errors.value}</span>}
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicar</h1>
          <span>
            <b>Estatus: </b> Borrador
          </span>
          <span>
            <b>Visibilidad: </b> Publico
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            accept=".png"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile && selectedFile.type !== "image/png") {
                alert("Solo se aceptan archivos en formato .png .");
                e.target.value = null;
                setFile(null);
              } else {
                setFile(selectedFile);
              }
            }}
          />
          <label className="file" htmlFor="file">
            Subir Archivo
          </label>
          {errors.file && <span className="error">{errors.file}</span>}
          <div className="buttons">
            <button onClick={handleClick}>Publicar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categoria</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "arte"}
              name="cat"
              value="arte"
              id="arte"
              onChange={(e) => setCat(e.target.value)}
            />

            <label htmlFor="arte">Arte</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "fisica"}
              name="cat"
              value="fisica"
              id="fisica"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="fisica">Fisica</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "computacion"}
              name="cat"
              value="computacion"
              id="computacion"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="computacion">Computacion</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "quimica"}
              name="cat"
              value="quimica"
              id="quimica"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="quimica">Quimica</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "calculo"}
              name="cat"
              value="calculo"
              id="calculo"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="calculo">Calculo</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "matematicas"}
              name="cat"
              value="matematicas"
              id="matematicas"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="matematicas">Matematicas</label>
          </div>
          {errors.cat && <span className="error">{errors.cat}</span>}
        </div>
      </div>
    </div>
  );
};
export default Write;
