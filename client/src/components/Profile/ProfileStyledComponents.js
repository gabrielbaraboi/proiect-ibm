import styled from 'styled-components'

export const ShowPostContainer = styled.div`
  text-align: center;
  background-color: #f2f3f5;
`

export const ImagePlace = styled.div`
  float: left;
  position: relative;
  width: 105px;
  height: 105px;
  border-radius: 50%;
  margin-top: 110px;
  background-color: #d7d9d7;
  margin-bottom:10px;
  border-style: solid;
  border-width: 6.5px;
  border-color: #d7d9d7;
`;

export const CoverImagePlace = styled.div`
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  position: absolute;
  height: 170px;
  width: 649px;
  background-color: gray;
  margin: -25px;

  @media (max-width: 750px){
    width: 500px;
  }

`


export const EditProfileButton = styled.button`
  position: absolute;
  margin-top: 167px;
  height: 30px;
  width: 90px;
  margin-left: 100px;
  @media (max-width: 750px){
    margin-left: 75px;
    margin-top: 200px;
  }
`


export const NameArea = styled.div`
  float: left;
  position: absolute;
  width: 300px;
  height: 30px;
  
  margin-top: 165px;
  margin-left: 125px;
  
  font-size: 25px;
  // color: white;
  text-align: left;
`



export const AboutMe = styled.div`
  overflow: hidden;
  padding: 25px;
  background: #FEFEFE;
  width: 650px;
  height: 300px;
  max-height: 300px;
  border-radius: 13px;
  text-align: justify;
  background: #d7d9d7;
  @media (max-width: 750px){
    width: 500px;
  }
`;



export const GeneralInformation  = styled.div`
  paddding: 20px;
  display: block;
  padding: 25px;
  margin: 0 auto;
  margin-top: 15px;
  background: #FEFEFE;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 650px;
  height: 300px;
  border-radius: 13px;
  border-width:0.5px;
  border-style: solid;
  border-color:#d7d9d7;
  text-align: center;
  background: linear-gradient(#FEFEFE 57%, #d7d9d7 33%);
  @media (max-width: 750px){
    width: 500px;
  }
  // &:hover {
  //   background: #E6E7F680;
  // }
`

export const InformationCard = styled.div`
  padding: 20px;
  width: 650px;
  height: auto;
  border-radius: 13px;
  border-width:0.5px;
  border-style: solid;
  border-color:#d7d9d7;
  background-color: #d7d9d7;
  margin: 0 auto;
  margin-top: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  @media (max-width: 750px){
    width: 500px;
  }
`

export const AboutMeCard = styled.div`
  margin: 0 auto;
  margin-top: 15px;
  background: #d7d9d7;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 650px;
  height: auto;
  border-radius: 13px;
  border-width:0.5px;
  border-style: solid;
  border-color:#d7d9d7;
  text-align: justify;
  @media (max-width: 750px){
    width: 500px;
  }
`

export const DescriptionField = styled.textarea`
    
  display: block;
  font-size: 17px;
  height: 85%;
  resize: none;
  background: background: #d7d9d7;;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
`

export const modalStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


export const profileImageStyle = {
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "50%",

};

export const NetworkImage = {
  height: 70,
  width: 70,
  margin: 20
};

export const NoNetworkImage = {
  height: 70,
  width: 70,
  margin: 20,
  tintColor: 'red',
  opacity: 0.2
};
