
export default function ItemList(prop) {
  const fields = prop.fields;
  console.log(prop.children)
  return (
    <div className='list-group'>
      {
        prop.children.map((v, i) => {
          return (
            <a
              className={`list-group-item list-group-item-action lh-tight ${i===prop.active?"active":""}`}
              key={i} href={`company/${v.Id}`}
            >
              <div className="row">
                {
                  fields.map((config, j) => {
                    return (
                      <div className={`col-${config.width}`}>
                        {v[config.name]}
                      </div>
                    );
                  })
                }
              </div>
            </a>
          );
        })
      }
    </div>
  );
};
