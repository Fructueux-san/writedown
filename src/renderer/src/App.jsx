import Editor from "./components/Editor";

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Editor />
    </>
  )
}

export default App

