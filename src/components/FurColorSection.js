import Section from './Section';

const buttons = [
    {label: 'Black'}, 
    {label: 'Chocolate'}, 
    {label: 'Cinnamon'}, 
    {label: 'Red'}, 
    {label: 'Gray'}, 
    {label: 'Lilac'}, 
    {label: 'Fawn'}, 
    {label: 'Cream'}
]
;
const sliders = [
    {label: 'Pigment intensity'}, 
    {label: 'Eumelanin color'}, 
    {label: 'Dilution'}
];

const FurColorSection = () => (
    <Section title={'Fur color'} buttons={buttons} sliders={sliders} />
);

export default FurColorSection;