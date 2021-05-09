import styled from 'styled-components'

export const ShowPostContainer = styled.div`
  text-align: center;
`

export const ImagePlace = styled.div`
  float: left;
  position: relative;
  width: 105px;
  height: 105px;
  border-radius: 50%;
  margin-top: 110px;
  background: rgba(255,255,255,.55);
  margin-bottom:10px;
  border-style: solid;
  border-width: 6.5px;
  border-color: rgba(255,255,255,255);
`;

export const CoverImagePlace = styled.div`
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  position: absolute;
  height: 170px;
  width: 649px;
  background: rgba(255,255,255,.55);
  margin: -25px;
  @media (max-width: 750px){
    width: 500px;
  }
  &:hover {
    opacity: 0.7;
    cursor: pointer;
    
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
  background: rgba(255,255,255,.55);
  width: 650px;
  height: auto;
  max-height: 300px;
  border-radius: 13px;
  text-align: justify;
  @media (max-width: 750px){
    width: 500px;
  }
  &:hover {
    background: #FEFEFE;
  }
  
`;



export const GeneralInformation  = styled.div`
  padding: 20px;
  display: block;
  padding: 25px;
  margin: 0 auto;
  margin-top: 15px;
  background: rgba(255,255,255,.55);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 650px;
  height: 300px;
  border-radius: 13px;
  border-width:0.5px;
  border-style: solid;
  border-color:#d7d9d7;
  text-align: center;
  @media (max-width: 750px){
    width: 500px;
  }
  &:hover {
    background: #FEFEFE;
  }
`

export const InformationCard = styled.div`
  padding: 20px;
  width: 650px;
  height: auto;
  border-radius: 13px;
  border-width:0.5px;
  border-style: solid;
  border-color:#d7d9d7;
  background: rgba(255,255,255,.55);
  margin: 0 auto;
  margin-top: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  @media (max-width: 750px){
    width: 500px;
  }
  &:hover {
    background: #FEFEFE;
  }
`

export const AboutMeCard = styled.div`
  margin: 0 auto;
  margin-top: 15px;
  background: rgba(255,255,255,.55);
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
  &:hover {
    background: #FEFEFE;
  }
`

export const DescriptionField = styled.textarea`
    
  display: block;
  font-size: 17px;
  height: 150px;
  resize: none;
  background: rgba(255,255,255,.55);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  &:hover {
    background: #FEFEFE;
  }
`

export const ProfilePicture = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  border-color: rgba(255,255,255,.55);
  background: rgba(255,255,255,.55);
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
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
  background: "rgba(255,255,255,.55)",
  "&:hover": {
    width: "50%"
  },
  "&:last-child": {
    width: "50%"
  }
  
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