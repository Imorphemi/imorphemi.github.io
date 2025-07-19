import { createRoot } from 'react-dom/client'
import { imageList } from './images.js'
import './Netherdeep.css'


const gallery = imageList.map(sec =>
  <div key={sec.section}>
    <h1>{sec.name}</h1>
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


function Netherdeep() {  
  return (
    <div>
      {gallery}
    </div>
  )
}
  
  createRoot(document.getElementById('root')).render(
    <Netherdeep />,
  )