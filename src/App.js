import styled from 'styled-components';
import ColorPanel from './components/ColorPanel';

const Container = styled.div`
    height: 100%;
    background-color: #f3f3f3;
`;

const SidePane = styled.div`
    width: 35%;
    height: 100%;
    overflow-y: auto;
    background-color: #fff;
    padding: 1rem 2rem;
`;

const App = () => {
  return (
    <Container>
        <SidePane>
            <ColorPanel />
        </SidePane>
    </Container>
  );
}

export default App;
