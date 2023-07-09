import MainPage from '../../pages/main-page/main-page';


type AppScreenProps = {
    CardsCount: number;
}

function App({CardsCount}: AppScreenProps): JSX.Element {
  return (
    <MainPage CardsCount={CardsCount} />
  );
}

export default App;
