import AppLayout from "./components/AppLayout";
function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <AppLayout></AppLayout>
    </>
  )
}

export default App

