import { createRoot } from 'react-dom/client'
import { useState } from 'react';
import { imageList } from './images.js'
import './Netherdeep.css'




let clickedImageUrl;

function Image({url, setPreviewImage, onImageClick}) {
  function handleClick() {
    setPreviewImage(url);
    onImageClick();
  }

  return (
    <button className="gallery-img-container" onClick={handleClick}><img className="gallery-img" src={url}></img></button>
  )
}

function Comic({comic, folder, setPreviewImage, onImageClick}) {
  const rendered = comic.images.map(page => 
      <Image 
        key={page.filename} 
        url={'./netherdeep/img/'+ folder + '/' + page.filename} 
        setPreviewImage={setPreviewImage} 
        onImageClick={onImageClick}
        />
    )
  return (
    <div>{rendered}</div>
  )
}

function GallerySection({section, setPreviewImage, onImageClick}) {
  // const shownImages = images.filter((image) => {return !image.hidden});
  let renderedImages = [];
  for (let image of section.images) {
    if (!image.hidden) {
      if (image.filename.endsWith(".png" || ".gif" || ".jpg" || ".jpeg")) {
        renderedImages.push(
          <Image 
            key={image.filename} 
            url={'./netherdeep/img/'+ section.sectionFolder + '/' + image.filename} 
            setPreviewImage={setPreviewImage} 
            onImageClick={onImageClick}
            />
        );
      } else if (image.filename.startsWith("comic")) {
        renderedImages.push(
          <Comic 
            comic={image} 
            folder={section.sectionFolder}
            setPreviewImage={setPreviewImage} 
            onImageClick={onImageClick}
          />)
      }
    }
  }

  return (
    <div>{renderedImages}</div>
  )
}

function Sidebar() {
  return (
    <aside id='sidebar'>
      <h1>Netherdeep<br></br>Art Archive</h1>
      <ul>
        {imageList.map(sec => 
          <a key={sec.section} href={"#" + sec.section}><li>{sec.name}</li></a>
        )}
      </ul>
    </aside>
  )
}

function ClickedImage({imagePath, render, onClick}) {
  let rendered = <></>;
  if (render) {
    rendered = <button id="clicked-image-container" onClick={onClick}><img id="clicked-image" src={imagePath} /></button>
  }
  return (
    <>{rendered}</>
  )
}

function Netherdeep() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  function imageClicked(  ) {
    setPreviewVisible(true);
    console.log(previewVisible);
  }
  function previewClicked() {
    setPreviewVisible(false);
  }

  const gallery = imageList.map(sec =>
    <div key={sec.sectionFolder}>
      <h1 id={sec.sectionFolder}>{sec.name}</h1>
      <GallerySection section={sec} setPreviewImage={setPreviewImage} onImageClick={imageClicked} />
    </div>
  );

  return (
    <>
      <Sidebar />
      <div id="gallery">
        {gallery}
      </div>
      <ClickedImage imagePath={previewImage} render={previewVisible} onClick={previewClicked} />
    </>
  )
}
  
createRoot(document.getElementById('root')).render(
  <Netherdeep />,
)