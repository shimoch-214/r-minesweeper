import { MineSweeper } from "./components/mineSweeper";
import { MineSweeperProvider } from "./provider";

function App() {
  return (
    <div className="flex justify-center">
      <MineSweeperProvider>
        <MineSweeper />
      </MineSweeperProvider>
    </div>
  );
}

export default App;
