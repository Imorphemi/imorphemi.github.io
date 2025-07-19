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

function GallerySection({folder, images}) {
  return (
    images.map(image => <Image key={image.filename} url={'./netherdeep/img/'+ folder+ '/' + image.filename} />)
  )
}

function Sidebar() {
  return (
    <aside id='sidebar'>
      <ul>
        {imageList.map(sec => 
          <li key={sec.section}><a href={"#" + sec.section}>{sec.name}</a></li>
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