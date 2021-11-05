const Tab = ({ activeTab, id, onClick }) => {
  let className = "tab-list-item";

  if (activeTab === id) {
    className += " tab-list-active";
  }

  return (
    <li className={className} onClick={() => onClick(id)}>
      {id}
    </li>
  );
};

export default Tab;
