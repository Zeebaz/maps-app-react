import { useState } from 'react';

const TabStrip = (props) => {
  const isActive = (index) => {
    return index === getActiveIndex();
  }
  
  const setActiveIndex = (selectedIndex) => {props.setActiveIndex(selectedIndex)}
  
  const getActiveIndex = () => {return props.activeIndex}

  return (
    <div className="TabStrip">
      {props.titles.map((title, index) => {
        const className = "TabStrip-title" +
          (isActive(index) ? " TabStrip-title-active" : "");

        return (
          <div onClick={() => setActiveIndex(index)} key={index} className={className}>
            {title}
          </div>
        );
      })}
    </div>
  );
}

const App = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div>
      <TabStrip 
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        titles={["My account", "Settings", "Dashboard"]} 
      />
    </div>
  );
}

export default App