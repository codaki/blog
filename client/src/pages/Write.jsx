import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || '');
   
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || '');

    const navigate = useNavigate()

    const upload = async()=>{
        try{
            const formData= new FormData();
            formData.append("file",file)
            const res=await axios.post("/upload", formData)
            return res.data

        }catch(err){
            console.log(err)
        }
    }
    
    const handleClick = async e=>{
        e.preventDefault()
        const imgUrl= await upload()

        try{
            state ? await axios.put(`/posts/${state.id}`,{
                title,
                desc:value,
                cat,
                img:file ? imgUrl: "",
            }) 
            : await axios.post(`/posts/`,{
                title,
                desc:value,
                cat,
                img:file ? imgUrl: "",
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
            navigate("/");

        }catch(err){
            console.log(err)
        }

    }

    


    return (
        <div className="add">
            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
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
                    <input style={{ display: "none" }} type="file" id="file" name="" onChange={e=>setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Subir Archivo</label>
                    <div className="buttons">
                   
                        <button onClick={handleClick}>Publicar</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Categoria</h1>
                    <div className="cat">
                        <input type="radio" checked={cat === 'arte'} name="cat" value="arte" id="arte" onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="arte">Arte</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "fisica"} name="cat" value="fisica" id="fisica" onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor="fisica">Fisica</label>

                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "computacion" } name="cat" value="computacion" id="computacion" onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="computacion">Computacion</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "quimica"} name="cat" value="quimica" id="quimica" onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor="quimica">Quimica</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "calculo"} name="cat" value="calculo" id="calculo" onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="calculo">Calculo</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "matematicas"} name="cat" value="matematicas" id="matematicas" onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="matematicas">Matematicas</label>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default Write