import React from 'react';
import { City } from "./PollingPage/City"
import './App.css';
import {SignUp} from "./SignUp/signup";
import { SignInPage } from "./SignIn/SignInPage";
import {IPoliquickState} from './redux/types'
import { WelcomePage } from './SignUp/Welcome';
import { ElectionPage } from './ElectionsPage/Elections';
import { PoliticiansPage } from './ElectionsPage/PoliticianPage';
import { PageOne } from './QuizPage/Quizes/PageOne'
import { PageTwo } from './QuizPage/Quizes/PageTwo'
import { PageThree } from './QuizPage/Quizes/PageThree'
import { PageFour } from './QuizPage/Quizes/PageFour'

import {AnikaPage} from './PoliticianPage/Anika'
import {GeronimoPage} from './PoliticianPage/Geronimo'
import {LuciPage} from './PoliticianPage/Lucienne'
import {ElisePage} from './PoliticianPage/Elise'
import {AndrewPage} from './PoliticianPage/Andrew'
import {JeanettePage} from './PoliticianPage/Jeanette'
import {CabalPage} from './PoliticianPage/Cabal'
import {Lori, LoriPage} from './PoliticianPage/Lori'
import {Cristopher, CristopherPage} from './PoliticianPage/Cristopher'
import {Kye, KyePage} from './PoliticianPage/Kye'
import {Alan, AlanPage} from './PoliticianPage/Alan'
import {Willie, WilliePage} from './PoliticianPage/Willie'

 
export enum pages {
 SignUp,
 SignInPage,
 WelcomePage,
 QuizPage,
 PollsInfoPage,
 ElectionPage,
 PoliticianPage,
 City,

Anika,
Elise,
Geronimo,
Lucienne,
Andrew,
Jeanette,
Cabal,
Lori,
Cristopher,
Kye,
Alan,
Willie,
  
PageOne,
PageTwo,
PageThree,
PageFour
}

export enum filterType {
 Mayor,
 CityCouncil,
 All
}
 
interface AppState {
 currentPage: pages;
 filter: filterType
}
 
export class App extends React.Component<{},AppState> {
 constructor(props: any) {
 super(props);
 this.state = { ...this.state, currentPage: pages.SignInPage, filter:filterType.All} ;
 }
 render() {
 return <div>{this.getCurrentScreen(this.state.filter)}</div>;
 }
 
private getCurrentScreen = (filter:filterType): JSX.Element => {
 switch (this.state.currentPage) {
    case pages.SignInPage:
    return <SignInPage changePage={this.changeScreen}/>
    case pages.ElectionPage:
      return <ElectionPage changePage={this.changeScreen} filter={filter} changeFilter={this.changeFilter}  />; 
    case pages.WelcomePage:
      return <WelcomePage changePage={this.changeScreen} />;
    case pages.PageOne:
      return <PageOne changePage={this.changeScreen} />;
    case pages.PageTwo:
      return <PageTwo changePage={this.changeScreen} />;
    case pages.PageThree:
      return <PageThree changePage={this.changeScreen}/>;
    case pages.PageFour:
      return <PageFour changePage={this.changeScreen}/>;      
    case pages.City:
      return <City changePage={this.changeScreen}/>
    case pages.SignUp:
    return <SignUp changePage={this.changeScreen} />;
    case pages.PoliticianPage:
    return <PoliticiansPage changePage={this.changeScreen} name="Vane"/>;

  

    case pages.Geronimo:
      return <GeronimoPage changePage={this.changeScreen}/>;
    case pages.Lucienne:
      return <LuciPage changePage={this.changeScreen}/>;
    case pages.Anika:
      return <AnikaPage changePage={this.changeScreen}/>;
    case pages.Elise:
      return <ElisePage changePage={this.changeScreen}/>;
    case pages.Andrew:
      return <AndrewPage changePage={this.changeScreen}/>;
    case pages.Jeanette:
      return <JeanettePage changePage={this.changeScreen}/>;
    case pages.Cabal:
      return <CabalPage changePage={this.changeScreen}/>;
    case pages.Lori:
      return <LoriPage changePage={this.changeScreen}/>;
    case pages.Cristopher:
      return <CristopherPage changePage={this.changeScreen}/>;
    case pages.Kye:
      return <KyePage changePage={this.changeScreen}/>;
    case pages.Alan:
      return <AlanPage changePage={this.changeScreen}/>;
    case pages.Willie:
      return <WilliePage changePage={this.changeScreen}/>;

    default:
    return <div>ERROR</div>;
  }
 };
 
 private changeScreen = (nextPage: pages) => {
  this.setState((state, props) => ({
  ...this.state,
  currentPage: nextPage
  }));
 };
 private changeFilter = (filter:filterType) => {
  this.setState((state, props) => ({
  ...this.state,
  filter
  }));
 }
}
export default App;