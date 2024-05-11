import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './UserEditModalForm.module.scss';
import schema from '../../../schemas/validationRegistrSchemas';
import { updateUser } from '../../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';

const UserEditModalForm = ({ userData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.validationEditUSerSchema),
  });

  const userInitState = { ...userData, password: '', avatar: '' };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(userInitState);

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    console.log(file);
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
  };

  const onSubmit = (data) => {
    const newFormData = new FormData();
    newFormData.append('avatar', data.avatar[0]);
    newFormData.append('name', data.name);
    newFormData.append('password', data.password);

    dispatch(updateUser(newFormData));
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((d) => {
        onSubmit(d);
      })}
      encType="multipart/form-data"
      noValidate
    >
      <div className={styles.inputContainerImg}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM5SURBVHgB7ZzbdaMwEIYFvj5uCXSwKWG3gqSU7WCdDjadZCvYLYEOQgl58v2S+TmZE0XBgEAjW1jfORybYGP0eSSkkaNEGWRZ9uN4PN4nSfKAXTVM8tPplKdp+lgQ+oGEn5CIbyTiN4n4pW4IEvPnXcwr9kshkEEH/tHTO3Wb5BQIPyElxR4iQ92uDHD37kAlFB0ZRceLiihEScpmImVNeUjJyi1XlU+Qi3u0IVHIB1mqIp+IQgyiEIMoxCAKMYhCDKIQgyjEIAoxiEIMohCDKMRgrC7E4XAoNxpylxug0aaidF75OJlMykffeBey3+/VbrdDLvPLMfwNkvh1o9FITadTr2K8VRkUdrPZqO12WymjCshZrValQF94iRCWwVXDFhaCaiSNlwhBgbrK0M+BaiSNuBCEvauCnGt7XCIuxGX9hwzpKBEVwrdVl0CIZJSIC3ENZAQrxHV0MJLVJkghksSxjIGokEuMRfoSpBAMAKUQFSJ14cEKGY/dD5U4RSCFeIRgCO8S6QGe+F0G+QxXIDokok5HXAgK4UIKzjOfz5U0Xvoh+Fb7hDrL8HEb95ZC5Bwput02PVi0Q7PZzFufxmtOFZGCRhYpAQz86gZpnGiWbjNMvH0aCo/IaDMChgyI4/dI3mZNRIVwFp03m/fxiJYTTIgUiJGOGJGz41tFgZqqhQ26IESP1LyNUyEovHQymKMHG6S47qg5E1I3ASUFy0c/x1WPuHdr1WUCyiX8+a6S2b2E8MVI5E5tgZD1et37S+ksBB+MC7imNCGupa+UTkJYxiWqSBN9r81ayDXLYPpco5UQbjOuWQaDa0RDb4uVEBeT1j7pMq/cWgh3hkLDtjvQSoiPSWZJbKpOKyGhVRUTm6rTKCT06GDa9mQbhfj8fZck+g/66kibTjKE6GDalKVWSMjtRhVt8jMQUpw7OKToYBrKlOP/dv9WHWlb50KjLurJRY4Iea46GEL3vAsN1eYxLYriP5l5qnrjUDnzs/InrCXCjeqCtlx/wdAaVJ2KsmFxlQWelEKwbgZWRqiKlCGiC0Fk8Noh2P+Sx8fyGfSwWC6X3+nFg1wXgOZ2Cpoexc3kGU2GfuwNm5glb1rp5toAAAAASUVORK5CYII="
          className={styles.img}
        />
        <input
          className={styles.loadInput}
          {...register('avatar', { required: false })}
          type="file"
          placeholder="Enter you name"
          name="avatar"
          id="picture"
          onChange={handleFileChange}
          accept=".jpg, .png"
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          {...register('name', { required: false })}
          type="text"
          placeholder="Enter you name"
          name="name"
          value={formData.name}
          onChange={handleFormData}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          {...register('email', { required: false })}
          type="email"
          placeholder="Enter you email"
          name="email"
          value={formData.email}
          onChange={handleFormData}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          {...register('password', { required: false })}
          value={formData.password}
          onChange={handleFormData}
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter new password"
        />

        {errors.password && (
          <p className={styles.error} style={{ fontWeight: 500 }}>
            {errors.password.message}
          </p>
        )}

        <div className={styles.iconContainer}>
          {showPassword ? (
            <RiEyeLine
              className={styles.icon}
              onClick={togglePasswordVisibility}
            />
          ) : (
            <RiEyeCloseLine
              className={styles.icon}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>

      <button className={styles.button} type="submit">
        Send
      </button>
    </form>
  );
};

export default UserEditModalForm;
