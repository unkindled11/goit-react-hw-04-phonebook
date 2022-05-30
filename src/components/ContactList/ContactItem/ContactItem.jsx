import PropTypes from 'prop-types';

import styles from './contactItem.module.css';

const ContactItem=({ options, deleteNumbers })=> {
  const [name, number, id] = options;

  return (
    <li className={styles.item}>
      {name}: {number}
      <button
        type="button"
        className={styles.btn}
        onClick={() => deleteNumbers(id)}
      >
        Delete
      </button>
    </li>
  );
}


export default ContactItem;


ContactItem.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  deleteNumbers: PropTypes.func.isRequired,
};

