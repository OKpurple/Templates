import React, { Component, PropTypes } from 'react';
import {GuideCardItem} from '../components/';
import {getWishList} from '../actions/openProgram'
import {deleteDib} from '../actions/reserve'
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';

class WishList extends Component {
    constructor(props) {
        super(props);
        this.state={
          load:false
        }
        this.deleteDip=this.deleteDip.bind(this);
    }

    componentWillMount(){
      this.props.getWishList(this.props.currentUser).then(()=>{
        this.setState({load:true})
        console.log(this.props.wishList.data.length)
      })
    }
    deleteDip(e){
      console.log(e.target)
      console.log(e.target.id)
      this.props.deleteDib(e.target.name,e.target.id).then(()=>{
        alert('찜취소 하였습니다.');
      }
      )
    }


    render() {


      const wishList = (data)=>{
        return data.map((item,i)=>{
          var nextUrl = '/ProgramDetail/'+item.open_program_id;
          return(
            <div className='col s4'>
              <div className="card">
               <div className="card-image waves-effect waves-block waves-light">
                 <img className="activator" src={item.img_url} width='100%' height='200px'/>
               </div>
               <div className="card-content">
                 <span className="card-title activator grey-text text-darken-4">{item.title}<i className="material-icons right">more_vert</i></span>
                 <NavLink to = {nextUrl}>detail</NavLink>
                 <a className='red-text right' onClick={this.deleteDip} name={item.reservation_id} id={i} >찜취소</a>
               </div>
               <div className="card-reveal">
                 <span className="card-title grey-text text-darken-4">{item.title}<i className="material-icons right">close</i></span>
                 <p>{item.content}</p>
               </div>
              </div>
            </div>
          )
        })
      }

        return(
          <div className="container ">

            <div className="row">
              <h3>위시리스트</h3>
              <div className='row'>
                {this.state.load ? wishList(this.props.wishList.data) : <div>loading</div>}
              </div>
            </div>

          </div>


        );
    }
}
const mapStateToProps = (state) => {
    return {

        currentUser:state.Login.status.currentUser,
        wishList:state.OpenProgram.wishList
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    getWishList: (uid) => {
      return dispatch(getWishList(uid));
    },
    deleteDib: (rid,index)=>{
      return dispatch(deleteDib(rid,index));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
