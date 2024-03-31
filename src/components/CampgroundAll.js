import React from "react";
import SingleCamp from "./SingleCamp";

export default class CampgroundAll extends React.Component {
  constructor(props) {
    super(props);
  }

  // if (props.campgrounds.length === 0) {
  //   return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  // }
  render() {
    return (
      <div>
        {console.log(this.props.campgrounds)}
        {this.props.campgrounds.map((campground) => (
          <SingleCamp campground={campground} />
        ))}
      </div>
    );
  }
}

// const CampgroundAll=(props)=>{
//   if (props.campgrounds.length === 0) {
//       return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
//      }
//      return<div>
// {props.campgrounds.map((campground)=>(<SingleCamp campground={campground}/>))}

//     </div>
// }
