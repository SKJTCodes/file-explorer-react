import React, { useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const root_dir = {
    id: 1, 
    name: "Root Folder", 
    children: [{
      id: 2, 
      name: "Main Folder",
      children: [{
        id: 3,
        name: "sub_file.txt",
      },{
        id: 8,
        name: "Sub Folder",
        children: [{
          id: 9,
          name: "subdocx.docx",
        }]
      }]
    },{
      id: 4,
      name: "root_file.txt",
    }, {
      id: 5,
      name: "Main Folder 2",
      children: [{
        id: 6,
        name: "song_file.mp4",
      },{
        id: 7,
        name: "link_file.lnk"
      }]
    }]
  }

  let idArr = []
  const eachRecursive = (obj) => {
    if (!!obj['children']) idArr.push({id: obj.id, isOpen: true})
    
    for (let k in obj){
      if (k === 'children'){
        for (let i in obj[k]) eachRecursive(obj[k][i])
      }
    }
  }
  eachRecursive(root_dir)
  const [openState, setOpenState] = useState(idArr)

  const clickHandler = (id) => {
    console.log(id)
    const index = openState.findIndex((obj) => {
      return obj.id === id;
    })
    const sl_open = openState.slice()
    sl_open[index] = {...sl_open[index], isOpen: !sl_open[index].isOpen}
    setOpenState(sl_open)
  }
  
  return <div>
    <RootFolder 
      name={root_dir.name} 
      openState={openState}
      children={root_dir.children} 
      id={root_dir.id}
      clickHandler={clickHandler}
      />
  </div>
}

const RootFolder = (props) => {
  const { name, children, id, clickHandler, openState } = props;
  const isOpen = openState[openState.findIndex((obj) => obj.id === id)].isOpen
  const folder = children.map((child) => {
    if (!!child.children){
        return <Folder 
          name={child.name} 
          children={child.children}
          key={child.id}
          id={child.id}
          clickHandler={clickHandler}
          openState={openState}
        />
    }
    return <File name={child.name} key={child.id}/>
  })
  return <div className="noselect">
    <span onClick={() => clickHandler(id)}>
      <i className="blue folder icon"></i>
      <i className={`caret ${isOpen ? 'down' : 'right'} icon`}></i>
      {name}
    </span>
    <div>
      {isOpen ? folder : null}
    </div>
  </div>
}

const Folder = (props) => {
  const { name, children, id, clickHandler, openState } = props
  const isOpen = openState[openState.findIndex((obj) => obj.id === id)].isOpen
  let folder = null
  if (children != null) {
    folder = children.map((child) => {
      if (!!child.children){
        return <Folder 
        name={child.name} 
        children={child.children}
        openState={openState}
        id={child.id}
        clickHandler={clickHandler}
        key={child.id}
      />
      }
      return <File name={child.name} key={child.id}/>
      
    })
  }

  return <div style={{marginLeft: '17px'}}>
    <span onClick={() => clickHandler(id)}>
      <i className="blue folder icon"></i>
      <i className={`caret ${isOpen ? 'down' : 'right'} icon`}></i>
      {name}
    </span>
    {!!(folder) ? (isOpen ? folder : null) : null }
  </div>
}

const File = (props) => {
  const { name } = props
  return <div style={{marginLeft: '17px'}}>
    <i className="file alternate outline icon"></i>
    {name}
  </div>
}

export default App;