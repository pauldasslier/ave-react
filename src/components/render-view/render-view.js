import React from 'react';

const RenderView = (props) => {
  return (
    <div>
      {
        props.period.map((item, idx) => {
          return (
            <div key={idx.toString()}>{`Week ${idx + 1}: ${item}`}</div>
          );
        })
      }
    </div>
  );
};

export default RenderView;