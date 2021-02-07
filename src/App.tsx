import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonList,
  IonMenuToggle,
  IonRow,
  IonCol,
  IonButton,
  IonImg,
  IonAvatar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Universities from './pages/Universities';
import Specialties from './pages/Specialties';
import University from './pages/University';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';

import logo from "./assets/logo.png";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonHeader>
        <IonToolbar>
          <IonRow class="ion-align-items-center">
            <IonCol class="logo-col">
                <img className="logo" src={logo} />
            </IonCol>
            <IonCol>
                <IonButton fill="clear" routerLink="/specialties" routerDirection="root" class="menu-item">
                  НАПРАВЛЕНИЯ
                </IonButton>
                <IonButton fill="clear" routerLink="/universities" routerDirection="root" class="menu-item">
                  ВУЗЫ РОССИИ
                </IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
    
      <IonContent>
        <IonRouterOutlet class="desktop-wrapper">
            <Route path="/" render={() => <Redirect to="/universities"/>} exact={true}></Route>
            <Route path="/university/:id" component={University} exact={true} />
            <Route path="/universities" component={Universities} exact={true} />
            <Route path="/specialties" component={Specialties} exact={true} />
        </IonRouterOutlet>
      </IonContent>
    </IonReactRouter>
  </IonApp>
);

export default App;
