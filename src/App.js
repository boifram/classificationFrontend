import Container from "./components/Container";

function App() {

  const user = window.location.pathname.replace('/', '')
  console.log(user)
  if(user==="") return (
    <div>No valid user</div>
  )
  return (
    <div className="App">
      <Container user={user} />
    </div>
  );
}

export default App;
