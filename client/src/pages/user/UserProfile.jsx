import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateProfile } from '../../store/slices/authSlice';
import { authService } from '../../services/auth.service';

const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await authService.updateProfile(values);
      dispatch(updateProfile(response));
      setSuccess('Profile updated successfully');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating profile');
      setSuccess('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Update your personal information and preferences.
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <Formik
                initialValues={{
                  name: user?.name || '',
                  email: user?.email || '',
                  phone: user?.phone || '',
                }}
                validationSchema={profileSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="space-y-6">
                    {error && (
                      <div className="rounded-md bg-red-50 p-4">
                        <div className="text-sm text-red-700">{error}</div>
                      </div>
                    )}
                    {success && (
                      <div className="rounded-md bg-green-50 p-4">
                        <div className="text-sm text-green-700">{success}</div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="name" className="label">
                        Full name
                      </label>
                      <div className="mt-2">
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          className="input"
                        />
                        {errors.name && touched.name && (
                          <div className="mt-1 text-sm text-red-600">{errors.name}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="label">
                        Email address
                      </label>
                      <div className="mt-2">
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          className="input"
                        />
                        {errors.email && touched.email && (
                          <div className="mt-1 text-sm text-red-600">{errors.email}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="label">
                        Phone number
                      </label>
                      <div className="mt-2">
                        <Field
                          id="phone"
                          name="phone"
                          type="tel"
                          className="input"
                        />
                        {errors.phone && touched.phone && (
                          <div className="mt-1 text-sm text-red-600">{errors.phone}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                        {isSubmitting ? 'Saving...' : 'Save changes'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 