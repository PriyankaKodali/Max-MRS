 let ApiUrl = "";

   if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
       ApiUrl = "http://localhost:54093/";
    } 
  //     else {
  //      ApiUrl = "http://localhost:54093/";
  //  }

export { ApiUrl };


// var ApiUrl=this.props.match.params["ApiUrl"];

 //  if (ApiUrl == "Master") {
 //     if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
 //         ApiUrl = "http://localhost:58528/";
 //     }
 //  }
 //   else {
 //     ApiUrl = "http://localhost:54093/";
//   }