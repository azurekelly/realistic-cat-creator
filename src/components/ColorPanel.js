import FurColorSection from './sections/FurColorSection';
import MarkingTypeSection from './sections/MarkingTypeSection';
import PatternSection from './sections/PatternSection';
import SilverSection from './sections/SilverSection';
import PointSection from './sections/PointSection';
import WhiteSection from './sections/WhiteSection';
import EyeColorSection from './sections/EyeColorSection';

const ColorPanel = () => (
    <>
        <FurColorSection />
        <MarkingTypeSection />
        <PatternSection />
        <SilverSection />
        <PointSection />
        <WhiteSection />
        <EyeColorSection />
    </>
);

export default ColorPanel;