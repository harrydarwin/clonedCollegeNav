(this["webpackJsonpcollege-navigator"]=this["webpackJsonpcollege-navigator"]||[]).push([[0],{121:function(e,t,o){},122:function(e,t,o){"use strict";o.r(t);var s=o(1),n=o(2),a=o.n(n),c=o(26),r=o.n(c),i=(o(70),o(27)),l=o(9),d=o(10),h=o(12),u=o(11),j=o(18),p=o(4),b=o(61),m=o(13),v=o.n(m),f=o(36),x=o.n(f),y=o(37);o(97);y.a.initializeApp({apiKey:"AIzaSyCx_22IVNfxHM8TyjNoRqbqbf30j2flMgU",authDomain:"collegenavigator-40c76.firebaseapp.com",projectId:"collegenavigator-40c76",storageBucket:"collegenavigator-40c76.appspot.com",messagingSenderId:"497329332909",appId:"1:497329332909:web:c15591a2de202a9fe99c24"});var O=y.a,C=o(15),g=o.n(C),S=function(e){Object(h.a)(o,e);var t=Object(u.a)(o);function o(){var e;return Object(l.a)(this,o),(e=t.call(this)).setRedirect=function(){e.setState({redirect:!0})},e.renderRedirect=function(){if(e.state.redirect)return e.setState({redirect:!1}),Object(s.jsx)(p.a,{exact:!0,to:"/searchResults"})},e.state={favouriteLength:[],redirect:!1},e}return Object(d.a)(o,[{key:"componentDidMount",value:function(){var e=this;O.database().ref().on("value",(function(t){var o,s=t.val().Favourites,n=[];for(var a in s)o=s[a],n.push(o);e.setState({favouritesLength:n.length-1})}))}},{key:"render",value:function(){var e=this.props,t=e.schoolHandler,o=e.radiusHandler,n=e.handleCityInput,a=e.handleCountryInput,c=e.submitHandler;return Object(s.jsxs)("header",{children:[Object(s.jsx)("h1",{children:"College Navigator"}),Object(s.jsx)("form",{action:"submit",onSubmit:c,children:Object(s.jsxs)("div",{className:"wrapper",children:[Object(s.jsxs)("div",{className:"cityInputs",children:[Object(s.jsx)("input",{onChange:n,type:"text",placeholder:"City",id:"citySearch",required:!0}),Object(s.jsx)("label",{className:"srOnly",htmlFor:"citySearch",children:"Please enter a city to search"}),Object(s.jsx)("input",{onChange:a,type:"text",placeholder:"Province/State OR Country",id:"countrySearch",required:!0}),Object(s.jsx)("label",{className:"srOnly",htmlFor:"countrySearch",children:"Please enter the country the city is in"})]}),Object(s.jsxs)("div",{className:"radiusInputs",children:[Object(s.jsx)("legend",{children:"Search Radius"}),Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{onChange:o,type:"radio",id:"shortRadius",name:"radius",value:"5000",required:!0}),Object(s.jsx)("label",{htmlFor:"shortRadius",children:"5KM"}),Object(s.jsx)("input",{onChange:o,type:"radio",id:"mediumRadius",name:"radius",value:"10000"}),Object(s.jsx)("label",{htmlFor:"mediumRadius",children:"10KM"})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{onChange:o,type:"radio",id:"longRadius",name:"radius",value:"25000"}),Object(s.jsx)("label",{htmlFor:"longRadius",children:"25KM"}),Object(s.jsx)("input",{onChange:o,type:"radio",id:"xlongRadius",name:"radius",value:"50000"}),Object(s.jsx)("label",{htmlFor:"xlongRadius",children:"50KM"})]})]}),Object(s.jsxs)("div",{className:"schoolTypeInputs",children:[Object(s.jsx)("legend",{children:"School Type"}),Object(s.jsx)("input",{onChange:t,type:"radio",id:"university",name:"schoolType",value:"4bf58dd8d48988d1ae941735",required:!0}),Object(s.jsx)("label",{htmlFor:"university",children:"University"}),Object(s.jsx)("input",{onChange:t,type:"radio",id:"college",name:"schoolType",value:"4bf58dd8d48988d1a2941735"}),Object(s.jsx)("label",{htmlFor:"college",children:"College"}),Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{onChange:t,type:"radio",id:"tradeSchool",name:"schoolType",value:"4bf58dd8d48988d1ad941735"}),Object(s.jsx)("label",{htmlFor:"tradeSchool",children:"Trade School"})]})]}),this.renderRedirect(),Object(s.jsx)("button",{onClick:this.setRedirect,children:"Find Schools!"})]})}),Object(s.jsx)("nav",{children:Object(s.jsxs)("ul",{children:[Object(s.jsx)("li",{children:Object(s.jsx)(j.b,{activeClassName:"active",to:"/searchResults",children:"Home"})}),Object(s.jsx)("li",{children:Object(s.jsxs)(j.b,{activeClassName:"active",to:"/favourites",children:["Favourite Schools (",this.state.favouritesLength,")"]})}),Object(s.jsx)("li",{children:Object(s.jsx)(j.b,{activeClassName:"active",to:"/addSchool",children:"Add School"})})]})})]})}}]),o}(n.Component),N=o(64);o(119);g.a.workerClass=o(120).default,g.a.accessToken="pk.eyJ1IjoiaGFycnlndWxvaWVuIiwiYSI6ImNrazQ2bmFuYTE2c2MydnBiZW5mcDVnaHYifQ.QPjai4qdHOKRY8qHYt1QVw";var T=function(e){Object(h.a)(o,e);var t=Object(u.a)(o);function o(){var e;return Object(l.a)(this,o),(e=t.call(this)).removeSchool=function(e){O.database().ref("NewSchools").child(e).remove(),v.a.fire({title:"Institution Removed",text:"thank you",icon:"success",confirmButtonText:"Ok"})},e.handleAddFav=function(e,t){var o=O.database().ref("Favourites"),s={schoolName:e,schoolAddress:Object(N.a)(t),schoolNotes:""};o.push(s),v.a.fire({title:"Institution Added",text:"thank you",icon:"success",confirmButtonText:"Ok"})},e.state={savedSchool:{schoolName:"",schoolAddress:[],map:!1,currentCoordinates:[]},lng:5,lat:34,zoom:2},e.sectionRef=a.a.createRef(),e}return Object(d.a)(o,[{key:"componentDidMount",value:function(){var e=this,t=[this.props.location[0],this.props.location[1]];console.log(t),this.sectionRef.current.scrollIntoView();var o=new g.a.Map({container:this.mapContainer,style:"mapbox://styles/mapbox/streets-v11",center:t,zoom:11});o.on("load",(function(){e.props.schoolResults&&e.props.schoolResults.forEach((function(s){var n=new g.a.Marker({color:s.markerColor}).setLngLat([s.location.lng,s.location.lat]).setPopup((new g.a.Popup).setHTML("<h4>".concat(s.name,"</h4><p>").concat(s.location.formattedAddress,"</p>"))).addTo(o),a=n.getElement();a.addEventListener("mouseenter",(function(){return n.togglePopup()})),a.addEventListener("mouseleave",(function(){return n.togglePopup()})),a.style.cursor="pointer",a.addEventListener("click",(function(s){for(var a in t=[],n._lngLat)t.push(n._lngLat[a]);e.setState({map:!0,currentCoordinates:t}),o.flyTo({center:e.state.currentCoordinates})}))})),console.log("if statement"),e.props.schoolsAdded.forEach((function(s){var n=(new g.a.Marker).setLngLat([s.coordinates[0],s.coordinates[1]]).setPopup((new g.a.Popup).setHTML("<h4>".concat(s.schoolName,"</h4><p>").concat(s.schoolAddress,"</p>"))).addTo(o),a=n.getElement();a.addEventListener("mouseenter",(function(){return n.togglePopup()})),a.addEventListener("mouseleave",(function(){return n.togglePopup()})),a.style.cursor="pointer",a.addEventListener("click",(function(s){for(var a in n._lngLat)t.push(n._lngLat[a]);e.setState({map:!0,currentCoordinates:t}),o.flyTo({center:e.state.currentCoordinates})}))})),o.on("move",(function(){e.setState({lng:o.getCenter().lng.toFixed(4),lat:o.getCenter().lat.toFixed(4),zoom:o.getZoom().toFixed(2)})}))}))}},{key:"render",value:function(){var e=this;return Object(s.jsx)("section",{children:Object(s.jsxs)("div",{className:"combinedSchools",children:[Object(s.jsxs)("div",{className:"allResults",children:[Object(s.jsx)("h2",{className:"searchLocation",name:"scroll-to-element",ref:this.sectionRef,children:Object(s.jsxs)("span",{children:[this.props.userCityInput,", ",this.props.userCountryInput]})}),Object(s.jsxs)("div",{className:"resultsScrollBox",children:[Object(s.jsxs)("div",{className:"addedSchool",children:[Object(s.jsx)("h2",{children:"User Added"}),this.props.schoolsAdded.map((function(t){return Object(s.jsxs)("div",{className:"schoolResults",children:[Object(s.jsxs)("details",{children:[Object(s.jsx)("summary",{children:t.schoolName}),Object(s.jsx)("p",{children:t.schoolAddress.join(", ")})]}),Object(s.jsxs)("div",{className:"buttonFlex",children:[Object(s.jsx)("button",{onClick:function(){e.handleAddFav(t.schoolName,t.schoolAddress)},children:"Favourite"}),Object(s.jsx)("button",{onClick:function(){e.removeSchool(t.id)},children:"Remove"})]})]},t.id)}))]}),this.props.schoolResults?Object(s.jsxs)("div",{className:"searchedSchools",children:[Object(s.jsx)("h2",{children:"Search Results"}),this.props.schoolResults.map((function(t){return Object(s.jsxs)("div",{className:"schoolResults",children:[Object(s.jsxs)("details",{children:[Object(s.jsx)("summary",{children:t.name}),Object(s.jsx)("p",{children:t.location.formattedAddress.join(", ")})]}),Object(s.jsx)("button",{onClick:function(){e.handleAddFav(t.name,t.location.formattedAddress)},children:"favourite"})]},t.id)}))]}):Object(s.jsx)("h2",{children:"Server issues: Could only return user added schools."})]})]}),Object(s.jsxs)("div",{className:"mapHeading",children:[Object(s.jsx)("h2",{children:"Map View"}),Object(s.jsx)("div",{children:Object(s.jsx)("div",{ref:function(t){return e.mapContainer=t},className:"mapContainer"})})]})]})})}}]),o}(n.Component),I=(o(121),o(63)),A=function(e){Object(h.a)(o,e);var t=Object(u.a)(o);function o(){var e;return Object(l.a)(this,o),(e=t.call(this)).addSchool=function(t){t.preventDefault();var o=[e.state.schoolAddress.street,e.state.schoolAddress.city+" "+e.state.schoolAddress.province+" "+e.state.schoolAddress.postalCode,e.state.schoolAddress.country],s=O.database().ref("NewSchools"),n={schoolName:e.state.schoolName,schoolType:e.state.schoolType,schoolAddress:o};s.push(n),v.a.fire({title:"New institution added",text:"Thank You",icon:"success",confirmButtonText:"Ok"}),e.setState({schoolName:"",schoolNote:"",schoolType:"",schoolAddress:{street:"",city:"",province:"",postalCode:"",country:""}})},e.updateAddress=function(t,o){var s=Object(I.a)({},e.state.schoolAddress);s[o]=t.target.value,e.setState({schoolAddress:s})},e.state={schoolName:"",schoolType:"",schoolAddress:{street:"",city:"",province:"",postalCode:"",country:""}},e}return Object(d.a)(o,[{key:"render",value:function(){var e=this;return Object(s.jsx)(n.Fragment,{children:Object(s.jsx)("div",{className:"addSchoolForm",children:Object(s.jsxs)("form",{children:[Object(s.jsx)("label",{htmlFor:"newSchoolName",children:"School Name"}),Object(s.jsx)("input",{type:"text",id:"newSchoolName",value:this.state.schoolName,onChange:function(t){return e.setState({schoolName:t.target.value})}}),Object(s.jsx)("br",{}),Object(s.jsxs)("div",{className:"schoolTypeInputs",children:[Object(s.jsx)("legend",{children:"School Type"}),Object(s.jsx)("input",{type:"radio",id:"newUniversity",name:"schoolType",value:"University",required:!0,checked:"University"===this.state.schoolType,onChange:function(t){return e.setState({schoolType:t.target.value})}}),Object(s.jsx)("label",{htmlFor:"newUniversity",children:"University"}),Object(s.jsx)("input",{type:"radio",id:"newCollege",name:"schoolType",value:"Community College",checked:"Community College"===this.state.schoolType,onChange:function(t){return e.setState({schoolType:t.target.value})}}),Object(s.jsx)("label",{htmlFor:"newCollege",children:"College"}),Object(s.jsx)("input",{type:"radio",id:"newTradeSchool",name:"schoolType",value:"Trade School",checked:"Trade School"===this.state.schoolType,onChange:function(t){return e.setState({schoolType:t.target.value})}}),Object(s.jsx)("label",{htmlFor:"newTradeSchool",children:"Trade School"}),Object(s.jsx)("br",{})]}),Object(s.jsxs)("div",{className:"addressInputs",children:[Object(s.jsxs)("div",{className:"addressInput",children:[Object(s.jsx)("label",{htmlFor:"newSchoolAddress",children:"Address"}),Object(s.jsx)("input",{type:"text",id:"newSchoolAddress",value:this.state.schoolAddress.street,onChange:function(t){return e.updateAddress(t,"street")}})]}),Object(s.jsxs)("div",{className:"addressInput",children:[Object(s.jsx)("label",{htmlFor:"newSchoolCity",children:"City"}),Object(s.jsx)("input",{type:"text",id:"newSchoolCity",value:this.state.schoolAddress.city,onChange:function(t){return e.updateAddress(t,"city")}})]}),Object(s.jsxs)("div",{className:"addressInput",children:[Object(s.jsx)("label",{htmlFor:"newSchoolProvince",children:"Province"}),Object(s.jsx)("input",{type:"text",id:"newSchoolProvince",value:this.state.schoolAddress.province,onChange:function(t){return e.updateAddress(t,"province")}})]}),Object(s.jsxs)("div",{className:"addressInput",children:[Object(s.jsx)("label",{htmlFor:"newSchoolPostal",children:"Postal Code"}),Object(s.jsx)("input",{type:"text",id:"newSchoolPostal",value:this.state.schoolAddress.postalCode,onChange:function(t){return e.updateAddress(t,"postalCode")}})]}),Object(s.jsxs)("div",{className:"addressInput",children:[Object(s.jsx)("label",{htmlFor:"newSchoolCountry",children:"Country"}),Object(s.jsx)("input",{type:"text",id:"newSchoolCountry",value:this.state.schoolAddress.country,onChange:function(t){return e.updateAddress(t,"country")}})]})]}),Object(s.jsx)("button",{className:"addSchoolButton",onClick:this.addSchool,children:"Add new school"})]})})})}}]),o}(n.Component),k=function(e){Object(h.a)(o,e);var t=Object(u.a)(o);function o(){var e;return Object(l.a)(this,o),(e=t.call(this)).removeSchool=function(e){O.database().ref("Favourites").child(e).remove(),v.a.fire({title:"Institution Removed",text:"Your favourite list has been updated",icon:"success",confirmButtonText:"Ok"})},e.handleAddNotes=function(t){O.database().ref("Favourites").child(t).update({schoolNotes:e.state.schoolNotes}),e.setState({schoolNotes:""}),v.a.fire({title:"Note Added",text:"Added",icon:"success",confirmButtonText:"Ok"})},e.state={schoolNotes:"",schoolId:""},e}return Object(d.a)(o,[{key:"render",value:function(){var e=this,t=this.props.school,o=t.id,n=t.schoolName,a=t.schoolAddress,c=t.schoolNotes;return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("li",{className:"favoritesFlex",children:[Object(s.jsx)("h3",{children:n}),Object(s.jsx)("p",{children:a}),Object(s.jsxs)("p",{children:[Object(s.jsx)("span",{children:"Notes: "}),c]}),Object(s.jsx)("label",{htmlFor:"notes",className:"srOnly",children:"Notes: type below to add"}),Object(s.jsx)("textarea",{placeholder:"Type here to add notes",value:this.state.schoolNotes,name:"notes",id:"notes",onChange:function(t){return e.setState({schoolNotes:t.target.value,schoolId:o})}}),Object(s.jsxs)("div",{className:"buttonFlex",children:[Object(s.jsx)("button",{onClick:function(){e.handleAddNotes(o)},children:"Add Notes"}),Object(s.jsx)("button",{onClick:function(){e.removeSchool(o)},children:"Remove School"})]})]},o)})}}]),o}(n.Component),F=function(e){Object(h.a)(o,e);var t=Object(u.a)(o);function o(){var e;return Object(l.a)(this,o),(e=t.call(this)).state={favourites:[],schoolNotes:"",schoolId:""},e}return Object(d.a)(o,[{key:"componentDidMount",value:function(){var e=this;O.database().ref().on("value",(function(t){var o,s=t.val().Favourites,n=[];for(var a in s)(o=s[a]).id=a,o.notes=e.state.schoolNotes,n.push(o);e.setState({favourites:n})}))}},{key:"render",value:function(){return Object(s.jsx)(n.Fragment,{children:Object(s.jsxs)("div",{className:"favorites",children:[Object(s.jsx)("h2",{children:"Favourites"}),Object(s.jsx)("ul",{children:this.state.favourites.map((function(e){return Object(s.jsx)(n.Fragment,{children:Object(s.jsx)(k,{school:e})})}))})]})})}}]),o}(n.Component);o(2).Fragment;var w=function(){return Object(s.jsxs)("footer",{children:[Object(s.jsxs)("p",{children:["Juno College 2020 Created by ",Object(s.jsxs)("span",{children:[Object(s.jsx)("a",{href:"https://clarkemacarthur.com/",children:"Clarke"}),", ",Object(s.jsx)("a",{href:"http://erzhena.ca/",children:"Erzhena"}),", ",Object(s.jsx)("a",{href:"https://www.harrydarwin.com/",children:"Harry"})," and ",Object(s.jsx)("a",{href:"https://kylekodes.com/",children:"Kyle"})," \xa9"]})]}),Object(s.jsx)("p",{children:Object(s.jsxs)("span",{children:["Photo by ",Object(s.jsx)("a",{href:"https://unsplash.com/@iemyoung?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",children:"Emily Karakis"})," on ",Object(s.jsx)("a",{href:"https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",children:"Unsplash"})]})})]})},R="",L="",E=[],P=[];g.a.accessToken="pk.eyJ1IjoiaGFycnlndWxvaWVuIiwiYSI6ImNrazQ2bmFuYTE2c2MydnBiZW5mcDVnaHYifQ.QPjai4qdHOKRY8qHYt1QVw";var H=function(e){Object(h.a)(o,e);var t=Object(u.a)(o);function o(){var e;return Object(l.a)(this,o),(e=t.call(this)).getData=function(){e.apiCall("4bf58dd8d48988d1ae941735"),e.apiCall("4bf58dd8d48988d1a2941735"),e.apiCall("4bf58dd8d48988d1ad941735"),e.fireBaseCall(),e.scrollTo(),e.mapData("".concat(e.state.cityInput," ").concat(e.state.countryInput))},e.handleSubmit=function(t){t.preventDefault(),e.getData(),e.setState({directMeHome:!0})},e.handleSchoolType=function(t){e.setState({schoolTypeId:t.target.value})},e.handleRadius=function(t){e.setState({radius:t.target.value})},e.handleCityInput=function(t){e.setState({cityInput:t.target.value})},e.handleCountryInput=function(t){e.setState({countryInput:t.target.value})},e.state={schoolResults:[],favourites:[],radius:"",schoolTypeId:"",cityInput:"",countryInput:"",formattedAddress:[],newSchool:[],favouriteLength:"",isActive:!1,directMeHome:!1,mapLocations:[],longLatLocations:[],locationCoordinates:[]},e}return Object(d.a)(o,[{key:"scrollTo",value:function(){b.scroller.scrollTo("scroll-to-element",{duration:800,delay:0,smooth:"easeInOutQuart"})}},{key:"fireBaseCall",value:function(){var e=this;O.database().ref().on("value",(function(t){var o=function(e){var t,o=[];for(var s in e)(t=e[s]).id=s,o.push(t);return o}(t.val().NewSchools),s=e.convertCategoryIdToName(),n=e.compareUserInputAndCreateResultsArray(o,s);E=[],n.forEach((function(t){e.userSchoolMapData(t)})),e.setState({newSchool:n})})),R=this.state.cityInput,L=this.state.countryInput}},{key:"userSchoolMapData",value:function(e){var t=this,o=e;o.address=e.schoolAddress.join(),this.geoCodeCall(o.address).then((function(e){o.coordinates=e.data.features[0].center,E.push(o)})).catch((function(e){t.setState({isActive:!1}),v.a.fire({title:"Please Try Again",text:"We are experiencing technical difficulties",icon:"error",confirmButtonText:"Ok"})}))}},{key:"mapData",value:function(e){var t=this;this.geoCodeCall(e).then((function(e){var o=e.data.features[0].geometry.coordinates;console.log(o),t.setState({locationCoordinates:o})})).catch((function(e){v.a.fire({title:"Issue with request",text:"Please check you location and try again",icon:"error",confirmButtonText:"Ok"})}))}},{key:"geoCodeCall",value:function(e){return x()({method:"GET",responseType:"json",url:"https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(e,".json?"),params:{access_token:g.a.accessToken}})}},{key:"compareUserInputAndCreateResultsArray",value:function(e,t){var o=this;return e.filter((function(e){var s=e.schoolAddress[1].toLowerCase(),n=e.schoolAddress[2].toLowerCase();return e.schoolType===t&&s.includes(o.state.cityInput.toLowerCase())&&n.includes(o.state.countryInput.toLowerCase())||e.schoolType===t&&s.includes(o.state.cityInput.toLowerCase())&&s.includes(o.state.cityInput.toLowerCase())}))}},{key:"convertCategoryIdToName",value:function(){var e="";return"4bf58dd8d48988d1ae941735"===this.state.schoolTypeId?e="University":"4bf58dd8d48988d1a2941735"===this.state.schoolTypeId?e="Community College":"4bf58dd8d48988d1ad941735"===this.state.schoolTypeId&&(e="Trade School"),e}},{key:"apiCall",value:function(e){var t=this;x()({method:"GET",responseType:"json",url:"https://api.foursquare.com/v2/venues/search",params:{client_id:"SMUUEFGVRENHIW3EQX5ICCFCTNQPPIWVXP21E2BQVRH421OF",client_secret:"EVNPHQ3EYKNQKZMOAKRVUTT0KDHXXGNUWUCY0LFZTVRE2BAF",near:this.state.cityInput+" "+this.state.countryInput,categoryId:e,radius:this.state.radius,v:20201205}}).then((function(e){var o=function(e){return e.filter((function(e){return e.name.includes("University")||"Community College"===e.categories[0].name||"Trade School"===e.categories[0].name&&e.location.formattedAddress.length>2}))}(e.data.response.venues);o.forEach((function(e){console.log(e.categories[0].name),e.name.includes("University")?e.markerColor="#7261a3":"Community College"==e.categories[0].name?e.markerColor="#5ca4a9":"Trade School"==e.categories[0].name?e.markerColor="#e6af2e":e.markerColor="#EDD2E0"})),o.forEach((function(e){return P.push(e)})),t.setState({schoolResults:P,isActive:!0})})).catch((function(e){"Error: Request failed with status code 403"==e?t.setState({isActive:!0,schoolResults:!1}):(t.setState({isActive:!1}),v.a.fire({title:"No Schools Found",text:"Please Try Another City and Province/Country",icon:"error",confirmButtonText:"Ok"}))}))}},{key:"render",value:function(){var e=this;return Object(s.jsxs)(j.a,{children:[Object(s.jsx)(S,{schoolHandler:this.handleSchoolType,radiusHandler:this.handleRadius,handleCityInput:this.handleCityInput,handleCountryInput:this.handleCountryInput,submitHandler:this.handleSubmit}),Object(s.jsxs)("div",{className:"wrapper",children:[this.state.isActive?Object(s.jsx)(p.b,{exact:!0,path:"/searchResults",render:function(){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(T,Object(i.a)({schoolResults:e.state.schoolResults,schoolsAdded:e.state.newSchool,userCityInput:R,userCountryInput:L,location:e.state.locationCoordinates},"schoolsAdded",E))})}}):null,Object(s.jsx)(p.b,{path:"/addSchool",component:A}),Object(s.jsx)(p.b,{path:"/favourites",component:F})]}),Object(s.jsx)(w,{})]})}}]),o}(n.Component);var M=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,123)).then((function(t){var o=t.getCLS,s=t.getFID,n=t.getFCP,a=t.getLCP,c=t.getTTFB;o(e),s(e),n(e),a(e),c(e)}))};r.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(H,{})}),document.getElementById("root")),M()},70:function(e,t,o){}},[[122,1,2]]]);
//# sourceMappingURL=main.503576f8.chunk.js.map