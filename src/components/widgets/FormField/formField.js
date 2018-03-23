import React from 'react';

import styles from './formField.css';

const FormField = ({ id, formdata, change }) => {
  const renderTemplate = () => {
    let formTemplate = null;
    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <div>
            <input
              {...formdata.config}
              value={formdata.value}
              onChange={event =>
                change({
                  event,
                  id,
                  blur: false,
                })
              }
              onBlur={event =>
                change({
                  event,
                  id,
                  blur: true,
                })
              }
            />
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
};

export default FormField;
