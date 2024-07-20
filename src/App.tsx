import { MineSweeper } from "./components/mineSweeper";
import { MineSweeperProvider } from "./provider";

function App() {
  return (
    <MineSweeperProvider>
      <MineSweeper />
    </MineSweeperProvider>
  );
}

export default App;
