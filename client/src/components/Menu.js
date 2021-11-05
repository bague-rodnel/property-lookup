const Menu = ({ data }) => {
  return (
    <ul className="search-results__menu">
      {Object.keys(data).map((key) => {
        return (
          <a id={key}>
            {key}
            <span className="menu__pill"></span>
            {data[key].length}
          </a>
        );
      })}
    </ul>
  );
};

export default Menu;
