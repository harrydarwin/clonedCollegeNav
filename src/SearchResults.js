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
                map: false,
                currentCoordinates: []
            },
            lng: 5,
            lat: 34,
            zoom: 2
        }

        this.sectionRef = React.createRef();
        
    }


   


    componentDidMount() {
        
        

        let coordinates = [this.props.location[0], this.props.location[1]];
        this.sectionRef.current.scrollIntoView();
        let map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coordinates,
            zoom: 11
        });

        this.setState({
            currentCoordinates: coordinates
        })

        
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

            const filterButtons = document.getElementById('filterList')
            let listedSearchResults = document.getElementsByClassName('schoolResults');
            let resultsArray = [...listedSearchResults];

            filterButtons.addEventListener('click', function (event) {
               
                event.target.classList.toggle('selectedFilter');
                resultsArray.forEach(result => {
                    if (result.getAttribute('data-type') === event.target.textContent) {
                        result.classList.toggle('visible')
                    }
                })
            })
            
            if(this.props.schoolResults) {
                //for each set of coordinates do this and pass coordinates to setlnglat
                this.props.schoolResults.forEach(point => {
                    
                    const marker = new mapboxgl.Marker({
                        type: point.type,
                        color: point.markerColor
                    })  .setLngLat([point.location.lng, point.location.lat])
                        .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.name}</h4><p>${point.location.formattedAddress}</p>`))
                        .addTo(map);
                    
                    const markerDiv = marker.getElement();
                    //add type attribute to each marker node for filtering
                    markerDiv.setAttribute('data-type', `${point.type}`)
                    
                    markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
                    markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
                    markerDiv.style.cursor="pointer";
                    markerDiv.addEventListener('click', (e) => {
                        
                        coordinates = [];
                        for(let coord in marker._lngLat){
                            coordinates.push(marker._lngLat[coord]);
                        }

                        this.setState({
                            map: true,
                            currentCoordinates: coordinates
                        })
                        
                      
                        map.flyTo({
                            center: this.state.currentCoordinates,
                            zoom: 14
                        })
                        
                    })
                    
                    
                     //on filter click, compare filter text to data-type attribute on marker&search result to toggle visibility (via class)
                     filterButtons.addEventListener('click', function (event) {
                         
                         if (markerDiv.getAttribute('data-type') === event.target.textContent) {
                             markerDiv.classList.toggle('visible')
                         }
                     });
                })
            }
            this.props.schoolsAdded.forEach(point => {
                let marker = new mapboxgl.Marker()
                    .setLngLat([point.coordinates[0], point.coordinates[1]])
                    .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.schoolName}</h4><p>${point.schoolAddress}</p>` ))
                    .addTo(map);
    
                const markerDiv = marker.getElement();

                markerDiv.setAttribute('data-type', `${point.schoolType}`)
                
                markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
                markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
                markerDiv.style.cursor = "pointer";
                markerDiv.addEventListener('click', (e) => {
                    coordinates = [];
                    
                    for (let coord in marker._lngLat) {
                        coordinates.push(marker._lngLat[coord]);
                    }
                    
                    this.setState({
                        map: true,
                        currentCoordinates: coordinates
                    })


                    map.flyTo({
                        center: this.state.currentCoordinates,
                        zoom: 14
                    })
                })
            })
    
    
    
            map.on('move', () => {
                this.setState({
                    lng: map.getCenter().lng.toFixed(4),
                    lat: map.getCenter().lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2)
                });
            });
           
        })
        
        //target filter list items by placing listener on parent
        // document.getElementById('filterList').addEventListener('click', function (event) {
        //     console.log(event.target)
            
        // });


    }
    
    componentDidUpdate() {
        // console.log(this.props.userCityInput, this.props.userCountryInput, this.props.schoolResults)
        // if(this.state.currentCoordinates this.props.location)
        let current = this.state.currentCoordinates;
        let input = this.props.location;
        for(let i = 0; i < 2; i++){
            if (current[i] - input[i] > 1 || current[i] - input[i] < -1) {
        
                
                let coordinates = [this.props.location[0], this.props.location[1]];
                this.sectionRef.current.scrollIntoView();
                let map = new mapboxgl.Map({
                    container: this.mapContainer,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: coordinates,
                    zoom: 11
                });

                this.setState({
                    currentCoordinates: coordinates
                })

                

                map.on('load', () => {
                    const filterButtons = document.getElementById('filterList')
                    let listedSearchResults = document.getElementsByClassName('schoolResults');
                    let resultsArray = [...listedSearchResults];

                    resultsArray.forEach(result => {
                        if(result.classList.contains('visible')) {
                            result.classList.remove('visible')
                        }
                    })

                    filterButtons.addEventListener('click', function (event) {
                      
                        resultsArray.forEach(result => {
                            if (result.getAttribute('data-type') === event.target.textContent) {
                               
                                result.classList.toggle('visible')
                            }
                        })
                    })

                    if (this.props.schoolResults) {
                        //for each set of coordinates do this and pass coodrinates to setlnglat
                        this.props.schoolResults.forEach(point => {

                            const marker = new mapboxgl.Marker({
                                type: point.type,
                                color: point.markerColor
                            }).setLngLat([point.location.lng, point.location.lat])
                                .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.name}</h4><p>${point.location.formattedAddress}</p>`))
                                .addTo(map);

                            const markerDiv = marker.getElement();
                            //add type attribute to each marker node for filtering
                            markerDiv.setAttribute('data-type', `${point.type}`)
                            
                            markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
                            markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
                            markerDiv.style.cursor = "pointer";
                            markerDiv.addEventListener('click', (e) => {
                               
                                coordinates = [];
                                for (let coord in marker._lngLat) {
                                    coordinates.push(marker._lngLat[coord]);
                                }

                                this.setState({
                                    map: true,
                                    currentCoordinates: coordinates
                                })


                                map.flyTo({
                                    center: this.state.currentCoordinates,
                                    zoom: 14
                                })
                                // console.log(e, marker._lngLat)
                            })


                            //on filter click, compare filter text to data-type attribute on marker&search result to toggle visibility (via class)
                            filterButtons.addEventListener('click', function (event) {
                                // console.log(event.target)

                                if (markerDiv.getAttribute('data-type') === event.target.textContent) {
                                    markerDiv.classList.toggle('visible')
                                }
                            });
                        })
                    }
                    this.props.schoolsAdded.forEach(point => {
                        let marker = new mapboxgl.Marker()
                            .setLngLat([point.coordinates[0], point.coordinates[1]])
                            .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.schoolName}</h4><p>${point.schoolAddress}</p>`))
                            .addTo(map);

                        const markerDiv = marker.getElement();

                        markerDiv.setAttribute('data-type', `${point.schoolType}`)

                        markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
                        markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
                        markerDiv.style.cursor = "pointer";
                        markerDiv.addEventListener('click', (e) => {
                            coordinates = [];

                            for (let coord in marker._lngLat) {
                                coordinates.push(marker._lngLat[coord]);
                            }

                            this.setState({
                                map: true,
                                currentCoordinates: coordinates
                            })


                            map.flyTo({
                                center: this.state.currentCoordinates,
                                zoom: 14
                            })
                        })
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
        }

    //     let map;
    //     let coordinates = [];
    //     if(this.state.map === false) {

    //         map = new mapboxgl.Map({
    //             container: this.mapContainer,
    //             style: 'mapbox://styles/mapbox/streets-v11',
    //             center: [this.props.location[0], this.props.location[1]],
    //             zoom: 11
    //         });
    //     } else {
    //         map = new mapboxgl.Map({
    //             container: this.mapContainer,
    //             style: 'mapbox://styles/mapbox/streets-v11',
    //             center: this.state.currentCoordinates,
    //             zoom: 11
    //         });
    //     }

    //     if (this.props.schoolResults) {
    //     this.props.schoolResults.forEach(point => {
    //         let marker = new mapboxgl.Marker({
    //             color: point.markerColor
    //         })  .setLngLat([point.location.lng, point.location.lat])
    //             .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.name}</h4><p>${point.location.formattedAddress}</p>`))
    //             .addTo(map);

    //         const markerDiv = marker.getElement();
    //         markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
    //         markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
    //         markerDiv.style.cursor = "pointer";
    //         markerDiv.addEventListener('click', (e) => {
    //             for (let coord in marker._lngLat) {
    //                 coordinates.push(marker._lngLat[coord]);
    //             }

    //             this.setState({
    //                 map: true,
    //                 currentCoordinates: coordinates
    //             })


    //             map.flyTo({
    //                 center: this.state.currentCoordinates
    //             })
    //             // console.log(e, marker._lngLat)
    //         })
           

    //     })
    // }
    //     this.props.schoolsAdded.forEach(point => {
    //         let marker = new mapboxgl.Marker()
    //             .setLngLat([point.coordinates[0], point.coordinates[1]])
    //             .setPopup(new mapboxgl.Popup().setHTML(`<h4>${point.schoolName}</h4><p>${point.schoolAddress}</p>`))
    //             .addTo(map);

    //         const markerDiv = marker.getElement();
    //         markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
    //         markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
    //         markerDiv.style.cursor = "pointer";
    //         markerDiv.addEventListener('click', (e) => {
    //             for (let coord in marker._lngLat) {
    //                 coordinates.push(marker._lngLat[coord]);
    //             }

    //             this.setState({
    //                 map: true,
    //                 currentCoordinates: coordinates
    //             })


    //             map.flyTo({
    //                 center: this.state.currentCoordinates
    //             })
    //             // console.log(e, marker._lngLat)
    //         })
    //     })

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
                            {
                                this.props.schoolsAdded ?
                        <div className="addedSchool">
                            <h2>User Added</h2>
                            {
                                this.props.schoolsAdded.map((newSchoolObj) => {
                                    return (
                                        <div key={newSchoolObj.id} data-type={newSchoolObj.schoolType} className="schoolResults">
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
                        </div> : null
                            }
                        {
                            this.props.schoolResults ?
                            <div className="searchedSchools">
                                <h2>Search Results</h2>
                                {
                                    this.props.schoolResults.map((schoolObj) => {
                                        return (
                                            <div key={schoolObj.id} data-type={schoolObj.type} className="schoolResults">
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
                            <div className="filter">
                                <p className="srOnly">Filter Results</p>
                                    <ul id="filterList">
                                    {
                                        this.props.filters.map((filters, i) => {
                                            return(
                                                <li key={i} className="filter">{filters}</li>
                                            )
                                        })  
                                    }
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        
        )
    }
}

export default SearchResults;