import { 
  IonContent, 
  IonHeader, 
  IonItem, 
  IonList, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonCol,
  IonRow,
  IonLabel
} from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Specialties.css';

interface Specialty {
  name: string,
  code: string,
  description:string
}

class Specialties extends React.Component<any, {
	specialties: Specialty[]
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      specialties: []
    };
  }

  componentDidMount() {
		this.load()
  }

  load() {
    fetch("http://127.0.0.1:5000/specialties")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            specialties: result
          });
        },
        (error) => {
          this.setState({
            specialties: []
          });
        }
      )
  }

  render (){

    const {specialties} = this.state

    return (
      <IonPage>
        <IonContent>
          <IonTitle class="subtitle">ВСЕ НАПРАВЛЕНИЯ</IonTitle>
          <IonList>
            {
              specialties.map (specialty => (
                <Specialty specialty={specialty}/>
              ))
            }
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
}

interface SpecialtyProps {
  specialty: Specialty
}

const Specialty = ({ specialty }: SpecialtyProps) => (
  <IonCard class="specialty-card">
    <IonRow>
      <IonCol className="specialty-col">
        <IonCardHeader>
          <IonCardTitle>{specialty.name}</IonCardTitle>
          <IonCardSubtitle>Код направления: {specialty.code}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="specialty-desc">
            {specialty.description
            +"Ю́жный федера́льный университе́т (ЮФУ) — высшее учебное заведение, один из федеральных университетов России, расположенный в Ростове-на-Дону и Таганроге Ростовской области[1]. Является крупным научно-образовательным центром России[1]. История Южного федерального университета начинается в 1915 году, когда на юг были эвакуированы факультеты Российского Варшавского Императорского университета[1], открытого в 1817 году императором России Александром I. Инициатором перевода Варшавского университета именно в Ростов-на-Дону был Николай Васильевич Парийский (1858—1923). В течение XX века университет менял н"}
        </IonCardContent>
      </IonCol>
    </IonRow>
  </IonCard>
)

export default Specialties;
