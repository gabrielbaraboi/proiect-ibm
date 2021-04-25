import styled from 'styled-components'


export const ShowPostContainer = styled.div`
  text-align: center
  background-color: #f2f3f5;
`;


export const ImagePlace = styled.div`
  float: left;
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 25px;
  margin-left: 25px;
  margin-top: 25px;
  background-color: gray;
  @media (max-width: 1000px){
      width: 270px;
      height: 270px;
  }
  @media (max-width: 750px){
    margin: 0 auto;
    float: none;
    margin-top: 20px;
  }
  
`;
export const AboutMe = styled.div`
  float: left;
  overflow: hidden;
  position: relative;
  width: 700px;
  height: 250px;
  border-radius: 25px;
  margin-left: 25px;
  margin-top: 25px;
  padding: 10px;
  text-align: justify;
  @media (max-width: 1400px){
    width: 570px;
  }
  @media (max-width: 1000px){
      width: 300px;
      height: 270px;
  }
  @media (max-width: 750px){
    margin: 0 auto;
    margin-top: 20px;
    display: none;
  }
  
`;

export const AboutMeSmall  = styled.div`
  padding: 25px;
  margin: 0 auto;
  margin-top: 15px;
  background-color: white;
  width: 1100px;
  height: auto;
  border-radius: 25px;
  border-width:0.5px;
  border-style: solid;
  border-color:#d7d9d7;
  text-align: justify;
  display: none;
  @media (max-width: 1400px){
    width: 940px;
  }
  @media (max-width: 1000px){
    width: 700px;
  }
  @media (max-width: 750px){
    width: 500px;
    display: block;
    }
  }
`;
export const InformatiiGenerale  = styled.div`
  display: block;
  padding: 25px;
  margin: 0 auto;
  margin-top: 15px;
  background-color: white;
  width: 1100px;
  height: auto;
  border-radius: 25px;
  border-width:0.5px;
  border-style: solid;
  border-color:#d7d9d7;
  text-align: center;
  @media (max-width: 1400px){
    width: 940px;
  }
  @media (max-width: 1000px){
    width: 700px;
  }
  @media (max-width: 750px){
    width: 500px;
    }
  }
`;

export const Continut = styled.div`
  display: inline-block;
  text-align: left;
  font-size: 27px;
  margin-left: 25px;
  width: 1100px;

  @media (max-width: 1400px){
    width: 940px;
  }
  @media (max-width: 1000px){
    width: 700px;
  }
  @media (max-width: 750px){
    width: 250px;
    text-align: center;
    margin-left: 0px;
    }
    
  `;

export const DescriptionField = styled.textarea`
  display: block;
  font-size: 17px;
  height: 85%;
  resize: none;
  width: 100%;
`