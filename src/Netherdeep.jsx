import { createRoot } from 'react-dom/client'


function Image({url}) {
    return (
      <img src={url} width="500"></img>
    )
  }

function Netherdeep() {  
    return (
      <div>
        {}
      </div>
    )
  }
  
  createRoot(document.getElementById('root')).render(
    <Netherdeep />,
  )