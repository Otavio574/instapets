// import "./Login/styles.css";
import "./styles.css"
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState, useRef} from "react";

interface newPageProps{
    newPageType: "newPage"|"blankPage" | undefined;
}

interface UploadedImage {
    url: string;
    caption: string;
}



function NewPage({ newPageType }: newPageProps) {
    const [showNP, setShowNP] = useState(false);
    const [caption, setCaption] = useState<string>("");
    const[image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

    const handleClick = () => {
      setShowNP(!showNP);
    }
  
    
    const handleCloseOverlay = () => {
        setShowNP(false);
    };
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handlePost= () => {
      if(image){
        setUploadedImages([
          { url: URL.createObjectURL(image), caption: caption }, 
          ...uploadedImages, 
        ]);
        setImage(null);
        setCaption("");
        setShowNP(false);
      }
    }
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("postar")

      if(!image) {
        console.error("Nenhuma imagem selecionada")
        return;
      }

      try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption);

        const response = await axios.post("http://localhost:5173/upload", formData);
        setUploadedImages((prevImages) => [...prevImages, response.data.imageUrl]);
        console.log("Imagem enviada com sucesso!", response.data);
      }

      catch(error){
        console.error("Erro ao enviar imagem:", error);
      }

    };

    return (
      
      <div className="newpost-container">
      
        {newPageType === "newPage" && showNP ? (
          <div className="overlay" style = {{color: "black"}}>
              <span className="close-icon" onClick={handleCloseOverlay}>&#10006;</span>
              <h1>Novo Post</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="subtitle"
                  style = {{color: "black"}}
                  placeholder="Legenda"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />

                <div className="button-container1">
                  <button 
                    className="custom-button" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Image
                  </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={(ref) => (fileInputRef.current = ref)}
                  style={{ display: "none" }}
                />
                <div className="post-image-container">
                {image && (
                <img className="selected-image" src={URL.createObjectURL(image)} alt="Imagem"
                /> 
                )}
                </div>
                </div>
              <button className="custom-button2" onClick={handlePost}>
                Publicar
              </button>
            </form>
            </div>
    
    ) : (
        <div>
            <button className = "new-post-button" onClick={handleClick}>
              Criar novo post
            <p>+</p>
            </button>
        </div>
    )}

    <form onSubmit={handleSubmit}>
    {uploadedImages.map((newImage, index) => (
                <div className="image-post-container" key={index}>
                <img src={newImage.url} alt={`Imagem ${index+1}`} />
                <div className="caption">
                    <p className="image-caption">@user.name {newImage.caption}</p>
                    <p className="time-post">1min</p>
                </div>
                </div>
            ))}
      </form>
      </div>
    );
};
  
  export default NewPage;
  