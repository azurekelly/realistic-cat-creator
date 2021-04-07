import styled from 'styled-components';
import ColorPanel from './components/ColorPanel';
import CatDisplayContainer from './components/CatDisplayContainer';
import CatDescription from './components/CatDescription';
import {colors} from './theme';

const Container = styled.div`
    height: 100%;
    background-color: ${colors.lightGray};
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
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const DisplayWrapper = styled.div`
    flex-basis: 90%;
    overflow-y: hidden; // required by the display container to prevent a scaling bug with flexbox
    overflow-x: hidden;
    padding: 1rem 4rem 0;
`;

const App = () => (
    <Container>
        <SidePane>
            <ColorPanel />
        </SidePane>
        <MainPane>
            <DisplayWrapper>
                <CatDisplayContainer />
            </DisplayWrapper>
            <CatDescription />
        </MainPane>
    </Container>
);

export default App;
