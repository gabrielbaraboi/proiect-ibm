import styled from 'styled-components'

export const GeneralInformation = styled.div`
  background: rgba(255,255,255,.55);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 2%), 0 0px 0 1px rgb(10 10 10 / 2%);
  border-radius: 6px;
  transition: all .3s ease-in-out;
  display: block;
  padding: 20px;
`

export const CoverImagePlace = styled.div`
  border-radius: 6px;
  height: 300px;
  transition: all .3s ease-in-out;
  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
  }
  &:hover {
    cursor: pointer;
  }
`

export const ImagePlace = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 100%;
  margin-top: -70px;
  margin-left: 50px;
  background: white;
  border: 3px solid rgb(250 246 250);
`;

export const ProfilePicture = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 100%;
  &:hover {
    cursor: pointer;
  }
`

export const Informations = styled.div`
  display: flex;
  position: relative;
`

export const Details = styled.div`
  position: relative;
  margin-left: 30px;
`

export const Detail = styled.div`
  font-size: 16px;
  color: #9B9B9B;
  font-weight: 500;
  &:first-child {
    color: black;
    font-size: 22px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 8px;
    margin-top: 25px;
  }
  .icon {
    position: relative;
    font-size: 20px;
    left: 10px;
    bottom: 2px;
    transition: all .3s ease-in-out;
    color: #686D88;
    &:hover {
      cursor: pointer;
      color: black;
    }
  }
`

export const SocialLinks = styled.div`
  display: flex;
  margin-left: auto;
  margin-top: 25px;

  .icon-edit {
    position: relative;
    font-size: 20px;
    margin-left: 20px;
    top: 3px;
    transition: all .3s ease-in-out;
    color: #686D88;
    &:hover {
      cursor: pointer;
      color: black;
    }
  }
`

export const Social = styled.div`
  position: relative;

  .icon {
    font-size: 30px;
    margin-left: 10px;
  }

  .linkedin {
    color: #0076B2 !important;
  }

  .github {
    color: black !important;
  }

  .facebook {
    color: #384DA3 !important;
  }

  .twitter {
    color: #5DB2F7 !important;
  }

  .no-social {
    opacity: .4;
  }
`

export const AboutMe = styled.div`
  overflow: hidden;
  background: rgba(255,255,255,.55);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 2%), 0 0px 0 1px rgb(10 10 10 / 2%);
  border-radius: 6px;
  transition: all .3s ease-in-out;
  padding: 20px;
  width: 100%;
  max-height: 300px;
  text-align: justify;
`;

export const InformationCard = styled.div`
  background: rgba(255,255,255,.55);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 2%), 0 0px 0 1px rgb(10 10 10 / 2%);
  border-radius: 6px;
  transition: all .3s ease-in-out;
  padding: 20px;
  width: 100%;
  height: auto;
  margin-top: 15px;
`

export const AboutMeCard = styled.div`
  background: rgba(255,255,255,.55);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 2%), 0 0px 0 1px rgb(10 10 10 / 2%);
  border-radius: 6px;
  transition: all .3s ease-in-out;
  display: block;
  padding: 20px;
  width: 100%;
  margin-top: 15px;
  height: auto;
  text-align: justify;
`

export const DescriptionField = styled.textarea`
  display: block;
  font-size: 17px;
  width: 100%;
`

export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
