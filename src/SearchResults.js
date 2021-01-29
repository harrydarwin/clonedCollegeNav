import React, { Component } from 'react';
import firebase from './Firebase.js';
import Swal from 'sweetalert2';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { Redirect } from 'react-router-dom';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken = `pk.eyJ1IjoiaGFycnlndWxvaWVuIiwiYSI6ImNrazQ2bmFuYTE2c2MydnBiZW5mcDVnaHYifQ.QPjai4qdHOKRY8qHYt1QVw`;

class SearchResults extends Component {

    constructor() {
        super();

        this.state = {
            savedSchool: {
                schoolName: '',
                schoolAddress: [],
            },
            lng: 5,
            lat: 34,
            zoom: 2
        }

        this.sectionRef = React.createRef();
    }


   


    componentDidMount() {
        this.sectionRef.current.scrollIntoView();
        let map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.props.location[0], this.props.location[1]],
            zoom: 11
        });
        // let tradeLayer = [];
        // let uniLayer = [];
        // let CollegeLayer = [];
        // this.props.mapPoints.forEach(point => {

        //     const pointMarker =  {"geojson-marker": {
        //             "type": "geojson",
        //             "data": {
        //                 "type": "Feature",
        //                 "geometry": {
        //                     "type": "Point",
        //                     "coordinates": [point.location.lng, point.location.lat]
        //                 },
        //                 "properties": {
        //                     "title": point.name,
        //                     // "marker-symbol": appointedMarker,
        //                     // "schoolType": schoolType
        //                 }
        //             }
        //         }
        //     }
        //     console.timeLog(pointMarker);
        // })
        

        map.on('load', () => {
            if(this.props.schoolResults) {
                //for each set of coordinates do this and pass coodrinates to setlnglat
                this.props.schoolResults.forEach(point => {
                
                    console.log(point)
                    const marker = new mapboxgl.Marker({
                        color: point.markerColor
                    })  .setLngLat([point.location.lng, point.location.lat])
                        .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.name}</h4><p>${point.location.formattedAddress}</p>`))
                        .addTo(map);
        
                    const markerDiv = marker.getElement();
                    markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
                    markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
                
                })
            }
            console.log("if statement")
            this.props.schoolsAdded.forEach(point => {
                let marker = new mapboxgl.Marker()
                    .setLngLat([point.coordinates[0], point.coordinates[1]])
                    .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.schoolName}</h4><p>${point.schoolAddress}</p>` ))
                    .addTo(map);
    
                const markerDiv = marker.getElement();
                markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
                markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
            })
    
    
    
            map.on('move', () => {
                this.setState({
                    lng: map.getCenter().lng.toFixed(4),
                    lat: map.getCenter().lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2)
                });
            });
        })

    

    }
    
    componentDidUpdate() {
        let map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.props.location[0], this.props.location[1]],
            zoom: 11
        });

        if (this.props.schoolResults) {
        this.props.schoolResults.forEach(point => {
            let marker = new mapboxgl.Marker({
                color: point.markerColor
            })  .setLngLat([point.location.lng, point.location.lat])
                .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.name}</h4><p>${point.location.formattedAddress}</p>`))
                .addTo(map);

            const markerDiv = marker.getElement();
            markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
            markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
            
           

        })
    }
        this.props.schoolsAdded.forEach(point => {
            let marker = new mapboxgl.Marker()
                .setLngLat([point.coordinates[0], point.coordinates[1]])
                .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.schoolName}</h4><p>${point.schoolAddress}</p>`))
                .addTo(map);

            const markerDiv = marker.getElement();
            markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
            markerDiv.addEventListener('mouseleave', () => marker.togglePopup());

        })

    }
    


    removeSchool = (schoolRef) => {
        const dbFavouritesRef = firebase.database().ref('NewSchools');
        dbFavouritesRef.child(schoolRef).remove();
        Swal.fire({
            title: "Institution Removed",
            text: "thank you",
            icon: "success",
            confirmButtonText: "Ok",
        })
    }

    handleAddFav = (name, address) => {
        const dbFavouritesRef = firebase.database().ref('Favourites')
        const favouriteSchool = {
            schoolName: name,
            schoolAddress: [...address],
            schoolNotes: ''
        }
        dbFavouritesRef.push(favouriteSchool);

        Swal.fire({
            title: "Institution Added",
            text: "thank you",
            icon: "success",
            confirmButtonText: "Ok",
        })
    }
    
    render(){
        return(
            <section>
                <div className="combinedSchools">
                    <div className="allResults">
                            <h2 className="searchLocation" name="scroll-to-element" ref={this.sectionRef}><span>{this.props.userCityInput}, {this.props.userCountryInput}</span></h2>
                        <div className="resultsScrollBox">
                        <div className="addedSchool">
                            <h2>User Added</h2>
                            {
                                this.props.schoolsAdded.map((newSchoolObj) => {
                                    return (
                                        <div key={newSchoolObj.id} className="schoolResults">
                                            <details>
                                                <summary>{newSchoolObj.schoolName}</summary>
                                                <p>{newSchoolObj.schoolAddress.join(', ')}</p>
                                            </details>
                                            <div className='buttonFlex'>
                                                <button onClick={() => { this.handleAddFav(newSchoolObj.schoolName, newSchoolObj.schoolAddress)}}>Favourite</button>
                                                <button onClick={() => { this.removeSchool(newSchoolObj.id)}}>Remove</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            this.props.schoolResults ?
                            <div className="searchedSchools">
                                <h2>Search Results</h2>
                                {
                                    this.props.schoolResults.map((schoolObj) => {
                                        return (
                                            <div key={schoolObj.id} className="schoolResults">
                                                <details>
                                                    <summary>{schoolObj.name}</summary>
                                                    <p>{schoolObj.location.formattedAddress.join(', ')}</p>
                                                </details>
                                                <button
                                                    onClick={() => { this.handleAddFav(schoolObj.name, schoolObj.location.formattedAddress) }}
                                                >favourite
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        : <h2>Server issues: Could only return user added schools.</h2> }
                    </div>
                    </div>
                    <div className="mapHeading">
                        <h2>Map View</h2>
                        <div>
                            <div ref={el => this.mapContainer = el} className="mapContainer" />
                        </div>
                    </div>
                </div>
            </section>
            
        
        )
    }
}

export default SearchResults;