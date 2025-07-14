import './Directory.css'

function Button({ text, url }) {
    return (
      <a class="dir-button" href={url}><button>{text}</button></a>
    )
  }

function Directory() {  
    return (
      <div>
        <Button
            text={"Netherdeep"}
            url={"/netherdeep"}
        />
        <Button 
            text={"Spell Circles"}
            url={"/spellcircles"}
        />
      </div>
    )
  }
  
  export default Directory