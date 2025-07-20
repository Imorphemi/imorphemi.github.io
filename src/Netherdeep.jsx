import { createRoot } from 'react-dom/client'
import { imageList } from './images.js'
import './Netherdeep.css'


const gallery = imageList.map(sec =>
  <div key={sec.section}>
    <h1 id={sec.section}>{sec.name}</h1>
    <GallerySection folder={sec.section} images={sec.images} />
  </div>
);

function Image({url}) {
  return (
    <img className="gallery-img" src={url}></img>
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

function GallerySection({folder, images}) {
  // const shownImages = images.filter((image) => {return !image.hidden});
  let renderedImages = [];
  for (let image of images) {
    if (!image.hidden) {
      if (image.filename.endsWith(".png" || ".gif" || ".jpg" || ".jpeg")) {
        renderedImages.push(
          <Image key={image.filename} url={'./netherdeep/img/'+ folder + '/' + image.filename} />
        );
      } else if (image.filename.startsWith("comic")) {
        renderedImages.push(<Comic comic={image} folder={folder} />)
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

function Netherdeep() {  
  return (
    <div>
      <Sidebar />
      <div id="gallery">{gallery}</div>
    </div>
  )
}
  
createRoot(document.getElementById('root')).render(
  <Netherdeep />,
)