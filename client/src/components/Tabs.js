import { useState } from "react";
import { TabsStyled } from "./styles/Tabs.styled";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.id);

  console.log(activeTab);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };
  return (
    <TabsStyled className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { id, data } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={id}
              id={id}
              length={data.length}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.id !== activeTab) return null;
          return child;
        })}
      </div>
    </TabsStyled>
  );
};

const Tab = ({ activeTab, id, onClick, length }) => {
  let classItem = "tab-list-item";
  let classPill = "tab-list__pill";

  if (activeTab === id) {
    classItem += " tab-list-active";
  }

  if (length > 0) {
    classPill += " pill-active";
  }

  return (
    <li className={classItem} onClick={() => onClick(id)}>
      {id}
      <span className={classPill}>{length}</span>
    </li>
  );
};

export default Tabs;
