import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
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
import ExploreContainer from '../components/ExploreContainer';
import StarRatingComponent from 'react-star-rating-component';
import './Universities.css';

interface University {
  id: number,
  name: string,
  city: string,
  image: string,
  placeInRussianTop: number,
  description: string,
  avg: number,
  count: number
}

class Universities extends React.Component<any, {
	universities: University[]
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      universities: []
    };
  }

  componentDidMount() {
		this.load()
  }

  load() {
    fetch("http://127.0.0.1:5000/universities")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(JSON.stringify(result))
          this.setState({
            universities: result
          });
        },
        (error) => {
          this.setState({
            universities: []
          });
        }
      )
  }

  render() {
    const {universities} = this.state
    
    return (
      <IonPage>
        <IonContent>
          <IonTitle class="subtitle">ВСЕ УНИВЕРСИТЕТЫ</IonTitle>
          <IonList>
            {
              universities.map (university => (
                <University university={university}/>
              ))
            }
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
};

interface UniversityProps {
  university: University
}

const University = ({ university }: UniversityProps) => {

  const history = useHistory()

	return (
    <IonCard class="university-card" button onClick={() => history.push(`/university/${university.id}`)}>
      <IonRow>
        <IonCol className="university-col university-image-col">
          <img height="300px" width="300px" className="university-image" src={university.image}/>
        </IonCol>
        <IonCol className="university-col">
          <IonCardHeader class="university-header">
            <IonCardTitle>{university.name}</IonCardTitle>
            <IonCardSubtitle>г. {university.city}</IonCardSubtitle>
            
            <div className="university-info-row">
              <IonLabel color="primary">{university.placeInRussianTop}-е место в России</IonLabel>
            </div>
            
            <div className="university-info-row">
              <StarRatingComponent 
                name={university.name+"_rating"} 
                starCount={5}
                editing={false}
                value={university.avg}
                onStarClick={undefined}/>

              <span className="university-review-count">{university.count} отзывов</span>
            </div>

          </IonCardHeader>
          <IonCardContent className="university-desc">
              {
              university.description
              }
          </IonCardContent>
        </IonCol>
      </IonRow>
    </IonCard>
  )
}

export default Universities;
