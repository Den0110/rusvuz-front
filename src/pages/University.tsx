import React from 'react';
import { withRouter } from 'react-router-dom';
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
import './University.css';

interface University {
  name: string,
  city: string,
  image: string,
  placeInRussianTop: number,
  description: string,
  avg: number,
  count: number,
  ratings: Rating[],
  specialties: Specialty[],
  news: New[]
}

interface Rating {
rating:number,
text:string,
user_name:string
}

interface Specialty {
  name: string,
  code:string,
  budget: number
}

interface New {
date:string,
text:string,
title:string
}


class Universities extends React.Component<any, {
	university: University
}> {

  univId:number

  constructor(props: any) {
    super(props);

    this.univId = props.match.params.id

    this.state = {
      university: { name:"", city:"", image: "", placeInRussianTop:0, description:"", avg:0, count:0, ratings: [],
      specialties: [],
      news: []}
    };
  }

  componentDidMount() {
		this.load()
  }

  load() {

    const data = new FormData();
    data.append("id", `${this.univId}`);
    fetch(`http://127.0.0.1:5000/university`, {
      method: 'POST', 
      body: data
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(JSON.stringify(result))
          this.setState({
            university: result
          });
        },
        (error) => {
        }
      )
  }

  render() {
    const {university} = this.state
    
    return (
      <IonPage>
        <IonContent>
          <University university={university}/>
        </IonContent>
      </IonPage>
    );
  }
};

interface UniversityProps {
  university: University
}

const University = ({ university }: UniversityProps) => (
  <IonCard class="univ-card">
    <IonRow>
      <IonCol className="univ-col univ-image-col">
        <img height="300px" width="300px" className="univ-image" src={university.image}/>
      </IonCol>
      <IonCol className="univ-col">
        <IonCardHeader class="univ-header">
          <IonCardTitle>{university.name}</IonCardTitle>
          <IonCardSubtitle>г. {university.city}</IonCardSubtitle>
          
          <div className="univ-info-row">
            <IonLabel color="primary">{university.placeInRussianTop}-е место в России</IonLabel>
          </div>
          
          <div className="univ-info-row">
            <StarRatingComponent 
              name={university.name+"_rating"} 
              starCount={5}
              editing={false}
              value={university.avg}
              onStarClick={undefined}/>

            <span className="univ-review-count">{university.count} отзывов</span>
          </div>

        </IonCardHeader>
        <IonCardContent className="univ-desc">
            {
            university.description
            }
        </IonCardContent>

        <IonTitle>НАПРАВЛЕНИЯ</IonTitle>

        {
          university.specialties.map (spec => (
            <IonItem>
                <IonLabel>{spec.name} {spec.code}</IonLabel>
                <br/>
                <IonLabel> Баллов для поступления на бюджетное место: {spec.budget}</IonLabel>
            </IonItem>
          ))
        }

        <br/>
        <br/>

        <IonTitle>НОВОСТИ</IonTitle>

        {
          university.news.map (news => (
            <div className="item">
            <IonItem>
              {news.date}
                <br/>
              <IonTitle>{news.title}</IonTitle>

                </IonItem>
            <IonItem>
              <span className="text">{news.text}</span>
            </IonItem>

            </div>
          ))
        }

        <br/>
        <br/>
        <IonTitle>ОТЗЫВЫ</IonTitle>

        {
          university.ratings.map (rating => (
            <div className="item">
              <IonTitle>{rating.user_name}</IonTitle>
              <div className="starz">
                <StarRatingComponent 
                  name={university.name+"_rating"} 
                  starCount={5}
                  editing={false}
                  value={rating.rating}
                  onStarClick={undefined}/>
              </div>
              <IonItem>
                <span className="text">{rating.text}</span>
              </IonItem>
            </div>
          ))
        }

      </IonCol>
    </IonRow>
  </IonCard>
)

export default Universities;
