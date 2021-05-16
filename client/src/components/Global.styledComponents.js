import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    @media (min-width: 576px) {
        max-width: 540px;
    }
    @media (min-width: 768px) {
        max-width: 720px;
    }
    @media (min-width: 992px) {
        max-width: 960px;
    }
    @media (min-width: 1200px) {
        max-width: 1140px;
    }
`;

export const PageTitle = styled.p`
    padding: 8px 0;
    margin: 30px 0;
    font-size: 24px;
    color: #1B2942;
    border-radius: 5px;
    font-weight: 500;
    display: inline-block;
`

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const ImageRectStyle = {
    'max-width': '100%',
'max-height': '100%',
'min-width': '100%',
'min-height': '100%',
'border-radius': '4px',
'object-fit':'cover'
};

export const ImageCircleStyle = {
    'max-width': '100%',
'max-height': '100%',
'min-width': '100%',
'min-height': '100%',
'border-radius': '100%',
'object-fit':'cover'
};