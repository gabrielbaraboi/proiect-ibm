import { useParams } from "react-router-dom";
import styled from "styled-components";

export const ShowPost = () => {
    const { id } = useParams();

    const post = {
        id: id,
        createdBy: `123`,
        dateCreated:new Date(Date.now()).toString(),
        type: `offer`,
        description: `We are looking for a JS developer. You will be part of a multi-cultural team, where you will be supported to test and apply your ideas while co-creating a better future.
        Click the Apply button, check out the diverse range of roles and choose the one which fits you best!`,
        name: `IBM`,
        programmingLanguage: `JavaScript`,
        title: `JS developer`,
        workHours: `full-time`,
        workPlace: `Timisoara`,
        requirements: [`English`, `React`]
    }
    return(
        <Container >
            <Card>
                <TitleDiv>
                    <Title>
                        {post.title}
                    </Title>
                    <Angajator>
                        {post.name}
                    </Angajator>
                </TitleDiv>
                <JobCriteria>
                    <CriteriaRow>
                        <CriteriaData>
                            <b>Oras: </b> {post.workPlace}
                        </CriteriaData>
                        <CriteriaData>
                            <b>Tip job: </b>{post.workHours}
                        </CriteriaData>
                    </CriteriaRow>
                    <CriteriaRow>
                        <CriteriaData>
                            <b>Data postare: </b> {post.dateCreated}
                        </CriteriaData>
                        <CriteriaData>
                            <b>Limbaj: </b>{post.programmingLanguage}
                        </CriteriaData>
                    </CriteriaRow>
                </JobCriteria>
                <AdditinalInfoDiv>
                    <LabelTag htmlFor="descriereJob"><b>Descrierea jobului</b></LabelTag>
                    <PostDescription>
                        <div id="descriereJob">{post.description}</div>
                    </PostDescription>

                    <LabelTag htmlFor="requirements"><b>Cerinte:</b></LabelTag>
                    <ul>
                    {post.requirements.map((req) => (
                        <li>{req}</li>
                    ))}
                    </ul>
                </AdditinalInfoDiv>
                
            </Card>
        </Container>
        
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const TitleDiv = styled.div`
width: 100%;
margin: 1rem;
`

const Card = styled.div`
width: 800px;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 20px;
padding:0 0 1rem 0;
background: rgb(155,164,255);
background: linear-gradient(180deg, rgba(155,164,255,1) 9%, rgba(139,186,255,1) 99%);
`

const Title = styled.div`
font-size: 3rem;
padding: 1rem;
`

const Angajator = styled.div`
    font-size: 1.2rem;
    padding: 0 0 1rem 1rem;
`

const JobCriteria = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    border: 1px solid black;
`

const CriteriaRow = styled.div`
    display: flex;   
`

const CriteriaData = styled.div`
    border: 1px solid white;
    flex: 1;
    font-size: 1.2rem;
    padding: .8rem;
    border: 1px solid black;
`

const AdditinalInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const PostDescription = styled.div`
    padding: 0 1rem;
    font-size: 1.1rem;
`

const LabelTag = styled.label`
    font-size: 1.2rem;
    padding: 1rem;
`