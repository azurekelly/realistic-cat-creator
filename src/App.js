import styled from 'styled-components';
import ColorPanel from './components/ColorPanel';
import CatDisplayContainer from './components/CatDisplayContainer';

const Container = styled.div`
    height: 100%;
    background-color: #f3f3f3;
    display: flex;
    flex-direction: row;
`;

const SidePane = styled.div`
    overflow-y: auto;
    background-color: #fff;
    padding: 1rem 2rem;
    flex-basis: 35%;
    flex-shrink: 0;
`;

const MainPane = styled.div`
    flex-basis: 65%;
    max-width: 65%;
`;

const App = () => (
    <Container>
        <SidePane>
            <ColorPanel />
        </SidePane>
        <MainPane>
            <CatDisplayContainer />
        </MainPane>
    </Container>
);

export default App;
