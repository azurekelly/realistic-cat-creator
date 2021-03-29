import Section from '../Section';

const buttons = [
    {label: 'Copper'},
    {label: 'Orange'},
    {label: 'Yellow'},
    {label: 'Hazel'},
    {label: 'Green'},
    {label: 'Aqua'},
    {label: 'Blue'}
];

const sliders = [
    {label: 'Pigment intensity'},
    {label: 'Blue refraction'}
];

const EyeColorSection = () => (
    <Section title='Eye color' buttons={buttons} sliders={sliders} />
);

export default EyeColorSection;