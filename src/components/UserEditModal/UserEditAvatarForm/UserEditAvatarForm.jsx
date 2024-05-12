import styles from './UserEditAvatarForm.module.scss';
import schema from '../../../schemas/validationRegistrSchemas';

const UserEditAvatarForm = ({ onSubmit, userData }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit()} noValidate>
      <div className={styles.inputContainer}>
        <img src="../../../assets/user/userDark.png" className={styles.img} />
        <input
          className={styles.input}
          type="file"
          placeholder="Enter you name"
          name="name"
        />
      </div>
    </form>
  );
};

export default UserEditAvatarForm;
