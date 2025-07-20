import { createRoot } from 'react-dom/client'
import { useState } from 'react';
import { imageList } from './images.js'
import './Netherdeep.css'




let clickedImageUrl;

function Image({url, previewVisible, onImageClick}) {
  function imageClicked() {
    clickedImageUrl = url;
  }

  return (
    <button className="gallery-img-container" onClick={onImageClick}><img className="gallery-img" src={url}></img></button>
  )
}

function Comic({comic, folder}) {
  const rendered = comic.images.map(page => 
        <Image key={page.filename} url={'./netherdeep/img/'+ folder + '/' + page.filename} />
    )
  return (
    <div>{rendered}</div>
  )
}

function GallerySection({section, previewVisible, onImageClick}) {
  // const shownImages = images.filter((image) => {return !image.hidden});
  let renderedImages = [];
  for (let image of section.images) {
    if (!image.hidden) {
      if (image.filename.endsWith(".png" || ".gif" || ".jpg" || ".jpeg")) {
        renderedImages.push(
          <Image 
            key={image.filename} 
            url={'./netherdeep/img/'+ section.sectionFolder + '/' + image.filename} 
            previewVisible={previewVisible} 
            onImageClick={onImageClick}
            />
        );
      } else if (image.filename.startsWith("comic")) {
        renderedImages.push(<Comic comic={image} folder={section.sectionFolder} />)
      }
    }
  }

  return (
    <div>{renderedImages}</div>
  )
}

function ClickedImage({imagePath, render, onClick}) {
  let rendered = <div></div>;
  if (render) {
    rendered = <button id="clicked-image-container" onClick={onClick}><img id="clicked-image" src={imagePath} /></button>
  }
  return (
    <>{rendered}</>
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



function Netherdeep() {
  const [previewVisible, setPreviewVisible] = useState(false);

  function imageClicked() {
    setPreviewVisible(true);
    console.log(previewVisible);
  }
  function previewClicked() {
    setPreviewVisible(false);
  }

  const gallery = imageList.map(sec =>
    <div key={sec.sectionFolder}>
      <h1 id={sec.sectionFolder}>{sec.name}</h1>
      <GallerySection section={sec} previewVisible={previewVisible} onImageClick={imageClicked} />
    </div>
  );

  return (
    <>
      
      <Sidebar />
      <div id="gallery">
        {gallery}
      </div>
      <ClickedImage imagePath={'./netherdeep/img/blursties/group10-6.png'} render={previewVisible} onClick={previewClicked} />
    </>
  )
}
  
createRoot(document.getElementById('root')).render(
  <Netherdeep />,
)