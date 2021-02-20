const ColorPanel = (props) => {
    return (
        <>
            <div>
                <h2>Fur color</h2>
                <input type="button" value="Black" />
                <input type="button" value="Chocolate" />
                <input type="button" value="Cinnamon" />
                <input type="button" value="Red" />
                <input type="button" value="Gray" />
                <input type="button" value="Lilac" />
                <input type="button" value="Fawn" />
                <input type="button" value="Cream" />
                <h3>Advanced options</h3>
                <label>
                    Pigment intensity
                    <input type="range" />    
                </label>
                <label>
                    Eumelanin color
                    <input type="range" />    
                </label>
                <label>
                    Dilution
                    <input type="range" />    
                </label>
            </div>
            <div>
                <h2>Eye color</h2>
                <input type="button" value="Copper" />
                <input type="button" value="Orange" />
                <input type="button" value="Yellow" />
                <input type="button" value="Hazel" />
                <input type="button" value="Green" />
                <input type="button" value="Aqua" />
                <input type="button" value="Blue" />
                <h3>Advanced options</h3>
                <label>
                    Pigment intensity
                    <input type="range" />    
                </label>
                <label>
                    Blue refraction
                    <input type="range" />    
                </label>
            </div>
        </>
    );
};

export default ColorPanel;